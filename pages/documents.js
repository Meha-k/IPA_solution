import { useState } from 'react';

export default function DocumentProcessor() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Please upload a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const res = await fetch('/api/process-doc', {
        method: 'POST',
        body: formData, // No headers needed for FormData
      });

      const data = await res.json();
      setResult(data.text);
    } catch (error) {
      console.error('Error uploading file:', error);
      setResult('Failed to process file');
    }
  };

  return (
    <div className="min-h-screen bg-gradient flex items-center justify-center p-8">
      <div className="card w-full max-w-2xl">
        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Document Processor</h2>

        {/* File Upload Form */}
        <form onSubmit={handleUpload} className="mb-8">
          <div className="flex flex-col space-y-4">
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="input-field"
            />
            <button
              type="submit"
              className="btn-primary w-full"
            >
              Process
            </button>
          </div>
        </form>

        {/* Display Result */}
        {result && (
          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Processed Result</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="whitespace-pre-wrap">{result}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}