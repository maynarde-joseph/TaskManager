var coll = document.getElementsByClassName("collapsible");
var i;

// https://www.w3schools.com/howto/howto_js_collapsible.asp
for (i = 0; i < coll.length; i++) {
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

let allTasks = document.querySelectorAll('.task-main');

// Add event listener to each pin button
allTasks.forEach(xtask => {
  const pinButton = xtask.querySelector('.pin-button');
  pinButton.addEventListener('click', (event) => {
    // Prevent the click event from bubbling up to the card
    event.stopPropagation();

    // Your pin button logic here (e.g., moving the card to the top)
  });
});

function createInvoiceDiv(invoice) {
  const div = document.createElement('div');
  div.textContent = `Name: ${invoice.name}, Email: ${invoice.email}`;
  return div;
}

// Function to fetch invoice items from the server and display them in the viewboard div
function displayInvoices() {
  const viewboardDiv = document.getElementById('viewboard');

  fetch('/invoices')
    .then(response => response.json())
    .then(invoices => {
      // Create divs for each invoice item and append them to the viewboard div
      invoices.forEach(invoice => {
        const div = createInvoiceDiv(invoice);
        viewboardDiv.appendChild(div);
      });
    })
    .catch(error => console.error('Error fetching invoices:', error));
}

// Call the displayInvoices function when the DOM content is loaded
document.addEventListener('DOMContentLoaded', displayInvoices);