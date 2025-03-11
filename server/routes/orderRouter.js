const express=require("express")
const router=express.Router()
const orderController=require("../controllers/orderController")
const verifyJWT = require("../middleware/verifyJWT")
const isAdmin = require("../middleware/isAdmin")
router.use(verifyJWT)
router.post("/",orderController.createNewOrder)
router.get("/allOrders",isAdmin,orderController.getAllOrders)
router.get("/",orderController.getbyOrderedBy)
router.put("/",orderController.updateOrder)
router.delete("/:id",orderController.deleteOrder)

module.exports=router