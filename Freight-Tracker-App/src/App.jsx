import React, { useEffect, useState } from "react";
import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import TableNav from "./components/TableNav";
import AllOrders from "./components/Pages/AllOrders";
import NotArrivedTable from "./components/Pages/NotArrivedTable";
import NotScheduledTable from "./components/Pages/NotScheduledTable";
import NotDeliveredTable from "./components/Pages/NotDeliveredTable";

function App() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/orders")
      .then((r) => r.json())
      .then((data) => setOrders(data));
  }, []);

  const routes = createRoutesFromElements(
    <Route path="/" element={<TableNav />}>
      <Route index element={<AllOrders orders={orders} />} />
      <Route path="not-arrived" element={<NotArrivedTable orders={orders} />} />
      <Route
        path="not-scheduled"
        element={<NotScheduledTable orders={orders} />}
      />
      <Route
        path="not-delivered"
        element={<NotDeliveredTable orders={orders} />}
      />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Route>
  );

  const router = createBrowserRouter(routes);

  return (
    <>
      <div className="table-container">
        <RouterProvider router={router} />
      </div>
      <div className="form-container">
        {/* <CommentsForm /> */}
      </div>
    </>
  );
}

export default App;
