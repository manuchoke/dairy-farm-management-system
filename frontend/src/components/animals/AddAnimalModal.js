import React, { useState } from "react";
import axios from "axios";

const AddAnimalModal  = ({ fetchAnimals }) => {
  const [formData, setFormData] = useState({ tagId: "", breed: "" });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Store the selected image file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tagId || !formData.breed || !image) {
      alert("Please fill in all fields and select an image.");
      return;
    }

    const formDataWithImage = new FormData();
    formDataWithImage.append('tagId', formData.tagId);
    formDataWithImage.append('breed', formData.breed);
    formDataWithImage.append('image', image); // Append the image file

      try {
      const response = await axios.post(`http://localhost:5000/api/animals/add-with-image`, formDataWithImage, {
        headers: { 'Content-Type': 'multipart/form-data' }, // Set the content type for file uploads
      });

      console.log("Animal Added:", response.data);
      alert("Animal added successfully!");

      // Refresh the list of animals
      fetchAnimals();

      // Reset the form fields
      setFormData({
        tagId: '',
        breed: '',
      });
      setImage(null); // Clear the selected image
    } catch (error) {
      console.error("Error adding animal:", error.response?.data || error.message);
      alert("Failed to add animal.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
      <div className="mb-2">
        <label className="block text-gray-700 font-bold mb-1 text-sm">Tag ID:</label>
        <input
          type="text"
          name="tagId"
          value={formData.tagId}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1 bg-white text-sm"
          required
        />
      </div>

      <div className="mb-2">
        <label className="block text-gray-700 font-bold mb-1 text-sm">Breed:</label>
        <input
          type="text"
          name="breed"
          value={formData.breed}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1 bg-white text-sm"
          required
        />
      </div>

      <div className="mb-2">
        <label className="block text-gray-700 font-bold mb-1 text-sm">Image:</label>
        <input type="file" name="image" onChange={handleImageChange} accept="image/*" className="text-sm" />
      </div>

      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm">
        Add Animal
      </button>
    </form>
  );
};

export default AddAnimalModal;