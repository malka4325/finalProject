const Vacation = require("../models/Vacation")

const createNewVacation = async (req, res) => {
    const { area, location,TargetAudience, startDate,endDate,activities,maxParticipants,price,imageSrc,rating} = req.body
    if (!area||!location||!TargetAudience||!startDate||!endDate||!maxParticipants||!price)
        return res.status(400).json({ message: 'fields are required' })
    const vacation = await Vacation.create({ area, location,TargetAudience, startDate: new Date(startDate),endDate: new Date(endDate),activities,maxParticipants,price,imageSrc,rating})
    if (!vacation)
        return res.status(400).send('invalid vacation')
    res.json(await Vacation.find().lean())
}

const getAllVacations = async (req, res) => {
   const vacations=await Vacation.find().lean()
   if (!vacations)
    return res.status(400).send('vacations not found')
res.json(vacations)
}

const getVacationById = async (req, res) => {
    const {id}=req.params
    const vacation=await Vacation.findById(id).lean()
    if (!vacation)
     return res.status(400).send('vacation not found')
 res.json(vacation)
 }
 const getVacationByName = async (req, res) => {
    const { name } = req.params
    const vacations = await Vacation.find({ location:{$regex :name}}).lean()
    if (!vacations) {
        return res.json([])
    }
    res.json(vacations)
}

 const updateVacation = async (req, res) => {
    const { _id,area, location,TargetAudience,currentParticipants, startDate,endDate,activities,maxParticipants,price,imageSrc,rating} = req.body
    if (!_id||!area||!location||!TargetAudience||!startDate||!endDate||!maxParticipants||!price)
        return res.status(400).json({ message: 'fields are required' })
    const vacation = await Vacation.findById(_id).exec()
    if (!vacation)
        return res.status(400).send('vacation not found')
vacation.area=area
vacation.location=location
vacation.TargetAudience=TargetAudience
vacation.activities=activities
vacation.startDate=new Date(startDate)
vacation.endDate=new Date(endDate)
vacation.maxParticipants=maxParticipants
vacation.currentParticipants=currentParticipants
vacation.price=price
vacation.imageSrc=imageSrc
vacation.rating=rating
const updatevacation=await vacation.save()
if (!updatevacation)
return res.status(400).send('error update')
res.json(await Vacation.find().lean())
}

const deleteVacation = async (req, res) => {
    const {id} = req.params
    if (!id)
        return res.status(400).json({ message: 'id is required' })
    const vacation = await Vacation.findById(id).exec()
    if (!vacation)
        return res.status(400).send('vacation no found')
const del=await vacation.deleteOne()
if (!del)
return res.status(400).send('error delete')
res.json(await Vacation.find().lean())

}
module.exports = { createNewVacation,getAllVacations,getVacationById,updateVacation,deleteVacation ,getVacationByName}