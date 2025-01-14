const express=require("express")
const router=express.Router()
const orderController=require("../controllers/orderController")
router.post("/",orderController.createNewOrder)
router.get("/",orderController.getAllOrders)
router.get("/:orderedBy",orderController.getbyOrderedBy)
router.put("/",orderController.updateOrder)
router.delete("/:id",orderController.deleteOrder)

module.exports=router