// import { useEffect, useState } from "react";
// import "../../App.css";
// import {
//   ScheduleComponent,
//   Day,
//   Week,
//   WorkWeek,
//   Month,
//   Agenda,
//   Inject,
// } from "@syncfusion/ej2-react-schedule";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Calender = () => {
//   const [savedScheduleData, setSavedScheduleData] = useState([{}]);
//   const [dataId, setId] = useState("");
// const token = localStorage.getItem("token");

// const headers = {
//   Authorization: `Bearer ${token}`,
// };

//   const handleDataChange = (args) => {
//     const className = args.event.target.className;
//     console.log("the class name = " + className);
//     console.log("Data come from event = " + JSON.stringify(args.data));
//     try {
//       if (args.data._id) {
//         setId(args.data._id);
//       }
//     } catch (error) {
//       console.log("error");
//     }
//     if (
//       className ===
//       "e-schedule-dialog e-control e-btn e-lib e-primary e-event-save e-flat"
//     ) {
//       if (dataId) {
//   const newStateObject = {
//     ...args.data,
//     _id: dataId,
//   };
//   axios
//     .put(
//       "http://localhost:5000/api/auth/updateSchedule",
//       newStateObject,
//       {
//         headers,
//       }
//     )
//     .then((response) => {
//       console.log(
//         "The return data from server after update is = " +
//           JSON.stringify(response)
//       );
//       toast.success(response.data.msg);
//     })
//     .catch((error) => {
//       console.log(
//         "The error on handleDataChange is = " + JSON.stringify(error)
//       );
//     });
//   console.log("Data updated = " + JSON.stringify(newStateObject));
// } else {
//     const newStateObject = {
//       Id: savedScheduleData.length + 1,
//       Subject: args.data.Subject,
//       Location: args.data.Location,
//       StartTime: args.data.StartTime,
//       EndTime: args.data.EndTime,
//       Description: args.data.Description,
//       RecurrenceRule: args.data.RecurrenceRule,
//       IsAllDay: args.data.IsAllDay,
//       StartTimezone: args.data.StartTimezone,
//       EndTimezone: args.data.EndTimezone,

//     };

//     axios
//       .post(
//         "http://localhost:5000/api/auth/createSchedule",
//         newStateObject,
//         {
//           headers,
//         }
//       )
//       .then((response) => {
//         console.log(
//           "The return data from server after save is = " +
//             JSON.stringify(response)
//         );
//         toast.success(response.data.msg);
//       })
//       .catch((error) => {
//         console.log(
//           "The error on create schedule logic is = " + JSON.stringify(error)
//         );
//       });
//     console.log("newStateObject = " + JSON.stringify(newStateObject));
//   }
// }
//     else if(className==="e-quick-dialog e-control e-btn e-lib e-quick-alertok e-flat e-primary e-quick-dialog-delete"){
//       console.log("Token = "+JSON.stringify(headers));
//       const newStateObject = {
//         ...args.data,
//         _id: dataId,
//       };
//       console.log("newStateObject = " + JSON.stringify(newStateObject));
//       axios
//           .delete(
//             "http://localhost:5000/api/auth/deleteSchedule",
//             {
//               headers:headers,
//               data:newStateObject
//             }
//           )
//           .then((response) => {
//             console.log(
//               "The return data from server after deleted is = " +
//                 JSON.stringify(response)
//             );
//             toast.success(response.data.msg);
//           })
//           .catch((error) => {
//             console.log(
//               "The error on deleted condition is = " + JSON.stringify(error)
//             );
//           });

//       console.log("Schedule deleted");
//     }
//   };

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/auth/retriveSchedule", { headers })
//       .then((response) => {
//         setSavedScheduleData(response.data.scheduleData);
//         console.log(
//           "The return data from schedule fatching is = " +
//             JSON.stringify(response.data.scheduleData)
//         );
//       })
//       .catch((error) => {
//         console.log("The error is on useEffect = " + JSON.stringify(error));
//       });
//   }, []);

//   const eventSettings = { dataSource: savedScheduleData };
//   return (
//     <div className="m-10 mt-20">
//       <ScheduleComponent
//         popupClose={handleDataChange}
//         eventSettings={eventSettings}
//       >
//         <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
//       </ScheduleComponent>
//     </div>
//   );
// };

// export default Calender;

import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const localizer = momentLocalizer(moment);

const events = [];
const components = {
  event: (props) => {
    return (
      <div className="m-3 rounded-md p-2" style={{ background: "#fbfff4" }}>
        <div>
          <p>
            Title: <strong>{props?.event?.title}</strong>
          </p>
        </div>
        <div>
          <p>
            Location: <strong>{props?.event?.location}</strong>
          </p>
        </div>
        <div>
          <p>
            Description: <strong>{props?.event?.description}</strong>
          </p>
        </div>
      </div>
    );
  },
};

const Calender = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({
    id: "",
    title: "",
    start: "",
    end: "",
    description: "",
    location: "",
  });

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const handleDataEvent = (event) => {
    console.dir(event);
    setData({
      id: event.id ? event.id : "",
      title: event.title ? event.title : "",
      start: event.start ? event.start : "",
      end: event.end ? event.end : "",
      description: event.description ? event.description : "",
      location: event.location ? event.location : "",
    });
    setShowModal((prev) => {
      return !prev;
    });
    console.log("description is = " + event.description);
    console.log("description is = " + data.description);
  };
  const onSaveClick = (e) => {
    const buttonLabel = e.target.textContent;
    setShowModal((prev) => !prev);
    if (buttonLabel === "Save") {
      const newStateObject = {
        
      };

      axios
        .post(import.meta.env.VITE_BACKEND_URL+"/api/auth/createSchedule", newStateObject, {
          headers,
        })
        .then((response) => {
          console.log(
            "The return data from server after save is = " +
              JSON.stringify(response)
          );
          toast.success(response.data.msg);
        })
        .catch((error) => {
          console.log(
            "The error on create schedule logic is = " + JSON.stringify(error)
          );
        });
      console.log("newStateObject = " + JSON.stringify(newStateObject));
    } else if (buttonLabel === "Update") {
      const newStateObject = {
        Subject: data.title,
      Location: data.location,
      StartTime: moment(data.start).toDate(),
      EndTime: moment(data.end).toDate(),
      Description: data.description,
      _id: data.id,
      };
      axios
        .put(import.meta.env.VITE_BACKEND_URL+"/api/auth/updateSchedule", newStateObject, {
          headers,
        })
        .then((response) => {
          console.log(
            "The return data from server after update is = " +
              JSON.stringify(response)
          );
          toast.success(response.data.msg);
        })
        .catch((error) => {
          console.log(
            "The error on handleDataChange is = " + JSON.stringify(error)
          );
        });
      console.log("Data updated = " + JSON.stringify(newStateObject));
    }

    
  };
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL+"/api/auth/retriveSchedule", { headers })
      .then((response) => {
        // setSavedScheduleData(response.data.scheduleData);

        response.data.scheduleData.map((element, index) => {
          const schedules = {
            id: element._id,
            description: element.Description,
            location: element.Location,
            title: element.Subject,
            start: moment(element.StartTime).toDate(),
            end: moment(element.EndTime).toDate(),
          };
          events.push(schedules);
        });

        console.log(
          "The return data from schedule fatching is = " +
            JSON.stringify(response.data.scheduleData)
        );
        console.log("The value of events is = " + JSON.stringify(events));
      })
      .catch((error) => {
        console.log("The error is on useEffect = " + JSON.stringify(error));
      });
  }, []);
  const onDelete = (e) => {
    setShowModal((prev) => !prev);
    const newStateObject = {
      Subject: data.title,
      Location: data.location,
      StartTime: moment(data.start).toDate(),
      EndTime: moment(data.end).toDate(),
      Description: data.description,
      RecurrenceRule: "",
      IsAllDay: false,
      StartTimezone: "",
      EndTimezone: "",
      _id: data.id,
    };
    axios
      .delete(import.meta.env.VITE_BACKEND_URL+"/api/auth/deleteSchedule", {
        headers: headers,
        data: newStateObject,
      })
      .then((response) => {
        console.log(
          "The return data from server after deleted is = " +
            JSON.stringify(response)
        );
        toast.success(response.data.msg);
      })
      .catch((error) => {
        console.log(
          "The error on deleted condition is = " + JSON.stringify(error)
        );
      });

    console.log("Schedule deleted");
  };

  return (
    <>
      <div className="m-4">
        <BigCalendar
          onDoubleClickEvent={handleDataEvent}
          onSelectSlot={({ start, end }) => {
            setShowModal((prev) => !prev);
            setData({ start: start, end: end });
            console.log("the start and end date is =" + start, end);
          }}
          onview={"month"}
          views={["day", "week", "month", "work_week", "agenda"]}
          // max={moment("2024-04-15T18:00:00").toDate()}
          // min={moment("2024-04-15T01:00:00").toDate()}
          selectable
          components={components}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          localizer={localizer}
        />
      </div>
      {showModal && (
        <div>
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75" />
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" />
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div className="sm:flex sm:items-start">
                  {/* <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-green-600"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div> */}
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 py-2">
                      Create an event{" "}
                    </h3>
                    <div className="">
                      <form method="dialog" className="">
                        <div className="flex flex-col gap-5 w-72">
                          <div className="relative w-full min-w-[200px] h-10">
                            <input
                              className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
                              placeholder=" "
                              type="text"
                              name="Event Name"
                              defaultValue={data.title ? data.title : ""}
                              onChange={(e) => {
                                setData((prev) => ({
                                  ...prev,
                                  title: e.target.value,
                                }));
                              }}
                            />
                            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500">
                              Event Name
                            </label>
                          </div>
                          <div className="relative w-full min-w-[200px] h-10">
                            <input
                              className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-purple-500"
                              placeholder=" "
                              defaultValue={data.location ? data.location : ""}
                              type="text"
                              name="Event location "
                              onChange={(e) => {
                                setData((prev) => ({
                                  ...prev,
                                  location: e.target.value,
                                }));
                              }}
                            />
                            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-purple-500 before:border-blue-gray-200 peer-focus:before:!border-purple-500 after:border-blue-gray-200 peer-focus:after:!border-purple-500">
                              Location
                            </label>
                          </div>
                          <div className="relative w-full min-w-[200px] h-10">
                            <input
                              className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-indigo-500"
                              placeholder=" "
                              type="text"
                              name="Event satrt date "
                              defaultValue={data.start ? data.start : ""}
                              onChange={(e) => {
                                setData((prev) => ({
                                  ...prev,
                                  start: e.target.value,
                                }));
                              }}
                            />
                            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-indigo-500 before:border-blue-gray-200 peer-focus:before:!border-indigo-500 after:border-blue-gray-200 peer-focus:after:!border-indigo-500">
                              Start Date
                            </label>
                          </div>
                          <div className="relative w-full min-w-[200px] h-10">
                            <input
                              className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-teal-500"
                              placeholder=" "
                              defaultValue={data.end ? data.end : ""}
                              type="text"
                              name="Event end date "
                              onChange={(e) => {
                                setData((prev) => ({
                                  ...prev,
                                  end: e.target.value,
                                }));
                              }}
                            />
                            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-teal-500 before:border-blue-gray-200 peer-focus:before:!border-teal-500 after:border-blue-gray-200 peer-focus:after:!border-teal-500">
                              End Date
                            </label>
                          </div>
                          <div className="relative w-full min-w-[200px] h-10">
                            <textarea
                              className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-teal-500"
                              placeholder=" "
                              name="Description"
                              rows="3"
                              cols="35"
                              defaultValue={
                                data.description ? data.description : ""
                              }
                              onChange={(e) => {
                                setData((prev) => ({
                                  ...prev,
                                  description: e.target.value,
                                }));
                                console.log(data.description);
                              }}
                            ></textarea>
                            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-teal-500 before:border-blue-gray-200 peer-focus:before:!border-teal-500 after:border-blue-gray-200 peer-focus:after:!border-teal-500">
                              Description
                            </label>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-1">
                  <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                    <button
                      onClick={onSaveClick}
                      type="button"
                      className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    >
                      {data.id ? "Update" : "Save"}
                    </button>
                  </span>
                  <span className="flex  w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                    <button
                      onClick={onDelete}
                      type="button"
                      className={
                        data.id
                          ? "inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                          : "hidden"
                      }
                    >
                      Delete
                    </button>
                  </span>
                  <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                    <button
                      onClick={() => setShowModal((prev) => !prev)}
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

          {/* <div id="my_modal_1" className="modal rounded-md bg">
          <div className="modal-box w-11/12 max-w-5xl m-1">
            <div className="modal-action">
              <form method="dialog" className="size-max p-5">
                <div className="text-right justify-end items-end">
                  <button
                    title="Cancel"
                    className="  rounded-lg    m-1 text-sm "
                  >
                    X
                  </button>
                </div>
                <div className="mt-10 mb-10 text-center  gap-5">
                  <div className="flex gap-5 m-1">
                    <label htmlFor="Event Name ">Event Name</label>
                    <input
                      type="text"
                      name="Event Name"
                      className="border"
                      defaultValue={data.title ? data.title : ""}
                      onChange={(e)=>{
                        setData((prev)=>(
                          {...prev,title:e.target.value}
                        ))
                      }}
                    />
                  </div>
                  <div className="flex gap-5 m-1">
                    <label htmlFor="Event location ">Location </label>
                    <input
                      defaultValue={data.location ? data.location : ""}
                      type="text"
                      name="Event location "
                      className="border"
                      onChange={(e)=>{
                        setData((prev)=>(
                          {...prev,location:e.target.value}
                        ))
                      }}
                    />
                  </div>
                  <div className="flex gap-5 m-1">
                    <label htmlFor="Event start date ">Start Date </label>
                    <input
                      type="text"
                      name="Event satrt date "
                      className="border"
                      defaultValue={data.start ? data.start : ""}
                      onChange={(e)=>{
                        setData((prev)=>(
                          {...prev,start:e.target.value}
                        ))
                      }}
                    />
                  </div>
                  <div className="flex gap-5 m-1">
                    <label htmlFor="Event end date ">End Date </label>
                    <input
                      defaultValue={data.end ? data.end : ""}
                      type="text"
                      name="Event end date "
                      className="border"
                      onChange={(e)=>{
                        setData((prev)=>(
                          {...prev,end:e.target.value}
                        ))
                      }}
                    />
                  </div>
                  <div className="flex gap-5 m-1">
                    <label htmlFor="">Description</label>
                    <textarea
                      name="Description"
                      rows="3"
                      cols="35"
                      className="border"
                      defaultValue={data.description ? data.description : ""}
                      onChange={(e)=>{
                        // console.log(data.description);
                        setData((prev)=>(
                          {...prev,description:e.target.value}
                        ))
                      }}
                    ></textarea>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    // onClick={handleFileUpload}
                    className="border border-gray-950 bg-green-500  rounded-md  p-2 "
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div> */}
        </div>
      )}
    </>
  );
};

export default Calender;

// export default Calender;
