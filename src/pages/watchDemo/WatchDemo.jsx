import { Helmet } from "react-helmet";

const WatchDemo = () => {
  return (
    <div className="min-h-[60vh] flex flex-col justify-center items-center">
      <Helmet>
        <title>Inventory || Watch Demo</title>
      </Helmet>
      <h1 className="text-3xl font-bold text-center">Watch Demo Page</h1>
    </div>
  );
};

export default WatchDemo;
