import { useEffect, useState } from "react";

const Card = () => {
  const [countries, setCountries] = useState([]);          // original data
  const [filteredCountries, setFilteredCountries] = useState([]); // filtered data
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCountries = async () => {
    try {
      const response = await fetch(
        "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries",
        { cache: "no-store" }
      );
      const data = await response.json();
      setCountries(data);
      setFilteredCountries(data); // initialize filtered list
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // filter based on original countries
    const filtered = countries.filter((country) =>
      country.common.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  useEffect(() => {
    fetchCountries();
    const t = setTimeout(() => {
      if (countries.length === 0) {
        fetchCountries();
      }
    }, 500);

    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="App-parent"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <input
        style={{
          margin: "10px",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          textAlign: "center",
        }}
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={handleSearch}
      />

      <div className="App">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <div key={country.common} className="card">
              <img src={country.png} alt={`${country.common} flag`} />
              <h2>{country.common}</h2>
            </div>
          ))
        ) : (
          <p>No countries found</p>
        )}
      </div>
    </div>
  );
};

export default Card;
