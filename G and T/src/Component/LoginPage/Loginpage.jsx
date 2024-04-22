// import React from 'react'
import { Link } from "react-router-dom";
import Logo from "/src/assets/GT Logo Flat.png";
import globe from "/src/assets/Globe.svg";

function Loginpage() {
  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center my-20">
        <div className=" mx-auto pb-10">
          <div>
            <img
              src={Logo}
              alt="alternate_text"
              title="image_title"
              style={{height:"56px"}}
            ></img>
          </div>
          <div >
            <p className="pl-2">
              POWERED BY <b>ChikPea™</b>
            </p>
          </div>
        </div>
        <div className="mx-auto pl-9">
          <img
            src={globe}
            alt="alternate_text"
            title="image_title"
            style={{ width: "320px" }}
          ></img>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm pt-7">
          <div>
            <Link to="/loginPage2">
              <button
                type="submit"
                className="flex mx-auto h-11 w-40 justify-center  rounded-full bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm"
              >
                <p className="">Login</p>
              </button>
            </Link>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Don&apos;t have an account?
          </p>
          <p className="text-center text-sm text-gray-500">
            <Link
              to="/registration"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              <p>Create an Account</p>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Loginpage;
