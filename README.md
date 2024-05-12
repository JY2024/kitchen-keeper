# Kitchen Keeper
CS520 Team 6

## Introduction

Kitchen Keeper is a website that helps users keep track of the contents of their fridge and discover ways to use their ingredients to make food. The purpose of the application is to make it easier for people to use what they already have in their kitchen to make delicious foods. The website includes:
1. A main page where users can enter food into their "fridge," see all the foods they have by category (fruit, veggies, etc), and view a pie chart showing the distribution of their food.
2. A social page where users can view recipes made by other users, search for recipes, see popular tags, and make their own posts.
3. A meal generation page where users can select ingredients from their fridge and receive AI-generated recipes.

Kitchen Keeper was made using React, Django, and Gemini API 1.5 Pro.
## Dependencies

Before trying to run the application, make sure to have these installed:
- npm
- python


## Installation

1. Download the zipped release
2. Unzip the folder
3. Open your terminal
4. (Optional) create a virtual environment
5. cd into the kitchen-keeper directory
Running the frontend React server
6. cd into the frontend folder
7. Run the command "npm install --legacy-peer-deps" to install dependencies
8. Run command "npm run dev"
9. Follow the link to see the webpage
Running the server
10. Run command "cd ../backend"
11. Optionally in a virtual environment, run the following commands ((if on Mac, use python3 instead of python):
      - "pip3 install -r requirements.txt"
      - "python3 manage.py makemigrations"
      - "python3 manage.py migrate"
13. Run command "python manage.py runserver"

# Configuration
Note for graders: Put the .env file (containing the database information) in backend folder. We will email it to you.
1. Need to use the .env file that will be emailed to the graders, which needs to be added to the root backend directory to properly interact with the Postgres data on ElephantSQL.  The .env file will contain the database hostname, port number to connect to, user, name, and password as environment variables.
