import React, { useEffect, useState } from "react";
import axios from "axios";
import AnimalCard from "./AnimalCard";
import AddAnimalModal from "./AddAnimalModal";
import './styles/AnimalCard.css';

const AnimalsPage = () => {
  const [animals, setAnimals] = useState([]);

  // Fetch all animals
  const fetchAnimals = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/animals`);
      setAnimals(response.data);
    } catch (error) {
      console.error("Error fetching animals:", error.message);
    }
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-6">Animal List</h2>
        <div className="bg-[#2d2d2d] p-6 rounded-lg shadow-md text-white">
          <AddAnimalModal fetchAnimals={fetchAnimals} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {animals.map((animal) => (
          <AnimalCard key={animal._id} animal={animal} fetchAnimals={fetchAnimals} />
        ))}
      </div>
    </div>
  );
};

export default AnimalsPage;