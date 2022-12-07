import { useState, useEffect } from 'react'
import axios from 'axios';
import { GrFormClose } from 'react-icons/gr';
import { BiDetail } from 'react-icons/bi';

import TraineeAchievement from './TraineeAchievement'

const TraineeDetail = ({ ssn, setShowModal }) => {

    const [data, setData] = useState([])
    const [showAchievement, setShowAchievement] = useState(false)
    useEffect(() => {
        axios.post('http://localhost:5000/gettraineedetail', {
            value: ssn
        })
            .then(res => {
                setData(res.data[0]);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <>
            {showAchievement && <TraineeAchievement ssn={ssn} setShowAchievement={setShowAchievement} />}
            <div className="fixed top-0 right-0 left-0 z-40 w-screen h-screen bg-opacity-30 bg-gray-600">
                <div className="w-full h-full flex justify-center py-10">
                    <div className="bg-white rounded-lg shadow p-4 w-2/3">
                        <div className="flex justify-end">
                            <button onClick={() => { setShowModal(false) }}>
                                <GrFormClose className="text-2xl" />
                            </button>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-1 mr-5">
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        SSN
                                    </label>
                                    <input value={data[0]} disabled className="shadow disabled:bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        First Name
                                    </label>
                                    <input value={data[1]} disabled className="shadow disabled:bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Last Name
                                    </label>
                                    <input value={data[2]} disabled className="shadow disabled:bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>
                            </div>
                            <div>
                                <img className="w-56 rounded" src={data[5]} />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Phone
                            </label>
                            <input value={data[3]} disabled className="shadow disabled:bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Address
                            </label>
                            <input value={data[4]} disabled className="shadow disabled:bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Number of seasons participating
                            </label>
                            <input value={data[6]} disabled className="shadow disabled:bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Best achievement (last episode joining in a season)
                            </label>
                            <div className="flex items-center relative">
                                <input value={data[7]} disabled className="shadow disabled:bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                <button onClick={() => setShowAchievement(true)} className="absolute top-0 right-0 text-xl p-2">
                                    <BiDetail />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TraineeDetail