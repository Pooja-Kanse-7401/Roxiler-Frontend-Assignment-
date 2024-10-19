import React from 'react'
import APIComponent from './components/APIComponent'
import StatisticData from './components/StatisticData'

function App() {
  return (
    <>
      <div className='flex justify-center items-center flex-col'>
        <APIComponent/>
        <StatisticData/>
      </div>
    </>
  )
}

export default App
