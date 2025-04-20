import React, { useEffect, useState } from "react";
import axios from "axios";
import gsap from "gsap";
import { downloadDocx, downloadPdf, downloadTxt } from "../../downloadUtils";

export const Hello = () => {
  const [selectedOption, setSelectedOption] = useState("Word");
  const [url, setUrl] = useState("");
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://scrapper-back-production.up.railway.app/scrape",
        {
          params: {
            url,
            query,
            format: selectedOption,
          },
        }
      );

      const data = response.data.data;
      console.log(" ✅Response ", data);
      alert(`✅ Data received:\n${JSON.stringify(data, null, 2)}`);
      // ✅ Trigger download based on format
      if (selectedOption === "Word") {
        await downloadDocx(data);
      } else if (selectedOption === "Excel") {
        downloadXlsx(data);
      } else if (selectedOption === "Txt") {
        downloadTxt(data);
      } else if (selectedOption === "Pdf") {
        downloadPdf(data);
      }

      console.log("✅ Response:", data);
      alert("✅ Data downloaded successfully!");
    } catch (error) {
      console.error("❌ API Error:", error);
      alert("❌ Failed to scrape or connect to the backend.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    gsap.fromTo(
      ".formholder form",
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: "power3.inOut",
        delay: 0.5,
      }
    );
  }, []);

  return (
    <div className="formholder">
      {isLoading ? (
        <div className="loader-container">
          <img
            src="https://htmlburger.com/blog/wp-content/uploads/2021/07/The-Best-50-Website-Preloaders-Around-the-Web-Example-01.gif"
            alt="Loading..."
            className="running-loader"
          />
          <p className="loader-text">Processing your request...</p>
        </div>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <h1 className="mulish">Enter Your Website URL</h1>

          <div className="search-container">
            {/* Website URL */}
            <div className="search-bar">
              <input
                type="text"
                className="search-input"
                placeholder="Add website URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <div className="glow"></div>
            </div>

            {/* Question / Query */}

            <div className="search-bar" style={{ marginTop: "10px" }}>
              <input
                type="text"
                className="search-input"
                placeholder="Add an item to scrape"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="glow"></div>
            </div>
          </div>

          {/* <button type="submit" className="submit-button"> */}
          <button type="submit" className="search-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M15.5 14h-.79l-.28-.27C15.41 12.59 
                      16 11.11 16 9.5 16 5.91 13.09 3 
                      9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 
                      0 3.09-.59 4.23-1.57l.27.28v.79l5 
                      4.99L20.49 19l-4.99-5zM9.5 14C7.01 
                      14 5 11.99 5 9.5S7.01 5 9.5 5 14 
                      7.01 14 9.5 11.99 14 9.5 14z"
              />
            </svg>
          </button>
          {/* </button> */}
          <h3>In which format would you like to get your data?</h3>
          <div className="radio-button-container">
            {["Word", "Txt", "Pdf"].map((format, index) => (
              <div className="radio-button" key={format}>
                <input
                  type="radio"
                  className="radio-button__input"
                  id={`radio${index}`}
                  name="radio-group"
                  value={format}
                  checked={selectedOption === format}
                  onChange={handleRadioChange}
                />
                <label
                  className="radio-button__label"
                  htmlFor={`radio${index}`}
                >
                  <span className="radio-button__custom"></span>
                  {format}
                </label>
              </div>
            ))}
          </div>
        </form>
      )}
    </div>
  );
};
