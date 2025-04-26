const express=require("express")
const router=express.Router()
const vacationController=require("../controllers/vacationController")
const verifyJWT = require("../middleware/verifyJWT")
const isAdmin = require("../middleware/isAdmin")

router.get("/",vacationController.getVacations)
router.get("/:id",vacationController.getVacationById)

router.post("/",vacationController.createNewVacation)
router.put("/",verifyJWT,isAdmin,vacationController.updateVacation)
router.delete("/:id",verifyJWT,isAdmin,vacationController.deleteVacation)

module.exports=router