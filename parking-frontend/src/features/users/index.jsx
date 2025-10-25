import React from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import UsersList from "./UsersList";
import UserForm from "./UserForm";
import UserDetail from "./UserDetail";

// ✅ Export user-specific routes
export const userRoutes = [
  {
    path: "/users",
    element: (
      <ProtectedRoute roles={["ADMIN", "OPERATOR"]}>
        <UsersList />
      </ProtectedRoute>
    ),
  },
  {
    path: "/users/create",
    element: (
      <ProtectedRoute roles={["ADMIN"]}>
        <UserForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/users/:id",
    element: (
      <ProtectedRoute roles={["ADMIN"]}>
        <UserDetail />
      </ProtectedRoute>
    ),
  },
];

// ✅ Default export for appRoutes or sidebar use
export default function Users() {
  return <h1 className="text-2xl font-bold">Users Page</h1>;
}
