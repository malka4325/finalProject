const Vacation = require("../models/Vacation")

const createNewVacation = async (req, res) => {

    const { area, location,description,targetAudience, startDate,endDate,activities,maxParticipants,price,imageSrc,rating} = req.body
   if (!area||!location||!targetAudience||!startDate||!endDate||!maxParticipants||!price)
    
        return res.status(400).json({ message: 'לא הוכנסו כל השדות הנדרשים' })
        const validAreas = ['צפון', 'דרום', 'מרכז', 'אזור ירושלים'];
        if (!validAreas.includes(area)) {
            return res.status(400).json({ message: 'אזור לא חוקי, יש להכניס צפון, דרום, מרכז או אזור ירושלים' });
        }
        const vacation = await Vacation.create({ area, location,targetAudience,description, startDate: new Date(startDate),endDate: new Date(endDate),activities,maxParticipants,price,imageSrc,rating})
      
 
    
    
    
    if (!vacation)
        return res.status(400).send('invalid vacation')
    res.json(await Vacation.find().lean())
}

const getVacations = async (req, res) => {
    let query = {};
    const { fromDate, toDate, area,name } = req.query;

    // הוספת תנאים על פי הפרמטרים שנשלחו
    if (area) {
        query.area = { $regex: area, $options: 'i' };
    }
    if (name) {
        query.name = { $regex: name, $options: 'i' };
    }

    if (fromDate || toDate) {
        query.startDate = {};
        if (fromDate) {
            query.startDate.$gte = new Date(fromDate);
        }
        if (toDate) {
            query.startDate.$lte = new Date(toDate);
        }
    }
   
    const vacations = await Vacation.find(query).lean();
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


 const updateVacation = async (req, res) => {
    const { _id,area, location,description,targetAudience,currentParticipants, startDate,endDate,activities,maxParticipants,price,imageSrc,rating} = req.body
    if (!_id||!area||!location||!targetAudience||!startDate||!endDate||!maxParticipants||!price)
        return res.status(400).json({ message: 'fields are required' })
    const vacation = await Vacation.findById(_id).exec()
    if (!vacation)
        return res.status(400).send('vacation not found')
vacation.area=area
vacation.location=location
vacation.description=description
vacation.targetAudience=targetAudience
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
module.exports = { createNewVacation,getVacations,getVacationById,updateVacation,deleteVacation }