# Prototype Software Project Management System
## SWE 6633's Group 2
### Ahmet Bugra Dogan, Dominick Founds, Jeffrey Ganulin, Ghislain Dongbou Temgoua)

# Overview
This application allows a development team to manage their software projects conveniently in one location. A project manager can register an account and create the initial project definition, specifying fields such as a title for the project and a summary. From there they can assign new members to the project, each with their appropriate role such as Tester, Designer, Analyst, etc. Members can define new requirements to the project, specifying between functional and non-functional. They can also add risks and their associated statuses to keep track of throughout the development process. Once the project's been defined and work has begun, members can indicate how long they've worked on a specific requirement and what activity in particular that work entailed, whether it be coding, requirements analysis, testing, and more. Each of these "effort" entries will be tabulated and displayed on the Projects Overview page to give an at-a-glance view of the project's overall completion and work breakdown.

# Tools Used:
* Marvel for UI prototypes 
* Microsoft Teams for team discussions, meetings, and document storage 
* Jira for project monitoring and planning 
* GitHub for CVS and code collaboration 

# Technology Stack
## Frontend: 
* HTML/CSS/JS + React 
    * Additional libraries for UI composition include Chakra UI and Recharts 
## Database: 
* MongoDB (Hosted locally using MongoDB Community edition server)
## Backend: 
* Node.js + Express 
    * Session management implemented using express-session with session data stored in MongoDB 
    * The MongoDB database is interfaced with on the backend using Mongoose 
 
# Running the Application Locally
## Dependencies
* Latest version of Node.js and NPM
* MongoDB Community server or access to an Atlas cluster

## Installation and Configuration
* Clone the repo
* From the root directory of the cloned repo run `npm install && npm install --prefix client` to download and install the various dependencies for backend and frontend
* Use the .env.example as a starting point to specify your machine-specific environmental variables with which to run the project. These values will depend on your operating environment such as how you've configured your MongoDB server or cluster, and the port you want the backend server to run on (Unless you have specific needs you should choose 8000, as anything else will require you to adjust the "proxy" field in the client/package.json file for that specific port). Additionally you'll need to provide a session secret to use to sign the session cookies used for state management and authentication. Once you have this file filled out, make sure the file is renamed to `.env`

## Launching the Prepared Application
* With everything installed, run `npm run dev` from the root project directory to start the React development server and the Express backend.
* Your browser should open automatically to the frontend homepage, but if not, navigate to http://localhost:3000 in your browser.
* You may now register for an account and begin interacting with the application.


