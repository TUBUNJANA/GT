import { Link } from "react-router-dom";
import Profile from "../../assets/profile.svg";
import LOGO from "../../assets/GT Logo Flat.png";
import UnauthorizedPage from "../Error/UnauthorizedPage";
import axios from "axios";
import { useEffect, useState } from "react";
import Table from "./Table";
import Spinner from "./Spinner";
import Chart from "react-apexcharts";

function Dashboard() {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91, 30],
      },
      {
        name: "series-2",
        data: [3, 20, 64, 42, 55, 23, 65, 39],
      },
    ],
  });
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/allProject", { headers })
      .then((result) => {
        console.log("The value of ppm data is = " + JSON.stringify(result));
        setData(result.data.data);
        setLoading(false);
      })
      .catch((error) => {
        // console.error(JSON.stringify(error));
      });
  }, []);

  return (
    <>
      {token ? (
        <div className="items-center justify-center">
          {loading ? (
            <Spinner />
          ) : (
            <div className="">
              {/* <div className="m-5 ">
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
              <div>
                {/* <Chart
                  className="pt-12  pb-3"
                  options={chartData.options}
                  series={chartData.series}
                  type="area"
                  width="500"
                /> */}
              </div>
              <div>
                <Table data={data} />
              </div>
            </div>
          )}
        </div>
      ) : (
        <UnauthorizedPage />
      )}
    </>
  );
}

export default Dashboard;
