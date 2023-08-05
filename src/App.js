import React, { useState } from 'react';
import ePub from 'epubjs';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState();

  const handleFileUpload = (event) => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
    handleEpub(event.target.files[0]);
  };

  const handleEpub = (file) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const book = ePub(event.target.result);
      const rendition = book.renderTo("viewer", { width: "100%", height: "600px" });
      rendition.display();
      book.loaded.metadata.then((metadata) => {
        console.log(metadata.title);
      });

      document.getElementById("next").addEventListener("click", function() {
        rendition.next();
      });

      document.getElementById("prev").addEventListener("click", function() {
        rendition.prev();
      });

      document.onkeydown = (e) => {
        if (e.key === "ArrowUp") {
          rendition.prev();
        } else if (e.key === "ArrowDown") {
          rendition.next();
        } else if (e.key === "ArrowLeft") {
          rendition.prev();
        } else if (e.key === "ArrowRight") {
          rendition.next();
        }
      };

    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <main>
        <input type="file" accept=".epub" onChange={handleFileUpload} />
        <div className="viewer-frame">
          <div id="viewer" style={{ width: "100%", height: "600px" }}></div>
        </div>
        <button id="prev" type="button" className="btn">
          <FaArrowLeft /> Previous
        </button>
        <button id="next" type="button" className="btn">
          Next <FaArrowRight />
        </button>
      </main>
    </div>
  );
}

export default App;
