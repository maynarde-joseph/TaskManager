import Swal from './sweetalert2/src/sweetalert2.js'
import task from './classes/tasks.js'

let allTasks = [];
// Create a new task
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

// Update an existing task
const updateTaskPopup = async (task) => {
  const { value: formValues } = await Swal.fire({
    title: 'Update Task',
    html:
      '<input id="swal-input1" class="swal2-input" placeholder="Name" value="' + task.Name + '">' +
      '<input id="swal-input2" class="swal2-input" placeholder="Description" value="' + task.Description + '">' +
      '<input id="swal-input3" class="swal2-input" placeholder="Due Date" value="' + task.DueDate + '">' +
      '<input type="checkbox" id="swal-input4" class="swal2-checkbox" ' + (task.Completed ? 'checked' : '') + '> Completed',
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
      // Prevent the click event from bubbling up to the card
      event.stopPropagation();

      // Your pin button logic here (e.g., moving the card to the top)
    });
    const comButton = xtask.querySelector('.complete-button');
    comButton.addEventListener('click', (event) => {
      // Prevent the click event from bubbling up to the card
      event.stopPropagation();

      // Your pin button logic here (e.g., moving the card to the top)
    });
    const ediButton = xtask.querySelector('.edit-button');
    ediButton.addEventListener('click', (event) => {
      // Prevent the click event from bubbling up to the card
      event.stopPropagation();

      // Your pin button logic here (e.g., moving the card to the top)
    });
    const delButton = xtask.querySelector('.delete-button');
    delButton.addEventListener('click', (event) => {
      // Prevent the click event from bubbling up to the card
      event.stopPropagation();

      // Your pin button logic here (e.g., moving the card to the top)
    });
  });
}

// Example task object (replace this with your actual task object)
const exampleTask = {
  Name: 'Example Task',
  Description: 'This is an example task',
  DueDate: '2024-01-30',
  Completed: false
};

// updateTaskPopup(exampleTask);

// createTaskPopup();

// function createInvoiceDiv(invoice) {
//   const div = document.createElement('div');
//   let newTile = new task(invoice);
//   allTasks.push(newTile)
//   // div.textContent = `Name: ${invoice.Name}, Email: ${invoice._id}`;
//   div.classList.add("task");
//   return div;
// }

function createTaskDiv(task) {
  const taskElement = task.Task;
  allTasks.push(task);
  return taskElement;
}

// Function to fetch invoice items from the server and display them in the viewboard div
// function displayInvoices() {
//   const viewboardDiv = document.getElementById('viewboard');

//   fetch('/invoices')
//     .then(response => response.json())
//     .then(invoices => {
//       // Create divs for each invoice item and append them to the viewboard div
//       invoices.forEach(invoice => {
//         const div = createInvoiceDiv(invoice);
//         viewboardDiv.appendChild(div);
//       });
//     })
//     .catch(error => console.error('Error fetching invoices:', error));
// }

function displayTasks(callback) {
  const viewboardDiv = document.getElementById('viewboard');

  fetch('/invoices')
    .then(response => response.json())
    .then(invoices => {
      // Create Task instances for each task item and append them to the viewboard div
      invoices.forEach(invoice => {
        const newTask = new task(invoice);
        const taskDiv = createTaskDiv(newTask);
        viewboardDiv.appendChild(taskDiv);
      });
      if (typeof callback === 'function') {
        callback();
      }
    })
    .catch(error => console.error('Error fetching tasks:', error));
}

// Call the displayInvoices function when the DOM content is loaded
document.addEventListener('DOMContentLoaded', displayTasks(handleStyles));
// handleStyles()

console.log(allTasks);