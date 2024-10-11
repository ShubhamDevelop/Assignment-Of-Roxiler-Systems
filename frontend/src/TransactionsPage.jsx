import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalSold, setTotalSold] = useState(0);
  const [totalNotSold, setTotalNotSold] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [month, setMonth] = useState("March");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    fetchTransactions();
    fetchStatistics();
    fetchChartData();
  }, [month, searchTerm, page]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/transactions?page=${page}&perPage=10&search=${searchTerm}&month=${month}`
      );
      console.log(response.data);
      setTransactions(response.data.data);
      setTotalPages(Math.ceil(response.data.total / 10));
    } catch (error) {
      console.error("Error fetching transactions", error);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/statistics?month=${month}`
      );

      console.log("helo bhai ", response.data.response.totalSaleAmount);

      setTotalAmount(response.data.response.totalSaleAmount);
      setTotalSold(response.data.response.soldItem);
      setTotalNotSold(response.data.response.notSoldItem);
    } catch (error) {
      console.error("Error fetching statistics", error);
    }
  };

  const fetchChartData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/bar-chart?month=${month}`
      );
      const data = response.data;
      if (Array.isArray(data)) {
        const labels = data.map((d) => d.range);
        const counts = data.map((d) => d.count);
        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Number of Items",
              data: counts,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
          ],
        });
      } else {
        console.error("Expected an array from bar chart data");
        setChartData({});
      }
    } catch (error) {
      console.error("Error fetching chart data", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      fetchTransactions();
    }
  };

  return (
    <div className="">
      <div className="min-h-screen flex flex-col items-center bg-[#e6f0f5] p-4">
        {/* Dashboard Title */}
        <div className="flex justify-center items-center text-center bg-white rounded-full w-48 h-48 mb-8">
          <p className="text-xl font-semibold">Transaction Dashboard</p>
        </div>

        {/* Search and Select */}
        <div className="flex justify-between w-full max-w-4xl mb-6">
          <input
            type="text"
            placeholder="Search transaction"
            value={searchTerm}
            onChange={handleSearchChange}
            className="bg-[#f3cc63] hover:bg-[#e6b832] text-black py-2 px-6 rounded-full"
          />
          <div className="bg-[#f3cc63]  text-black py-2 px-6 rounded-s-xl">
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="bg-[#f3cc63] border-none"
            >
              <option>Select Month</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>
        </div>

        {/* Transactions Table */}
        <div>
          <table className="table-auto w-full bg-[#f3cc63] border-collapse border-2 border-black">
            <thead>
              <tr className="bg-[#f3cc63]">
                <th className="border border-black px-4 py-2">ID</th>
                <th className="border border-black px-4 py-2">Title</th>
                <th className="border border-black px-4 py-2">Description</th>
                <th className="border border-black px-4 py-2">Price</th>
                <th className="border border-black px-4 py-2">Category</th>
                <th className="border border-black px-4 py-2">Sold</th>
                <th className="border border-black px-4 py-2">Image</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-100">
                  <td className="border border-black p-2">{transaction._id}</td>
                  <td className="border border-gray-300 p-2">
                    {transaction.title}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {transaction.description}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {transaction.price}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {transaction.category}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {transaction.sold ? "Yes" : "No"}
                  </td>
                  <td className="border border-black p-2">
                    {transaction.image && (
                      <img
                        src={transaction.image}
                        alt={transaction.title}
                        className="rounded w-10 h-10"
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between w-full max-w-4xl mt-6 text-black">
          <span>Page No: 1</span>
          <div>
            <button className="px-4">Next</button>
            <span> - </span>
            <button className="px-4">Previous</button>
          </div>
          <span>Per Page: 10</span>
        </div>
        <div className="mt-32 border-none rounded-lg p-9 bg-[#f3cc63] ">
          <h2 className="text-lg font-bold">Statistics - {month}</h2>
          <div className="">
            <div className="p-4  rounded flex gap-10">
              <p>Total sale </p>
              <p>{totalAmount}</p>
            </div>
            <div className="p-4 flex gap-10 rounded">
              <p>Total Sold item</p>
              <p>{totalSold}</p>
            </div>
            <div className="p-4 flex gap-10 rounded">
              <p>Total Not Sold item</p>
              <p>{totalNotSold}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h2 className="text-lg font-bold">Transactions Bar Chart</h2>
        {chartData.labels && chartData.labels.length > 0 ? (
          <Bar
            data={chartData}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        ) : (
          <p>No data available for this month.</p>
        )}
      </div>
    </div>
  );
};

export default TransactionsPage;
