import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CustomerForm from '../Components/CustomerForm'
import CustomerList from '../Components/CustomerList'

const MainRoutes = () => {
  return (
    <>
    <Routes>
        <Route path='/' exact element={<CustomerForm/>}/>
        <Route path='/customer-list' element={<CustomerList/>}/>
    </Routes>

    </>
  )
}

export default MainRoutes