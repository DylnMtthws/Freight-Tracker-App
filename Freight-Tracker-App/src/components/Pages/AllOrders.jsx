import React from "react";

function AllOrders({ orders }) {
  const allOrdersDisplay = orders.map((order) => (
    <tr key={order["Pick Number"]} scope="row">
      <td>{order["Customer Info"]}</td>
      <td>{order["Order #"]}</td>
      <td>{order["Pick Number"]}</td>
      <td>{order["Carrier"]}</td>
      <td>{order["Ship Confirm"]}</td>
      <td>{order["Arrived at Carrier"]}</td>
      <td>{order["Scheduled Date"]}</td>
      <td>{order["Delivered Date"]}</td>
    </tr>
  ));

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col">Customer Name</th>
            <th scope="col">Order Number</th>
            <th scope="col">Pick Number</th>
            <th scope="col">Carrier</th>
            <th scope="col">Ship Confirm</th>
            <th scope="col">Arrived at Carrier</th>
            <th scope="col">Scheduled Date</th>
            <th scope="col">Delivered Date</th>
          </tr>
        </thead>
        <tbody>{allOrdersDisplay}</tbody>
      </table>
    </div>
  );
}

export default AllOrders;
