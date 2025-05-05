const Order=require("../models/Order")
const User=require("../models/User")
const Vacation = require("../models/Vacation")
const Trip = require("../models/Trip")
const createNewOrder=async (req,res)=>{
 const {orderedBy,trip,vacation,numOfJoined}=req.body
 
 if(!orderedBy)
    return res.status(400).json({message:"orderedby is required"})
    if(vacation){
    const realVacation=await Vacation.findById(vacation).exec()
    if(!realVacation)
    return res.status(400).send("vacation not found")
    if(realVacation.currentParticipants+Number(numOfJoined)>realVacation.maxParticipants)
    return res.status(400).send("too mach joined")
    
    realVacation.currentParticipants += Number(numOfJoined)
        const updatevacation=await realVacation.save()
    if (!updatevacation)
    return res.status(400).send('error update')

}
if(trip){
    const realTrip=await Trip.findById(trip).exec()
    if(!realTrip)
    return res.status(400).send("trip not found")
    if(realTrip.currentParticipants+Number(numOfJoined)>realTrip.maxParticipants)
    return res.status(400).send("too mach joined")
    realTrip.currentParticipants += Number(numOfJoined)
        const updateTrip=await realTrip.save()
if (!updateTrip)
return res.status(400).send('error update')
}

const order = await Order.create({ orderedBy,trip,vacation,numOfJoined })
    if (!order)
        return res.status(400).send('not correct order')
    res.json("your orders code is: "+order._id)
}
const getAllOrders=async (req,res)=>{
    const orders = await Order.find().lean().populate('orderedBy').populate('vacation').populate('trip')
        if (!orders)
            return res.status(400).send('no orders')
        res.json(orders)
}

const getbyOrderedBy=async (req,res)=>{
    const orderedBy=req.user._id
    const orders = await Order.find({orderedBy}).lean().populate('orderedBy').populate('trip').populate('vacation')
        if (!orders)
            return res.status(400).send('no orders for user')
        res.json(orders)
}

const updateOrder=async (req,res)=>{
    const {_id,orderedBy,trip,vacation,numOfJoined} = req.body
    if(!orderedBy)
        return res.status(400).json({message:"orderedby is required"})
        const order = await Order.findById(_id).exec()
        if (!order)
            return res.status(400).send('order not found')
        order.orderedBy=orderedBy
        order.trip=trip
        order.vacation=vacation
        order.numOfJoined=numOfJoined
       
    const updateorder=await order.save()
    res.json(await Order.find().populate('orderedBy'))
}

const deleteOrder = async (req, res) => {
    const { id } = req.params
    if (!id)
        return res.status(400).json({ message: 'id is required' })
    const order = await Order.findById(id).exec()
    if (!order)
        return res.status(400).send('order not found')
    const del = await order.deleteOne()
    res.json(await Order.find().populate('orderedBy'))
}

module.exports={createNewOrder,getAllOrders,updateOrder,deleteOrder,getbyOrderedBy}