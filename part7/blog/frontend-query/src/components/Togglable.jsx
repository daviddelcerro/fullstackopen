import { useState } from "react";
import PropTypes from "prop-types";

const Toggable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button
          data-testid="toggle-button"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors mb-10"
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button
          className="w-full border border-red-400 bg-white hover:bg-red-400 font-medium py-2.5 rounded-lg transition-colors mt-4"
          onClick={toggleVisibility}
        >
          cancel
        </button>
      </div>
    </div>
  );
};

Toggable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Toggable;
