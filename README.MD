# Backend for startup phase tracker application

This is the server for the core service of the startup phase tracker application.

## Product core stack

Core stack of this project is **NodeJs**, **Graphql**, **TypeGraphql**, **TypeScript**, and **Apollo Server**

## Setup

Make sure on your local machine you have Nodejs installed. Clone the repository, then in the root project directory run **yarn** to install all dependencies, After installation create a **.env**(Environment Variables) file in the project root directory. Then check the **.env.example** file to see how the structure of the keys in the **.env** should look like.

Then Proceed to create a file named **db.json** in your project root folder, And then pass an empty array **[]** in the file. This file will act as the storage
for phases and task ceated for a start up

## Start Server

When done with setup in your project root folder, simply run the comman **yarn dev** to start the sever in development.

### Playground tests

You can then go to any graphql playground of tour choice(Apollo studio, Altair etc) and put the url **http://localhost:<your-port-number>/graphql**

![alt text](https://res.cloudinary.com/greatchinex/image/upload/v1649249186/startuptasks.png)

![alt text](https://res.cloudinary.com/greatchinex/image/upload/v1649249186/fetchtasks.png)
