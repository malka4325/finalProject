const express=require("express")
const router=express.Router()
const activityController=require("../controllers/activityController")
const isAdmin = require("../middleware/isAdmin")
const verifyJWT = require("../middleware/verifyJWT")
router.use(verifyJWT)

router.get("/",activityController.getAllActivitys)
router.get("/:id",activityController.getActivityById)
router.get("/byName/:name",activityController.getActivityByName)
router.get("/byType/:name",activityController.getActivityByType)
router.post("/",isAdmin,activityController.createNewActivity)
router.put("/",isAdmin,activityController.updateActivity)
router.delete("/:id",isAdmin,activityController.deleteActivity)

module.exports=router