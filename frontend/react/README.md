# Project NobleGoldFish Frontend

## Getting Started
Install packages with "npm install"

Start app with "npm run dev"

## Deployment steps For the classwork environment
Copy all react folder files ***! except the node_modules and the .env file! *** to the user classwork folder.

Run the cmd "npm install" in the user classwork environment terminal.

Locally - Run the cmd "npm build" 

This buids the dist folder locally due to the classwork environment not having required updated versions for pacticular packages.

Copy the local dist folder to the classwork environment under the react folder.

Create and update the .env file under the react folder for the production environment values. 

Run the cmd "npm run production" in the classwork environment terminal to start the app.


## DOTENV
uses .env file to store communication constants for the API.

Required components with example values:

    VITE_API_PORT=6113
    VITE_API_BASE_URL=localhost
    PORT = 6115

## Folder Structure 
Reusable components reside under src/components.

Page specific templates reside under src/pages.

## Notable Components
apiClient.jsx - contains the API calls and related code to communicate with the API.

TableRow.jsx - is used on Pages content to display results from select queries. Adapted from Course Content React Starter Code.

Navbar.jsx - contains to navigation component for the site.

## Citations
Date: Jun 5 2026
This app is using starter code from CS 340 Spring 2026 Week 1 Activity 2.
https://canvas.oregonstate.edu/courses/2042369/assignments/10464646?module_item_id=26640125

Date: Jun 5 2026
This app used Microsoft Copilot to generate a professional looking CSS style.
https://copilot.microsoft.com/

Date: Jun 5 2026
This app used Microsoft Copilot to generate a logo and favicon.
https://copilot.microsoft.com/

Date: Jun 5 2026
This app uses a color palette taken from:
https://lospec.com/palette-list/sweet24