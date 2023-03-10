import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import url from "../../api/Api";
import { setShowModal } from "../../redux/Slices/ModalSlice";
import Modal from "./Modal";
import ReactPaginate from "react-paginate";

const DriverManage = () => {
  const dispatch = useDispatch();
  const { showModal } = useSelector((state) => state.modal);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0)
  const [drivers, setDrivers] = useState([]);
  const [driver, setDriver] = useState({});

  const getDrivers = async () => {
    const { data } = await axios.get(`${url}/api/admin/driver`);
    setDrivers(data.drivers);
  };

  useEffect(() => {
    getDrivers();
  }, [isLoading]);

  const usersPerPage = 4;
  const pageVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(drivers.length / usersPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  }

  const onClickHandler = (driver) => {
    dispatch(setShowModal());
    setDriver(driver);
  };

  const updateUser = async (id, block) => {
    setIsLoading(true);
    await axios.patch(`${url}/api/admin/driver?id=${id}&block=${block}`);
    toast.success(`${block ? "User Unblocked" : "User Blocked"}`);
    setIsLoading(false);
  };

  const deleteAcc = async (id) => {
    setIsLoading(true);
    const { data } = await axios.delete(`${url}/api/admin/driver?id=${id}`);
    data.status && toast.success("successfully deleted");
    setIsLoading(false);
  };

  const displayRows = drivers?.slice(pageVisited, pageNumber + usersPerPage)
    .map((driver) => {
      return (
        <tr
          className="hover:bg-gray-900"
        // onClick={() => onClickHandler(driver)}
        >
          <td className="px-6 py-4 text-sm font-medium text-gray-200 whitespace-nowrap">
            {driver.name}
          </td>
          <td className="px-6 py-4 text-sm text-gray-200 whitespace-nowrap">
            {driver.mobile}
          </td>
          <td className="px-6 py-4 text-sm text-gray-200 whitespace-nowrap">
            {driver.email}
          </td>
          <td className="px-6 py-4 text-sm text-gray-200 whitespace-nowrap">
            {driver.available ? "Available" : "Unavailable"}
          </td>
          <td className={`px-6 py-4 text-sm  whitespace-nowrap`}>
            <h1
              className={`${driver.block ? "text-red-500" : "text-green-500"
                }`}
            >
              {driver?.block ? "Inactive" : "Active"}
            </h1>
          </td>
          <td className="px-6 py-4 text-sm text-gray-200 whitespace-nowrap">
            <h1
              onClick={() => updateUser(driver._id, driver.block)}
            >
              {driver?.block ? "Unblock" : "Block"}
            </h1>
          </td>
          <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
            <a
              className="text-red-500 hover:text-red-700"
              href="#"
              onClick={() => deleteAcc(driver._id)}
            >
              Delete
            </a>
          </td>
        </tr>
      )
    })

  return (
    <section>
      {showModal && <Modal driver={driver} />}
      <div className="flex flex-col">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className=" arc"></div>
          </div>
        ) : drivers.length > 0 ? (
          <div className="overflow-x-auto">
             <div className="p-1.5 w-full inline-block align-middle">
              <div className="overflow-auto border rounded-lg">
                <table className="min-w-full divide-y divide-black">
                  <thead className="bg-black">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-white uppercase "
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-white uppercase "
                      >
                        Mobile
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-white uppercase "
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-right text-white uppercase "
                      >
                        Avialable
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-right text-white uppercase "
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-right text-white uppercase "
                      >
                        Action
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-right text-white uppercase "
                      >
                        delte
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black">
                    {displayRows}
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
          </div>
        ) : (
          <div className="text-red-500 text-center">There is no data</div>
        )}
      </div>
    </section>
  );
};

export default DriverManage;
