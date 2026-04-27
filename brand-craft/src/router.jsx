import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import AllJobsPage from "./pages/AllJobsPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import AddJobPage from "./pages/AddJobPage.jsx";
import JobDetailsPage from "./pages/JobDetailsPage.jsx";
import MyAddedJobsPage from "./pages/MyAddedJobsPage.jsx";
import MyAcceptedTasksPage from "./pages/MyAcceptedTasksPage.jsx";
import DeleteJobPage from "./pages/DeleteJobPage.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/allJobs", element: <AllJobsPage /> },
      { path: "/allJobs/:id", element: <PrivateRoute><JobDetailsPage /></PrivateRoute> },
      { path: "/addJob", element: <PrivateRoute><AddJobPage /></PrivateRoute> },
      { path: "/myAddedJobs", element: <PrivateRoute><MyAddedJobsPage /></PrivateRoute> },
      { path: "/updateJob/:id", element: <PrivateRoute><AddJobPage /></PrivateRoute> }, // একই ফর্ম ইউজ করতে পারেন
      { path: "/deleteJob/:id", element: <PrivateRoute><DeleteJobPage /></PrivateRoute> },
      { path: "/my-accepted-tasks", element: <PrivateRoute><MyAcceptedTasksPage /></PrivateRoute> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },
]);
