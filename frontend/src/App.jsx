import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <MainLayout>
      <div className="max-w-4xl bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold">
          MVP Development Started
        </h2>

        <p className="mt-2 text-gray-600">
          Layout system is working.
        </p>
      </div>
    </MainLayout>
  );
}

export default App;