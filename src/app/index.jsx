'use client';
import { useState } from 'react';
import styles from './styles/Home.module.css';

export default function Body() {
  const [requirements, setRequirements] = useState([]);
  const [currentRequirement, setCurrentRequirement] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);

  // Add a new requirement to the list
  const addRequirement = () => {
    if (currentRequirement.trim()) {
      setRequirements([...requirements, currentRequirement.trim()]);
      setCurrentRequirement('');
    }
  };

  // Remove a requirement from the list
  const removeRequirement = (index) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  // Process the document with requirements
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

      console.log(JSON.stringify(requirements));
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
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Document Requirements Processor</h1>

        {/* Requirements Section */}
        <div className={styles.section}>
          <h2>Requirements</h2>
          <div className={styles.inputGroup}>
            <input
              type="text"
              value={currentRequirement}
              onChange={(e) => setCurrentRequirement(e.target.value)}
              placeholder="Enter a requirement..."
              className={styles.input}
              onKeyPress={(e) => e.key === 'Enter' && addRequirement()}
            />
            <button onClick={addRequirement} className={styles.button}>
              Add Requirement
            </button>
          </div>

          {/* Requirements List */}
          {requirements.length > 0 && (
            <div className={styles.requirementsList}>
              <h3>Current Requirements:</h3>
              <ul>
                {requirements.map((req, index) => (
                  <li key={index} className={styles.requirementItem}>
                    <span>{req}</span>
                    <button
                      onClick={() => removeRequirement(index)}
                      className={styles.removeButton}
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
        <div className={styles.section}>
          <h2>Document Upload</h2>
          <input
            type="file"
            onChange={handleFileChange}
            className={styles.fileInput}
            accept=".pdf,.doc,.docx,.txt"
          />
          {selectedFile && (
            <p className={styles.fileName}>Selected: {selectedFile.name}</p>
          )}
        </div>

        {/* Process Button */}
        <div className={styles.section}>
          <button
            onClick={processDocument}
            disabled={isProcessing || !selectedFile || requirements.length === 0}
            className={`${styles.button} ${styles.processButton}`}
          >
            {isProcessing ? 'Processing...' : 'Process Document'}
          </button>
        </div>

        {/* Results Section */}
        {result && (
          <div className={styles.section}>
            <h2>Results</h2>
            <div className={styles.results}>
              {result.error ? (
                <div className={styles.error}>
                  <strong>Error:</strong> {result.error}
                </div>
              ) : (
                <div className={styles.success}>
                  <pre>{result.output}</pre>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}