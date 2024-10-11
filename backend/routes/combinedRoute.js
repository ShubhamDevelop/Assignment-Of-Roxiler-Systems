import express from "express";

import getCombinedData from "../controller/combinedController.js";

const combinedRoute = express.Router();

combinedRoute.get("/combined", getCombinedData);

export default combinedRoute;
