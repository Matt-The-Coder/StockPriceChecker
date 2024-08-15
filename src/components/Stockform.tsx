import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Resultbox } from './Resultbox';

// PROPS
interface stockProps {
    symbols: String[],
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}


export const Stockform: React.FC<stockProps> = ({ symbols, setLoading }) => {
    const API_KEY = import.meta.env.VITE_API_KEY // API KEY

    const [inputSymbol, setInputSymbol] = useState('')
    const [stockDetails, setStockDetails] = useState({ c: 0, h: 0, l: 0 })

    // Function for getting stock prices
    const getStockPrices = async () => {
        try {
            setLoading(true)
            const result = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${inputSymbol}&token=${API_KEY}`)
            const details = result.data
            setStockDetails(details)
            setLoading(false)
            console.log(details)
        } catch (error) {
            setLoading(false)
            console.log('Error in retrieving data', error)
        }
    }
    useEffect(() => {
        getStockPrices()
    }, [inputSymbol])

    return (
        <div className="stock-for">
            <div className="flex flex-col items-center gap-5">
                <img className=" w-24 h-24 object-contain" src="/logo.jpg" alt="" />
                <h1 className="font-bold text-xl">Real-Time Stock Price Checker</h1>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={symbols}
                    onChange={(e, newValue) => {
                        newValue ? setInputSymbol(newValue.toString()) : e
                    }}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Stock Symbol"
                    />} />
                <Resultbox details={stockDetails} />
            </div>
        </div>
    )
}