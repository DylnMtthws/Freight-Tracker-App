import React from 'react'

function NotDeliveredTable({ orders }) {
  const notDeliveredOrders = orders.filter((order) => order["Delivered Date"] === "Missing Event");

  const notDeliveredOrdersDisplay = notDeliveredOrders.map((order) => (
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
        <tbody>{notDeliveredOrdersDisplay}</tbody>
      </table>
    </div>
  )
}

export default NotDeliveredTable