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
      book.loaded.metadata.then((metadata) => {
        console.log(metadata.title);
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
      </main>
    </div>
  );
}

export default App;
