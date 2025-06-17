import { useNavigate } from "react-router-dom";

/**
 * NotFoundPage - Displays a user-friendly 404 error page.
 * Includes a redirect button to go back to the dashboard.
 */
const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center bg-background-primary text-white h-[calc(100vh-174px)] px-2">
      {/* Error Code */}
      <h1 className="text-6xl font-bold mb-4">404</h1>

      {/* Error Message */}
      <p className="text-xl mb-6">Oops! The page you’re looking for doesn’t exist.</p>

      {/* Redirect Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="cursor-pointer px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFoundPage;
