const express = require("express");
const router = express.Router();
const {
  createMaterial,
  getAllMaterials,
  getMaterialById,
  updateMaterialById,
  deleteMaterialById,
} = require("../Controllers/MaterialController");

// POST /materials - Create a new material
router.post("/", createMaterial);

// GET /materials - Retrieve all materials
router.get("/", getAllMaterials);

router.get('/:id/summary')

// GET /materials/:id - Retrieve a material by ID
router.get("/:id", getMaterialById);

// PUT /materials/:id - Update a material by ID
router.put("/:id", updateMaterialById);

// DELETE /materials/:id - Delete a material by ID
router.delete("/:id", deleteMaterialById);

module.exports = router;
