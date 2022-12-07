import { useState, useEffect } from 'react'
import TraineeItem from './TraineeItem';
import TraineeDetail from './TraineeDetail'
import TraineeCreate from './TraineeCreate'
import axios from 'axios';

import { BiSearch } from 'react-icons/bi';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Trainee = () => {
    const [data, setData] = useState([])
    const [valueSearch, setValueSearch] = useState('')
    const [showCreate, setShowCreate] = useState(false)

    const fetchData = () => {
        if (!valueSearch.length) {
            axios.get('http://localhost:5000/getalltrainee')
                .then(res => {
                    setData(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        else {
            axios.post('http://localhost:5000/searchtrainee', {
                value: valueSearch
            })
                .then(res => {
                    setData(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('user');
    }

    // When Value Search Change
    useEffect(() => {
        fetchData()
    }, [valueSearch])
    // When On/Off Create Modal
    useEffect(() => {
        fetchData()
    }, [showCreate])

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {showCreate && <TraineeCreate setShowCreate={setShowCreate} />}
            <div className="grid grid-cols-12 gap-4 pt-4 h-screen overflow-y-auto">
                <div className="col-span-2 text-center px-4 flex flex-col justify-between">
                    <div>
                        <button onClick={() => setShowCreate(true)} type="button" className="w-full mb-4 inline-block px-6 py-2.5 bg-gray-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out">Create new trainee</button>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <BiSearch />
                            </div>
                            <input
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search by name"
                                value={valueSearch}
                                onChange={(e) => setValueSearch(e.target.value)}
                            />
                        </div>
                    </div>
                    <button onClick={handleLogout} type="button" className="w-full mb-4 inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-500 transition duration-150 ease-in-out">Logout</button>
                </div>
                <div className="overflow-x-auto relative col-span-10">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="py-3 px-6">
                                    SSN
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    First Name
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Last Name
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Phone
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Address
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Detail
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <TraineeItem key={item[0]} data={item} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Trainee