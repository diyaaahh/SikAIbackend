const Material = require("../Models/Material");

// Controller to create a new material
const createMaterial = async (req, res) => {
  try {
    const { fileNameUrl, summary } = req.body;
    console.log(fileNameUrl);
    const newMaterial = await Material.create({
      fileNameUrl,
      summary,
      uploadDate: Date.now(),
    });
    res.status(201).json(newMaterial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to get all materials
const getAllMaterials = async (req, res) => {
  try {
    const materials = await Material.find();
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get a material by its ID
const getMaterialById = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }
    res.status(200).json(material);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to update a material by its ID
const updateMaterialById = async (req, res) => {
  try {
    const { content } = req.body;
    const updatedMaterial = await Material.findByIdAndUpdate(
      req.params.id,
      { content },
      { new: true }
    );
    if (!updatedMaterial) {
      return res.status(404).json({ message: "Material not found" });
    }
    res.status(200).json(updatedMaterial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to delete a material by its ID
const deleteMaterialById = async (req, res) => {
  try {
    const deletedMaterial = await Material.findByIdAndDelete(req.params.id);
    if (!deletedMaterial) {
      return res.status(404).json({ message: "Material not found" });
    }
    res.status(200).json({ message: "Material deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createMaterial,
  getAllMaterials,
  getMaterialById,
  updateMaterialById,
  deleteMaterialById,
};
