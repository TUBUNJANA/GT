import React from "react";
import { useState, useEffect } from "react";
import LOGO from "../../assets/GT Logo Flat.png";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

function ProjectDetail() {
  const location = useLocation();
  const Detail = location.state || {};
  if (Detail) {
    console.log("The project Name = " + JSON.stringify(Detail[0].Role));
  } else {
    // Handle the case where no project data is passed
  }

  useEffect(() => {}, []);
  return (
    <div>
      <div className="font-[sans-serif] bg-white">
        <div className="p-6 lg:max-w-7xl max-w-4xl mx-auto">
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
                className="w-52 h-16"
              ></img>
            </div>
            <div>
              <p className="pl-2">
                POWERED BY <b>ChikPea™</b>
              </p>
            </div>
          </div> */}

          <div className="mt-16 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
            <h3 className="text-lg font-bold text-[#333]">
              Project information
            </h3>
            <ul className="mt-6 space-y-6 text-[#333]">
              <li className="text-sm">
                Name{" "}
                <span className="ml-4 float-right">
                  {Detail[0].Project.Name}
                </span>
              </li>
              <li className="text-sm">
                Phase{" "}
                <span className="ml-4 float-right">{Detail[0].Phase.Name}</span>
              </li>
              <li className="text-sm">
                YOUR POSITION/ROLE{" "}
                <span className="ml-4 float-right">{Detail[0].Role.Name}</span>
              </li>
              <li className="text-sm">
                ESTIMATED HOURS
                <span className="ml-4 float-right">
                  {Detail[0].Project.EstimatedHours}
                </span>
              </li>
              <li className="text-sm">
                ACTUAL HOURS{" "}
                <span className="ml-4 float-right">
                  {Detail[0].Project.ActualHours}
                </span>
              </li>
              <li className="text-sm">
                REMAINING HOURS
                <span className="ml-4 float-right">
                  {Detail[0].Project.RemainingHours}
                </span>
              </li>
              <li className="text-sm">
              PROPOSAL STATUS
                <span className="ml-4 float-right">
                  {Detail[0].Project.Status}
                </span>
              </li>
              <li className="text-sm">
                Project Start Date{" "}
                <span className="ml-4 float-right">
                  {Detail[0].Project.StartDate}
                </span>
              </li>
              <li className="text-sm">
                Project End Date{" "}
                <span className="ml-4 float-right">
                  {Detail[0].Project.EndDate}
                </span>
              </li>
              <li className="text-sm">
              Description{" "}
                <span className="ml-4 float-right">
                  {Detail[0].Project.Description}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

ProjectDetail.propTypes = {
  Project: PropTypes.object, // Define the 'data' prop as an array and mark it as required
  Phase: PropTypes.object,
  Role: PropTypes.object,
};

export default ProjectDetail;
