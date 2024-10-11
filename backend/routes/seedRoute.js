import express from "express";

import seedDatabase from "../controller/seedController.js";

const seedRoute = express.Router();

seedRoute.get("/initialize-database", seedDatabase);

export default seedRoute;
