const Animal = require('../models/Animal');
const path = require('path');
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the folder where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename
  },
});

const upload = multer({ storage });

// Middleware for image uploads
exports.uploadMiddleware = upload.single('image');

// Add a new animal with image upload
exports.addAnimalWithImage = async (req, res) => {
  try {
    const { tagId, breed } = req.body;
    const image = req.file ? req.file.filename : ''; // Use the uploaded file name or an empty string

    if (!tagId || !breed) {
      return res.status(400).json({ message: "Tag ID and breed are required" });
    }

    const existingAnimal = await Animal.findOne({ tagId });
    if (existingAnimal) {
      return res.status(400).json({ message: "Animal with this tag ID already exists" });
    }

    const newAnimal = new Animal({ tagId, breed, image });
    await newAnimal.save();

    res.status(201).json({ message: "Animal added successfully", animal: newAnimal });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Route to serve images
exports.getImage = (req, res) => {
  const imagePath = path.join(__dirname, '../uploads/', req.params.filename);
  res.sendFile(imagePath, { root: process.cwd() }, (err) => {
    if (err) {
      console.error("Error serving image:", err);
      res.status(404).json({ message: "Image not found" });
    }
  });
};

// Get all animals
exports.getAllAnimals = async (req, res) => {
  try {
    const animals = await Animal.find().select('tagId breed image');
    res.status(200).json(animals);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get animal by ID
exports.getAnimalById = async (req, res) => {
  try {
    const { id } = req.params;
    const animal = await Animal.findById(id).select('tagId breed image');

    if (!animal) {
      return res.status(404).json({ message: "Animal not found" });
    }

    res.status(200).json(animal);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Update an animal
exports.updateAnimal = async (req, res) => {
  try {
    const { id } = req.params;
    const { tagId, breed, image } = req.body;

    if (!tagId && !breed && !image) {
      return res.status(400).json({ message: "Provide at least one field to update" });
    }

    const updatedAnimal = await Animal.findByIdAndUpdate(
      id,
      { tagId, breed, image },
      { new: true, runValidators: true }
    );

    if (!updatedAnimal) {
      return res.status(404).json({ message: "Animal not found" });
    }

    res.status(200).json({ message: "Animal updated successfully", animal: updatedAnimal });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Delete an animal
exports.deleteAnimal = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAnimal = await Animal.findByIdAndDelete(id);

    if (!deletedAnimal) {
      return res.status(404).json({ message: "Animal not found" });
    }

    res.status(200).json({ message: "Animal deleted successfully", animal: deletedAnimal });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};