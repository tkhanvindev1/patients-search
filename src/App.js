import "./App.css";
import { useState, useEffect } from "react";
import ToggleSwitchBtn from "./ToggleSwitchBtn/ToggleSwitchBtn.js";

export default function App() {
  const [data, setData] = useState(null);
  const [patientList, setPatientList] = useState([]);
  const [toggleStatus, setToggleStatus] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [patientsCount, setPatientsCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);

  //Getting data from API
  useEffect(() => {
    let url = "https://interviews-qa.chooseserenity.com";
    const getData = () => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((error) => {
          console.log("It's an error " + error);
        });
    };
    getData();
  }, []);

  //render total counter
  useEffect(() => {
    if (data !== null) {
      const total = data.patients;
      const onlyPatients = total.filter((users) => !users.is_admin);
      const onlyAdmins = total.filter((users) => users.is_admin);
      setTotalCount(total.length);
      setPatientsCount(onlyPatients.length);
      setAdminCount(onlyAdmins.length);
    } else {
      console.log("Loading");
    }
  }, [data]);

  //rendering users a respond using toggleBtn as a condition to filter
  useEffect(() => {
    if (data !== null) {
      const users = data.patients;
      const hideAdmin = users.filter((patient) => !patient.is_admin);
      !toggleStatus ? renderPatientList(hideAdmin) : renderPatientList(users);
    } else {
      console.log("Loading");
    }
  }, [data, toggleStatus]);

  // search filter function
  const searchPatient = (searchResult) => {
    const filteredData = data.patients.filter(
      (patients) =>
        patients.first_name
          .toLowerCase()
          .includes(searchResult.toLowerCase()) ||
        patients.last_name.toLowerCase().includes(searchResult.toLowerCase())
    );
    renderPatientList(filteredData);
  };

  // render users function
  function renderPatientList(data) {
    const users = data;
    const patientDiv = (users) => {
      return users.map((user) => {
        const { first_name, last_name, image_url, is_admin } = user;
        const id = users.indexOf(user);
        const userStatus = () => (is_admin ? "Admin" : "Patient");
        return (
          <div className="patient-div" key={id}>
            <div>
              <img src={image_url}></img>
              <h3 className="user-status">{userStatus()}</h3>
            </div>
            <div>
              <div className="patient-name">
                First Name: <span id="patient-firstname">{first_name}</span>
              </div>
              <div className="patient-name">
                Last Name: <span id="patient-lastname"></span>
                {last_name}
              </div>
            </div>
          </div>
        );
      });
    };
    setPatientList(patientDiv(users));
  }

  return (
    <div className="App">
      <div id="search-bar" style={{ fontWeight: "500" }}>
        Search By name:
        <input
          icon="search"
          placeholder="First Last"
          onChange={(e) => searchPatient(e.target.value)}
          style={{ marginLeft: "10px" }}
        ></input>
      </div>
      <div id="total-count" style={{ fontSize: "22px", fontWeight: "500" }}>
        <p>Result:{totalCount}</p>
        <p>Patients:{patientsCount}</p>
        <p>Admins:{adminCount}</p>
      </div>
      <div id="toggleBtn">
        <div>Include Admins</div>
        <ToggleSwitchBtn state={toggleStatus} setStatus={setToggleStatus} />
      </div>
      <div id="list-container">{patientList}</div>
    </div>
  );
}
