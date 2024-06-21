import React from 'react'
import { Link } from 'react-router-dom'

function Instutitions() {
    return (

        <>
        <h1 className='text-center text-black text-xl capitalize mb-4'>Instutitions</h1>
        <div className="flex justify-between mb-4">
          <div></div>
          <Link to="/" className="px-4 py-2 bg-purple-400 text-white rounded-full hover:bg-gray-500 hover:text-white">Add Instution</Link>
        </div>
  
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  type
                </th>
                <th scope="col" className="px-6 py-3">
                  Created_date
                </th>
                {/* <th scope="col" className="px-6 py-3">
                  Price
                </th> */}
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Apple MacBook Pro 17"
                </th>
                <td className="px-6 py-4">
                  Silver
                </td>
                <td className="px-6 py-4">
                  Laptop
                </td>
                {/* <td className="px-6 py-4">
                  $2999
                </td> */}
                <td className="flex gap-4 px-6 py-4">
                  <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>
                </td>
              </tr>
              {/* Other rows can be added here */}
            </tbody>
          </table>
        </div>
      </>

    )
}

export default Instutitions
