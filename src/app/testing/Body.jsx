'use client';
import { useState } from 'react';

export default function Body() {
  const [requirements, setRequirements] = useState([]);             // The list of user-defined requirements
  const [currentRequirement, setCurrentRequirement] = useState(''); // The current requirement being typed by the user
  const [selectedFile, setSelectedFile] = useState(null);           // The uploaded document file
  const [isProcessing, setIsProcessing] = useState(false);          // Indicates if the document is being processed
  const [result, setResult] = useState(null);                       // The result from the backend after processing

  // Function to add a new requirement to the list
  const addRequirement = () => {
    if (currentRequirement.trim()) {
      setRequirements([...requirements, currentRequirement.trim()]);
      setCurrentRequirement('');
    }
  };

  // Function to remove a requirement from the list by index
  const removeRequirement = (index) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  // Function to handle file input changes
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  // Function to process the document with the given requirements
  const processDocument = async () => {
    if (!selectedFile || requirements.length === 0) {
      alert('Please select a file and add at least one requirement');
      return;
    }

    setIsProcessing(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('document', selectedFile);
      formData.append('requirements', JSON.stringify(requirements));

      const response = await fetch('api/process-document', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      
      if (response.ok) {
        setResult(data);
      } else {
        throw new Error(data.error || 'Processing failed');
      }
    } catch (error) {
      console.error('Error processing document:', error);
      setResult({ error: error.message });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <main className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Document Requirements Processor
        </h1>

        {/* Requirements Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Requirements</h2>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={currentRequirement}
              onChange={(e) => setCurrentRequirement(e.target.value)}
              placeholder="Enter a requirement..."
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && addRequirement()}
            />
            <button
              onClick={addRequirement}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Requirement
            </button>
          </div>

          {requirements.length > 0 && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">Current Requirements:</h3>
              <ul className="space-y-2">
                {/* This method maps each requirement to a list item */}
                {requirements.map((req, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-100 rounded-md border-l-4 border-blue-500"
                  >
                    <span className="flex-1">{req}</span>
                    <button
                      onClick={() => removeRequirement(index)}
                      className="px-2 py-1 bg-red-600 text-white text-xs rounded-md hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* File Upload Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Document Upload</h2>
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.txt"
            className="w-full p-2 border-2 border-dashed border-gray-300 rounded-md bg-gray-50 hover:border-blue-500"
          />
          {selectedFile && (
            <p className="mt-2 text-sm italic text-gray-600">
              Selected: {selectedFile.name}
            </p>
          )}
        </div>

        {/* Process Button */}
        <div className="mb-8">
          <button
            onClick={processDocument}
            disabled={isProcessing || !selectedFile || requirements.length === 0}
            className={`w-full py-3 text-lg font-bold rounded-md ${
              isProcessing || !selectedFile || requirements.length === 0
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isProcessing ? 'Processing...' : 'Process Document'}
          </button>
        </div>

        {/* Results Section */}
        {result && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Results</h2>
            <div className="mt-2">
              {result.error ? (
                <div className="p-4 rounded-md border bg-red-100 border-red-300 text-red-800">
                  <strong>Error:</strong> {result.error}
                </div>
              ) : (
                <div className="p-4 rounded-md border bg-green-100 border-green-300 text-green-800">
                  <pre className="whitespace-pre-wrap break-words m-0">
                    {result.output}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
