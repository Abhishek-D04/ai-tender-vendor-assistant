import Input from "../components/common/Input";
import Button from "../components/common/Button";
import Card from "../components/common/Card";

export default function LoginPage() {
  return (
    <div className="w-full max-w-lg">
      <Card>
        <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
          AI
        </div>

        <h1 className="text-3xl font-bold text-center text-blue-600 mt-4">
          AI Tender & Vendor Evaluation Assistant
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Procurement Automation System
        </p>

        <form className="mt-8 space-y-4">
          <Input
            label="Username"
            placeholder="Enter username"
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
          />

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

          <Button>
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
}