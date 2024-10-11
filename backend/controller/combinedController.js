import axios from "axios";

const getCombinedData = async (req, res) => {
  try {
    const { month } = req.query;

    const statistics = await axios.get(
      `http://localhost:5000/api/statistics?month=${month}`
    );
    const barChart = await axios.get(
      `http://localhost:5000/api/bar-chart?month=${month}`
    );
    const pieChart = await axios.get(
      `http://localhost:5000/api/pie-chart?month=${month}`
    );

    const combinedData = {
      statistics: statistics.data,
      barChart: barChart.data,
      pieChart: pieChart.data,
    };

    res.status(200).json(combinedData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching combined data", error });
  }
};

export default getCombinedData;
