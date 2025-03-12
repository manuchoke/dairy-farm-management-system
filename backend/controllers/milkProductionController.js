const MilkProduction = require("../models/MilkProduction");
const Animal = require("../models/Animal");

// Add a new milk production record
exports.addMilkProduction = async (req, res) => {
  try {
    const { animalId, morningMilk, eveningMilk, date } = req.body;

    // Validate input
    if (!animalId || !morningMilk || !eveningMilk || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Calculate total milk
    const totalMilk = parseFloat(morningMilk) + parseFloat(eveningMilk);

    // Create a new milk production record
    const newRecord = new MilkProduction({
      animalId,
      morningMilk,
      eveningMilk,
      totalMilk,
      date: new Date(date),
    });

    // Save the record to the database
    await newRecord.save();

    res.status(201).json({ message: "Milk production record added successfully", newRecord });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get milk production records by date
exports.getMilkRecordsByDate = async (req, res) => {
  try {
    const { date } = req.query;
    console.log("Requested date:", date); // Debug log

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    // Create start and end of the day
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    console.log("Searching between:", startDate, "and", endDate); // Debug log

    // Fetch records for the date range
    const records = await MilkProduction.find({
      date: {
        $gte: startDate,
        $lte: endDate
      }
    }).lean();

    console.log("Found records:", records); // Debug log

    // Return the raw records without transformation
    res.status(200).json(records);

  } catch (error) {
    console.error("Server error in getMilkRecordsByDate:", error);
    res.status(500).json({ 
      message: "Server Error", 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// Get all milk production records
exports.getAllMilkRecords = async (req, res) => {
  try {
    // Fetch all records
    const records = await MilkProduction.find()
      .populate("animalId", "tagId breed")
      .select("animalId morningMilk eveningMilk totalMilk date");

    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get milk production data (optional route)
exports.getMilkProductionData = async (req, res) => {
  try {
    const { date } = req.query;

    // Validate date parameter
    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    // Ensure date is properly formatted
    const formattedDate = new Date(date).toISOString().split("T")[0];

    // Fetch milk production data for the specified date
    const milkData = await MilkProduction.find({ date: { $regex: formattedDate } });

    res.status(200).json(milkData);
  } catch (error) {
    console.error("Error fetching milk data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a milk production record
exports.updateMilkProduction = async (req, res) => {
  try {
    const { id } = req.params;
    const { animalId, morningMilk, eveningMilk, date } = req.body;

    // Validate input
    if (!animalId || !morningMilk || !eveningMilk || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Calculate total milk
    const totalMilk = parseFloat(morningMilk) + parseFloat(eveningMilk);

    // Find and update the record
    const updatedRecord = await MilkProduction.findByIdAndUpdate(
      id,
      {
        animalId,
        morningMilk: parseFloat(morningMilk),
        eveningMilk: parseFloat(eveningMilk),
        totalMilk,
        date: new Date(date)
      },
      { new: true, runValidators: true }
    );

    if (!updatedRecord) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.status(200).json({
      message: "Milk production record updated successfully",
      record: updatedRecord
    });
  } catch (error) {
    console.error("Error updating milk production record:", error);
    res.status(500).json({ 
      message: "Server Error", 
      error: error.message 
    });
  }
};

// Delete a milk production record
exports.deleteMilkProduction = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the record
    const deletedRecord = await MilkProduction.findByIdAndDelete(id);

    if (!deletedRecord) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.status(200).json({
      message: "Milk production record deleted successfully",
      record: deletedRecord
    });
  } catch (error) {
    console.error("Error deleting milk production record:", error);
    res.status(500).json({ 
      message: "Server Error", 
      error: error.message 
    });
  }
};