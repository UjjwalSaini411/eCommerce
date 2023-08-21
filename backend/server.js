const app = require("./app")
const dotenv = require("dotenv");
const connectDatabase = require("./config/database")

dotenv.config({ path: "backend/config/config.env" });

//handling uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err}`);
    console.log(`server is shutting down due to Unhandled promise rejection`);

    server.close(()=>{
        process.exit(1)
    });
});



//connecting to database
connectDatabase();


const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`); 
});

//unhandled promise rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error ${err}`);
    console.log(`server is shutting down due to Unhandled promise rejection`);

    server.close(()=>{
        process.exit(1);
    });
});