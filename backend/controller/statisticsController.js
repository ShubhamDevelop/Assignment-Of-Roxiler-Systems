import Transaction from "../models/Transaction.js";

const getSalesStatistics = async (req, res) => {
  const { month } = req.query;
  if (!month) return res.status(400).json({ message: "Provide month" });

  // Map month names to numbers
  const monthMap = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };

  const monthNumber = monthMap[month];
  if (!monthNumber) {
    return res
      .status(400)
      .json({
        message:
          "Invalid month name. Please provide a valid month (e.g., January, February).",
      });
  }

  const query = {
    $expr: {
      $eq: [{ $month: { $toDate: "$dateOfSale" } }, monthNumber],
    },
  };

  const data = await Transaction.find(query);

  const totalSaleAmount = data.reduce((acc, product) => acc + product.price, 0);
  const soldItem = data.filter((product) => product.sold === true).length;
  const notSoldItem = data.filter((product) => product.sold !== true).length;

  const response = {
    totalSaleAmount,
    soldItem,
    notSoldItem,
  };

  return res
    .status(200)
    .json({ statusCode: 200, response, message: "", success: true });
};

export default getSalesStatistics;
