import Transaction from "../models/Transaction.js";

const listTransactions = async (req, res) => {
  const { search, page = 1, perPage = 10, month } = req.query;

  try {
    const query = {};

    if (month) {
      const startDate = new Date(`${month} 1, 2022`); // Use 2022 to match your data
      const endDate = new Date(startDate);
      endDate.setMonth(startDate.getMonth() + 1);

      query.dateOfSale = {
        $gte: startDate,
        $lt: endDate,
      };
    }

    if (search) {
      const searchAsNumber = parseFloat(search);
      if (!isNaN(searchAsNumber)) {
        query.price = searchAsNumber;
      } else {
        query.$or = [
          { title: new RegExp(search, "i") },
          { description: new RegExp(search, "i") },
        ];
      }
    }

    // Apply the query to countDocuments and find
    const total = await Transaction.countDocuments(query);
    const products = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(Number(perPage));

    // Log the fetched products

    res.status(200).json({
      total,
      page: Number(page),
      perPage: Number(perPage),
      data: products,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch transactions", details: err.message });
  }
};

export default listTransactions;
