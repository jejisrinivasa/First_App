const express = require("express"); //express is the web framework it is used for routing purpose

//we also use nodemon package for automatically run the server on saving the files
//we install nodemon in devDependencies because it handles the errors while we deploy it in online we can also install in dependencies

const app = express();

const dbconnection = require("./config/db"); //it is the old way of importing packages

//it is used to connect the database
dbconnection();

//midleware
//it is used to give access to the body
app.use(express.json({ extended: false }));

// app.get("/", (req, res) => {
//   res.send("hello world!");
// });

// app.put("/", (req, res) => {
//   res.json({ greetings: "hello" });
// });

//it uses the routes available in routes folder
app.use("/api/person", require("./routes/person"));

//it is used to run the sever on the specified port
const port = 5000;
app.listen(port, () => console.log(`Server is running at ${port}`)); 
