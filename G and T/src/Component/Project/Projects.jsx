import React from "react";
import LOGO from "../../assets/GT Logo Flat.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Time from "../../assets/time.svg";
import { FcClock } from "react-icons/fc";



export default function Projects() {
  const [showModal, setShowModal] = React.useState(false);
  const [showDetailsModal, setShowDetailsModal] = React.useState(false);
  const [detailsModalData, setDetailsModalData] = React.useState([]);
  const [allApprovedProject, setaAllApprovedProject] = useState([]);
  const [index, setIndex] = useState({});
  const [allApprovedProjectSum, setAllApprovedProjectSum] = useState(0);
  const [allCompletedProjectSum, setAllCompletedProjectSum] = useState(0);
  const [search, setSearch] = useState("");
  const [filterValue, setFilterValue] = useState("All");
  const [showWarning, setWarning] = useState(false);
  const [projectId, setProjectId] = useState({});
  const [loggedDate, setLoggedDate] = useState("");
  const [loggedHour, setLoggedHour] = useState(0);
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/allAssignedProject", { headers })
      .then(async (response) => {
        console.log(
          "The return data  id of allAssignedProject = " +
            JSON.stringify(response)
        );
        setaAllApprovedProject([...response.data.Data]);
        // console.log("The data of approved = " + allApprovedProject[0]);
        if (response.data.Data.length === 0) {
          setWarning(true);
        } else {
          response.data.Data.map((elem) => {
            if (elem.Status === "Approved") {
              setAllApprovedProjectSum((prevCount) => prevCount + 1);
              // console.log("The data of elem = "+1)
              elem.projectDetails.Phase.map((elem_1) => {
                // console.log("The data of elem 1 = "+JSON.stringify(elem_1))
                if (elem_1.Name === elem.Phase) {
                  elem_1.Role.map((elem_2) => {
                    if (
                      elem_2.Name === elem.Role &&
                      elem_2.EstimatedHours <= elem_2.ActualHours
                    ) {
                      setAllCompletedProjectSum((prevCount) => prevCount + 1);
                    }
                  });
                }
              });
            }
          });
        }
      })
      .catch((error) => {
        console.log("The error is = " + JSON.stringify(error));
        toast.error("Something went wrong.");
      });
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Onsubmit calledd");
    console.log("project  id = " + projectId.projectDetails._id);
    console.log("logged date = " + loggedDate);
    console.log("logged  hours = " + loggedHour);
    axios
      .post(
        "http://localhost:5000/api/auth/timeLogCreation",
        {
          LoggedHours: loggedHour,
          Date: loggedDate,
          Project: projectId.projectDetails._id,
          Phase: projectId.Phase,
          Role: projectId.Role,
        },
        { headers }
      )
      .then(async (response) => {
        console.log(
          "The return data of timeLogCreation = " + JSON.stringify(response)
        );
        setShowModal(false);
        if (response.data.msg === "Timelog creared successfully") {
          toast.success(response.data.msg);
        }
      });
  };

  return (
    <>
      <div className="p-5">
        {/* <div className="m-2">
          <div
            className=""
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={LOGO}
              alt="alternate_text"
              title="image_title"
              style={{ height: "20px" }}
            ></img>
          </div>
          <div style={{ fontSize: "6px" }}>
            <p>
              POWERED BY <b>ChikPea™</b>
            </p>
          </div>
        </div> */}

        <div className="mb-5 items-center sm:mx-auto sm:w-full  pt-7 justify-center w-full">
          <div className="flex gap-3 justify-center w-full">
            <div
              title="Profile"
              className="bg-secondary items-center size-36 border-secondary border rounded-2xl justify-center py-3 px-7 text-center text-base font-medium text-white bg-sky-500 hover:border-[#0BB489] disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5"
            >
              <label>All</label>
              <p className="text-5xl pt-6">{allApprovedProjectSum}</p>
            </div>
            <div
              title="Profile"
              className="bg-secondary size-36 border-secondary border rounded-2xl  justify-center py-3 px-7 text-center text-base font-medium text-white bg-green-500 hover:border-[#0BB489] disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5"
            >
              <label htmlFor="">Completed</label>
              <p className="text-5xl pt-6">{allCompletedProjectSum}</p>
            </div>
            <div
              title="Profile"
              className="bg-secondary items-center size-36 border-secondary border rounded-2xl  justify-center py-3 px-7 text-center text-base font-medium text-white bg-orange-500 hover:border-[#0BB489] disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5"
            >
              <label htmlFor="">Pending</label>
              <p className="text-5xl pt-6">
                {allApprovedProjectSum - allCompletedProjectSum}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 m-3">
          <select
            onChange={(event) => setFilterValue(event.target.value)}
            id="pricingType"
            name="pricingType"
            className="block p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="All" defaultValue="">
              All
            </option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Project Name"
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
          <thead className="text-xs text-white uppercase bg-gray-400 border-b border-white dark:text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Phase
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                EST HRS{" "}
              </th>
              <th scope="col" className="px-6 py-3">
                ACT HRS
              </th>
              <th scope="col" className="px-6 py-3">
                REM HRS
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Log HRS
              </th>
            </tr>
          </thead>

          <tbody>
            {allApprovedProject.length != 0
              ? allApprovedProject
                  .filter((item) => {
                    return filterValue === "All"
                      ? item
                      : item.Status.includes(filterValue);
                  })
                  .filter((item) => {
                    return search.toLowerCase() === ""
                      ? item
                      : item.projectDetails.Name.toLowerCase().includes(
                          search.toLowerCase()
                        );
                  })
                  .map((element, index) =>
                    element.projectDetails.Phase.map((element1) => {
                      if (element1.Name === element.Phase) {
                        return (
                          <tr
                            key={element1._id}
                            className="bg-gray-100 border-b border-white hover:bg-gray-200"
                          >
                            {element1.Role.map((element2) => {
                              if (element2.Name === element.Role) {
                                return (
                                  <>
                                    <td
                                      title="Project Details"
                                      scope="row"
                                      className="px-6 py-4 font-medium  whitespace-nowrap text-blue-800 dark:text-blue-100"
                                    >
                                      <button
                                        onClick={(e) => {
                                          setShowDetailsModal(true);
                                          setDetailsModalData([
                                            {
                                              Project: element.projectDetails,
                                              Phase: element1,
                                              Role: element2,
                                            },
                                          ]);
                                        }}
                                      >
                                        {element.projectDetails.Name}
                                      </button>
                                    </td>
                                    <td className="px-6 py-4 text-black">
                                      {element.Phase}
                                    </td>
                                    <td
                                      key={element2._id}
                                      className="px-6 py-4 text-black"
                                    >
                                      {element.Role}
                                    </td>
                                    <td className="px-6 py-4 text-black">
                                      {element2.EstimatedHours}
                                    </td>
                                    <td className="px-6 py-4 text-black">
                                      {element2.ActualHours}
                                    </td>
                                    <td className="px-6 py-4 text-black">
                                      {element2.RemainingHours}
                                    </td>
                                    <td className="px-6 py-4 text-black">
                                      {element.Status === "Approved" ? (
                                        <>
                                          {/* <span title="Approved" className="inline-block w-3 h-3 mr-2 bg-green-600 rounded-full"></span> */}

                                          <p className="border border-stone-600 bg-green-600 rounded-md text-center">
                                            {element.Status}
                                          </p>
                                        </>
                                      ) : element.Status === "Pending" ? (
                                        <>
                                          {/* <span title="Pending" className="inline-block w-3 h-3 mr-2 bg-orange-600 rounded-full"></span> */}
                                          <p className="border border-stone-600 bg-orange-500 rounded-md text-center">
                                            {element.Status}
                                          </p>
                                        </>
                                      ) : (
                                        <>
                                          {/* <span title="Rejected" className="inline-block w-3 h-3 mr-2 bg-red-600 rounded-full"></span> */}
                                          <p className="border border-stone-600 bg-red-500 rounded-md text-center">
                                            {element.Status}
                                          </p>
                                        </>
                                      )}
                                    </td>
                                    <td className="px-6 py-4 text-black">
                                      <FcClock
                                        title="Add Log Hour"
                                        className="size-10 rounded-full hover:cursor-pointer"
                                        disabled={
                                          element.Status === "Approved"
                                            ? false
                                            : true
                                        }
                                        name={JSON.stringify(element)}
                                        id={JSON.stringify({
                                          index: index,
                                          Phase: element.Phase,
                                          Role: element.Role,
                                          ActualHours: element2.ActualHours,
                                          EstimatedHours:
                                            element2.EstimatedHours,
                                          RemainingHours:
                                            element2.RemainingHours,
                                        })}
                                        onClick={(event) => {
                                          console.log(
                                            "The id if index is = " +
                                              event.target.id
                                          );
                                          if (element.Status === "Approved") {
                                            setIndex(
                                              {
                                                index: index,
                                                Phase: element.Phase,
                                                Role: element.Role,
                                                ActualHours: element2.ActualHours,
                                                EstimatedHours:
                                                  element2.EstimatedHours,
                                                RemainingHours:
                                                  element2.RemainingHours,
                                              }
                                            );
                                            setProjectId(
                                              element
                                            );
                                            setShowModal(true);
                                          } else {
                                            if (element.Status === "Rejected") {
                                              toast.error(
                                                `Project assignment ${element.Status}.`
                                              );
                                            } else {
                                              toast.warning(
                                                `Project is on ${element.Status} state.`
                                              );
                                            }
                                          }
                                        }}
                                        
                                        alt="Time Log"
                                      />
                                    </td>
                                  </>
                                );
                              }
                            })}
                          </tr>
                        );
                      }
                    })
                  )
              : ""}
            <tr className="border-white"></tr>
          </tbody>
        </table>
      </div>
      {showWarning ? (
        <div>
          <div
            className="m-2 bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
            role="alert"
          >
            <div className="flex">
              <div className="py-1">
                <svg
                  className="fill-current h-6 w-6 text-teal-500 mr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                </svg>
              </div>
              <div>
                <p className="font-bold">
                  No project data available for your assignment.
                </p>
                <p className="text-sm">
                  We're sorry, but there is currently no data in our database
                  for the project you are assigned to.
                </p>
                <p className="text-sm">
                  Click the button below to apply for a project:
                  <Link to="/Gigboard">
                    {" "}
                    <button className="border border-black  text-sm rounded-md ml-2">
                      Apply for Project
                    </button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none m-4">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <div className="items-center justify-center w-full">
                    <h3 className="text-3xl text-center  font-semibold">
                      Add Hours
                    </h3>
                    <h1 className="text-center">Please confirm your action</h1>
                  </div>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-80 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className=" bg-transparent text-black opacity-55 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex gap-3">
                  <div>
                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed text-sky-500">
                      Est Hour{" "}
                      <span className="text-3xl text-sky-500">
                        {index.EstimatedHours}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed text-green-500">
                      Logged Hour{" "}
                      <span className="text-3xl text-green-500">
                        {index.ActualHours}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed text-orange-500">
                      Remaining{" "}
                      <span className="text-3xl text-orange-500">
                        {index.RemainingHours}
                      </span>
                    </p>
                  </div>
                </div>
                <form className="" action="" onSubmit={handleSubmit}>
                  <div className="flex justify-center  gap-2 w-full m-2">
                    <div className="">
                      <div>
                        <label>Date</label>
                      </div>
                      <div>
                        <input
                          id="dateOfLog"
                          onChange={(e) => setLoggedDate(e.target.value)}
                          type="date"
                          className="border rounded-md"
                          required={true}
                        />
                      </div>
                    </div>
                    <div className="">
                      <div>
                        <label>Hours Log</label>
                      </div>
                      <div>
                        <input
                          id="hoursOfLog"
                          onChange={(e) => setLoggedHour(e.target.value)}
                          type="number"
                          placeholder="Enter Hours"
                          className="border rounded-md w-32 text-center"
                          required={true}
                        />
                      </div>
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {showDetailsModal ? (
        <>
          <div>
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity">
                  <div className="absolute inset-0 bg-gray-500 opacity-75" />
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" />
                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                  <div className="">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 py-2">
                      Project information{" "}
                      </h3>
                      <div className="">
                        
                        {/*body*/}
                        <ul className="mt-6 space-y-3 text-[#333]">
                          <li className="text-sm">
                            Name{" "}
                            <span className="ml-4 float-right">
                              {detailsModalData[0].Project.Name}
                            </span>
                          </li>
                          <li className="text-sm">
                            Phase{" "}
                            <span className="ml-4 float-right">
                              {detailsModalData[0].Phase.Name}
                            </span>
                          </li>
                          <li className="text-sm">
                            YOUR POSITION/ROLE{" "}
                            <span className="ml-4 float-right">
                              {detailsModalData[0].Role.Name}
                            </span>
                          </li>
                          <li className="text-sm">
                            ESTIMATED HOURS
                            <span className="ml-4 float-right">
                              {detailsModalData[0].Project.EstimatedHours}
                            </span>
                          </li>
                          <li className="text-sm">
                            ACTUAL HOURS{" "}
                            <span className="ml-4 float-right">
                              {detailsModalData[0].Project.ActualHours}
                            </span>
                          </li>
                          <li className="text-sm">
                            REMAINING HOURS
                            <span className="ml-4 float-right">
                              {detailsModalData[0].Project.RemainingHours}
                            </span>
                          </li>
                          <li className="text-sm">
                            PROPOSAL STATUS
                            <span className="ml-4 float-right">
                              {detailsModalData[0].Project.Status}
                            </span>
                          </li>
                          <li className="text-sm">
                            Project Start Date{" "}
                            <span className="ml-4 float-right">
                              {detailsModalData[0].Project.StartDate}
                            </span>
                          </li>
                          <li className="text-sm">
                            Project End Date{" "}
                            <span className="ml-4 float-right">
                              {detailsModalData[0].Project.EndDate}
                            </span>
                          </li>
                          <li className="text-sm">
                            Description{" "}
                            <span className="ml-4 float-right">
                              {detailsModalData[0].Project.Description}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-1">
                   
                    <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                      <button
                        onClick={() => setShowDetailsModal((prev) => !prev)}
                        type="button"
                        className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                      >
                        Cancel
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="opacity-25 fixed inset-0 z-40 bg-black"></div> */}
        </>
      ) : (
        ""
      )}
    </>
  );
}
