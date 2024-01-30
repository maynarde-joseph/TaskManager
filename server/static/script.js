import Swal from './sweetalert2/src/sweetalert2.js'
import Task from './classes/tasks.js'

let allTasks = [];

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

    const searchQuery = searchInput.value.trim();

    console.log(`Search query: ${searchQuery}`);
  }
});

// YEHHH MATE
const createTaskPopup = async () => {
  const { value: formValues } = await Swal.fire({
    title: 'Create New Task',
    html:
      '<input id="swal-input1" class="swal2-input" placeholder="Name">' +
      '<input id="swal-input2" class="swal2-input" placeholder="Description">' +
      '<input id="swal-input3" class="swal2-input" placeholder="Due Date">',
    focusConfirm: false,
    preConfirm: () => {
      return {
        Name: document.getElementById('swal-input1').value,
        Description: document.getElementById('swal-input2').value,
        DueDate: document.getElementById('swal-input3').value
      };
    }
  });

  if (formValues) {
    // Send formValues to your backend for creating a new task
    console.log(formValues);
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
      '<br>' +
      '<input type="checkbox" id="swal-input4" class="swal2-checkbox" ' + (taskx.Completed ? 'checked' : '') + '> Completed',
    focusConfirm: false,
    preConfirm: () => {
      return {
        Name: document.getElementById('swal-input1').value,
        Description: document.getElementById('swal-input2').value,
        DueDate: document.getElementById('swal-input3').value,
        Completed: document.getElementById('swal-input4').checked
      };
    }
  });

  if (formValues) {
    // Send formValues to your backend for updating the task
    console.log(formValues);
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
        <option value="name">Name</option>
        <option value="date">Date</option>
        <option value="priority">Priority</option>
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

// Call the displayInvoices function when the DOM content is loaded
document.addEventListener('DOMContentLoaded', displayTasks(handleStyles));
// handleStyles()

console.log(allTasks);