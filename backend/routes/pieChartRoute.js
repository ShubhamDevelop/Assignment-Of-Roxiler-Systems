import express from "express";

import getPieChartData from "../controller/pieChartController.js";

const pieCharttRoute = express.Router();

pieCharttRoute.get("/pie-chart", getPieChartData);

export default pieCharttRoute;
