import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center flex-col h-screen space-y-5">
      <h1 className="text-3xl text-bold text-center text-red-500">
        Error Occurred!!!
      </h1>
      <Link
        to={"/"}
        className="text-base border py-3 px-6 cursor-pointer hover:text-blue-500 rounded text-center"
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
