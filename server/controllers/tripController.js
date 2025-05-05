const Trip = require("../models/Trip")

const createNewTrip = async (req, res) => {
    const { area, mainActivity,description,targetAudience, date,activities,maxParticipants,currentParticipants,price,imageSrc,madeByType,madeById} = req.body
    if (!area||!targetAudience||!date||!maxParticipants||!price)
        return res.status(400).json({ message: 'fields are required' })
    const trip = await Trip.create({ area, mainActivity,description,targetAudience, date,activities,maxParticipants,currentParticipants,price,imageSrc,madeByType,madeById})
    if (!trip)
        return res.status(400).send('invalid trip')
    res.json(await Trip.find().lean())
}

const getTrips = async (req, res) => {
    let query = {};
    const { fromDate, toDate, area } = req.query;

    // הוספת תנאים על פי הפרמטרים שנשלחו
    if (area) {
        query.area = { $regex: area, $options: 'i' };
    }
 

    if (fromDate || toDate) {
        query.date = {};
        if (fromDate) {
            query.date.$gte = new Date(fromDate);
        }
        if (toDate) {
            query.date.$lte = new Date(toDate);
        }
    }
    const trips = await Trip.find(query).lean();
   if (!trips)
    return res.status(400).send('trips not found')
res.json(trips)

}

const getTripById = async (req, res) => {
    const {id}=req.params
    const trip=await Trip.findById(id).lean()
    if (!trip)
     return res.status(400).send('trip not found')
 res.json(trip)
 }
 const getTripByName = async (req, res) => {
    const { name } = req.params
    const trips = await Trip.find({ mainActivity:{$regex :name}  }).lean()
    if (!trips) {
        return res.json([])
    }
    res.json(trips)
}

 const updateTrip = async (req, res) => {
    const { _id, area, mainActivity,description,targetAudience, date,activities,maxParticipants,currentParticipants,price,imageSrc} = req.body
    if (!_id||!area||!targetAudience||!date||!maxParticipants||!price)
        return res.status(400).json({ message: 'fields are required' })
    const trip = await Trip.findById(_id).exec()
    if (!trip)
        return res.status(400).send('trip not found')
trip.area=area
trip.mainActivity=mainActivity
trip.description=description
trip.targetAudience=targetAudience
trip.activities=activities
trip.date=date
trip.maxParticipants=maxParticipants
trip.currentParticipants=currentParticipants
trip.price=price
trip.imageSrc=imageSrc
const updatetrip=await trip.save()
if (!updatetrip)
return res.status(400).send('error update')
res.json(await Trip.find().lean())
}

const deleteTrip = async (req, res) => {
    const {id} = req.params
    if (!id)
        return res.status(400).json({ message: 'id is required' })
    const trip = await Trip.findById(id).exec()
    if (!trip)
        return res.status(400).send('trip no found')
const del=await trip.deleteOne()
if (!del)
return res.status(400).send('error delete')
res.json(await Trip.find().lean())

}
module.exports = { createNewTrip,getTrips,getTripById,updateTrip,deleteTrip ,getTripByName}