let notifications = [
  { id: 1, title: "Parking Lot Full", message: "Lot A is full", type: "warning", date: "2025-10-26" },
  { id: 2, title: "New Payment Received", message: "Payment of $50 completed", type: "success", date: "2025-10-25" },
  { id: 3, title: "Ticket Cancelled", message: "Ticket #12 has been cancelled", type: "error", date: "2025-10-24" },
];

export const fetchNotificationsMock = async () => ({ data: notifications });
export const addNotificationMock = async (payload) => {
  const newNotification = { id: notifications.length + 1, ...payload };
  notifications.unshift(newNotification);
  return { data: newNotification };
};
export const deleteNotificationMock = async (id) => {
  notifications = notifications.filter(n => n.id !== id);
  return { data: true };
};
