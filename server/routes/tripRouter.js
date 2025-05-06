const express=require("express")
const router=express.Router()
const tripController=require("../controllers/tripController")
const isAdmin = require("../middleware/isAdmin")
const verifyJWT = require("../middleware/verifyJWT")


router.get("/",tripController.getTrips)
router.get("/:id",tripController.getTripById)
router.put("/:id",tripController.approvedTrip)
router.post("/",verifyJWT,tripController.createNewTrip)
router.put("/",verifyJWT,isAdmin,tripController.updateTrip)
router.delete("/:id",verifyJWT,isAdmin,tripController.deleteTrip)

module.exports=router