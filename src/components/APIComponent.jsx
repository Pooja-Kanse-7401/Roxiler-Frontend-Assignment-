import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../Utils/aPISlice';
import Skeleton from 'react-loading-skeleton';

function APIComponent() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.APIData);

    const [currentPage, setCurrentPage] = useState(1);
    const dataPerPage = 5;
    const lastIndex = currentPage * dataPerPage;
    const firstIndex = lastIndex - dataPerPage;
    const pageData = state.products.slice(firstIndex, lastIndex);

    const npage = Math.ceil(state.products.length / dataPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    const prevPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const nextPage = () => {
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1);
        }
    };

    return pageData.length === 0 ? (
        <div className="h-[90vh] w-[100vw] flex justify-center items-center flex-col">
            <div className="h-[50vh] w-[40vw] pt-10">
                <Skeleton count={12} className="bg-gradient-to-r from-blue-100 to-blue-400 color" />
            </div>
        </div>
    ) : (
        <div className='flex justify-center items-center flex-col w-[100%]'>
            <table className='my-5 bg-blue-100 w-[80vw]'>
                <tbody className='border-2 border-blue-400'>
                    <tr className='border-2 border-blue-400'>
                        <th className='border-b-2 border-blue-400 p-2'>ID</th>
                        <th className='border-b-2 border-blue-400 p-2'>Title</th>
                        <th className='border-b-2 border-blue-400 p-2'>Description</th>
                        <th className='border-b-2 border-blue-400 p-2'>Price</th>
                        <th className='border-b-2 border-blue-400 p-2'>Category</th>
                        <th className='border-b-2 border-blue-400 p-2'>Image</th>
                    </tr>
                    {pageData.map((val, index) => (
                        <tr key={index} className='hover:bg-blue-300'>
                            <td className='border-b-2 border-blue-400 p-3'>{val.id}</td>
                            <td className='border-b-2 border-blue-400 p-3'>{val.title}</td>
                            <td className='border-b-2 border-blue-400 p-3'>{val.description}</td>
                            <td className='border-b-2 border-blue-400 p-3'>{val.price}$</td>
                            <td className='border-b-2 border-blue-400 p-3'>{val.category}</td>
                            <td className='border-b-2 border-blue-400 p-3'>
                                <img src={val.image} alt="" className='h-[10vh]' />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav>
                <ul className='flex justify-around items-center w-[30vw] ml-2'>
                    <button 
                        className='hover:bg-blue-600 font-semibold hover:text-white p-2 bg-blue-400 rounded-md' 
                        onClick={prevPage}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                    {numbers.map((num, i) => (
                        <li key={i}>
                            <button 
                                onClick={() => setCurrentPage(num)} 
                                className={`p-2  ${currentPage === num ? 'border-b-4 border-blue-600 pb-4' : ''}`} 
                            >
                                {num}
                            </button>
                        </li>
                    ))}
                    <button 
                        className='hover:bg-blue-600 font-semibold hover:text-white p-2 bg-blue-400 rounded-md' 
                        onClick={nextPage}
                        disabled={currentPage === npage}
                    >
                        Next
                    </button>
                </ul>
            </nav>
        </div>
    );
}

export default APIComponent;
