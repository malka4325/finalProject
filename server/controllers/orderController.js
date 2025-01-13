const Order=require("../models/Order")
const User=require("../models/User")
const createNewOrder=async (req,res)=>{
 const {orderedBy,trip,vacation,numOfJoined}=req.body
 if(!orderedBy)
    return res.status(400).json({message:"orderedby is required"})
const order = await Order.create({ orderedBy,trip,vacation,numOfJoined })
    if (!order)
        return res.status(400).send('not correct order')
    res.json(await Order.find().populate('orderedBy'))
}
const getAllOrders=async (req,res)=>{
    const orders = await Order.find().lean().populate('orderedBy')
        if (!orders)
            return res.status(400).send('no orders')
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

module.exports={createNewOrder,getAllOrders,updateOrder,deleteOrder}