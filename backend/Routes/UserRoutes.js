const router = require("express").Router();

const {
  register,
  logIn,
  logOut,
  getAllUsers
} = require('../Controllers/userController')

router.post("/register", register);
router.post("/logIn", logIn);
router.post("/logOut", logOut);
router.get("/getAllusers", getAllUsers);

module.exports = router;