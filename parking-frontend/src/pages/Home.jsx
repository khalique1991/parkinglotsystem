import LoginForm from "../components/LoginForm";

export default function Home() {
  return (
    <div className="max-w-md mx-auto mt-20 p-4 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Parking App Login</h1>
      <LoginForm />
    </div>
  );
}
