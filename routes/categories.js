const {Category} = require('../models/category');
const express = require('express');
const { User } = require('../models/user');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get(`/`, async (req, res) =>{
    const categoryList = await Category.find();

    if(!categoryList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(categoryList);
})

router.get(`/getData`, async (req, res) =>{

    const listUser = await User.find({});


    return res.status(200).send({data: listUser})
})

router.post(`/deleteUser`, async (req, res) =>{

    User.findByIdAndRemove(req?.body?.id).then(user =>{
        if(user) {
            return res.status(200).json({success: true, message: 'the user is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "user not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})


router.post('/addUser', async (req,res)=>{

    let user = new User({
        name: req.body?.name,
        email: req.body?.email,
        passwordHash: bcrypt.hashSync(req.body?.password, 10),
        phone: req.body?.phone,
        isAdmin: req.body?.isAdmin,
        street: req.body?.street,
        apartment: req.body?.apartment,
        zip: req.body?.zip,
        city: req.body?.city,
        country: req.body?.country,
    })
    user = await user.save();

    if(!user)
    return res.status(400).send('the user cannot be created!')

    res.send(user);
})


router.post(`/updateuser`, async (req, res) =>{

    const user = await User.findByIdAndUpdate(
        req?.body?.id,
        {
            name : req?.body?.name,
            email :  req?.body?.email,
            city :  req?.body?.city,
            country :  req?.body?.country,
            // isAdmin,
            phone :  req?.body?.phone,
        },
        { new: true}
    )

    if(!user)
    return res.status(400).send('the user cannot be updated!')

    return res.status(200).send({message : 'Update user success'})
})

router.get('/:id', async(req,res)=>{
    const category = await Category.findById(req.params.id);

    if(!category) {
        res.status(500).json({message: 'The category with the given ID was not found.'})
    } 
    res.status(200).send(category);
})



router.post('/', async (req,res)=>{
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })
    category = await category.save();

    if(!category)
    return res.status(400).send('the category cannot be created!')

    res.send(category);
})


router.put('/:id',async (req, res)=> {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon || category.icon,
            color: req.body.color,
        },
        { new: true}
    )

    if(!category)
    return res.status(400).send('the category cannot be created!')

    res.send(category);
})

router.delete('/:id', (req, res)=>{
    Category.findByIdAndRemove(req.params.id).then(category =>{
        if(category) {
            return res.status(200).json({success: true, message: 'the category is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "category not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

module.exports =router;