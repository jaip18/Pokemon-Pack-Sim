import { useState } from 'react'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import MyList from './pages/MyList'
import Packs from './pages/Packs'
import Pokedex from './pages/Pokedex'
import { Routes, Route } from 'react-router-dom'
import "./css/app.css"


function App() {
  return (
    <>
      <NavBar/>
      <main className='main-content'>
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/mylist" element={<MyList/>}></Route>
            <Route path="/packs" element={<Packs/>}></Route>
            <Route path="/pokedex" element={<Pokedex/>}></Route>
        </Routes>
      </main>
    </>
  )
}

export default App
