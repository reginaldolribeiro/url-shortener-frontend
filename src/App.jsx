import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './App.css'
import api from "./api/axios";

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [userHash, setUserHash] = useState("");

  // const handleSubmit = (e) => {
  //   e.preventDefault(); // Prevent page reload
  //   const fakeShortenedUrl = `https://short.ly/${btoa(originalUrl).slice(0, 8)}`; // Simulate a shortened URL
  //   setShortenedUrl(fakeShortenedUrl);
  //   // alert(`Submitted URL: ${originalUrl}`);
  // };

  // Initialize the temporary user hash
  useEffect(() => {
    let hash = localStorage.getItem("userHash");
    if(!hash) {
      hash = uuidv4()
      localStorage.setItem("userHash", hash)
    }
    setUserHash(hash) // Set it in state
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      const response = await api.post("/short-url", { 
        user_id: userHash, 
        long_url: originalUrl });
      if(response.status !== 201) {
        throw new Error(`Failed to shorten URL: ${response.status}`);
      }
      setShortenedUrl(response.data.shortened_url);
      alert("URL shortened successfully");
    } catch (error) {
      console.error("Error response:", error.response?.data || error.message);
      alert(`Failed to shorten URL: ${originalUrl}`);
    }
  };

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>URL Shortener</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            required={true}
            placeholder="Enter long URL"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            style={{ padding: "10px", width: "300px", fontSize: "16px" }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              marginLeft: "10px",
              backgroundColor: "#6200ee",
              color: "#fff",
              border: "none",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Shorten URL
          </button>
        </form>
        {shortenedUrl && (
          <div style={{ marginTop: "20px" }}>
            <h3>Shortened URL:</h3>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
              <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
                {shortenedUrl}
              </a>
              <button
                onClick={() => navigator.clipboard.writeText(shortenedUrl)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#28a745",
                  color: "#fff",
                  border: "none",
                  fontSize: "14px",
                  cursor: "pointer",
                  borderRadius: "4px",
                }}
              >
                Copy
              </button>
            </div>
          </div>
      )}
      </div>
    </>
  );
}

export default App
