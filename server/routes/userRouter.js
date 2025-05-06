const express=require("express")
const router=express.Router()
const userController=require("../controllers/userController")
const isAdmin = require("../middleware/isAdmin")
const verifyJWT = require("../middleware/verifyJWT")

router.get("/",verifyJWT,isAdmin,userController.getAllUsers)
router.get("/:id",verifyJWT,isAdmin,userController.getUserById)
router.put("/",verifyJWT,userController.updateUser)
router.delete("/:id",verifyJWT,isAdmin,userController.deleteUser)

module.exports=router