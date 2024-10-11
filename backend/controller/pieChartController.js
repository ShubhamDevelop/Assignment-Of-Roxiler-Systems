import Transaction from "../models/Transaction.js";

const getPieChartData = async (req, res) => {
  try {
    const { month } = req.query;

    const startDate = new Date(`${month} 1, 2023`);
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1);

    const transactions = await Transaction.find({
      dateOfSale: { $gte: startDate, $lt: endDate },
    });

    const categoryData = transactions.reduce((acc, transaction) => {
      if (!acc[transaction.category]) {
        acc[transaction.category] = 0;
      }
      acc[transaction.category]++;
      return acc;
    }, {});

    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json({ message: "Error generating pie chart data", error });
  }
};

export default getPieChartData;
