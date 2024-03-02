# Voting System

The Voting System is a web application that allows users to cast their votes for different options in a voting process. You will need to type a full name and a zip code, select an option from a dropdown list, and then submit the vote to see the application work.
It consists of both a frontend and a backend component, with the frontend built using React and the backend using Node.js with Express.


## Features

1. Users can fill out a form with their *full name*, *zip code*, and select an *option* from a predefined list of voting options.

2. Upon submission, the application checks if the user is eligible to vote based on their name and zip code.

3. If eligible, the application checks if the user has already cast their vote. If not, their vote is recorded in the database.

4. The application provides feedback to the user, informing them of the success or failure of their vote submission.


## Installation

To run the **Voting System** locally, follow these steps:


Clone the repository from GitHub:


    git clone https://github.com/yourusername/voting-system.git


Navigate to the root directory of the project and install the global dependencies:


    cd voting-system
    npm install


Install specific dependencies and for both the frontend and backend:


    cd frontend
    npm install


    cd ../backend
    npm install


Create a .env file in the backend directory and add the following environment variables:


    PORT=4000
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=password
    DB_DATABASE=voting_system


Replace the *DB_USER*, *DB_PASSWORD*, and *DB_DATABASE* values with your MySQL database credentials and database name.

---

Create a table in your **MySQL Workbench** to hold the information of the persons that are enrolled to vote:


    CREATE TABLE members_enrolled (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(50) NOT NULL,
        zip_code VARCHAR(4) NOT NULL,
        casted_vote BOOLEAN NOT NULL DEFAULT FALSE,
        option_voted VARCHAR(50)
    );


And populate it with your random voters:


    INSERT INTO members_enrolled (full_name, zip_code)
    VALUES
            ('Alice Smith', '1234'),
            ('John Johnson', '2345'),
            ('Emily Brown', '3456'),
            ('Michael Davis', '4567'),
            ('Olivia Miller', '5678'),
            ('Ethan Wilson', '6789'),
            ('Sophia Taylor', '7890'),
            ('Daniel Anderson', '8901'),
            ('Isabella Martinez', '9012'),
            ('William Jones', '0123'),
            ('Ava Garcia', '9876'),
            ('Liam Rodriguez', '8765'),
            ('Emma Lopez', '7654'),
            ('Noah Lee', '6543'),
            ('Mia Hernandez', '5432');

---

Back in your terminal start the ***backend*** server:


    cd ../backend
    npm start


Start the ***frontend*** server:


    cd ../frontend
    npm start


Open your web browser and navigate to **http://localhost:3000** to access the Voting System, and try voting using one of the enrolled members.

Alternatively you can try to submit the form with an empty field to get a warning.
You can also try to cast a second vote with the same person, or with a person that is not enrolled to get different alerts.


## Technologies Used

### Frontend:

**React**
**TypeScript**
**Axios**

### Backend:

**Node.js**
**TypeScript**
**Express**
**MySQL**


## Contributors

**Pablo Huusmann**
