import React from 'react';
import VoluntierNavbar from './navbarvoluntier';

const AgricultureDetailsPage = () => {
  // Define different sets of agriculture details
  const agricultureDetails = [
    {
      soil: 'Perfect for all plants',
      plants: ['Tomato', 'Lettuce', 'Carrot'],
      trees: ['Apple Tree', 'Orange Tree', 'Banana Tree'],
      temperature: '20-30°C',
      humidity: '50-70%',
      sunlight: 'Full sun',
      water: 'Regular watering',
      pests: 'Minimal pests'
    },
    {
      soil: 'Well-drained',
      plants: ['Cabbage', 'Spinach', 'Onion'],
      trees: ['Pear Tree', 'Peach Tree', 'Plum Tree'],
      temperature: '15-25°C',
      humidity: '60-80%',
      sunlight: 'Partial shade',
      water: 'Moderate watering',
      pests: 'Some pests'
    },
    {
        soil: 'Well-drained',
        plants: ['Cabbage', 'Spinach', 'Onion'],
        trees: ['Pear Tree', 'Peach Tree', 'Plum Tree'],
        temperature: '15-25°C',
        humidity: '60-80%',
        sunlight: 'Partial shade',
        water: 'Moderate watering',
        pests: 'Some pests'
      },
    // Add more sets of details as needed
  ];

  const handlePrint = () => {
    window.print(); // Print the page
  };

  return (
    <>
      <VoluntierNavbar />
      <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#f5f5f5', padding: '40px' }}>
        {agricultureDetails.map((details, index) => (
          <div key={index} style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#fff' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Agriculture Details </h1>
            <div style={{ marginBottom: '10px' }}>
              <p><strong>Soil:</strong> {details.soil}</p>
              <p><strong>Plants:</strong> {details.plants.join(', ')}</p>
              <p><strong>Trees:</strong> {details.trees.join(', ')}</p>
              <p><strong>Temperature:</strong> {details.temperature}</p>
              <p><strong>Humidity:</strong> {details.humidity}</p>
              <p><strong>Sunlight:</strong> {details.sunlight}</p>
              <p><strong>Water:</strong> {details.water}</p>
              <p><strong>Pests:</strong> {details.pests}</p>
            </div>
            {/* Display more details as needed */}
          </div>
        ))}
      </div>
      <button style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px', border: 'none', cursor: 'pointer', width: '100px', alignSelf: 'center', marginBottom: '20px' }} onClick={handlePrint}>Print</button>
    </>
  );
};

export default AgricultureDetailsPage;
