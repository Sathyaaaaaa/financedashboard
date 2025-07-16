import { useState, useEffect } from 'react';
import './App.css';

// ✅ Use live backend URL from Render
const backendURL = 'https://financedashboard-27ex.onrender.com';

function App() {
  const [income, setIncome] = useState('');
  const [expense, setExpense] = useState('');
  const [summary, setSummary] = useState({
    total_income: 0,
    total_expense: 0,
    income: [],
    expenses: [],
  });

  const fetchSummary = async () => {
    try {
      const response = await fetch(`${backendURL}/summary`);
      const data = await response.json();
      setSummary(data);
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
  };

  const handleAddIncome = async () => {
    if (!income || income <= 0) return;
    try {
      await fetch(`${backendURL}/add-income`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseFloat(income) }),
      });
      setIncome('');
      fetchSummary();
    } catch (error) {
      console.error('Error adding income:', error);
    }
  };

  const handleAddExpense = async () => {
    if (!expense || expense <= 0) return;
    try {
      await fetch(`${backendURL}/add-expense`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseFloat(expense) }),
      });
      setExpense('');
      fetchSummary();
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <div className="App">
      <h1>💰 Finance Dashboard</h1>

      <div>
        <input
          type="number"
          placeholder="Enter income"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
        />
        <button onClick={handleAddIncome}>Add Income</button>
      </div>

      <div>
        <input
          type="number"
          placeholder="Enter expense"
          value={expense}
          onChange={(e) => setExpense(e.target.value)}
        />
        <button onClick={handleAddExpense}>Add Expense</button>
      </div>

      <h2>📋 Summary</h2>
      <p>Total Income: ₹{summary.total_income}</p>
      <p>Total Expense: ₹{summary.total_expense}</p>

      <h2>📊 History</h2>
      <ul>
        {summary.income?.map((item, index) => (
          <li key={`income-${index}`}>Income: ₹{item.amount}</li>
        ))}
        {summary.expenses?.map((item, index) => (
          <li key={`expense-${index}`}>Expense: ₹{item.amount}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
