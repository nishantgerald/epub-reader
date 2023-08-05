import React, { useState } from 'react';
import ePub from 'epubjs';

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
    };

  
    reader.readAsArrayBuffer(file);
  };
  

  return (
    <div className="App">
      <header className="App-header">
        <h1>EPUB Reader</h1>
      </header>
      <main>
        <input type="file" accept=".epub" onChange={handleFileUpload} />
        <div id="viewer" style={{ width: "100%", height: "600px" }}></div>
        <button id="prev" type="button">Previous</button>
        <button id="next" type="button">Next</button>
      </main>
    </div>
  );
}

export default App;
