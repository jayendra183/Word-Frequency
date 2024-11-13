import React, { useState } from 'react';

function App() {
  const [url, setUrl] = useState('');
  const [frequencyData, setFrequencyData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3001/api/frequency', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();
    setFrequencyData(data.frequencyArray);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Word Frequency Analyzer</h1>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <label htmlFor="urlInput" className="block text-lg font-medium mb-2">Enter URL</label>
        <input
          id="urlInput"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          placeholder="https://example.com"
          required
        />
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md">
          Analyze
        </button>
      </form>

      {frequencyData.length > 0 && (
        <div className="max-w-lg mx-auto mt-8">
          <h2 className="text-2xl font-semibold mb-4">Top Words</h2>
          <table className="w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border-b text-left">Word</th>
                <th className="p-2 border-b text-left">Count</th>
              </tr>
            </thead>
            <tbody>
              {frequencyData.map(({ word, count }) => (
                <tr key={word}>
                  <td className="p-2 border-b">{word}</td>
                  <td className="p-2 border-b">{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
