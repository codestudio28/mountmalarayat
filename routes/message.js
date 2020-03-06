const router = require('express').Router();
let Message = require('../models/message.model');


// Add Message
router.route('/add').post((req, res) => {
    const lastname = req.body.lastname;
    const firstname = req.body.firstname;
    const middlename = req.body.middlename;
    const contactnumber = req.body.contactnumber;
    const address = req.body.address;
    const city = req.body.city;
    const province = req.body.province;
    const email= req.body.email;
    const birthdate= req.body.birthdate;
    const salaryrange= req.body.salaryrange;
    const message= req.body.message;
    const dates= req.body.dates;
    const status = req.body.status;

    const newMessage = new Message({
        lastname,
        firstname,
        middlename,
        contactnumber,
        address,
        city,
        province,
        email,
        birthdate,
        salaryrange,
        message,
        dates,
        status
    });

    newMessage.save()
        .then(() => {
            res.json('101')
        })
    .catch(err => res.status(400).json('Error: ' + err));
     
});

// Get All Message
router.route('/').get((req, res) => {
    Message.find((err, message) => {
        if (err) {
            return res.json('404');
        } else if (message.length > 0) {
            return res.json(message);

        }else {
            return res.json(message);
        }
    });
});

module.exports = router;