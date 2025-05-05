const express=require("express")
const router=express.Router()
const activityController=require("../controllers/activityController")
const isAdmin = require("../middleware/isAdmin")
const verifyJWT = require("../middleware/verifyJWT")


router.get("/",activityController.getActivitys)
router.get("/:id",activityController.getActivityById)

router.post("/",verifyJWT,isAdmin,activityController.createNewActivity)
router.put("/",verifyJWT,isAdmin,activityController.updateActivity)
router.delete("/:id",verifyJWT,isAdmin,activityController.deleteActivity)

module.exports=router