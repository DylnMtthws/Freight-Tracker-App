import React, { useState, useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";

function NotArrivedTable({ orders }) {
  const notArrivedOrders = orders.filter(
    (order) =>
      order["Ship Confirm"] !== "Missing Event" &&
      order["Arrived at Carrier"] === "Missing Event" &&
      order["Scheduled Date"] === "Missing Event" &&
      order["Delivered Date"] === "Missing Event"
  );

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = notArrivedOrders.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const [sortedItems, setSortedItems] = useState(currentItems);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);

  useEffect(() => {
    if (sortColumn) {
      const sorted = [...currentItems].sort((a, b) => {
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];
        if (valueA < valueB) {
          return sortDirection === "asc" ? -1 : 1;
        }
        if (valueA > valueB) {
          return sortDirection === "asc" ? 1 : -1;
        }
        return 0;
      });
      setSortedItems(sorted);
    } else {
      setSortedItems(currentItems);
    }
  }, [sortColumn, sortDirection]);

  const notArrivedOrdersDisplay = sortedItems.map((order) => (
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const indexOfLastItem = pageNumber * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);
    setSortedItems(currentItems);
  };

  const totalPages = Math.ceil(notArrivedOrders.length / itemsPerPage);
  const maxPageLinks = 20;

  let startPage = 1;
  let endPage = totalPages;

  if (totalPages > maxPageLinks) {
    const middlePage = Math.ceil(maxPageLinks / 2);
    if (currentPage > middlePage) {
      startPage = currentPage - middlePage + 1;
      endPage = currentPage + middlePage - 1;
      if (endPage > totalPages) {
        endPage = totalPages;
      }
    } else {
      endPage = maxPageLinks;
    }
  }

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  return (
    <div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col" onClick={() => handleSort("Customer Info")}>
              Customer Name
              {sortColumn === "Customer Info" && (
                <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
              )}
            </th>
            <th scope="col" onClick={() => handleSort("Order #")}>
              Order Number
              {sortColumn === "Order #" && (
                <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
              )}
            </th>
            <th scope="col" onClick={() => handleSort("Pick Number")}>
              Pick Number
              {sortColumn === "Pick Number" && (
                <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
              )}
            </th>
            <th scope="col" onClick={() => handleSort("Carrier")}>
              Carrier
              {sortColumn === "Carrier" && (
                <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
              )}
            </th>
            <th scope="col" onClick={() => handleSort("Ship Confirm")}>
              Ship Confirm
              {sortColumn === "Ship Confirm" && (
                <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
              )}
            </th>
            <th scope="col" onClick={() => handleSort("Arrived at Carrier")}>
              Arrived at Carrier
              {sortColumn === "Arrived at Carrier" && (
                <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
              )}
            </th>
            <th scope="col" onClick={() => handleSort("Scheduled Date")}>
              Scheduled Date
              {sortColumn === "Scheduled Date" && (
                <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
              )}
            </th>
            <th scope="col" onClick={() => handleSort("Delivered Date")}>
              Delivered Date
              {sortColumn === "Delivered Date" && (
                <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
              )}
            </th>
          </tr>
        </thead>
        <tbody>{notArrivedOrdersDisplay}</tbody>
      </table>
      <Pagination>
        <Pagination.First
          disabled={currentPage === 1}
          onClick={() => handlePageChange(1)}
        />
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        />
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
          const pageNumber = startPage + index;
          return (
            <Pagination.Item
              key={pageNumber}
              active={pageNumber === currentPage}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </Pagination.Item>
          );
        })}
        <Pagination.Next
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        />
        <Pagination.Last
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(totalPages)}
        />
      </Pagination>
    </div>
  );
}

export default NotArrivedTable;
