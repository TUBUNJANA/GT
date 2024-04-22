import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Table({ data }) {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  console.log("the data of prop is = " + JSON.stringify(data));

  const handleProjectAssignment = (event) => {
    const data = JSON.parse(event.target.id);
    axios
      .post(
        "http://localhost:5000/api/auth/assignedProject",
        {
          projectDetails: data.Project,
          loggedDateHours: [],
          Role: data.Role,
          Phase: data.Phase,
        },
        { headers }
      )
      .then((response) => {
        // const id = response.data.msg._id;
        console.log(
          "The return data  id of user = " + JSON.stringify(response)
        );

        if (response.data.msg === "Already applied!") {
          toast.warning("Already Applied!");
        } else if (response.data.msg === "Succussfully Applied!") {
          toast.success("Succussfully Applied!");
        }
      })
      .catch((error) => {
        console.log("The error is = " + JSON.stringify(error), error.status);
        toast.error("Something went wrong.");
      });
    console.log("The button click data is = " + JSON.stringify(data));
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-8 pb-8">
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
              Est Hrs
            </th>

            <th scope="col" className="px-6 py-3">
              START DATE
            </th>
            <th scope="col" className="px-6 py-3">
              EST END DATE
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>

        {data.map((element) =>
          element.Phase.map((element2) =>
            element2.Role.map((element3) => (
              <tbody key={element.Id}>
                <tr
                  key={element._id}
                  className="bg-gray-100 border-b border-white hover:bg-gray-200"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-blue-100"
                  >
                    {element.Name}
                  </th>
                  <td className="px-6 py-4 text-black">{element2.Name}</td>
                  <td className="px-6 py-4 text-black">{element3.Name}</td>
                  <td className="px-6 py-4 text-black">
                    {element.EstimatedHours}
                  </td>
                  <td className="px-6 py-4 text-black">{element.StartDate}</td>
                  <td className="px-6 py-4 text-black">{element.EndDate}</td>

                  <td className="px-6 py-4 text-black">
                    <div className="flex gap-1">
                      <button
                      disabled={element3.isRoleAssigned?true:false}
                        id={JSON.stringify({
                          Project: element._id,
                          Phase: element2.Name,
                          Role: element3.Name,
                        })}
                        className={element3.isRoleAssigned?"text-whitew-20 py-1 px-3 rounded border bg-green-400 font-thin transition transform ":"text-whitew-20 py-1 px-3 rounded border border-yellow-400 bg-yellow-400 hover:bg-yellow-500 shadow hover:shadow-lg font-thin transition transform hover:-translate-y-0.5"}
                        onClick={handleProjectAssignment}
                      >
                       {element3.isRoleAssigned?"Applyed":"Apply"}
                      </button>
                      <Link
                        to="/ProjectDetailPage"
                        state={[
                          {
                            Project: element,
                            Phase: element2,
                            Role: element3,
                          },
                        ]}
                      >
                        <button className="text-whitew-20 py-1 px-3 border border-sky-800 rounded bg-transparent hover:bg-gray-200 shadow hover:shadow-lg font-thin transition transform hover:-translate-y-0.5">
                          More Info
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>

                <tr key={element.Id} className="border-white"></tr>
              </tbody>
            ))
          )
        )}
      </table>
    </div>
  );
}

Table.propTypes = {
  data: PropTypes.array, // Define the 'data' prop as an array and mark it as required
};

export default Table;
