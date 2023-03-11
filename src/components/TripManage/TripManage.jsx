import axios from 'axios'
import React, { useEffect, useState } from 'react'
import url from '../../api/Api'
import dateFormat from 'dateformat'
import ReactPaginate from 'react-paginate'

const TripManage = () => {
    const [trips, setTrips] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [pageCount, setPageCount] = useState(0)
    const [isOpen, setIsOpen] = useState(false);
    const [currentList, setCurrentList] = useState("Filter");
    const [filterTrips, setFilterTrips] = useState([])

    const getTrips = async (page) => {
        setIsLoading(true)
        const { data } = await axios.get(`${url}/api/admin/trips?page=${page}`)
        setTrips(data.trips)
        setFilterTrips(data.trips)
        setPageCount(data.pageCount)
        setIsLoading(false)
    }

    const changePage = ({ selected }) => {
        getTrips(selected);
    }

    useEffect(() => {
        getTrips(0)
    }, [])

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClick = (list) => {
        setIsOpen(false);
        setCurrentList(list);
        setIsLoading(true)
        setFilterTrips(trips.filter((trip) => list == 'Finished' ? trip.finished == true : trip.finished == false))
        setIsLoading(false)
    };

    return (
        <section>
            {trips?.length > 0 ?
                <div className="overflow-x-auto">
                    <div className="flex justify-between py-3 pl-2">
                        <div className="relative max-w-xs">
                            <label htmlFor="hs-table-search" className="sr-only">
                                Search
                            </label>
                            <input
                                type="text"
                                name="hs-table-search"
                                id="hs-table-search"
                                className="block w-full p-3 pl-10 text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                                placeholder="Search..."
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                <svg
                                    className="h-3.5 w-3.5 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </div>
                        </div>

                        <button
                            id="dropdownDefaultButton"
                            data-dropdown-toggle="dropdown"
                            className="focus:ring-2 flex justify-between focus:ring-gray-400 border-gray-200 border  font-poppins font-medium rounded-lg text-sm px-4 py-2.5 text-center  items-center"
                            type="button"
                            onClick={toggleDropdown}
                        >
                            {currentList}
                            <svg
                                className="w-4 h-4 ml-2 "
                                aria-hidden="true"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                ></path>
                            </svg>
                        </button>
                        <div
                            id="dropdown"
                            className={`z-10 ${isOpen ? "" : "hidden"
                                } absolute right-24 top-52 bg-zinc-700 divide-y divide-gray-100 rounded-lg shadow mt-3 `}
                        >
                            <ul
                                className="py-2 text-sm text-white"
                                aria-labelledby="dropdownDefaultButton"
                            >
                                <li className='hover:text-black mb-3 py-2 px-5 hover:bg-zinc-200' onClick={() => handleClick('Finished')}>Status Finished</li>
                                <li className='hover:text-black  py-2 px-5 hover:bg-zinc-200' onClick={() => handleClick('Pending')}>Status Pending</li>
                            </ul>
                        </div>
                    </div>
                    {isLoading ? (
                        <div className="flex justify-center items-center">
                            <div className=" arc"></div>
                        </div>
                    ) : (
                        <>
                            <div className="p-1.5 w-full inline-block align-middle">
                                <div className="overflow-auto border rounded-lg">
                                    <table className="min-w-full divide-y divide-black">
                                        <thead className="bg-black">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-xs font-bold text-left text-white uppercase "
                                                >
                                                    Date
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-xs font-bold text-left text-white uppercase "
                                                >
                                                    Passenger
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-xs font-bold text-left text-white uppercase "
                                                >
                                                    Driver
                                                </th>

                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-xs font-bold text-right text-white uppercase "
                                                >
                                                    Pickup
                                                </th>

                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-xs font-bold text-right text-white uppercase "
                                                >
                                                    Dropoff
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-xs font-bold text-right text-white uppercase "
                                                >
                                                    Taxi category
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-xs font-bold text-right text-white uppercase "
                                                >
                                                    Fare
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-xs font-bold text-right text-white uppercase "
                                                >
                                                    Status
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-black">
                                            {filterTrips?.map((trip) => (
                                                <tr className="hover:bg-gray-900" key={trip._id}>
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-200 whitespace-nowrap">
                                                        {dateFormat(trip?.createAt, 'mm,d,yyyy')}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-200 whitespace-nowrap">
                                                        {trip?.sender?.name}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-200 whitespace-nowrap">
                                                        {trip?.receiver?.name}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-200 whitespace-nowrap">
                                                        {trip?.pickupLocation?.split(',')[0]}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-200 whitespace-nowrap">
                                                        {trip?.destination?.split(',')[0]}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-200 whitespace-nowrap">
                                                        {trip?.category?.name}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-200 whitespace-nowrap">
                                                        {trip?.fare}
                                                    </td>
                                                    <td
                                                        className={`px-6 py-4 text-sm  whitespace-nowrap`}
                                                    >
                                                        <h1
                                                            className={`${trip.finished
                                                                ? "text-green-500"
                                                                : "text-blue-500"
                                                                }`}
                                                        >
                                                            {trip?.finished ? "Finished" : "Pending"}
                                                        </h1>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                pageCount={pageCount}
                                onPageChange={changePage}
                                containerClassName={"paginationBttns"}
                                previousLinkClassName={"previousBttn"}
                                nextLinkClassName={"nextBttn"}
                                disabledClassName={"paginationDisabled"}
                                activeClassName={"paginationActive"}
                            />
                        </>
                    )}
                </div>
                : <div className="text-red-500 text-center">There is no data</div>}
        </section>
    )
}

export default TripManage