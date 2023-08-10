const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({path:"backend\config\config.env"})

app.listen(4000,()=>{

    console.log(`server is running on http://localhost${process.env.PORT}`);
})