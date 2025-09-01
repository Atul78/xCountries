import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
  const [countries, setCountries] = useState([]);

  const fetchCountries = async () => {
    try {
      const response = await fetch(
        "https://xcountries-backend.azurewebsites.net/all",
        { cache: "no-store" }
      );
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div className="App">
      <div style={{ display: "none" }}>init</div>

      {countries.map((country) => (
        <Card key={country.name} name={country.name} flag={country.flag} />
      ))}
    </div>
  );
}

export default App;
