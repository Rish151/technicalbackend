const express = require("express");
const adminControllers = require("../controllers/admin-controllers");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

const router = express.Router();

router
  .route("/users")
  .get(authMiddleware, adminMiddleware, adminControllers.getAllUsers);

//edit button in admin user panel
router
  .route("/users/:id")
  .get(authMiddleware, adminMiddleware, adminControllers.getUserById);

//update in admin panel
router
  .route("/users/update/:id")
  .patch(authMiddleware, adminMiddleware, adminControllers.updateUserById);

//delete button in admin user panel
router
  .route("/users/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminControllers.deleteUserById);

//delete button in admin conatct panel
router
  .route("/contacts/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminControllers.deleteContactById);

router
  .route("/contacts")
  .get(authMiddleware, adminMiddleware, adminControllers.getAllContacts);

module.exports = router;
