import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Sprout } from "lucide-react";

const soilData = {
  "Alluvial Soil": ["Rice", "Wheat", "Sugarcane", "Maize", "Pulses"],
  "Black Soil": ["Cotton", "Soybean", "Sunflower", "Tobacco"],
  "Red Soil": ["Millets", "Groundnut", "Potato", "Oilseeds"],
  "Laterite Soil": ["Tea", "Coffee", "Cashew", "Rubber"],
  "Desert Soil": ["Barley", "Millets", "Dates"],
};

export default function SoilRecommendation() {
  const [soil, setSoil] = useState("");
  const [crops, setCrops] = useState([]);

  const handleSelect = (e) => {
    const selected = e.target.value;
    setSoil(selected);
    setCrops(soilData[selected] || []);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 via-green-200 to-green-400 p-6"
    >
      <Card className="w-full max-w-md shadow-lg bg-white/80 backdrop-blur-lg rounded-2xl">
        <CardContent className="p-6 text-center">
          <h2 className="text-2xl font-bold flex items-center justify-center gap-2 text-green-700">
            <Sprout className="text-green-500" />
            Soil Crop Advisor
          </h2>

          <select
            onChange={handleSelect}
            className="mt-4 w-full p-3 rounded-lg border border-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select Soil Type</option>
            {Object.keys(soilData).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          {crops.length > 0 && (
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 space-y-2"
            >
              {crops.map((crop, i) => (
                <li
                  key={i}
                  className="flex items-center justify-center gap-2 bg-green-100 p-2 rounded-lg shadow-sm"
                >
                  <Leaf className="text-green-600" />
                  <span className="text-lg text-green-800 font-medium">{crop}</span>
                </li>
              ))}
            </motion.ul>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}