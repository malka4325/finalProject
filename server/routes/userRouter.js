const express=require("express")
const router=express.Router()
const userController=require("../controllers/userController")
const isAdmin = require("../middleware/isAdmin")
const verifyJWT = require("../middleware/verifyJWT")

router.get("/",verifyJWT,isAdmin,userController.getAllUsers)
router.put("/",verifyJWT,userController.updateUser)
router.delete("/:id",verifyJWT,isAdmin,userController.deleteUser)

module.exports=router