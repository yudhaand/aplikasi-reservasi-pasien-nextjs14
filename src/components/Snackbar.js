// src/components/Snackbar.jsx
import React, { useState, useEffect } from "react";

const Snackbar = ({ message, show, duration = 3000, position = "bottom-center", variant = "default" }) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration]);

  const getPositionClasses = (position) => {
    switch (position) {
      case "top-left":
        return "top-4 left-4";
      case "top-center":
        return "top-4 left-1/2 transform -translate-x-1/2";
      case "top-right":
        return "top-4 right-4";
      case "bottom-left":
        return "bottom-4 left-4";
      case "bottom-center":
        return "bottom-4 left-1/2 transform -translate-x-1/2";
      case "bottom-right":
        return "bottom-4 right-4";
      default:
        return "bottom-4 left-1/2 transform -translate-x-1/2";
    }
  };

  const getTransitionClasses = (position) => {
    switch (position) {
      case "top-left":
      case "top-center":
      case "top-right":
        return visible ? "translate-y-0" : "-translate-y-20";
      case "bottom-left":
      case "bottom-center":
      case "bottom-right":
        return visible ? "translate-y-0" : "translate-y-20";
      default:
        return visible ? "translate-y-0" : "translate-y-20";
    }
  };

  const getVariantClasses = (variant) => {
    switch (variant) {
      case "success":
        return "bg-green-500";
      case "warning":
        return "bg-yellow-500";
      case "error":
        return "bg-red-500";
      case "info":
        return "bg-blue-500";
      case "default":
      default:
        return "bg-gray-800";
    }
  };

  return (
    <div
      className={`fixed ${getPositionClasses(position)} px-4 py-2 ${getVariantClasses(
        variant
      )} text-white rounded shadow-lg transition-transform ${getTransitionClasses(position)}`}
    >
      {message}
    </div>
  );
};

export default Snackbar;

// How to use
{
  /* <Snackbar message="This is a snackbar!" show={true} position="top-center" variant="success" />; */
}
