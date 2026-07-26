import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loaderGif from "./assets/loader.gif";   // your GIF

function Loader() {


  
  return (
    <div className="loader-container">
      <img src={loaderGif} alt="loading" className="loader-gif" />
    </div>
  );
}

export default Loader;