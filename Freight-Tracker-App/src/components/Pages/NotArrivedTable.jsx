import React from "react";

function NotArrivedTable({ orders }) {
  const shippedOrders = orders.filter((order) => order["Ship Confirm"] === "Missing Event");

  const shippedOrdersDisplay = shippedOrders.map((order) => (
    <tr key={order["Pick Number"]} scope="row">
      <td>{order["Customer Info"]}</td>
      <td>{order["Order #"]}</td>
    </tr>
  ));

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col">Customer Name</th>
            <th scope="col">Order Number</th>
          </tr>
        </thead>
        <tbody>{shippedOrdersDisplay}</tbody>
      </table>
    </div>
  );
}

export default NotArrivedTable;
