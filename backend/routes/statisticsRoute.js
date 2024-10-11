import express from "express";

import getSalesStatistics from "../controller/statisticsController.js";

const statisticsRoute = express.Router();

statisticsRoute.get("/statistics", getSalesStatistics);

export default statisticsRoute;
