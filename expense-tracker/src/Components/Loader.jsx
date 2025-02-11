import React from "react";
import './css/Loader.css';
import { GridLoader } from "react-spinners";

const LoadingScreen = ({ message = "Loading" }) => {
    return (
      <div className="loading-overlay">
        <div className="loading-box">
          <GridLoader color="#005aff" size={25} speedMultiplier={1} />
          <h1 className="loading-text">
            <span>{message}</span>
            <span className="dots"></span>
          </h1>
        </div>
      </div>
    );
  };

export default LoadingScreen;
