const router = require('express').Router();
let SystemLog = require('../models/systemlog.model');

// Add SystemLog
router.route('/add').post((req, res) => {
    const clientid = req.body.clientid;
    const process = req.body.process;
    const datetimes = req.body.datetimes;
    const dates = req.body.dates;
    const times = req.body.times;
    const logs = req.body.logs;
    const status = req.body.status;
    
    const newSystemLog = new SystemLog({
        clientid,
        process,
        datetimes,
        dates,
        times,
        logs,
        status
            });
        
            newSystemLog.save()
                        .then(() => {
                            res.json('101')
                        })
                        .catch(err => res.status(400).json('Error: ' + err));
      
    

    
        
   
});

// Get All Amort
router.route('/').get((req, res) => {
    SystemLog.find((err, systemlog) => {
        if (err) {
            return res.json('404');
        } else if (systemlog.length > 0) {
            return res.json(systemlog);

        }else {
            return res.json(systemlog);
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
    SystemLog.findByIdAndDelete(req.params.id)
        .then(() => res.json('101'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;