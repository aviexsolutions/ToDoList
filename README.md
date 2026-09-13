# Project 14-1: To-Do List

## Description
A web application that displays to-do items for users from the JSONPlaceholder API. Users can select different users from a dropdown menu and view their corresponding tasks.

## Features
- **User Selection**: Dropdown menu to select from 10 different users
- **API Integration**: Fetches real data from JSONPlaceholder API
- **Task Display**: Shows all to-do items for the selected user
- **Task Statistics**: Displays total, completed, and remaining task counts
- **Interactive Checkboxes**: Mark tasks as complete/incomplete
- **Responsive Design**: Works on desktop and mobile devices
- **Visual Feedback**: Color-coded task status (Pending/Completed)

## Technologies Used
- **HTML5**: Page structure and layout
- **CSS3**: Styling with gradient backgrounds and animations
- **JavaScript (Vanilla)**: API calls and DOM manipulation
- **REST API**: JSONPlaceholder API for data

## Files Included
1. `index.html` - Main HTML structure with user selector and to-do list
2. `styles.css` - Styling for the application with responsive design
3. `script.js` - JavaScript functionality for API calls and DOM updates
4. `README.md` - Project documentation

## How to Use
1. Open `index.html` in a web browser
2. The app automatically loads to-do items for the first user
3. Select a different user from the dropdown to view their tasks
4. Check/uncheck tasks to mark them as complete
5. View task statistics at the top of the to-do list

## API Endpoints Used
- **Get Users**: `https://jsonplaceholder.typicode.com/users`
- **Get User Todos**: `https://jsonplaceholder.typicode.com/todos?userId={id}`

## Installation
No installation required. Simply download or clone the repository and open `index.html` in your web browser.

## Deployment
To deploy this app:
1. Upload the three files (index.html, styles.css, script.js) to a web server
2. Access the HTML file through your web browser
3. The app will fetch data from the public JSONPlaceholder API

## Browser Compatibility
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## GitHub Repository
https://github.com/aviexsolutions/ToDoList

## Author
Created for Project 14-1 Assignment

## License
MIT License
