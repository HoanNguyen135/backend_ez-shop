const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.get(`/`, async (req, res) =>{
    console.log('call api');
    console.log(req);
    return res.send({id: 1000})
    // const userList = await User.find().select('-passwordHash');

    // if(!userList) {
    //     res.status(500).json({success: false})
    // } 
    // res.send(userList);
})



module.exports =router;