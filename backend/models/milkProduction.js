const mongoose = require("mongoose");

// Define the milk production schema
const MilkProductionSchema = new mongoose.Schema(
  {
    animalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Animal",
      required: true,
    },
    morningMilk: {
      type: Number,
      required: true,
    },
    eveningMilk: {
      type: Number,
      required: true,
    },
    totalMilk: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Export the model
module.exports = mongoose.model("MilkProduction", MilkProductionSchema);