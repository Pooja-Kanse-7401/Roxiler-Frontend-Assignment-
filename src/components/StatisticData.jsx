import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../Utils/aPISlice';

function StatisticData() {
    const [changeMonth, setChangeMonth] = useState(''); 
    const [total, setTotal] = useState(0); 
    const dispatch = useDispatch();
    const state = useSelector((state) => state.APIData); 
    // console.log("New state : " , state.products)

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    
    const handleMonth = (e) => {
        const selectedMonth = e.target.value;
        setChangeMonth(selectedMonth); 
    };

    
    const soldItems = state.products.filter((product) => product.sold === true);
    // console.log("Sold Items : ", soldItems)

    
    const filteredSoldItems = changeMonth
        ? soldItems.filter((product) => {
            // console.log("Products : ",product)
            const productMonth = new Date(product.dateOfSale).getMonth() + 1;
            // console.log("productMonth : ", productMonth)
           
            return productMonth === Number(changeMonth); 
        })
        : soldItems; 

   
    const soldItemsLength = filteredSoldItems.length;
    const leftItems = state.products.filter((product) => product.sold === false).length;

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

 
    useEffect(() => {
        if (state.status === 'succeeded') {
            const totalVal = filteredSoldItems.reduce((acc, product) => acc + product.price, 0);
            setTotal(totalVal); 
        }
    }, [filteredSoldItems, state.status]);

    return (
        <>
            <div className='h-[50vh] w-[90vw] md:w-[45vw] bg-blue-200 rounded-md flex justify-center items-start ml-2 m-5 pl-5 flex-col'>
                <div className='text-2xl font-bold flex justify-start md:items-center items-start flex-col md:flex-row'>
                    <span className='flex justify-start items-center'>
                        Statistic - 
                        <select
                            name=""
                            id=""
                            onChange={handleMonth}
                            className='bg-transparent outline-none w-[55%] text-2xl'
                        >
                            <option value="" disabled>Select Month</option>
                            {months.map((month, index) => (
                                <option key={index} value={index + 1}>
                                    {month}
                                </option>
                            ))}
                        </select>
                    </span>
                    <span className='text-xs font-normal'>(Selected month name from dropdown)</span>
                </div>

                <div className='flex justify-between items-center mt-5 h-[30%] md:w-[45%] w-[60%] rounded-md p-2 bg-blue-400'>
                    <ul>
                        <li>Total Sale</li>
                        <li>Total sold items</li>
                        <li>Total unsold items</li>
                    </ul>
                    <ul>
                        <li>{total ? `$${total}` : '$0'}</li>
                        <li>{soldItemsLength}</li>
                        <li>{leftItems}</li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default StatisticData;
