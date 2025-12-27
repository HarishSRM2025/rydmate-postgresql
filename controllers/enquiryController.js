const Enquiry = require("../models/Enquiry");

exports.createEnquiry = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const existingEnquiry = await Enquiry.findOne({ where: { email } });
    if (existingEnquiry) {
      return res.status(400).json({ message: "Enquiry already submitted" });
    }

    const enquiry = await Enquiry.create({
      name,
      email,
      phone
    });

    res.status(201).json({
      message: "Enquiry submitted successfully",
      enquiry
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to submit enquiry", error });
  }
};

exports.getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.findAll({
      order: [["createdAt", "DESC"]]
    });

    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch enquiries", error });
  }
};

exports.deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const enquiry = await Enquiry.findByPk(id);
    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

    await enquiry.destroy();
    res.json({ message: "Enquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete enquiry", error });
  }
};
