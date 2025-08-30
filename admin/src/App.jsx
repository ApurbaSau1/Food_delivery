import React from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import Sidebar from './components/sidebar/Sidebar.jsx'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add.jsx'
import List from './pages/List/List.jsx'
import Order from './pages/orders/order.jsx'
import Addmenu from './pages/Addmenu/Addmenu.jsx'
import Listmenu from './pages/Listmenu/Listmenu.jsx'

import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const App = () => {
  const url=process.env.URL
  return (
    
    <div>
      <Navbar />
      <hr />
      <ToastContainer />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/" element={<h1>Wellcome To Admin Dashboard</h1>} />
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/order" element={<Order url={url} />} />
          <Route path="/addMenu" element={<Addmenu url={url} />} />
          <Route path="/listMenu" element={<Listmenu url={url} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App