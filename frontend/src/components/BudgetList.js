// src/components/BudgetList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BudgetList = () => {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await axios.get('http://localhost:5000/budgets'); // Replace with your API endpoint
        setBudgets(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching budgets:', error);
      }
    };

    fetchBudgets();
  }, []);

  return (
    <div>
      <h1>Budget List</h1>
      <ul>
        {budgets.map((budget) => (
          <li key={budget._id}>
            <h2>{budget.name}</h2>
            <p>Amount: ${budget.amount}</p>
            <p>Start Date: {new Date(budget.startDate).toLocaleDateString()}</p>
            <p>End Date: {new Date(budget.endDate).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetList;