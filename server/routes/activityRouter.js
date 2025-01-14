const express=require("express")
const router=express.Router()
const activityController=require("../controllers/activityController")

router.get("/",activityController.getAllActivitys)
router.get("/:id",activityController.getActivityById)
router.get("/byName/:name",activityController.getActivityByName)
router.get("/byType/:name",activityController.getActivityByType)
router.post("/",activityController.createNewActivity)
router.put("/",activityController.updateActivity)
router.delete("/:id",activityController.deleteActivity)

module.exports=router