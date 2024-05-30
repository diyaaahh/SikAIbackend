const express = require("express");
const {
  createUser,
  userLogin,
  changePassword,
  deleteUser,
  updateUser,
  getAllUsers,
} = require("../Controllers/userController.js");

const router = express.Router();

router.post("/createUser", createUser);
router.post("/login", userLogin);
router.post("/changePassword", changePassword);
router.delete("/deleteUser/:email", deleteUser);
router.put("/updateUser/:email", updateUser);
router.get("/getAllUsers", getAllUsers);

module.exports = router;
