const express=require("express")
const router=express.Router()
const tripController=require("../controllers/tripController")
const isAdmin = require("../middleware/isAdmin")
const verifyJWT = require("../middleware/verifyJWT")


router.get("/",tripController.getAllTrips)
router.get("/:id",tripController.getTripById)
// router.get("/byName/:name",tripController.getTripByName)
router.post("/",verifyJWT,isAdmin,tripController.createNewTrip)
router.put("/",verifyJWT,isAdmin,tripController.updateTrip)
router.delete("/:id",verifyJWT,isAdmin,tripController.deleteTrip)

module.exports=router