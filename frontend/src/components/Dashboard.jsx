import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const isProductive = (website) => {
  const productiveSites = ["docs.google.com", "stackoverflow.com", "github.com"];
  return productiveSites.some((site) => website.includes(site));
};

const groupByDay = (logs) => {
  const result = {};

  logs.forEach((log) => {
    const dateObj = new Date(log.date);
    const day = dateObj.toLocaleDateString("en-US", { weekday: "short" });

    if (!result[day]) {
      result[day] = {
        day,
        productive: 0,
        unproductive: 0,
        logs: [],
      };
    }

    if (isProductive(log.website)) {
      result[day].productive += log.duration;
    } else {
      result[day].unproductive += log.duration;
    }

    result[day].logs.push(log);
  });

  return Object.values(result);
};

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [selectedLogs, setSelectedLogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/timelogs/")
      .then((res) => {
        const grouped = groupByDay(res.data);
        setData(grouped);
        setSelectedLogs(grouped.flatMap(day => day.logs));
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const handleBarClick = (dayObj) => {
    if (dayObj && dayObj.logs) {
      setSelectedLogs(dayObj.logs);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100 p-8">
      <h1 className="text-4xl font-bold text-center text-indigo-800 mb-10">📈 Weekly Productivity Dashboard</h1>

      {data.length > 0 ? (
        <>
          <div className="rounded-lg shadow-lg bg-white p-6 mb-10">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={data} onClick={(e) => handleBarClick(e.activePayload?.[0]?.payload)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="productive" fill="#34d399" name="Productive Time (min)" />
                <Bar dataKey="unproductive" fill="#f87171" name="Unproductive Time (min)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-lg shadow-lg bg-white p-6">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-700">🕵️ Site-wise Breakdown</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border border-gray-300">
                <thead className="bg-indigo-100 text-indigo-800">
                  <tr>
                    <th className="px-6 py-3 text-left">Website</th>
                    <th className="px-6 py-3 text-center">Duration (min)</th>
                    <th className="px-6 py-3 text-center">Category</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedLogs.map((log, idx) => (
                    <tr key={idx} className="border-t hover:bg-indigo-50">
                      <td className="px-6 py-3">{log.website}</td>
                      <td className="px-6 py-3 text-center">{log.duration}</td>
                      <td className="px-6 py-3 text-center">
                        {isProductive(log.website) ? (
                          <span className="text-green-600 font-medium">Productive</span>
                        ) : (
                          <span className="text-red-600 font-medium">Unproductive</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <p className="text-gray-700 text-center mt-20">No data available. Keep using the extension to track activity!</p>
      )}
    </div>
  );
};

export default Dashboard;
