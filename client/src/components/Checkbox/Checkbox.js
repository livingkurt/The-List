// React
import React, { useState } from "react";
// Styles
import './checkbox.css'


function Checkbox() {
  const [checkboxState, setCheckboxState] = useState({
    checkbox: false,
    backgroundColor: "white"
  })

  const handle_checkbox = () => {

    if (checkboxState.checkbox === false) {
      setCheckboxState({ ...checkboxState, checkbox: true })
      setCheckboxState({ ...checkboxState, backgroundColor: "red" })
      console.log({ "false": checkboxState })
    }
    if (checkboxState.checkbox === true) {
      setCheckboxState({ ...checkboxState, checkbox: false })
      setCheckboxState({ ...checkboxState, backgroundColor: "white" })
      console.log({ "true": checkboxState })
    }

  }

  return (
    <div>
      {/* <input type="checkbox" className="checkbox" /> */}
      {/* <button
        style={{ backgroundColor: checkboxState.backgroundColor }}
        onClick={() => handle_checkbox()}
        className="checkbox"></button> */}
      <label>
        <input type='checkbox' />
        <span></span>
      </label>
    </div>
  );
}

export default Checkbox;


// return (
//   <div>
//     {/* <input type="checkbox" className="checkbox" /> */}
//     {/* <button
//       style={{ backgroundColor: checkboxState.backgroundColor }}
//       onClick={() => handle_checkbox()}
//       className="checkbox"></button> */}
//     <div class="card">
//       <div class="checkbox-container">
//         <label class="checkbox-label" />
//         <input type="checkbox" />
//         <span class="checkbox-custom rectangular"></span>
//         <div class="input-title">Rectangular</div>
//       </div>
//       <div class="checkbox-container circular-container">
//         <label class="checkbox-label" />
//         <input type="checkbox" />
//         <span class="checkbox-custom circular"></span>
//         <div class="input-title">Circular</div>
//       </div>
//     </div>
//   </div>
// );