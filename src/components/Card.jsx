import { useEffect, useState } from "react";

const Card = () => {
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
      {countries.map((country) => (
        <div key={country.name} className="card">
          <img src={country.flag} alt={`${country.name} flag`} />
          <h2>{country.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default Card;
