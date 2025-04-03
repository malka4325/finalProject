const Activity = require("../models/Activity")

const createNewActivity = async (req, res) => {
    const { name, description,type,imageSrc} = req.body
    if (!name)
        return res.status(400).json({ message: 'name is required' })
    const activity = await Activity.create( { name,description, type,imageSrc})
    if (!activity)
        return res.status(400).send('invalid activity')
    res.json(await Activity.find().lean())
}

const getAllActivitys = async (req, res) => {
   const activitys=await Activity.find().lean()
   if (!activitys)
    return res.status(400).send('activitys not found')
res.json(activitys)
}

const getActivityById = async (req, res) => {
    const {id}=req.params
    const activity=await Activity.findById(id).lean()
    if (!activity)
     return res.status(400).send('activity not found')
 res.json(activity)
 }
 const getActivityByName = async (req, res) => {
    const { name } = req.params
    const activitys = await Activity.find({ name:{$regex :name}  }).lean()
    if (!activitys) {
        return res.json([])
    }
    res.json(activitys)
}
const getActivityByType = async (req, res) => {
    const { type } = req.params
    const activitys = await Activity.find({ type:type }).lean()
    if (!activitys) {
        return res.json([])
    }
    res.json(activitys)
}

 const updateActivity = async (req, res) => {
    const { _id, name,type,description,imageSrc} = req.body
    if (!_id||!name)
        return res.status(400).json({ message: 'id and name are required' })
    const activity = await Activity.findById(_id).exec()
    if (!activity)
        return res.status(400).send('activity not found')
activity.name=name
activity.type=type
activity.imageSrc=imageSrc
activity.description=description
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
module.exports = { createNewActivity,getAllActivitys,getActivityByType,getActivityById,updateActivity,deleteActivity ,getActivityByName}