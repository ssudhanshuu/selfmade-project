import React from 'react'
import Homepage from './component/Homepage'
import { Route, Routes } from 'react-router-dom'
import Login from './component/Login'
import SignUp from './component/SignUp'
import Product from './component/Product'
function App() {
  return (
    <div>
      <Homepage></Homepage>
      <Routes>
       <Route path='/' element = {<Product/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/signup' element={<SignUp/>}/>
       <Route path='product' element={<Product/>}/>
      </Routes>

    

    </div>
  )
}

export default App
