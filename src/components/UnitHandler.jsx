import { useState } from "react";
import PropTypes from "prop-types";
import "./unitHandler.css";

const UnitHandler = ({ productStockQuantity, defaultSelectedQuantity }) => {
  const [selectedQuantity, setSelectedQuantity] = useState(
    defaultSelectedQuantity
  );

  const handleIncrementClick = () => {
    if (selectedQuantity < productStockQuantity) {
      setSelectedQuantity(selectedQuantity + 1);
    } else {
      setSelectedQuantity(productStockQuantity);
    }
  };

  const handleDecrementClick = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity(selectedQuantity - 1);
    } else {
      setSelectedQuantity(1);
    }
  };

  return (
    <div className="custom-number-input h-10 w-24">
      <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
        <button
          data-action="decrement"
          className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
          onClick={handleDecrementClick}
        >
          <span className="m-auto text-2xl font-thin">{"−"}</span>
        </button>
        <input
          type="number"
          className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-base cursor-default flex items-center text-gray-700"
          name="custom-input-number"
          value={selectedQuantity}
        ></input>
        <button
          data-action="increment"
          className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
          onClick={handleIncrementClick}
        >
          <span className="m-auto text-2xl font-thin">{"+"}</span>
        </button>
      </div>
    </div>
  );
};

export default UnitHandler;

UnitHandler.propTypes = {
  productStockQuantity: PropTypes.number.isRequired,
  defaultSelectedQuantity: PropTypes.number.isRequired,
};
