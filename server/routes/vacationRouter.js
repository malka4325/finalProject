const express=require("express")
const router=express.Router()
const vacationController=require("../controllers/vacationController")

router.get("/",vacationController.getAllVacations)
router.get("/:id",vacationController.getVacationById)
router.get("/byName/:name",vacationController.getvacationByTitle)
router.vacation("/",vacationController.createNewVacation)
router.put("/",vacationController.updateVacation)
router.delete("/:id",vacationController.deleteVacation)

module.exports=router