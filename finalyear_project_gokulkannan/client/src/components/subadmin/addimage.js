import React, { useState } from 'react';
import axios from 'axios';
import SubAdminNavbar from './navbarsubadmin';

const ImageUpload = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('/auth/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Image uploaded successfully:', response.data);
      // Add code to handle successful upload
    } catch (error) {
      console.error('Error uploading image:', error);
      // Add code to handle upload error
    }
  };

  return (
    <div className="image-upload-container">
      <SubAdminNavbar />
      <input type="file" onChange={handleImageChange} style={inputStyle} />
      <button onClick={handleImageUpload} style={buttonStyle}>Upload Image</button>
    </div>
  );
};

// Define styles
const inputStyle = {
  marginBottom: '10px',
};

const buttonStyle = {
  backgroundColor: '#007bff',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default ImageUpload;
