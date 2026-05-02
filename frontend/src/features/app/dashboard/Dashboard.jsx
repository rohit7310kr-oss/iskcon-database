import React, { useEffect, useState } from "react";
import { getAllDevotee } from "../service/devotees";

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    male: 0,
    female: 0,
    other: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getAllDevotee();
        const devotees = res.data;
        const total = devotees.length;
        const male = devotees.filter((d) => d.gender === "male").length;
        const female = devotees.filter((d) => d.gender === "female").length;
        const other = devotees.filter((d) => d.gender === "other").length;
        setStats({ total, male, female, other });
      } catch (err) {
        console.log(err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-100 p-4 rounded">
          <h3 className="text-lg font-semibold">Total Devotees</h3>
          <p className="text-2xl">{stats.total}</p>
        </div>
        <div className="bg-green-100 p-4 rounded">
          <h3 className="text-lg font-semibold">Male</h3>
          <p className="text-2xl">{stats.male}</p>
        </div>
        <div className="bg-pink-100 p-4 rounded">
          <h3 className="text-lg font-semibold">Female</h3>
          <p className="text-2xl">{stats.female}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded">
          <h3 className="text-lg font-semibold">Other</h3>
          <p className="text-2xl">{stats.other}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
