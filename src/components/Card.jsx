import { useEffect, useState } from "react";

const Card = () => {
  const [countries, setCountries] = useState([]); // Original data
  const [filteredCountries, setFilteredCountries] = useState([]); // For search
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch countries from API
  const fetchCountries = async () => {
    try {
      const response = await fetch(
        "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries",
        { cache: "no-store" }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch countries");
      }

      const data = await response.json();
      setCountries(data);
      setFilteredCountries(data); // initially show all
    } catch (error) {
      console.error("Error fetching data:", error);
      console.log("Error fetching data:", error.message);
    }
  };

  // Search handler
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      // If input empty -> show all
      setFilteredCountries(countries);
      return;
    }

    const filtered = countries.filter((country) =>
      country.common.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredCountries(filtered);
  };

  // Fetch data on mount + retry if fails
  useEffect(() => {
    fetchCountries();

    const retryTimeout = setTimeout(() => {
      if (countries.length === 0) {
        fetchCountries();
      }
    }, 500);

    return () => clearTimeout(retryTimeout);
  }, []);

  return (
    <div
      className="App-parent"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "#333", marginBottom: "20px" }}>
        🌍 Country Explorer
      </h1>

      {/* Search Input */}
      <input
        style={{
          margin: "10px",
          padding: "10px 15px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          textAlign: "center",
          fontSize: "16px",
          width: "250px",
          outline: "none",
        }}
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={handleSearch}
      />

      {/* Countries Grid */}
      <div
        className="App"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "20px",
          width: "100%",
          maxWidth: "900px",
          marginTop: "30px",
        }}
      >
        {filteredCountries.length > 0
          ? filteredCountries.map((country) => (
              <div
                key={country.common}
                className="countryCard"
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #eaeaea",
                  borderRadius: "10px",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  textAlign: "center",
                  padding: "15px",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 10px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
                }}
              >
                <img
                  src={country.png}
                  alt={`${country.common} flag`}
                  style={{
                    width: "100%",
                    height: "90px",
                    objectFit: "cover",
                    borderRadius: "6px",
                    marginBottom: "10px",
                  }}
                />
                <h2 style={{ fontSize: "16px", color: "#333" }}>
                  {country.common}
                </h2>
              </div>
            ))
          : // Show nothing visible when no match
            null}
      </div>
    </div>
  );
};

export default Card;
