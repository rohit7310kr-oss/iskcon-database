import React from "react";
import AddNewDevotee from "../addNewDevotee/AddNewDevotee";
import AllDevotees from "../viewDevotee/ViewDevotee";
import { Link, Outlet } from "react-router";

const Layout = () => {
  return (
    // Side bar
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-md hidden md:flex flex-col">
        <div className="p-6 text-xl font-bold border-b">
          Iskcon durg devotees database
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/app"
            className="block px-4 py-2 rounded-lg hover:bg-orange-100 text-gray-700"
          >
            Dashboard
          </Link>
          <Link
            to="newDevotee"
            className="block px-4 py-2 rounded-lg hover:bg-orange-100 text-gray-700"
          >
            Add new devotee
          </Link>
          <Link
            to="viewDevotee"
            className="block px-4 py-2 rounded-lg hover:bg-orange-100 text-gray-700"
          >
            Devotees
          </Link>
        </nav>
        <div className="p-4 border-t">
          <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
            logout
          </button>
        </div>
      </div>
      {/* Main content container */}

      <div className="flex-1 flex flex-col">
        {/* Top nav bar starts */}
        <div className="bg-white shadow px-6 flex justify-between items-centre">
          <h1 className="text-lg font-semibold">ISKCON Durg Database</h1>

          <div className="flex items-center space-x-4">
            <input
              className="border rounder-lg px-1 py-1 focus:outline-none focus:ring-orange-400"
              placeholder="search..."
            ></input>
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          </div>
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
