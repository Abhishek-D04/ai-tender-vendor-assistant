export default function LoginPage() {
  return (
    <div className="w-full max-w-lg">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
  AI
</div>
        <h1 className="text-3xl font-bold text-center text-blue-600">
          AI Tender & Vendor Evaluation Assistant
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Procurement Automation System
        </p>

        <form className="mt-8 space-y-4">
          <div>
            <label className="block mb-2 font-medium">
              Username
            </label>

            <input
              type="text"
              placeholder="Enter username"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember Me
            </label>

            <button
              type="button"
              className="text-blue-600"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}