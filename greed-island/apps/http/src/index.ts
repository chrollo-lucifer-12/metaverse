import express from "express"
import router from "./routes/index.js";
import cors from "cors"


const app = express();
app.use(express.json());
app.use(cors())
app.use("/api/v1", router);


app.listen(5000, () => {
    console.log("server listening on port 5000")
})