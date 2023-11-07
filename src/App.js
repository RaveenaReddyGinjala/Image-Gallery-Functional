import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const key = "XkW3CjWifxqc71-VdKVI04IXAibZx6NCd34Z05Mez6k";
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.unsplash.com/photos/random", {
        params: { count: 1, client_id: key },
      })
      .then((response) => {
        setImageData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="image-list">
      {imageData?.map((image, index) => (
        <div key={index} className="image-item">
          <img src={image.urls.small}></img>
        </div>
      ))}
    </div>
  );
}

export default App;
