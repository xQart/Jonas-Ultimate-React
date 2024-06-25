import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("0");
  const [outputValue, setOutputValue] = useState("");
  const [baseValue, setBaseValue] = useState("EUR");
  const [rateValue, setRateValue] = useState("USD");

  useEffect(
    function () {
      async function fetchConversionValue() {
        try {
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${inputValue}&from=${baseValue}&to=${rateValue}`
          );
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await res.json();
          setOutputValue(data.rates[rateValue].toFixed(2));
        } catch (err) {
          console.error("Error fetching conversion:", err);
        }
      }
      if (baseValue === rateValue) return setOutputValue(inputValue);
      fetchConversionValue();
    },
    [inputValue, baseValue, rateValue]
  );

  return (
    <div>
      <input
        type="text"
        placeholder="input value to convert"
        value={inputValue}
        onChange={(e) => setInputValue(Number(e.target.value))}
      />
      <select value={baseValue} onChange={(e) => setBaseValue(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={rateValue} onChange={(e) => setRateValue(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {outputValue} {rateValue}
      </p>
    </div>
  );
}

export default App;
