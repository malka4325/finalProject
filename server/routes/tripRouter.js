const express=require("express")
const router=express.Router()
const tripController=require("../controllers/tripController")

router.get("/",tripController.getAllTrips)
router.get("/:id",tripController.getTripById)
router.get("/byName/:name",tripController.getTripByName)
router.post("/",tripController.createNewTrip)
router.put("/",tripController.updateTrip)
router.delete("/:id",tripController.deleteTrip)

module.exports=router