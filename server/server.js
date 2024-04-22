require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./Router/auth-router")
const salesForce = require("./controllers/salesforceCall-controller")
const connectDb = require("./utils/db");
const errorMidleware = require("./error/error-middleware");
const cors = require("cors");
const authMiddleWare = require("./error/auth-middleware");

const corsOption = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
}

app.use(cors(corsOption));
app.use(express.json());
app.use("/api/auth", router);
app.use("/api/salesForce", authMiddleWare, salesForce);
app.use(errorMidleware);


connectDb().then(() => {

    const port = "5000";
    app.listen(port, () => {
        console.log(`Server is running in port no : ${port}.`)
    });
})