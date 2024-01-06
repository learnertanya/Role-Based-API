const express = require('express');
const adminMiddleware = require('../middlewares/adminMiddleware');
const adminController = require('../controllers/adminController');
const Admin = require('../models/Admin'); // Assuming you have an Admin model
const validator = require("../middlewares/validator")
const adminSchema = require("../schemas/admin")
const upload = require("../config/multer")

const router = express.Router();

// Use the adminMiddleware in routes that require admin authentication
router.use(adminMiddleware);

router.post('/logout',adminController.logoutAdmin)

router.get('/users', adminController.viewAllUsers);

router.post('/modifyUser',upload.single("profileImage"),validator(adminSchema.adminModifyUserSchema), adminController.modifyUserDetails);

router.post('/deleteUser', adminController.deleteUser);

module.exports = router;
