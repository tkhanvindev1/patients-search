import React from "react";
import "./ToggleSwitchBtn.css";
import "/Users/vinhnguyen/Documents/DevMountain/f25/javascript drill/patients-app/src/ToggleSwitchBtn/ToggleSwitchBtn.css";

const ToggleSwitch = (props) => {
  const handleChange = () => {
    return !props.state? props.setStatus(true) : props.setStatus(false)
};
  
  return (
    <label className="toggle">
      <input
        className="toggle__input"
        type="checkbox"
        id="switchBtn"
        onClick={handleChange}
      />
      <div className="toggle__fill"></div>
    </label>
  );
};

export default ToggleSwitch;
