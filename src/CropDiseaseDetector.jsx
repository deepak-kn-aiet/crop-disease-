import React, { useState } from "react";
import * as tmImage from "@teachablemachine/image";

export default function CropDiseaseDetector() {
  const [model, setModel] = useState(null);
  const [label, setLabel] = useState("");

  const loadModel = async () => {
    const URL = "/model/";
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    const loadedModel = await tmImage.load(modelURL, metadataURL);
    setModel(loadedModel);
    alert("Model loaded successfully!");
  };

  const handleImageUpload = async (event) => {
    if (!model) {
      alert("Please load the model first.");
      return;
    }
    const file = event.target.files[0];
    const image = document.createElement("img");
    image.src = URL.createObjectURL(file);
    image.onload = async () => {
      const prediction = await model.predict(image);
      const highest = prediction.reduce((prev, current) =>
        prev.probability > current.probability ? prev : current
      );
      setLabel(highest.className);
    };
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>🌾 Crop Disease Detection</h2>
      <button onClick={loadModel}>Load Model</button>
      <br /><br />
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {label && <h3>Prediction: {label}</h3>}
    </div>
  );
}