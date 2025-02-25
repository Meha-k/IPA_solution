import { useState, useEffect } from 'react';

export default function DataEntryForm() {
  const [formData, setFormData] = useState({ name: '', email: '', order: '' });
  const [data, setData] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    fetch('/api/save-data')
      .then((res) => res.json())
      .then((data) => setData(data.data || []))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send data to API route
    const res = await fetch('/api/save-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    setData(result.data); // Update the table with new data
    setFormData({ name: '', email: '', order: '' }); // Clear the form
  };

  return (
    <div className="min-h-screen bg-gradient flex items-center justify-center p-8">
      <div className="card w-full max-w-4xl">
        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Data Entry Form</h2>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-field"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Order"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: e.target.value })}
              className="input-field"
            />
          </div>
          <button
            type="submit"
            className="btn-primary mt-4 ml-80 w-44"
          >
            Submit
          </button>
        </form>

        {/* Display Data in a Table */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Saved Data</h3>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Order</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.order}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}