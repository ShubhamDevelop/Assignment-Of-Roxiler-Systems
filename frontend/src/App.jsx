// src/App.js
import React from "react";
import { Router, Route, Routes } from "react-router-dom";
import TransactionsPage from "./TransactionsPage";

const App = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<TransactionsPage/>} />
        </Routes>
      </div>
    </>
  );
};

export default App;
