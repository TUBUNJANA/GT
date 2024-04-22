import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/GT Logo Flat.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../store/auth";

export default function LoginPage2() {
  const [showPassword, setshowPasswordS] = useState(true);
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const token = localStorage.getItem("token");
  const { storeTokenInLocalStorage } = useAuth();

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, []);
  const handleInput = (event) => {
    const name = event.target.id;
    const value = event.target.value;
    if (name === "checkbox") {
      setshowPasswordS(!showPassword);
    } else {
      setData({
        ...data,
        [name]: value,
      });
      // console.log(JSON.stringify(data.email.length));
    }
  };

  const handleAuthentication = (event) => {
    event.preventDefault();
    axios
      .post(import.meta.env.VITE_BACKEND_URL+"/api/auth/login", data)
      .then((data) => {
        if (data.status === 200) {
          setData({
            email: "",
            password: "",
          });
          storeTokenInLocalStorage(data.data.token);
          toast.success("Login successful!");
          // console.log("Return data is " + JSON.stringify(data));
          navigate("/home");
          // console.log("Return data is " + JSON.stringify(data.data));
          // nevigate("/Dashboard");
        }
      })
      .catch((err) => {
        toast.error("Login failed!");
        // console.log(err);
      });
  };

  return (
    <>
      {token ? (
        <></>
      ) : (
        <div className="flex  px-5 min-h-full flex-1 flex-col justify-center pt-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="mb-5  ">
              <div className="">
                <img
                  src={Logo}
                  alt="alternate_text"
                  title="image_title"
                  style={{ height: "56px" }}
                ></img>
              </div>
              <div>
                <p className="pl-2">
                  POWERED BY <b>ChikPea™</b>
                </p>
              </div>
            </div>
            <h2 className="mt-10 text-left text-4xl font-bold leading-9 tracking-tight text-gray-900">
              Log in
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              action=""
              onSubmit={handleAuthentication}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email Address
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    autoComplete="user"
                    id="email"
                    value={data.email}
                    onChange={handleInput}
                    className="bg-gray-50 border-b border-gray-500 text-gray-900 sm:text-sm rounded-full  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-lg "
                    placeholder="Enter Your Email"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2 flex gap-2">
                  <input
                    type={showPassword ? "password" : "text"}
                    id="password"
                    autoComplete="current-password"
                    onChange={handleInput}
                    className="bg-gray-50 border-b border-gray-500 text-gray-900 sm:text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-lg  rounded-full"
                    placeholder="Enter Your Password"
                  />

                  <input type="checkbox" id="checkbox" onChange={handleInput} />
                </div>
              </div>

              <div className="mb-0">
                <button
                  disabled={
                    data.email.length === 0 || data.password.length === 0
                      ? true
                      : false
                  }
                  title={
                    data.email.length === 0 || data.password.length === 0
                      ? "Fill the input"
                      : "submit"
                  }
                  type="submit"
                  className="flex w-full justify-center bg-indigo-600 px-3 py-1.5  font-bold  leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 group relative h-11 overflow-hidden rounded-full"
                >
                  Sign in
                </button>
              </div>
              <div className="space-y-0 text-sm mt-1 text-center">
                <Link
                  to="/"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>
            </form>
            <p className="mt-5 text-center text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link
                to="/registration"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                <p>Create an Account</p>
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
