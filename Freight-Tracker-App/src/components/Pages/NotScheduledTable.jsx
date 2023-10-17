import React from 'react'

function NotScheduledTable({ orders }) {
  const notScheduledOrders = orders.filter((order) => order["Scheduled Date"] === "Missing Event");

  const notScheduledOrdersDisplay = notScheduledOrders.map((order) => (
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
        <tbody>{notScheduledOrdersDisplay}</tbody>
      </table>
    </div>
  )
}

export default NotScheduledTable