export function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`px-4 py-2 bg-blue-700 text-white rounded-lg font-semibold shadow hover:bg-blue-800 transition focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
