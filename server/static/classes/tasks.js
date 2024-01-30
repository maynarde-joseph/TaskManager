export default class task {
  #id
  #Name
  #Description
  #DueDate
  #Completed
  #Priority
  #Notes
  #CompletedDate
  Task

  constructor(taskDetails) {
    this.#id = taskDetails._id
    this.#Name = taskDetails.Name
    this.#Description = taskDetails.Description
    this.#DueDate = taskDetails.DueDate
    this.#Completed = taskDetails.Completed
    this.#Priority = taskDetails.Priority
    this.#Notes = taskDetails.Notes
    this.#CompletedDate = null // not intialiased on creation
    this.Task = this.createTaskElement()
  }

  createTaskElement() {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
  
    const taskMainDiv = document.createElement("div");
    taskMainDiv.classList.add("task-main", "collapsible");
  
    const mainInfoDiv = document.createElement("div");
    mainInfoDiv.classList.add("maininfo");
    mainInfoDiv.textContent = this.#Name;
  
    const dueDateDiv = document.createElement("div");
    dueDateDiv.classList.add("duedate");
    dueDateDiv.id = "dueDate";

    // Calculate the difference between the due date and the current date
    const currentDate = new Date();
    const dueDate = new Date(this.#DueDate);
    const timeDifference = dueDate.getTime() - currentDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

    // Set the text content based on the difference
    if (daysDifference < 0) {
      dueDateDiv.textContent = "Overdue";
    } else if (daysDifference === 0) {
      dueDateDiv.textContent = "Due Today";
    } else if (daysDifference === 1) {
      dueDateDiv.textContent = "Due in 1 day";
    } else {
      dueDateDiv.textContent = "Due in " + daysDifference + " days";
    }
  
    const completeButton = document.createElement("div");
    completeButton.classList.add("complete-button", "side-button");
    completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';
  
    const editButton = document.createElement("div");
    editButton.classList.add("edit-button", "side-button");
    editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
  
    const pinButton = document.createElement("div");
    pinButton.classList.add("pin-button", "side-button");
    pinButton.innerHTML = '<i class="fa-solid fa-thumbtack"></i>';
  
    const deleteButton = document.createElement("div");
    deleteButton.classList.add("delete-button", "side-button");
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  
    taskMainDiv.appendChild(mainInfoDiv);
    taskMainDiv.appendChild(dueDateDiv);
    taskMainDiv.appendChild(completeButton);
    taskMainDiv.appendChild(editButton);
    taskMainDiv.appendChild(pinButton);
    taskMainDiv.appendChild(deleteButton);
  
    const taskBodyDiv = document.createElement("div");
    taskBodyDiv.classList.add("task-body", "content");
  
    const bodyParagraph = document.createElement("p");
    bodyParagraph.classList.add("main-decrp");
    bodyParagraph.textContent = this.#Description;
  
    const additionalNotesDiv = document.createElement("div");
    additionalNotesDiv.classList.add("additional-notes");
    additionalNotesDiv.textContent = this.#Notes;
    
    // had to add here idk why they wernt being applied from style.css
    additionalNotesDiv.style.border = "1px solid black";
    additionalNotesDiv.style.marginBottom = "10px";
    additionalNotesDiv.style.padding = "5px";
    additionalNotesDiv.style.borderRadius = "10px";
    additionalNotesDiv.style.fontSize = "14px"

  
    taskBodyDiv.appendChild(bodyParagraph);
    taskBodyDiv.appendChild(additionalNotesDiv);
  
    taskDiv.appendChild(taskMainDiv);
    taskDiv.appendChild(taskBodyDiv);
  
    return taskDiv;
  }
  

  // get Task() {
  //   return this.#Task;
  // }

  get id() {
    return this.#id;
  }

  get Name() {
    return this.#Name;
  }

  set Name(newName) {
    this.#Name = newName;
  }

  get Description() {
    return this.#Description;
  }

  set Description(newDescription) {
    this.#Description = newDescription;
  }

  get DueDate() {
    return this.#DueDate;
  }

  set DueDate(newDueDate) {
    this.#DueDate = newDueDate;
  }

  get Completed() {
    return this.#Completed;
  }

  set Completed(newCompleted) {
    this.#Completed = newCompleted;
  }

  get Priority() {
    return this.#Priority;
  }

  set Priority(newPriority) {
    this.#Priority = newPriority;
  }

  get Notes() {
    return this.#Notes;
  }

  set Notes(newNotes) {
    this.#Notes = newNotes;
  }
  get CompletedDate() {
    return this.#CompletedDate;
  }

  set CompletedDate(newCompletedDate) {
    this.#CompletedDate = newCompletedDate;
  }
}