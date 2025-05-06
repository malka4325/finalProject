const Trip = require("../models/Trip")
const mongoose = require('mongoose');
const createNewTrip = async (req, res) => {
    const { area, location,description,targetAudience,isApproved, date,activities,maxParticipants,currentParticipants,price,imageSrc,madeByType,madeById} = req.body
    if (!area||!targetAudience||!date||!maxParticipants||!price)
        return res.status(400).json({ message: 'fields are required' })
    const trip = await Trip.create({ area, location,description,targetAudience,isApproved, date,activities,maxParticipants,currentParticipants,price,imageSrc,madeByType,madeById})
    if (!trip)
        return res.status(400).send('invalid trip')
    res.json(await Trip.find().lean())
}

const getTrips = async (req, res) => {
    let query = {};
    const { fromDate, toDate, area,madeById,madeByType } = req.query;

    // הוספת תנאים על פי הפרמטרים שנשלחו
    if (area) {
        query.area = { $regex: area, $options: 'i' };
    }
    if (madeById) {
     
        query.madeById = new mongoose.Types.ObjectId(madeById);
    }
    if (madeByType) {
        query.madeByType = { $regex: madeByType };
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
 const approvedTrip = async (req, res) => {
    const {id}=req.params
    const trip=await Trip.findById(id).lean()
    if (!trip)
     return res.status(400).send('trip not found')
     trip.isApproved=true;
 res.json(trip)
 }

 const updateTrip = async (req, res) => {
    const { _id, area, location,description,targetAudience, date,activities,maxParticipants,currentParticipants,price,imageSrc} = req.body
    if (!_id||!area||!targetAudience||!date||!maxParticipants||!price)
        return res.status(400).json({ message: 'fields are required' })
    const trip = await Trip.findById(_id).exec()
    if (!trip)
        return res.status(400).send('trip not found')
trip.area=area
trip.location=location
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
module.exports = { createNewTrip,getTrips,getTripById,updateTrip,deleteTrip ,approvedTrip}