const Activity = require("../models/Activity")

const createNewActivity = async (req, res) => {
    const { area,name,price, description,type,imageSrc,targetAudience} = req.body
    if (!name||!price)
        return res.status(400).json({ message: 'name is required' })
    const activity = await Activity.create( { area,name,price,description, type,imageSrc,targetAudience})
    if (!activity)
        return res.status(400).send('invalid activity')
    res.json(await Activity.find().lean())
}

const getActivitys = async (req, res) => {
    const {ids}=req.query; 
    let query = {};
    const {  area,targetAudience,type,maxPrice,name } = req.query;
    console.log(area,targetAudience,type,maxPrice,name);
    let activities=[];
    if(ids){
    const idsArray=ids.split(",")
    for (const id of idsArray) {
        const activity =await Activity.findById(id).lean()
        if (!activity)
            return res.status(400).send('activities not found')
        activities.push(activity)
    }
    }
    else {
        if (area) {
            query.area = { $regex: area, $options: 'i' };
        }
        if (targetAudience) {
            query.$or = [
                { targetAudience: { $regex: targetAudience, $options: 'i' } },
                { targetAudience: { $exists: false } },
                { targetAudience: { $regex: "undefined"}}
            ];
        }
        if (type) {
            query.type = { $regex: type, $options: 'i' };
        }
        if (maxPrice) {
            query.price = { $lte: Number(maxPrice)};
        }
        if (name) {
            query.name = { $regex: name, $options: 'i' };
        }

    activities=await Activity.find(query).lean()
    //console.log(activities);
    if (!activities)
        return res.status(400).send('activities not found')}

res.json(activities)
}

const getActivityById = async (req, res) => {
    const {id}=req.params
    const activity=await Activity.findById(id).lean()
    if (!activity)
     return res.status(400).send('activity not found')
 res.json(activity)
 }



const updateActivity = async (req, res) => {
    const { _id, name,targetAudience,area,type,price,description,imageSrc} = req.body
    if (!_id||!name)
        return res.status(400).json({ message: 'id and name are required' })
    const activity = await Activity.findById(_id).exec()
    if (!activity)
        return res.status(400).send('activity not found')
activity.name=name
activity.type=type
activity.price=price
activity.area=area
activity.imageSrc=imageSrc
activity.description=description
activity.targetAudience=targetAudience
const updateactivity=await activity.save()
if (!updateactivity)
return res.status(400).send('error update')
res.json(await Activity.find().lean())
}

const deleteActivity = async (req, res) => {
    const {id} = req.params
    if (!id)
        return res.status(400).json({ message: 'id is required' })
    const activity = await Activity.findById(id).exec()
    if (!activity)
        return res.status(400).send('activity no found')
const del=await activity.deleteOne()
if (!del)
return res.status(400).send('error delete')
res.json(await Activity.find().lean())

}
module.exports = { createNewActivity,getActivitys,getActivityById,updateActivity,deleteActivity }