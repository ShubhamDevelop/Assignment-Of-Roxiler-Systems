import express from "express";
import mongoose from "mongoose";
import seedRoute from "./routes/seedRoute.js";
import barChartRoute from "./routes/barChartRoute.js";
import combinedRoute from "./routes/combinedRoute.js";
import pieCharttRoute from "./routes/pieChartRoute.js";
import statisticsRoute from "./routes/statisticsRoute.js";
import transactionRoute from "./routes/transactionRoute.js";

import cors from "cors";

const app = express();

mongoose.connect("mongodb://localhost:27017/DataRoxiler", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(cors());

// Routes
app.use("/api", seedRoute);
app.use("/api", transactionRoute);
app.use("/api", statisticsRoute);
app.use("/api", barChartRoute);
app.use("/api", pieCharttRoute);
app.use("/api", combinedRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
