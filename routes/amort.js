const router = require('express').Router();
let Amort = require('../models/amort.model');

// Add Amort
router.route('/add').post((req, res) => {
    const clientid = req.body.clientid;
    const propertyid = req.body.propertyid;
    const amortmonths = req.body.amortmonths;
    const financing = req.body.financing;
    const startdate = req.body.startdate;
    const reservation = req.body.reservation;
    const totalmisc = req.body.totalmisc;
    const totalequity = req.body.totalequity;
    const monthlymisc = req.body.monthlymisc;
    const monthlyequity = req.body.monthlyequity;
    const penaltymiscpercent = req.body.penaltymiscpercent;
    const penaltyequitypercent = req.body.penaltyequitypercent;
    const status = req.body.status;


    Amort.find({
        clientid: clientid,
        propertyid:propertyid
    }, (err, amort) => {
        if (err) {
            return res.json('404');
        } else if (amort.length > 0) {
            return res.json('202');
        } else {
            const newAmort = new Amort({
                clientid,
                propertyid,
                amortmonths,
                financing,
                startdate,
                reservation,
                totalmisc,
                totalequity,
                monthlymisc,
                monthlyequity,
                penaltymiscpercent,
                penaltyequitypercent,
                status
            });
        
                newAmort.save()
                        .then(() => {
                            res.json('101')
                        })
                        .catch(err => res.status(400).json('Error: ' + err));
        }
    });

    
        
   
});

// Get All Amort
router.route('/').get((req, res) => {
    Amort.find((err, amort) => {
        if (err) {
            return res.json('404');
        } else if (amort.length > 0) {
            return res.json(amort);

        }else {
            return res.json(amort);
        }
    });
});

// Update Client information
// router.route('/update/:id').post((req,res) =>{
//     Client.findById(req.params.id)
//       .then(client => {
//         client.lastname = req.body.lastname;
//         client.firstname = req.body.firstname;
//         client.middlename = req.body.middlename;
//         client.contactnumber = req.body.contactnumber;
//         client.address = req.body.address;
//         client.city = req.body.city;
//         client.province = req.body.province;

//         client.save()
//                   .then(() => res.json('101'))
//                   .catch(err => res.status(400).json('Error: ' + err))
//       })
//       .catch(err => res.status(400).json('Error: '+ err))
   
// });

// Update client status
// router.route('/status/:id').post((req,res) =>{
//     Client.findById(req.params.id)
//       .then(client => {
//         client.status = req.body.status;
//         client.save()
//                   .then(() => res.json('101'))
//                   .catch(err => res.status(400).json('Error: ' + err))
//       })
//       .catch(err => res.status(400).json('Error: '+ err))
// });

// Get client by id
// router.route('/:id').get((req,res) =>{
//     Client.findById(req.params.id)
//         .then(client =>res.json(client))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

// Delete Client
router.route('/:id').delete((req, res) => {
    Amort.findByIdAndDelete(req.params.id)
        .then(() => res.json('101'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;