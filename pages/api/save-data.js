// In-memory data storage
let dataStore = [];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, order } = req.body;

    // Validate input
    if (!name || !email || !order) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Add data to the in-memory store
    const newData = { name, email, order };
    dataStore.push(newData);

    // Return the updated data
    res.status(200).json({ data: dataStore });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Failed to save data' });
  }
}