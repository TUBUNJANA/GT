import LoginPage2 from "./Component/LoginPage/LoginPage2";
import Loginpage from "./Component/LoginPage/Loginpage";
import Registration from "./Component/Registration/Registration1";
import Error from "./Component/Error/ErrorPage";
// import Registration2 from "./Component/Registration/Registration2";
import Adamtest from "./Adamtest";
import Gigboard from "./Component/Dashboard/Gigboard";
import Calender from "./Component/Calender And Activities/Calender";
import ProjectPage from "./Component/Project/Projects";
import ProjectDetailPage from "./Component/Project/ProjectDetail";
import Home from "./Component/Dashboard/Dashboard2";
import Profile from "./Component/Profile/Profile";
import AdminPage from "./Component/Admin/adminPage";
import Pdf from "./Component/PDF/ShowCV";
import LOGO from "./assets/GT Logo Flat.png";
import { CgProfile } from "react-icons/cg";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import LogOut from "./Component/LoginPage/LogOut";
import { createContext, useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaSortDown } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";

const AppContext = createContext();
function App() {
  const [isTokenAvail, setTokenAvail] = useState(false);
  const [userDtails, setUserDetails] = useState({});
  const dropdownRef = useRef(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    if (token) {
      setTokenAvail(true);
      axios
        .get("http://localhost:5000/api/auth/user", { headers })
        .then((response) => {
          setUserDetails(response.data.msg);
        });
    } else {
      setTokenAvail(false);
    }

    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on cleanup
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isTokenAvailFuntion = (userData) => {
    console.log("hiiiii");
    setTimeout(() => {
      if (localStorage.getItem("token")) {
        setTokenAvail(true);
        setUserDetails(userData);
      } else {
        setTokenAvail(false);
        setUserDetails({});
      }
    }, 0.001);
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Router>
        {isTokenAvail && (
          <>
            {/* Main navigation container */}
            <nav className="flex-no-wrap relative flex w-full items-center justify-between bg-zinc-50 py-2 shadow-dark-mild dark:bg-neutral-700 lg:flex-wrap lg:justify-start lg:py-4">
              <div className="flex w-full flex-wrap items-center justify-between px-3">
                {/* Hamburger button for mobile view */}
                <button
                  className="block border-0 bg-transparent px-2 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
                  type="button"
                  data-twe-collapse-init=""
                  data-twe-target="#navbarSupportedContent1"
                  aria-controls="navbarSupportedContent1"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  {/* Hamburger icon */}
                  <span className="[&>svg]:w-7 [&>svg]:stroke-black/50 dark:[&>svg]:stroke-neutral-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
                {/* Collapsible navigation container */}
                <div
                  className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
                  id="navbarSupportedContent1"
                  data-twe-collapse-item=""
                >
                  {/* Logo */}
                  <a
                    className="mb-4 me-5 ms-2 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0"
                    href="#"
                  >
                    <div className="w-full pt-2">
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
                    {/* <img
            src="https://tecdn.b-cdn.net/img/logo/te-transparent-noshadows.webp"
            style={{ height: 15 }}
            alt="TE Logo"
            loading="lazy"
          /> */}
                  </a>
                  {/* Left navigation links */}
                  <ul
                    className="list-style-none me-auto flex flex-col ps-0 lg:flex-row"
                    data-twe-navbar-nav-ref=""
                  >
                    <li
                      className="mb-4 lg:mb-0 lg:pe-2"
                      data-twe-nav-item-ref=""
                    >
                      {/* Dashboard link */}
                      <a
                        className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                        href="#"
                        data-twe-nav-link-ref=""
                      >
                        Dashboard
                      </a>
                    </li>
                    {/* Team link */}
                    <li
                      className="mb-4 lg:mb-0 lg:pe-2"
                      data-twe-nav-item-ref=""
                    >
                      <a
                        className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                        href="#"
                        data-twe-nav-link-ref=""
                      >
                        Team
                      </a>
                    </li>
                    {/* Projects link */}
                    <li
                      className="mb-4 lg:mb-0 lg:pe-2"
                      data-twe-nav-item-ref=""
                    >
                      <a
                        className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                        href="#"
                        data-twe-nav-link-ref=""
                      >
                        Projects
                      </a>
                    </li>
                  </ul>
                  {/* Left links */}
                </div>
                {/* Right elements */}
                <div className="relative flex items-center">
                  {/* Icon */}
                  <a className="me-4 text-neutral-600 dark:text-white" href="#">
                    <span className="[&>svg]:w-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                      </svg>
                    </span>
                  </a>
                  {/* First dropdown container */}
                  <div
                    className="relative"
                    data-twe-dropdown-ref=""
                    data-twe-dropdown-alignment="end"
                  >
                    {/* First dropdown trigger */}
                    <a
                      className="me-4 flex items-center text-neutral-600 dark:text-white"
                      href="#"
                      id="dropdownMenuButton1"
                      role="button"
                      data-twe-dropdown-toggle-ref=""
                      aria-expanded="false"
                    >
                      {/* Dropdown trigger icon */}
                      <span className="[&>svg]:w-5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      {/* Notification counter */}
                      <span className="absolute -mt-4 ms-2.5 rounded-full bg-danger px-[0.35em] py-[0.15em] text-[0.6rem] font-bold leading-none text-white">
                        1
                      </span>
                    </a>
                    {/* First dropdown menu */}
                    <ul
                      className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg data-[twe-dropdown-show]:block dark:bg-surface-dark"
                      aria-labelledby="dropdownMenuButton1"
                      data-twe-dropdown-menu-ref=""
                    >
                      {/* First dropdown menu items */}
                      <li>
                        <a
                          className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                          href="#"
                          data-twe-dropdown-item-ref=""
                        >
                          Action
                        </a>
                      </li>
                      <li>
                        <a
                          className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                          href="#"
                          data-twe-dropdown-item-ref=""
                        >
                          Another action
                        </a>
                      </li>
                      <li>
                        <a
                          className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                          href="#"
                          data-twe-dropdown-item-ref=""
                        >
                          Something else here
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* Second dropdown container */}
                  <div
                    className="relative"
                    data-twe-dropdown-ref=""
                    data-twe-dropdown-alignment="end"
                  >
                    {/* Second dropdown trigger */}
                    <Link to="/Profile">
                      {" "}
                      <button className="items-end" title="User Details">
                        {" "}
                        <img
                          style={{ height: 25, width: 25 }}
                          src={
                            userDtails
                              ? userDtails.image
                              : "https://docs.material-tailwind.com/img/face-2.jpg"
                          }
                          alt="avatar"
                          className="relative inline-block h-12 w-12 !rounded-full object-cover object-center float-end"
                        />
                      </button>
                    </Link>
                    <div>
                      <p>
                        {userDtails.firstName}{" "}
                        <FaSortDown
                          className="float-end cursor-pointer"
                          onClick={toggleDropdown}
                        />
                      </p>
                    </div>
                    {isOpen && (
                      <div
                        ref={dropdownRef}
                        className=" origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <div className="py-1" role="none">
                          <Link
                            to="/Profile"
                            onClick={() => setIsOpen(!isOpen)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                          >
                            <div className="flex gap-1">
                              <CgProfile className="justify-center align-middle" />
                              Your Profile
                            </div>
                          </Link>
                          <Link
                            to="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                          >
                            <div className="flex gap-1">
                              <CiSettings />
                              Settings
                            </div>
                          </Link>
                          <Link
                            to="/LogOut"
                            onClick={() => setIsOpen(!isOpen)}
                            className="block  px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                            role="menuitem"
                          >
                            <div className="flex gap-1">
                              <CiLogout />
                              Sign out
                            </div>
                          </Link>
                        </div>
                      </div>
                    )}
                    {/* Second dropdown menu */}
                    <ul
                      className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg data-[twe-dropdown-show]:block dark:bg-surface-dark"
                      aria-labelledby="dropdownMenuButton2"
                      data-twe-dropdown-menu-ref=""
                    >
                      {/* Second dropdown menu items */}
                      <li>
                        <a
                          className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                          href="#"
                          data-twe-dropdown-item-ref=""
                        >
                          Action
                        </a>
                      </li>
                      <li>
                        <a
                          className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                          href="#"
                          data-twe-dropdown-item-ref=""
                        >
                          Another action
                        </a>
                      </li>
                      <li>
                        <a
                          className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                          href="#"
                          data-twe-dropdown-item-ref=""
                        >
                          Something else here
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Right elements */}
              </div>
            </nav>
          </>

          // <div className=" w-full p-2 ">
          //   <div className="w-full flex ">
          //     <div className="w-full pt-2">
          //       <div
          //         className=""
          //         style={{
          //           alignItems: "center",
          //           justifyContent: "center",
          //         }}
          //       >
          //         <img
          //           src={LOGO}
          //           alt="alternate_text"
          //           title="image_title"
          //           style={{ height: "20px" }}
          //         ></img>
          //       </div>
          //       <div style={{ fontSize: "6px" }}>
          //         <p>
          //           POWERED BY <b>ChikPea™</b>
          //         </p>
          //       </div>
          //     </div>
          //     <div className="items-end  text-end tex w-full">
          //       <Link to="/Profile">
          //         {" "}
          //         <button className="items-end" title="User Details">
          //           {" "}
          //           <img
          //             src={
          //               userDtails
          //                 ? userDtails.image
          //                 : "https://docs.material-tailwind.com/img/face-2.jpg"
          //             }
          //             alt="avatar"
          //             className="relative inline-block h-12 w-12 !rounded-full object-cover object-center float-end"
          //           />
          //         </button>
          //       </Link>
          //       <div>
          //       <p>{userDtails.firstName}{" "} <FaSortDown className="float-end cursor-pointer" onClick={toggleDropdown} /></p>
          //       </div>
          // {isOpen && (
          //   <div
          //     ref={dropdownRef}
          //     className=" origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          //     role="menu"
          //     aria-orientation="vertical"
          //     aria-labelledby="options-menu"
          //   >
          //     <div className="py-1" role="none">
          //       <Link
          //         to="/Profile"
          //         onClick={() => setIsOpen(!isOpen)}
          //         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          //         role="menuitem"
          //       >
          //         Your Profile
          //       </Link>
          //       <a
          //         href="#"
          //         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          //         role="menuitem"
          //       >
          //         Settings
          //       </a>
          //       <Link
          //         to="/LogOut"
          //         onClick={() => setIsOpen(!isOpen)}
          //         className="block  px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
          //         role="menuitem"
          //       >
          //         Sign out
          //       </Link>
          //     </div>
          //   </div>
          // )}
          //     </div>
          //   </div>
          // </div>
        )}
        <AppContext.Provider value={{ isTokenAvailFuntion }}>
          <Routes>
            <Route exact path="/" element={<Loginpage />} />
            <Route exact path="/loginPage2" element={<LoginPage2 />} />
            <Route exact path="/adamtest" element={<Adamtest />} />
            <Route exact path="/registration" element={<Registration />} />
            <Route exact path="/Gigboard" element={<Gigboard />} />
            <Route exact path="/Pdf" element={<Pdf />} />
            <Route exact path="/Calender" element={<Calender />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/adminPage" element={<AdminPage />} />
            <Route
              exact
              path="/ProjectDetailPage"
              element={<ProjectDetailPage />}
            />
            <Route exact path="/project" element={<ProjectPage />} />
            <Route exact path="/LogOut" element={<LogOut />} />
            <Route exact path="/Profile" element={<Profile />} />
            <Route exact path="*" element={<Error />} />
          </Routes>
        </AppContext.Provider>
      </Router>
    </>
  );
}

export const useAppContext = () => useContext(AppContext);
export default App;
