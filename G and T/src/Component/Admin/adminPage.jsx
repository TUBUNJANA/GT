import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../Dashboard/Spinner";
import LOGO from "../../assets/GT Logo Flat.png";

function MyComponent() {
  const fileInputRef = useRef(null);
  const [showFileUploadModal, setShowFileUploadModal] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [approveModal, setApproveModal] = useState(false);
  const [allApprovedProject, setaAllApprovedProject] = useState([]);
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [employeeModal, setEmployeeModal] = useState(false);

  const [statusValue, setStatusValue] = useState("");
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [jsonData, setJsonData] = useState(null);
  let body = {
    Status: "",
    AssignedProjectId: "",
    ProjectId: "",
    Phase: "",
    Role: "",
  };

  const handleFileUpload = async (event) => {
    const file = fileInputRef.current.files[0]; // Assuming single file upload
    if (file) {
      setShowFileUploadModal((p) => !p);
      setShowSpinner(true);
      const reader = new FileReader();

      reader.onload = async (event) => {
        const fileContent = event.target.result;
        try {
          const parsedData = JSON.parse(fileContent);
          setJsonData(parsedData);
          const dataToSend = parsedData;
          console.log("Set data is = " + JSON.stringify(dataToSend));
          await axios
            .post(
              "http://localhost:5000/api/auth/projectCreation",
              parsedData,
              {
                headers,
              }
            )
            .then(async (response) => {
              console.log(
                "The return data  id of allAssignedProject = " +
                  JSON.stringify(response)
              );
              setShowSpinner(false);
              if (
                response.data.msg ===
                "This project are already exists!!!Try again"
              ) {
                toast.warning("This projects are already exists!!!");
              } else if (
                response.data.msg === "Project created successfull!!!"
              ) {
                toast.success("Data inserted successfull");
              }
            })
            .catch((error) => {
              console.error("Error parsing JSON:", error);
              toast.error(error);
              setShowSpinner(false);
            });
        } catch (error) {
          console.error("Error parsing JSON:", error);
          toast.error(error);
          setShowSpinner(false);
        }
      };

      reader.readAsText(file);
    } else {
      toast.error("No file selected!!");
    }
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/allAssignProject", { headers })
      .then(async (response) => {
        console.log(
          "The return data of allAssignedProject = " +
            JSON.stringify(response.data.Data[0])
        );
        setaAllApprovedProject([...response.data.Data]);
        // console.log("The data of approved = " + allApprovedProject[0]);
      })
      .catch((error) => {
        console.log("The error is = " + JSON.stringify(error));
        toast.error("Something went wrong.");
      });
  }, []);
  const onClickSubmit = (e) => {
    axios
      .put("http://localhost:5000/api/auth/updateStatus", body, { headers })
      .then(async (response) => {
        console.log(
          "The return data of update assign project status is = " +
            JSON.stringify(response)
        );
        if (response.data.message === "Status updated successfully") {
          toast.success("Status updated successfully");
        } else if (
          response.data.message ===
          "This project is already assigned to some one"
        ) {
          toast.warning("This project is already assigned to some one");
        }
      })
      .catch((error) => {
        console.log(
          "The error is on update assign project   = " + JSON.stringify(error)
        );
        toast.error("Something went wrong.");
      });
  };

  return (
    <div className="m-2 ">
      <div className="mb-5 ">
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
      </div>
      <div className="m-4">
        <div>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            title="Upload project file"
            onClick={() => {
              setShowFileUploadModal((p) => !p);
            }}
          >
            Upload File
          </button>
        </div>
        <div>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            title="Upload project file"
            onClick={() => {
              setApproveModal((p) => !p);
            }}
          >
            Approve Applied Projects
          </button>
        </div>
      </div>
      {approveModal && (
        <div>
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4  pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75" />
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" />
              <div className="inline-block align-bottom bg-white rounded-lg px-4  pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full sm:p-6">
                <div className="text-center py-2">
                  <h3>All Applied Projects</h3>
                </div>
                <div
                  method="dialog"
                  className="overflow-y-auto items-center justify-center"
                >
                  <div className=" ">
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
                          {/* <th scope="col" className="px-6 py-3">
                            EST HRS{" "}
                          </th>
                          <th scope="col" className="px-6 py-3">
                              ACT HRS
                            </th>
                            <th scope="col" className="px-6 py-3">
                              REM HRS
                            </th> */}
                          <th scope="col" className="px-6 py-3">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {allApprovedProject.length != 0
                          ? allApprovedProject
                              // .filter((item) => {
                              //   return filterValue === "All"
                              //     ? item
                              //     : item.Status.includes(filterValue);
                              // })
                              // .filter((item) => {
                              //   return search.toLowerCase() === ""
                              //     ? item
                              //     : item.projectDetails.Name.toLowerCase().includes(
                              //         search.toLowerCase()
                              //       );
                              // })
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
                                                  // onClick={(e) => {
                                                  //   setShowDetailsModal(
                                                  //     true
                                                  //   );
                                                  //   setDetailsModalData(
                                                  //     [
                                                  //       {
                                                  //         Project:
                                                  //           element.projectDetails,
                                                  //         Phase:
                                                  //           element1,
                                                  //         Role: element2,
                                                  //       },
                                                  //     ]
                                                  //   );
                                                  // }}
                                                  >
                                                    {
                                                      element.projectDetails
                                                        .Name
                                                    }
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
                                                {/* <td className="px-6 py-4 text-black">
                                                      {element2.EstimatedHours}
                                                    </td>
                                                    <td className="px-6 py-4 text-black">
                                                      {element2.ActualHours}
                                                    </td>
                                                    <td className="px-6 py-4 text-black">
                                                      {element2.RemainingHours}
                                                    </td> */}
                                                <td className="px-6 py-4 text-black">
                                                  <select
                                                    onChange={(event) => {
                                                      body.Status =
                                                        event.target.value;
                                                    }}
                                                    defaultValue={
                                                      element.Status
                                                    }
                                                    id={index}
                                                    name="pricingType"
                                                    className={
                                                      element.Status ==
                                                      "Approved"
                                                        ? "bg-green-500 rounded-md"
                                                        : element.Status ==
                                                          "Rejected"
                                                        ? "bg-red-500 rounded-md"
                                                        : "bg-orange-500 rounded-md "
                                                    }
                                                  >
                                                    <option value="Approved">
                                                      Approved
                                                    </option>
                                                    <option value="Pending">
                                                      Pending
                                                    </option>
                                                    <option value="Rejected">
                                                      Rejected
                                                    </option>
                                                  </select>
                                                </td>
                                                <td className="px-6 py-4 text-black">
                                                  <div className="flex">
                                                    <button
                                                      title="Submit"
                                                      className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-2 py-2 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                      disabled={
                                                        element.Status ===
                                                        "Approved"
                                                          ? true
                                                          : false
                                                      }
                                                      onClick={(event) => {
                                                        body.AssignedProjectId =
                                                          element._id;
                                                        body.ProjectId =
                                                          element.projectDetails._id;
                                                        body.Role =
                                                          element.Role;
                                                        body.Phase =
                                                          element.Phase;
                                                        console.log(
                                                          "The body data is = " +
                                                            JSON.stringify(body)
                                                        );
                                                        onClickSubmit();
                                                      }}
                                                      // src={Time}
                                                    >
                                                      Update
                                                    </button>
                                                    <button
                                                      onClick={() => {
                                                        setEmployeeDetails(
                                                          element.userDetails
                                                        );
                                                        setEmployeeModal(
                                                          (p) => !p
                                                        );
                                                        console.log(
                                                          "The employee details is = " +
                                                            JSON.stringify(
                                                              element.userDetails
                                                            )
                                                        );
                                                      }}
                                                      title="View Employe Details"
                                                      className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4  font-medium rounded-full text-sm px-2 py-2 text-center me-2 mb-2  "
                                                    >
                                                      Emp
                                                    </button>
                                                  </div>
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
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-1">
                  <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                    <button
                      onClick={() => setApproveModal((p) => !p)}
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
      )}

      {showFileUploadModal && (
        <div>
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4  pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75" />
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" />
              <div className="inline-block align-bottom bg-white rounded-lg px-4  pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div className=" sm:items-start">
                  <div method="dialog" className="w-full size-max py-2">
                    <div className=" text-center gap-5 w-full">
                      <h2 className="text-2xl font-semibold ">
                        Upload Project File
                      </h2>
                    </div>
                    <p className="text-center text-xs text-gray-500">
                      File should be of .json
                    </p>
                  </div>
                  <div className="">
                    <div className=" ">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".json"
                        id="file-upload"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                      <label
                        htmlFor="file-upload"
                        className="z-20 flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer"
                      >
                        <p className="z-10 text-xs font-light text-center text-gray-500">
                          Drag & Drop your files here
                        </p>
                        <svg
                          className="z-10 w-8 h-8 text-indigo-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
                        </svg>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-1">
                  <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                    <button
                      onClick={() => {
                        handleFileUpload();
                      }}
                      type="button"
                      className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    >
                      Upload
                    </button>
                  </span>

                  <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                    <button
                      onClick={() => setShowFileUploadModal((p) => !p)}
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
      )}
      {employeeModal && (
        <div>
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4  pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75" />
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" />
              <div className="inline-block align-bottom bg-blue-50 rounded-lg px-4  pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full sm:p-6">
                <div
                  method="dialog"
                  className="overflow-y-auto items-center justify-center"
                >
                  <div className=" ">
                    <div className="bg-white border rounded-lg shadow-lg px-6 py-8 max-w-md mx-auto mt-8">
                      <h1 className="font-bold text-2xl my-4 text-center text-blue-600">
                        Employee Details
                      </h1>
                      <div className=" items-center justify-center text-center w-full">
                       
                        <img 
                          src={employeeDetails.image}
                          className="sm:size-12 size-11 justify-center"
                          alt="Employee image"
                        />
                      
                      </div>
                      <hr className="mb-2" />
                      <div className="flex justify-between mb-6">
                        <h1 className="text-lg font-bold">Name</h1>
                        <div className="text-gray-700">
                          <div>
                            {employeeDetails.firstName}{" "}
                            {employeeDetails.middleName}{" "}
                            {employeeDetails.lastName}
                          </div>
                        </div>
                      </div>
                      <div className="mb-8 ">
                        <h2 className="text-lg font-bold mb-4 ">Work History</h2>
                        {employeeDetails.workHistory.map((item, index) => {
                          return (
                            <div key={index} className="text-right">
                              <div className="text-gray-700 mb-1">
                                {item.company}
                              </div>
                              <div className="text-gray-700 mb-1">
                                {item.designation}
                              </div>
                              <div className="text-gray-700 mb-1">
                                {item.from} to {item.to}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="mb-8">
                        <h2 className="text-lg font-bold mb-4 ">
                          Current Employeer
                        </h2>
                        <div className="text-right">
                          <div className="text-gray-700 mb-1">
                            {employeeDetails.currentEmployer}
                          </div>
                          <div className="text-gray-700 mb-1">
                            {employeeDetails.jobTitle}
                          </div>
                          <div className="text-gray-700 mb-1">
                            {employeeDetails.employmentStartDate}
                          </div>
                        </div>
                      </div>

                      <div className="mb-8">
                        <h2 className="text-lg font-bold mb-4">Skills</h2>
                        <div className="text-gray-700 mb-1 text-right">
                        {employeeDetails.skills.map((item, index) => {
                          return (
                            <div key={index} >
                              
                                {item.name}
                              
                            </div>
                          );
                        })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-1">
                  <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                    <button
                      onClick={() => setEmployeeModal((p) => !p)}
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
      )}
      <div></div>

      {showSpinner ? <Spinner /> : null}
    </div>
  );
}

export default MyComponent;
