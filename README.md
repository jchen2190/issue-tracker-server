# Issue Tracker (server)

## General Info
This project is a MERN (MongoDB, Express, React, Node) application with CRUD (Create, Read, Update, Delete) functionality and lets users keep track of variety of issues with different priorities. It takes data saved in the server from MongoDB database and lets users login, add, edit, and delete issues.

Note: This repository only contains code for the server side of the project. To see the client side of the project, go to [github.com/jchen2190/issue-tracker-client](https://github.com/jchen2190/issue-tracker-client) for installation and setup.

## Setup

### Node Installation
Go to [Official Node.js Website](https://nodejs.org) and download the installer per your operating system.

### Connect to MongoDB
Create an `.env` file (outside your `src` folder) with similar text below:
```
PORT = <Port Number>
MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.asczfik.mongodb.net/
"
COOKIE_SECRET="<insert your cookie secret>"
```
Your `<Port Number>` needs to match with the port number from your client side. <br>
Connect your MongoDB database using your provided connection string and replace the text with your `<username>` and `<password>`. <br>
Your cookie secret should be long and have different symbols for secrecy.

### Run
After node is installed, install the modules by running the following command in the terminal to install package dependencies:
```
npm install
```

Dependencies that will be installed for the server-side:

- axios
- bcrypt
- cookie-parser
- cors
- dotenv
- express
- express-session
- memorystore
- mongoose
- morgan
- nodemon

If you wish to connect to your own designated website, check the `index.js` and make sure the app is using the correct origin.
```
app.use(cors({
    "origin": "<your website>"
}))
```
and set the secure in cookie to true.
```
app.use(session({
    cookie: {
        secure: true
    }
}))
```
Otherwise if you wish to run locally, set your cors origin to your client localhost and session cookie secure to false.

Run the program locally for the client using nodemon:
```
npm run start
```

## Deployment
See the project live at [https://issue-tracker-client-dja8.onrender.com/](https://issue-tracker-client-dja8.onrender.com/).

Please wait for a while until the server data finishes loading.