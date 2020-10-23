import React, { useState } from "react";
import "./App.css";

function App() {
  const [aiImage, setAiImage] = useState("");
  const [realImage, setRealImage] = useState("");

  const getAIPhoto = async () => {
    const response = await fetch(
      `https://api.generated.photos/api/v1/faces?api_key=${process.env.REACT_APP_AI_Image_API_Key}&order_by=random`
    );
    const data = await response.json();
    console.log(data.faces[0].urls);
    const aiImage = data.faces[0].urls[3][256];
    aiImage && setAiImage(aiImage);

    const res = await fetch(
      `https://api.pexels.com/v1/search?query=face&page=${Math.floor(
        Math.random() * 101
      )}&per_page=1`,
      {
        headers: {
          Authorization: `${process.env.REACT_APP_pexels_image_api_key}`,
        },
      }
    );
    const info = await res.json();
    console.log(info);
    const realImage = info.photos[0].src.medium;
    realImage && setRealImage(realImage);
  };

  const aiImageSelected = () => {
    window.alert("Sorry, you selected an AI Image! Try again");
  };
  const realImageSelected = () => {
    window.alert("Good Eye! You selected a photo of a person!")
  };

  return (
    <div className="App">
      <h1>Which photo is of a real person?</h1>
      <div className="images">
        {aiImage && (
          <a href="javascript" onClick={aiImageSelected}>
            {" "}
            <img src={aiImage} alt="Img" />
          </a>
        )}
        {realImage && (
          <a href="javascript" onClick={realImageSelected}>
            <img src={realImage} alt="Img" />
          </a>
        )}
      </div>
      <button type="button" onClick={getAIPhoto}>
        Generate New Photos
      </button>
    </div>
  );
}

export default App;
