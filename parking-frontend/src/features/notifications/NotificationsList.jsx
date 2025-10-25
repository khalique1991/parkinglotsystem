import React from "react";
import { useNotifications, useDeleteNotification } from "./useNotification.js";

const typeColors = {
  success: "bg-green-100 text-green-800",
  warning: "bg-yellow-100 text-yellow-800",
  error: "bg-red-100 text-red-800",
};

export default function NotificationsList() {
  const { data, isLoading } = useNotifications();
  const deleteNotification = useDeleteNotification();

  if (isLoading) return <p>Loading notifications...</p>;

  const notifications = data?.data || [];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-4">Notifications</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notifications.map((n) => (
          <div key={n.id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-2">{n.title}</h2>
              <p className="text-gray-700 mb-2">{n.message}</p>
              <span className={`px-2 py-1 rounded text-sm ${typeColors[n.type]}`}>{n.type.toUpperCase()}</span>
            </div>
            <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
              <span>{n.date}</span>
              <button
                onClick={() => deleteNotification.mutate(n.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
