import React, { useState, useEffect } from "react";
import axios from "axios";

const Fib = props => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState("");

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  });

  const fetchValues = async () => {
    const valuesData = await axios.get("/api/values/current");
    setValues(valuesData.data);
  };
  const fetchIndexes = async () => {
    const seenIndexesData = await axios.get("/api/values/all");
    setSeenIndexes([...seenIndexesData.data]);
  };

  const renderSeenIndexes = () => {
    return seenIndexes.map(({ number }) => number).join(", ");
  };

  const renderValues = () => {
    const entries = [];

    Object.keys(values).forEach(key => {
      entries.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      );
    });

    return entries;
  };

  const handleSubmit = async event => {
    event.preventDefault();

    await axios.post("/api/values", { index });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input value={index} onChange={event => setIndex(event.target.value)} />
        <button>Sumbit</button>
      </form>
      <h3>Indexes I have seen:</h3>
      {renderSeenIndexes()}

      <h3>Calculated Values:</h3>
      {renderValues()}
    </div>
  );
};

export default Fib;
