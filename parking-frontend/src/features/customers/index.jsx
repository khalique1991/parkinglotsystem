
import React from "react";
import CustomerList from "./CustomerList";
import CreateCustomerForm from "./CreateCustomerForm";

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <CreateCustomerForm />
      <CustomerList />
    </div>
  );
}
