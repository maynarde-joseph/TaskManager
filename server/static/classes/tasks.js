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

    const pinButton = document.createElement("button");
    pinButton.classList.add("pin-button");
    pinButton.textContent = "Pin";

    taskMainDiv.appendChild(mainInfoDiv);
    taskMainDiv.appendChild(pinButton);

    const taskBodyDiv = document.createElement("div");
    taskBodyDiv.classList.add("task-body", "content");
    // taskBodyDiv.style.display = "none";

    const bodyParagraph = document.createElement("p");
    bodyParagraph.textContent = this.#Description;

    taskBodyDiv.appendChild(bodyParagraph);

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