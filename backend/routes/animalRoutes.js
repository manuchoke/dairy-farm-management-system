const express = require('express');
const router = express.Router();
const { getAllAnimals, addAnimalWithImage, updateAnimal, deleteAnimal, getAnimalById, getImage } = require('../controllers/animalController');
const { protect } = require('../middleware/authMiddleware');

// Fetch all animals
router.get('/', protect, getAllAnimals);

// Add a new animal with image upload
    router.post('/add-with-image', protect, require('../middleware/upload').single('image'), addAnimalWithImage);

// Serve images
router.get('/images/:filename', getImage);

// Fetch an animal by ID
router.get('/:id', protect, getAnimalById);

// Update an animal
router.put('/:id', protect, updateAnimal);

// Delete an animal
router.delete('/:id', protect, deleteAnimal);


module.exports = router;