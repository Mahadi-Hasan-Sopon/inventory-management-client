import { Link } from "react-router-dom";

const ForbiddenPage = () => {
  return (
    <div className="absolute bg-white z-50 w-full h-full left-0 top-0 right-0 bottom-0 flex flex-col justify-center items-center gap-8">
      <h1 className="text-red-600 font-bold text-5xl">Forbidden Access!!!</h1>
      <p className="text-lg font-bold text-red-500">
        {`Don't try to be over smart`}
      </p>
      <p className="text-lg font-bold text-slate-700">Go back to Home Page</p>
      <Link to="/" className="btn btn-error px-8 py-3 text-slate-100">
        Go Home
      </Link>
    </div>
  );
};

export default ForbiddenPage;

// w-[98vw] h-[95vh]
