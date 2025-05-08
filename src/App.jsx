import { useState } from 'react';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([
    { id: 1, title: 'Food', amount: 500 },
    { id: 2, title: 'Transport', amount: 300 },
    { id: 3, title: 'Internet', amount: 1000 }
  ]);

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  // Add new expense
  const addExpense = (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    const newExpense = {
      id: Date.now(),
      title,
      amount: parseFloat(amount)
    };

    setExpenses([newExpense, ...expenses]);
    setTitle('');
    setAmount('');
  };

  // Delete expense
  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  // Calculate total
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="app">
      <div className="app-header">
        <h1>Expense Tracker</h1>
        <p>Track your spending effortlessly</p>
      </div>

      <form className="input-group" onSubmit={addExpense}>
        <input
          type="text"
          placeholder="Expense title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount in KES"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Add Expense</button>
      </form>

      <div className="expenses-list">
        {expenses.length > 0 ? (
          expenses.map((expense) => (
            <div key={expense.id} className="expense-item">
              <span>
                {expense.title}: KES {expense.amount.toLocaleString()}
              </span>
              <button className="delete-btn" onClick={() => deleteExpense(expense.id)}>
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No expenses added yet.</p>
        )}
      </div>

      <h2>Total: KES {total.toLocaleString()}</h2>
    </div>
  );
}

export default App;
