import profile from "../../assets/profile.svg";
import project from "../../assets/project.svg";
import LOGO from "../../assets/GT Logo Flat.png";
import Review from "../../assets/review.svg";
import Calendar from "../../assets/calendar.svg";
import Gigboard from "../../assets/gigboard.svg";
import Time from "../../assets/time.svg";
import { Link } from "react-router-dom";
import UnauthorizedPage from "../Error/UnauthorizedPage";
import {useAppContext} from "../../App.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


function Dashboard2() {
  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  
  const {isTokenAvailFuntion} = useAppContext();
  useEffect(()=>{
    console.log("This is home page useEffect")
    axios
    .get("http://localhost:5000/api/auth/user", { headers })
    .then((response) => {
      isTokenAvailFuntion(response.data.msg);
    })
    .catch((error) => {
      console.log("The error is = " + JSON.stringify(error));
      toast.error("Something went wrong.");
    });
      
    
    
    console.log("This is home page useEffect 2")
  },[])
  
  return (
    <>
      {token ? (
        <div className="p-7">
          {/* <div className="mb-5 ">
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

          <div className="mb-5 items-center sm:mx-auto sm:w-full sm:max-w-sm pt-7 justify-center">
            <div className="flex gap-3 justify-center">
              <Link to="/Profile">
                <button
                  title="Profile"
                  className="bg-secondary size-36 border-secondary border rounded-2xl inline-flex items-center justify-center py-3 px-7 text-center text-base font-medium text-white bg-gray-400 hover:border-[#0BB489] disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5"
                >
                  <img
                    className="pr-2  "
                    src={profile}
                    alt="Icon"
                    width="50"
                    height="30"
                  />
                  {/* Profile */}
                </button>
              </Link>
              <button
                title="Customer Reviews"
                className="bg-secondary size-36 border-secondary border rounded-2xl inline-flex items-center justify-center py-3 px-7 text-center text-base font-medium text-white bg-gray-400 hover:border-[#0BB489] disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5"
              >
                <img
                  className="pr-2  "
                  src={Review}
                  alt="Icon"
                  width="50"
                  height="30"
                />
                {/* Customer Reviews */}
              </button>
            </div>
            <div className="flex gap-3 pt-3 justify-center">
              <Link to="/Calender">
                <button
                  title="Calender & Activities"
                  className="bg-secondary size-36 border-secondary border rounded-2xl inline-flex items-center justify-center py-3 px-7 text-center text-base font-medium text-white bg-gray-400 hover:border-[#0BB489] disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5"
                >
                  <img
                    className="pr-2  "
                    src={Calendar}
                    alt="Icon"
                    width="50"
                    height="30"
                  />
                  {/* Calender & Activities */}
                </button>
              </Link>
              <Link to="/Gigboard">
                <button
                  title="Gigboard"
                  className="bg-secondary size-36 border-secondary border rounded-2xl inline-flex items-center justify-center py-3 px-7 text-center text-base font-medium text-white bg-gray-400 hover:border-[#0BB489] disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5"
                >
                  <img
                    className="pr-2  "
                    src={Gigboard}
                    alt="Icon"
                    width="50"
                    height="30"
                  />

                  {/* Gigboard */}
                </button>
              </Link>
            </div>
            <div className="flex gap-3 pt-3 justify-center">
              <button
                title="Timesheets"
                className="bg-secondary size-36 border-secondary border rounded-2xl inline-flex items-center justify-center py-3 px-7 text-center text-base font-medium text-white bg-gray-400 hover:border-[#0BB489] disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5"
              >
                <img
                  className="pr-2  "
                  src={Time}
                  alt="Icon"
                  width="50"
                  height="30"
                />
                {/* Timesheets */}
              </button>
              <Link to="/project">
                <button
                  title="Your Project Details"
                  className="bg-secondary size-36 border-secondary border rounded-2xl inline-flex items-center justify-center py-3 px-7 text-center text-base font-medium text-white bg-gray-400 hover:border-[#0BB489] disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5"
                >
                  <img
                    className="pr-2  "
                    src={project}
                    alt="Icon"
                    width="50"
                    height="30"
                  />
                  {/* Projects */}
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <UnauthorizedPage />
      )}
    </>
  );
}

export default Dashboard2;
