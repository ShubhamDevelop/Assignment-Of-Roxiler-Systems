import express from "express";

import listTransactions from "../controller/transactionController.js";

const transactionRoute = express.Router();

transactionRoute.get("/transactions", listTransactions);

export default transactionRoute;
