To-Do List App (MERN) - Solo 
---------------------------------------------------------------------

This is a project I built to learn full stack development.  
It’s a simple to-do list where users can log in, add tasks, edit them, and track what’s done.  
I also added drag and drop for rearranging tasks and made it work in both dark and light mode.



Project Description-------------------------------------------------------------------

This project is a fully functional to-do list manager built with the MERN stack.  
It supports task creation, editing, and deletion with date-based sorting.  
Users can log in, manage their personal tasks, and view them under different sections.
I used MongoDB to store user and task data, and protected routes using JWT.



GitHub Repositories-----------------------------------------------------------

    todo-list => https://github.com/mahfuzofficial/todo-list.git



Live Links--------------------------------------------------------------------------------------

- **Frontend** (React + Vercel): https://thistodo.vercel.app/
- **Backend** (Express + Render): https://todo-list-backend-f382.onrender.com




Technologies Used-------------------------------------------------------------------------------

# Frontend
- React.js
- React Router DOM
- DnD Kit (for drag & drop)
- Context API
- CSS (custom styling)
- Vercel (for deployment)

# Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT (JSON Web Token) for auth
- Render (for deployment)







Setup Instructions for running Frontend and Backend---------------------------------------------------

    This project has two parts — React frontend and Node.js backend — and both need to run together.

    Project Folder Structure

    todo/
     ├── client/ # React frontend
     └── server/ # Node.js backend


Step 1: Clone the Repository

Open your terminal and run:
git clone https://github.com/mahfuzofficial/todo-list.git
cd your-repo-name



Step 2: Install Dependencies
* Backend Dependencies (in ./server folder)
    cd server
    npm install
    
    This installs:
        express – for server and routes
        mongoose – to connect with MongoDB
        dotenv – for loading .env values
        cors – to allow frontend/backend communication
        jsonwebtoken – for login token
        bcryptjs – for password hashing
        nodemon (dev only) – for auto-reloading backend

* Frontend Dependencies (in ./client folder)
    Open a second terminal:

    cd client
    npm install

    This installs:
    react – frontend framework
    react-router-dom – for navigation
    @dnd-kit/core – for drag and drop
    @dnd-kit/sortable – for sorting tasks
    @dnd-kit/utilities – required by the above



Step 3: Setup .env file (for backend)
        Inside the server/ folder, create a file named .env with this content:
        PORT=5000
        MONGO_URI=your-mongodb-uri
        JWT_SECRET=your-secret
       
        Make sure:
        MONGO_URI is copied from MongoDB Atlas → Connect → Drivers.
        JWT_SECRET is any random password string like abc123.



Step 4: Start the Servers:

    # Start Backend
        In terminal (inside server/):
        npm run dev

    You should see:
        Server running on port 5000
        Mongo connected
    
    
    # Start Frontend
        In another terminal (inside client/):
        npm start
        
        Browser should open http://localhost:3000

App Running Locally:
        
      --Part--          ---------URL---------
      Frontend	        http://localhost:3000
      Backend	        http://localhost:5000




Challenges Faced & How I Solved Them-----------------------------------------------------------------------------------------------------

1. Editing Task Bug (Textarea not working properly)
At first, I was facing a weird issue while editing tasks. When I typed anything in the input or textarea, the text caret (pointer) would disappear after 1 character. I couldn’t type smoothly at all.  
Turns out, the input states were not managed properly and React was re-rendering things wrongly. I fixed it by using local component states and making sure the form didn't re-render the whole list.


2. Old Task Counts Showing Wrong
In the sidebar, the count of completed/pending tasks was not correct. It used to always start from 2 or 1 even when I had no tasks. I debugged it using `console.log()` and later moved the count logic to the right place so it updates correctly when tasks are fetched.


3. Dark Mode Not Applying to Login/Signup Pages
The dark theme wasn’t applying to the full screen when user was on login or signup. I realized the root-level dark class was not wrapping the whole page. I fixed it by placing `<div className={dark ? "dark" : ""}>` as the top-most element in `App.jsx` to apply theme globally.


4. Network Errors After Changing Database
When I changed the MongoDB URI in `.env`, my app broke. I couldn't add or fetch tasks anymore. The issue was the new database was empty, and tokens from the old one didn’t match the users in the new one. So I cleared the localStorage token and re-registered using the new DB. Then it worked fine.


5. Slow Loading & Debugging Render Delays
At one point, the whole app was behaving slowly when I clicked buttons or toggled completed status. I checked the browser console and network tab and found some preflight and CORS delays. I made sure the backend and frontend were communicating correctly, and even deployed the backend to Render for smoother testing.


6. Auth Not Working ("No token found" bug)
This was because I was sending token to the wrong route or had a typo in the Authorization header. I also forgot to update the fetch URL after moving from Render to localhost. Once I fixed those things and double-checked `.env` + localStorage, the login worked fine.


These were some real issues I faced and learned a lot by fixing them one by one.





Technologies Used----------------------------------------------------------------------------------------

* Frontend
    >React JS – Built the entire frontend UI
    >React Router – For handling different pages like login, signup, home, etc.
    >@dnd-kit – Used for the drag-and-drop feature to reorder tasks
    >CSS (with variables) – Custom styling for light and dark themes
    >Vercel – Used to deploy the frontend online


* Backend
    >Node.js– Server-side runtime
    >Express.js – Framework for handling API routes and logic
    >MongoDB Atlas – Cloud database to store tasks and user info
    >Mongoose – To connect and interact with MongoDB using schemas
    >dotenv – Used to hide sensitive data like MongoDB URI and JWT secret
    >CORS – To allow cross-origin communication between client and server
    >bcryptjs – To securely hash user passwords before saving
    >jsonwebtoken – To generate and verify secure user login tokens
    >Render – Used to deploy the backend API online


* Other Tools
    >Postman – Tested some API routes during development
    >VS Code – My main code editor for both client and server
    >Git + GitHub – Used for version control and code hosting




Screenshots----------------------------------------------------------------
    >LoginPage.png
    >HomePage(LightTheme).png
    >HomePage(DarkTheme).png
    >addTaskPage.png
    >ProfilePage.png



Test Credentials----------------------------------------------------------------------
    
    * Email: testuser@email.com
    * Password: user1234

