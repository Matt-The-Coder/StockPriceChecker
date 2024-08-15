import { useEffect, useState } from 'react'
import axios from 'axios';
import RiseLoader from "react-spinners/RiseLoader";
import { Stockform } from './components/Stockform';
function App() {

  const API_KEY = import.meta.env.VITE_API_KEY // API KEY 
  const [loading, setLoading] = useState(true)
  const [stockSymbols, setStockSymbols] = useState([])

  // Function for getting stock symbols
  const getStockSymbols = async () => {
    try {
      setLoading(true)
      const result = await axios.get(`https://finnhub.io/api/v1/stock/symbol?exchange=US&mic=XNYS&token=${API_KEY}`)
      const data = result.data
      const symbol = data.map((e: { symbol: "" }) => { return e.symbol })
      setStockSymbols(symbol)
      console.log(symbol)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log('Error in retrieving data:', error)
    }
  }
  useEffect(() => {
    getStockSymbols()
  }, [])
  return (
    <>
      {/* Loading Page */}
      {loading && <>
        <div className="loading fixed h-lvh w-lvw z-10 bg-neutral-400 opacity-80 flex items-center justify-center">
          <RiseLoader color="#028A0f" />
        </div>
      </>}

      {/* Whole Content Page */}
      <div className='grid place-content-center h-lvh'>
        <div className="h-[35rem] w-96 shadow-xl border sm:py-5 sm:px-8 rounded-xl">
          <Stockform symbols={stockSymbols} setLoading={setLoading} />
        </div>
      </div>


    </>
  )
}

export default App
