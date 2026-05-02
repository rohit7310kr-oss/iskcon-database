const Devotee = require("../models/Devotee");

exports.getDevotees = async (req, res) => {
  try {
    const devotees = await Devotee.find().sort({ createdAt: -1 });
    res.json(devotees);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch devotees", error: error.message });
  }
};

exports.createDevotee = async (req, res) => {
  try {
    const alreadyRegisteredDevotee = await Devotee.find({
      phone: req.body.phone,
    });
    let devotee;
    console.log(alreadyRegisteredDevotee);

    if (alreadyRegisteredDevotee.length)
      devotee = await Devotee.updateOne(
        { phone: req.body.phone },
        { $addToSet: { date: { $each: [req.body.date] } } },
      );
    else
      devotee = await Devotee.create({
        ...req.body,
        date: [req.body.date],
      });

    res.status(201).json(devotee);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create devotee", error: error.message });
  }
};

exports.getDevoteeById = async (req, res) => {
  try {
    const devotee = await Devotee.findById(req.params.id);
    if (!devotee) {
      return res.status(404).json({ message: "Devotee not found" });
    }
    res.json(devotee);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch devotee", error: error.message });
  }
};

exports.updateDevotee = async (req, res) => {
  try {
    const devotee = await Devotee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!devotee) {
      return res.status(404).json({ message: "Devotee not found" });
    }
    res.json(devotee);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to update devotee", error: error.message });
  }
};

exports.deleteDevotee = async (req, res) => {
  try {
    const devotee = await Devotee.findByIdAndDelete(req.params.id);
    if (!devotee) {
      return res.status(404).json({ message: "Devotee not found" });
    }
    res.json({ message: "Devotee removed" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete devotee", error: error.message });
  }
};
