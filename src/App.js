import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
// import imagedatajson from "./imagereszeddata.json";
import { IoMdDownload } from "react-icons/io";
import { AiFillHeart } from "react-icons/ai";
// import DownloadLink from "react-download-link";

function App() {
  const key = "XkW3CjWifxqc71-VdKVI04IXAibZx6NCd34Z05Mez6k";
  const [imageData, setImageData] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const input = document.getElementById("input-field");
    input.focus();
  }, []);

  useEffect(() => {
    if (query === "") {
      axios
        .get("https://api.unsplash.com/photos/random", {
          params: { count: 29, client_id: key, resize: "800*600" },
        })
        .then((response) => {
          setImageData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // console.log(imagedatajson);
      // setImageData(imagedatajson);
      axios
        .get("https://api.unsplash.com/search/photos", {
          params: { query: query, client_id: key, per_page: 12 },
        })
        .then((response) => {
          setImageData(response.data.results);
          console.log(response.data.results);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [query]); // [query] is a condition which trigger useEffect, whenever query get changed

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  // const breakpointColumnsObj = {
  //   default: 5,
  //   1100: 4,
  //   700: 3,
  //   500: 2,
  // };

  const handleDownload = async (imageUrl) => {
    try {
      const response = await axios.get(imageUrl, {
        responseType: "arraybuffer",
      });
      console.log(response);
      const blob = new Blob([response.data]);
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "downloaded_image.jpg";
      link.click();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="App">
      <div className="input-container">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="search"
          id="input-field"
        ></input>
      </div>
      <>
        {imageData?.length ? (
          <div className="image-list">
            {imageData?.map((image, index) => (
              <div key={index} className="image-item">
                <div className="image-outlinecontainer">
                  <img
                    width="300"
                    height="250"
                    src={image.urls.regular}
                    alt={`${index}`}
                  />
                  <div className="image-data">
                    <div>
                      <AiFillHeart fill="red" fontSize={20} />
                      <span>{image.likes}</span>
                    </div>
                    <IoMdDownload
                      fontSize={25}
                      onClick={() => handleDownload(image.urls.regular)}
                    />
                  </div>
                </div>
              </div>
            ))}
            ,
          </div>
        ) : (
          <h1>{query ? "NO MATCH FOUND!" : "NETWORK ERROR"}</h1>
        )}
      </>
    </div>
  );
}

export default App;
