const express=require("express")
const router=express.Router()
const userController=require("../controllers/userController")
const isAdmin = require("../middleware/isAdmin")

router.get("/",isAdmin,userController.getAllUsers)
router.put("/",userController.updateUser)
router.delete("/:id",isAdmin,userController.deleteUser)

module.exports=router