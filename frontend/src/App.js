import logo from './logo.svg';
import './App.css';
import BudgetList from './components/BudgetList';
import BudgetForm from './components/BudgetForm';

function App() {
  return (
    <div className="App">
      <section className='box'>
        <BudgetForm/>
      </section>
      <section className='box'>
        <BudgetList/>
      </section>
    </div>
  );
}

export default App;
