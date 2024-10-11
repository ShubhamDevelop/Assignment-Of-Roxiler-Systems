import seedService from "../services/seedService.js";

const seedDatabase = async (req, res) => {
  try {
    await seedService();
    res.status(200).json({ message: "Database initialized successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error initializing database", error });
  }
};

export default seedDatabase;
