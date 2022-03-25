import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [content, setContent] = useState({});
  const [filterText, setFilterText] = useState("");

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  useEffect(() => {
    async function fetch() {
      const { data } = await axios.get("https://api.publicapis.org/categories");
      setContent(data);
    }

    fetch();
  }, []);

  return (
    <div className="App">
      <input
        type="text"
        placeholder="filter.."
        value={filterText}
        onChange={handleFilterChange}
      />
      <div className="categories">
        {content.count > 0 && (
          <>
            {content.categories.map((category) =>
              category.toUpperCase().includes(filterText.toUpperCase()) ? (
                <span className="categories__item" key={category}>
                  {category}
                </span>
              ) : null
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
