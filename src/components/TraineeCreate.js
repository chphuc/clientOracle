import { useState, useEffect } from 'react'
import axios from 'axios';
import { GrFormClose } from 'react-icons/gr';
import { BsCalendarDate } from 'react-icons/bs';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TraineeCreate = ({ setShowCreate }) => {

    const [data, setData] = useState({
        ssn: '',
        firstname: '',
        lastname: '',
        company: 'C001',
        day: '',
        month: '',
        year: '',
        image: '',
        phone: '',
        address: '',
    })

    const [company, setCompany] = useState([])

    const handleChange = (e) => {
        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const errCreate = (mess) => toast.error(`${mess}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const successCreate = () => toast.success('Create success!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const handleCreate = () => {
        if (!data.firstname || !data.lastname || !data.ssn || !data.day || !data.month || !data.year || !data.image || !data.phone || !data.address) {
            errCreate('Missing data!')
            return
        }
        axios.post('http://localhost:5000/createtrainee', data)
            .then(res => {
                if (res.data.errCode != 0) {
                    errCreate(res.data.mess)
                }
                else {
                    successCreate()
                    setShowCreate(false)
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    useEffect(() => {
        axios.get('http://localhost:5000/getallcompany')
            .then(res => {
                setCompany(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])
    return (
        <>
            <div className="fixed top-0 right-0 left-0 z-50 w-screen h-screen bg-opacity-30 bg-gray-600">
                <div className="w-full h-full flex justify-center">
                    <div className="bg-white rounded-lg shadow p-4 w-2/5 h-fit mt-16">
                        <div className="flex justify-end">
                            <button onClick={() => setShowCreate(false)}>
                                <GrFormClose className="text-2xl" />
                            </button>
                        </div>
                        <div className="overflow-y-auto">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    SSN
                                </label>
                                <input
                                    name="ssn"
                                    value={data.ssn}
                                    onChange={handleChange}
                                    type="number"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4 flex justify-between items-center">
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        First Name
                                    </label>
                                    <input
                                        name="firstname"
                                        value={data.firstname}
                                        onChange={handleChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Last Name
                                    </label>
                                    <input
                                        name="lastname"
                                        value={data.lastname}
                                        onChange={handleChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Company
                                    </label>
                                    <select name="company" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        {company.map(item => (
                                            <option key={item[0]} value={item[0]}>{item[1]}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="w-1/3">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Day
                                    </label>
                                    <div className="mb-4 relative">
                                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                            <BsCalendarDate />
                                        </div>
                                        <input
                                            name="day"
                                            value={data.day}
                                            min="1" max="31"
                                            onChange={handleChange}
                                            type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="[1-31]"
                                        />
                                    </div>
                                </div>
                                <div className="w-1/3 mx-2">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Month
                                    </label>
                                    <div className="mb-4 relative">
                                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                            <BsCalendarDate />
                                        </div>
                                        <input
                                            name="month"
                                            value={data.month}
                                            min="1" max="12"
                                            onChange={handleChange}
                                            type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="[1-12]"
                                        />
                                    </div>
                                </div>
                                <div className="w-1/3">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Year
                                    </label>
                                    <div className="mb-4 relative">
                                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                            <BsCalendarDate />
                                        </div>
                                        <input
                                            name="year"
                                            value={data.year}
                                            min="1997" max="2004"
                                            onChange={handleChange}
                                            type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="[1997-2004]"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Image URL
                                </label>
                                <input
                                    name="image"
                                    value={data.image}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Phone
                                </label>
                                <input
                                    name="phone"
                                    value={data.phone}
                                    onChange={handleChange}
                                    type="number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Address
                                </label>
                                <input
                                    name="address"
                                    value={data.address}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button onClick={handleCreate} type="button" className="mb-4 inline-block px-6 py-2.5 bg-gray-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out">Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TraineeCreate