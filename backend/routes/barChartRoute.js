import express from "express";
import getBarChartData from "../controller/barChartController.js";

const barChartRoute = express.Router();

barChartRoute.get("/bar-chart", getBarChartData);

export default barChartRoute;
