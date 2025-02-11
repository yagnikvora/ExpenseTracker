import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import Layout from './Layouts/Layout'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import Transactions from './Pages/Transactions'
import Budgets from './Pages/Budgets'
import Users from './Pages/Users'
import AddEditTransactions from './Pages/AddEditTransactions'
import AddEditBudget from './Pages/AddEditBudget'
import Category from './Pages/Category'
import { Logout } from './Pages/logout'
import AddEditCategory from './Pages/AddEditCategory'
import EditUser from './Pages/EditUser'
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/logout" element={<Logout />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/transactions" element={<Transactions />}/>
          <Route path="/transactions/addedittransaction" element={<AddEditTransactions />}/>
          <Route path="/transactions/addedittransaction/:tid" element={<AddEditTransactions />}/>
          <Route path="/category/addeditcategory/" element={<AddEditCategory />}/>
          <Route path="/category/addeditcategory/:cid" element={<AddEditCategory />}/>
          <Route path="/budgets" element={<Budgets />}/>
          <Route path="/budgets/addeditbudget" element={<AddEditBudget />}/>
          <Route path="/budgets/addeditbudget/:bid" element={<AddEditBudget />}/>
          <Route path="/categories" element={<Category />}/>
          <Route path="/user" element={<Users />}/>
          <Route path="/user/edituser" element={<EditUser />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
