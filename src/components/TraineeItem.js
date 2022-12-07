import { useState } from 'react';
import TraineeDetail from './TraineeDetail'
import { TbListDetails } from 'react-icons/tb';

const TraineeItem = ({ data }) => {

    const [showModal, setShowModal] = useState(false)

    return (
        <>
            {showModal && <TraineeDetail ssn={data[0]} setShowModal={setShowModal} />}
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {data[0]}
                </th>
                <td className="py-4 px-6">
                    {data[1]}
                </td>
                <td className="py-4 px-6">
                    {data[2]}
                </td>
                <td className="py-4 px-6">
                    {data[4]}
                </td>
                <td className="py-4 px-6">
                    {data[3]}
                </td>
                <td className="py-4 px-6">
                    <button onClick={() => setShowModal(true)}>
                        <TbListDetails className="text-xl hover:text-black transition duration-200" />
                    </button>
                </td>
            </tr>
        </>
    )
}

export default TraineeItem