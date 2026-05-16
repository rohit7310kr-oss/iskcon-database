import React, { useEffect } from "react";
import AddNewDevotee from "../addNewDevotee/AddNewDevotee";
import AllDevotees from "../viewDevotee/ViewDevotee";
import { Link, Outlet } from "react-router";
import { useUser } from "../../context/userContext";
import Loader from "../../shared/Loader";

const Layout = () => {
  const { user, loading, logout } = useUser();

  const logoutHandler = function () {
    logout();
  };

  if (loading.status) return <Loader message={loading.message} />;

  return (
    // Side bar
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-md hidden md:flex flex-col">
        <div className="p-6 text-xl font-bold border-b">
          durg devotees database
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/app"
            className="block px-4 py-2 rounded-lg hover:bg-orange-100 text-gray-700"
          >
            Dashboard
          </Link>
          <Link
            to="courses"
            className="block px-4 py-2 rounded-lg hover:bg-orange-100 text-gray-700"
          >
            Courses
          </Link>
          <Link
            to="addNewDevotee"
            className="block px-4 py-2 rounded-lg hover:bg-orange-100 text-gray-700"
          >
            Add new devotee
          </Link>
          <Link
            to="devotees?page=new"
            className="block px-4 py-2 rounded-lg hover:bg-orange-100 text-gray-700"
          >
            New devotees
          </Link>
          <Link
            to="devotees?page=iyf"
            className="block px-4 py-2 rounded-lg hover:bg-orange-100 text-gray-700"
          >
            IYF
          </Link>
          <Link
            to="devotees?page=congreation"
            className="block px-4 py-2 rounded-lg hover:bg-orange-100 text-gray-700"
          >
            Congreation
          </Link>
        </nav>
        <div className="p-4 border-t">
          <div className="flex items-center justify-center space-x-4 w-full mb-4">
            <div className="bg-gray-300 rounded px-3 py-2 w-full">
              <p>{user?.email}</p>
              <p>{user?.phone}</p>
              <p>{user?.role}</p>
            </div>
          </div>
          <button
            onClick={logoutHandler}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
          >
            logout
          </button>
        </div>
      </div>
      {/* Main content container */}

      <div className="flex-1 flex flex-col">
        {/* Top nav bar starts */}
        <div className="bg-white shadow px-6 flex justify-between items-centre py-3 ">
          <h1 className="text-lg font-semibold"> Durg Database</h1>
        </div>
        {/* Top nav bar ends */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* content starts: festivals */}
          <Outlet />
        </div>
        {/* content ends: festivals */}
      </div>
    </div>
  );
};

export default Layout;
