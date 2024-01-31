import Swal from './sweetalert2/src/sweetalert2.js'
import Task from './classes/tasks.js'

let allTasks = [];

const priorityOrder = {
  3: "High",
  2: "Medium",
  1: "low"
};

// if i ever want to make sorts and filters stay same after preforming action like 
// delte, pin, and complete.

// let useSort = true;
// let sortByGlobal = null;
// let sortForGlobal = null;
// let filterByGlobal = null;
// let filterForGlobal = null;

const refreshButton = document.querySelector('.refresh');

refreshButton.addEventListener('click', () => {
  // showrefreshingPopup()
  displayTasks(handleStyles)
  console.log('refresh button clicked');
});

const sortButton = document.querySelector('.sort');

sortButton.addEventListener('click', () => {
  showSortingPopup()
  console.log('Sort button clicked');
});

const filterButton = document.querySelector('.filter');

filterButton.addEventListener('click', () => {
  showFilteringPopup()
  console.log('Filter button clicked');
});

const newTaskButton = document.querySelector('.AddNew');

newTaskButton.addEventListener('click', () => {
  createTaskPopup();
  console.log('New Task button clicked');
});

const searchInput = document.querySelector('.topnav input[type="text"]');

searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    const searchType = "Name"
    const searchQuery = searchInput.value.trim();
    queryItems(searchType, searchQuery, handleStyles)
    console.log(`Search query: ${searchQuery}`);
  }
});

// Query item. Format: {$type: `string`}
async function queryItems(queryBy, queryFor, callback) {
  const viewboardDiv = document.getElementById('viewboard');
  allTasks = []
  // Construct the URL with sorting parameters in the query string
  const url = `/invoices/query?queryBy=${queryBy}&queryFor=${queryFor}`;

  fetch(url)
    .then(response => response.json())
    .then(invoices => {
      // Clear the viewboardDiv before adding sorted tasks
      viewboardDiv.innerHTML = '';

      // Create Task instances for each sorted task item and append them to the viewboard div
      invoices.forEach(invoice => {
        const newTask = new Task(invoice);
        const taskDiv = createTaskDiv(newTask);
        viewboardDiv.appendChild(taskDiv);
      });

      if (typeof callback === 'function') {
        callback();
      }
    })
    .catch(error => console.error('Error fetching and displaying sorted tasks:', error));
}

// YEHHH MATE
const createTaskPopup = async () => {
  const { value: formValues } = await Swal.fire({
    title: 'Create New Task',
    html:
      '<input id="swal-input1" class="swal2-input" placeholder="Name">' +
      '<input id="swal-input2" class="swal2-input" placeholder="Description">' +
      '<input id="swal-input3" class="swal2-input" placeholder="Due Date">' +
      '<select id="swal-input4" class="swal2-select" placeholder="Priority">' +
      '  <option value="Low">Low</option>' +
      '  <option value="Medium">Medium</option>' +
      '  <option value="High">High</option>' +
      '</select>' +
      '<input id="swal-input5" class="swal2-input" placeholder="Notes">',
    focusConfirm: false,
    preConfirm: () => {
      return {
        Name: document.getElementById('swal-input1').value,
        Description: document.getElementById('swal-input2').value,
        DueDate: document.getElementById('swal-input3').value,
        Priority: document.getElementById('swal-input4').value,
        Notes: document.getElementById('swal-input5').value,
        Pinned: false // Default value for Pinned, can be changed if needed
      };
    }
  });

  if (formValues) {
    // Send formValues to your backend for creating a new task
    try {
      const response = await fetch('/invoices/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
      });

      if (response.ok) {
        const result = await response.text();
        console.log(result); // Log the server response
        displayTasks(handleStyles)
      } else {
        console.error('Failed to create task:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  }
};

// PERFECT MATE
const updateTaskPopup = async (taskx) => {
  const { value: formValues } = await Swal.fire({
    title: 'Update Task',
    html:
      '<input id="swal-input1" class="swal2-input" placeholder="Name" value="' + taskx.Name + '">' +
      '<input id="swal-input2" class="swal2-input" placeholder="Description" value="' + taskx.Description + '">' +
      '<input id="swal-input3" class="swal2-input" placeholder="Due Date" value="' + taskx.DueDate + '">' +
      '<select id="swal-input4" class="swal2-select" placeholder="Priority">' +
      '  <option value="Low"' + (taskx.Priority === 1 ? ' selected' : '') + '>Low</option>' +
      '  <option value="Medium"' + (taskx.Priority === 2 ? ' selected' : '') + '>Medium</option>' +
      '  <option value="High"' + (taskx.Priority === 3 ? ' selected' : '') + '>High</option>' +
      '</select>' +
      '<input id="swal-input5" class="swal2-input" placeholder="Notes" value="' + taskx.Notes + '">' +
      '<br>' +
      '<input type="checkbox" id="swal-input6" class="swal2-checkbox" ' + (taskx.Completed ? 'checked' : '') + '> Completed',
    focusConfirm: false,
    preConfirm: () => {
      return {
        Name: document.getElementById('swal-input1').value,
        Description: document.getElementById('swal-input2').value,
        DueDate: document.getElementById('swal-input3').value,
        Priority: document.getElementById('swal-input4').value,
        Notes: document.getElementById('swal-input5').value,
        Completed: document.getElementById('swal-input6').checked
      };
    }
  });

  if (formValues) {
    // Send formValues to your backend for updating the task
    try {
      const response = await fetch(`/invoices/update/${getIdByTask(taskx)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
      });

      if (response.ok) {
        const result = await response.text();
        displayTasks(handleStyles)
        console.log(result); // Log the server response
      } else {
        console.error('Failed to update task:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  }
};


// Helper function
function getTaskById(idValue) {
  return allTasks.find(task => task.id === idValue);
}

function getIdByTask(task) {
  return task.id;
}

// GOOD MATE
function showSortingPopup() {
  // Create a template for the popup content
  const popupContent = `
    <div>
      <label for="sortBy">Sort By:</label>
      <select id="sortBy" name="sortBy">
        <option value="Name">Name</option>
        <option value="DueDate">Date</option>
        <option value="Priority">Priority</option>
      </select>
    </div>
    <div>
      <label for="sortFor">Sort For:</label>
      <select id="sortFor" name="sortFor">
        <option value="ASC">ASC</option>
        <option value="DESC">DESC</option>
      </select>
    </div>
  `;

  // Use Swal.fire() to show the popup with HTML content
  Swal.fire({
    title: 'Sort',
    html: popupContent,
    showCancelButton: true,
    confirmButtonText: 'Sort',
    cancelButtonText: 'Cancel',
    focusConfirm: false,
    preConfirm: () => {
      // Retrieve the values of SortBy and SortFor when the user confirms
      const sortBy = document.getElementById('sortBy').value;
      const sortFor = document.getElementById('sortFor').value.toUpperCase(); // Convert to uppercase

      // You can perform validation or further processing here
      console.log('Sort By:', sortBy);
      console.log('Sort For:', sortFor);

      // Return the values as an object (or perform further actions)
      return { sortBy, sortFor };
    }
  }).then((result) => {
    // Handle the result (if needed)
    if (result.isConfirmed) {
      console.log('Sorting confirmed!');
      console.log('Sort By:', result.value.sortBy);
      console.log('Sort For:', result.value.sortFor);
      sortItems(result.value.sortBy, result.value.sortFor, handleStyles)
      // Perform further actions with the sorting criteria
    } else {
      console.log('Sorting canceled.');
      // Handle cancelation (if needed)
    }
  });
}

// ALSO WORKS LIKE A CHARM MATE
function showFilteringPopup() {
  // Create a template for the popup content
  const popupContent = `
    <div>
      <label for="filterBy">Filter By:</label>
      <select id="filterBy" name="filterBy">
        <option value="name">Name</option>
        <option value="date">Date</option>
        <option value="priority">Priority</option>
      </select>
    </div>
    <div>
      <label for="filterOrder">Filter Order:</label>
      <select id="filterOrder" name="filterOrder">
        <option value="ascending">Ascending</option>
        <option value="descending">Descending</option>
      </select>
    </div>
  `;

  // Use Swal.fire() to show the popup with HTML content
  Swal.fire({
    title: 'Filter',
    html: popupContent,
    showCancelButton: true,
    confirmButtonText: 'Filter',
    cancelButtonText: 'Cancel',
    focusConfirm: false,
    preConfirm: () => {
      // Retrieve the values of FilterBy and FilterOrder when the user confirms
      const filterBy = document.getElementById('filterBy').value;
      const filterOrder = document.getElementById('filterOrder').value;

      // You can perform validation or further processing here
      console.log('Filter By:', filterBy);
      console.log('Filter Order:', filterOrder);

      // Return the values as an object (or perform further actions)
      return { filterBy, filterOrder };
    }
  }).then((result) => {
    // Handle the result (if needed)
    if (result.isConfirmed) {
      console.log('Filtering confirmed!');
      console.log('Filter By:', result.value.filterBy);
      console.log('Filter Order:', result.value.filterOrder);
      // Perform further actions with the filtering criteria
    } else {
      console.log('Filtering canceled.');
      // Handle cancelation (if needed)
    }
  });
}

// WORKS LIKE A CHARM MATE
function showPinConfirmation(taskId) {
  // Use Swal.fire() to show the popup
  let booleen;
  if (getTaskById(taskId).Pinned === true) {
    booleen = false;
  } else {
    booleen = true;
  }
  Swal.fire({
    title: 'Are you sure you want to pin?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, pin it!',
    cancelButtonText: 'Cancel',
    heightAuto: false,
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`/invoices/update/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Pinned: booleen }),
      })
        .then((response) => {
          if (response.ok) {
            console.log(`Task with ID ${taskId} Pinned!`);
            displayTasks(handleStyles)
          } else {
            console.error('Failed to Pinned task:', response.statusText);
          }
        })
        .catch((error) => {
          console.error('Error Pinned task:', error);
        });
    }
  });
}

// WORKS MATE
function showDeleteConfirmation(taskId) {
  // Use Swal.fire() to show the popup
  Swal.fire({
    title: 'Are you sure you want to delete?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
    heightAuto: false,
  }).then((result) => {
    // Check if the user clicked the "Yes, pin it!" button
    if (result.isConfirmed) {
      // If confirmed, make a DELETE request to the server
      fetch(`/invoices/${taskId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            console.log(`Task with ID ${taskId} deleted!`);
            displayTasks(handleStyles)
            // Optionally, update the UI to reflect the deletion
          } else {
            console.error('Failed to delete task:', response.statusText);
          }
        })
        .catch((error) => {
          console.error('Error deleting task:', error);
        });
    }
  });
}

// CHECKING MATE
function showCheckConfirmation(taskId) {
  // Use Swal.fire() to show the popup
  let booleen;
  if (getTaskById(taskId).Completed === true) {
    booleen = false;
  } else {
    booleen = true;
  }
  Swal.fire({
    title: 'Are you sure you want to mark as complete?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, mark it!',
    cancelButtonText: 'Cancel',
    heightAuto: false,
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`/invoices/update/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Completed: booleen }),
      })
        .then((response) => {
          if (response.ok) {
            console.log(`Task with ID ${taskId} Completed!`);
            displayTasks(handleStyles)
          } else {
            console.error('Failed to Completed task:', response.statusText);
          }
        })
        .catch((error) => {
          console.error('Error Pinned task:', error);
        });
    }
  });
}

function handleStyles() {
  var coll = document.getElementsByClassName("collapsible");
  // https://www.w3schools.com/howto/howto_js_collapsible.asp
  for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }

  let allCssTasks = document.querySelectorAll('.task-main');

  // Add event listener to each pin button
  allCssTasks.forEach(xtask => {
    const pinButton = xtask.querySelector('.pin-button');
    pinButton.addEventListener('click', (event) => {
      event.stopPropagation();
      const taskId = event.target.closest('.task').dataset.taskId;
      showPinConfirmation(taskId);
    });
    const comButton = xtask.querySelector('.complete-button');
    comButton.addEventListener('click', (event) => {
      event.stopPropagation();
      const taskId = event.target.closest('.task').dataset.taskId;
      showCheckConfirmation(taskId);
    });
    const ediButton = xtask.querySelector('.edit-button');
    ediButton.addEventListener('click', (event) => {
      event.stopPropagation();
      const taskId = event.target.closest('.task').dataset.taskId;
      updateTaskPopup(getTaskById(taskId))
    });
    const delButton = xtask.querySelector('.delete-button');
    delButton.addEventListener('click', (event) => {
      event.stopPropagation();
      const taskId = event.target.closest('.task').dataset.taskId;
      showDeleteConfirmation(taskId);
    });
  });
}

function createTaskDiv(task) {
  const taskElement = task.Task;
  allTasks.push(task);
  return taskElement;
}

function displayTasks(callback) {
  allTasks = [];
  const viewboardDiv = document.getElementById('viewboard');

  // Sorting parameters
  const key = 'DueDate'; // Sort by DueDate field
  const order = '1'; // Ascending order

  // Construct the URL with sorting parameters in the query string
  const url = `/invoices/sort?key=${key}&order=${order}`;

  fetch(url)
    .then(response => response.json())
    .then(invoices => {
      // Clear the viewboardDiv before adding sorted tasks
      viewboardDiv.innerHTML = '';

      // Create Task instances for each sorted task item and append them to the viewboard div
      invoices.forEach(invoice => {
        const newTask = new Task(invoice);
        const taskDiv = createTaskDiv(newTask);
        viewboardDiv.appendChild(taskDiv);
      });

      if (typeof callback === 'function') {
        callback();
      }
    })
    .catch(error => console.error('Error fetching and displaying sorted tasks:', error));
}

// Sort items
async function sortItems(key, order, callback) {
  allTasks = [];
  const viewboardDiv = document.getElementById('viewboard');
  let newOrder;
  // Sorting parameters
  if (order == "ASC") {
    newOrder = '1'
  } else {
    newOrder = '-1'
  }

  // Construct the URL with sorting parameters in the query string
  const url = `/invoices/sort?key=${key}&order=${newOrder}`;

  fetch(url)
    .then(response => response.json())
    .then(invoices => {
      // Clear the viewboardDiv before adding sorted tasks
      viewboardDiv.innerHTML = '';

      // Create Task instances for each sorted task item and append them to the viewboard div
      invoices.forEach(invoice => {
        const newTask = new Task(invoice);
        const taskDiv = createTaskDiv(newTask);
        viewboardDiv.appendChild(taskDiv);
      });

      if (typeof callback === 'function') {
        callback();
      }
    })
    .catch(error => console.error('Error fetching and displaying sorted tasks:', error));
}

// Call the displayInvoices function when the DOM content is loaded
document.addEventListener('DOMContentLoaded', displayTasks(handleStyles));
// handleStyles()

console.log(allTasks);