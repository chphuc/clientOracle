import { useState, useEffect } from 'react'
import axios from 'axios';
import { GrFormClose } from 'react-icons/gr';

const TraineeAchievement = ({ ssn, setShowAchievement }) => {
    const [data, setData] = useState([])
    const [dataYear, setDataYear] = useState([])
    const [valueYearCur, setValueYearCur] = useState()
    // Get All SeaSon When Comp Mount
    useEffect(() => {
        axios.get('http://localhost:5000/getallseason')
            .then(res => {
                setDataYear(res.data);
                setValueYearCur(res.data[0][0]);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])
    // FetchData When Year Change
    useEffect(() => {
        axios.post('http://localhost:5000/gettraineeresult', { ssn: ssn, year: valueYearCur })
            .then(res => {
                setData(res.data[0][0]);
            })
            .catch(err => {
                console.log(err);
            })
    }, [valueYearCur])
    return (
        <div className="fixed top-0 right-0 left-0 z-50 w-screen h-screen bg-opacity-30 bg-gray-600">
            <div className="w-full h-full flex justify-center ">
                <div className="my-auto bg-white rounded-lg shadow p-4">
                    <div className="flex justify-end">
                        <button onClick={() => setShowAchievement(false)}>
                            <GrFormClose className="text-2xl" />
                        </button>
                    </div>
                    <div className="flex">
                        <div className="mr-4">
                            <select onChange={(e) => setValueYearCur(e.target.value)} className="bg-gray-50 py-2 px-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full">
                                {dataYear.map(item => (
                                    <option key={item[0]} value={item[0]}>{item[0]}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="py-3 px-6">
                                            Episode
                                        </th>
                                        <th scope="col" class="py-3 px-6">
                                            Num of votes/ avg score
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map(item => (
                                        <tr key={item.EPISODE} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th class="text-center py-4 px-6 font-medium text-gray-900">
                                                {item.EPISODE}
                                            </th>
                                            <td class="text-center py-4 px-6 font-medium text-gray-900">
                                                {item.NUM_OF_VOTES || "NULL"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TraineeAchievement