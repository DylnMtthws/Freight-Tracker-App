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
import CommentsForm from "./components/CommentsForm";
import CommentsSection from "./components/CommentsSection";

function App() {
  const [orders, setOrders] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/orders")
      .then((r) => r.json())
      .then((data) => {
        setOrders(data);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/comments")
      .then((r) => r.json())
      .then((data) => setComments(data));
  }, []);

  const handleFormSubmit = (comment) => {
    setComments([...comments, comment]);
  };

  const handleRemoveComment = (index) => {
    const updatedComments = [...comments];
    updatedComments.splice(index, 1);
    setComments(updatedComments);
  };

  const routes = createRoutesFromElements(
    <Route path="/" element={<TableNav />}>
      <Route index element={<AllOrders orders={orders} isLoading={isLoading} />} />
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
    <div className="container">
      <div className="form-container">
        <CommentsForm onFormSubmit={handleFormSubmit} />
        <CommentsSection
          comments={comments}
          onRemoveComment={handleRemoveComment}
        />
      </div>
      <div
        className="table-container"
        style={{
          float: "right",
          height: "90vh",
          overflowY: "auto",
          maxHeight: "90vh",
        }}
      >
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <RouterProvider router={router} />
        )}
      </div>
    </div>
  );
}

export default App;
