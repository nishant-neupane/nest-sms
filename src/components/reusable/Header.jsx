export default function Header() {
  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b shadow-sm flex items-center justify-between px-6 z-10">
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        Send SMS
      </button>
    </header>
  );
}
