import React from 'react';

function PopupWindow(props) {
  return (
    <div className="popup-window">
      <h2>Information</h2>
      <p><strong>Nomenclature:</strong> {props.nomenclature}</p>
      <p><strong>Product:</strong> {props.product}</p>
      <p><strong>Quantity:</strong> {props.quantity}</p>
      <p><strong>Labor Intensity per Hour:</strong> {props.laborIntensity}</p>
      <p><strong>Customer:</strong> {props.customer}</p>
      <p><strong>Productivity (%):</strong> {props.productivity}</p>
      <p><strong>Cost (rubles):</strong> {props.cost}</p>
      <p><strong>Plan Date:</strong> {props.planDate}</p>
      <p><strong>Actual Date:</strong> {props.actualDate}</p>
      <p><strong>Procurement:</strong> {props.purchase}</p>
    </div>
  );
}

export default PopupWindow;
