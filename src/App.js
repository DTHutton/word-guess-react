import React from 'react'
import Title from './components/Title'
import Instructions from './components/Instructions'
import Game from './components/Game'
import Footer from './components/Footer'
import './App.css'

export default function App () {
  return (
    <div className="container">
      <Title />
      <Instructions />
      <Game />
      <Footer />
    </div>
  )
}
