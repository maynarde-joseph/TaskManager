# Task Management App

This is a full-stack task management application built with Express.js, MongoDB, and JavaScript. It allows users to manage tasks by creating, updating, sorting, filtering, and deleting them.

## Features

- **Search**: Users can search the database for a task of specific name.
- **Create**: Users can create new tasks with a name, description, due date, priority, and additional notes.
- **Update**: Tasks can be updated with new information, such as completion status, priority, and notes.
- **Sort**: Tasks can be sorted based on different criteria, such as name, due date, or priority.
- **Filter**: Users can filter tasks based on their completion status or priority level.
- **Delete**: Tasks can be deleted from the database.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript, SweetAlert2
- **Backend**: Express.js, Node.js
- **Database**: MongoDB

## Getting Started

To run this application locally, follow these steps:

1. Clone this repository to your local machine.
2. Install dependencies using `npm install`.
3. Start the server using `npm start`.
4. Open your browser and navigate to `http://localhost:8080` to view the application.

## Usage

- **Search for a Task**: Clock on the "Search bar" and type in the exact name of the task. Hit enter to search.
- **Creating a Task**: Click on the "New Task" button and fill in the required details. Click "Save" to create the task.
- **Updating a Task**: Click on the "Edit/Pin/Comfirm" button of the task you want to update, make changes in the popup, and click "Save" to update the task.
- **Sorting Tasks**: Click on the "Sort" button to choose a sorting criteria.
- **Filtering Tasks**: Click on the "Filter" button to filter tasks based on completion status or priority.
- **Deleting a Task**: Click on the "Delete" button of the task you want to delete, confirm the deletion in the popup, and the task will be deleted.

## Project Structure

- **`server.js`**: Entry point of the Express.js server.
- **`mongoRouter.js`**: Contains route handlers for CRUD operations on tasks.
- **`script.js`**: Frontend JavaScript file for handling user interactions.
- **`style.css`**: CSS file for styling the frontend.
