const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize Express
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bajeti-tracker', {
  useNewUrlParser: true,
  //useUnifiedTopology: true
});



// Define Schemas and Models
const userSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  date: Date,
});

// Define Schemas and Models
const expenseSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  date: Date,
});

const budgetSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  startDate: Date,
  endDate: Date,
});

const goalSchema = new mongoose.Schema({
  name: String,
  targetAmount: Number,
  currentAmount: Number,
  deadline: Date,
});

const Expense = mongoose.model('Expense', expenseSchema);
const Budget = mongoose.model('Budget', budgetSchema);
const Goal = mongoose.model('Goal', goalSchema);

// Get all expenses
app.get('/expenses', async (req, res) => {
  const expenses = await Expense.find();
  res.status(200).send(expenses);
});

// Save expenses data 
app.post('/expenses', async (req, res) => {
  const expense = new Expense(req.body);
  await expense.save();
  res.status(201).send(expense);
});

// Save budget entries
app.post('/budgets', async (req, res) => {
  const budget = new Budget(req.body);
  await budget.save();
  res.status(201).send(budget);
});

// Retrieve budget entries
app.get('/budgets', async (req, res) => {
  const budgets = await Budget.find();
  res.status(200).send(budgets);
});

// update budget entries


app.post('/goals', async (req, res) => {
  const goal = new Goal(req.body);
  await goal.save();
  res.status(201).send(goal);
});

app.get('/goals', async (req, res) => {
  const goals = await Goal.find();
  res.status(200).send(goals);
});



app.listen(5000, () => {
  console.log('Server running on port 5000');
});