const router = require('express').Router();
let Client = require('../models/client.model');

// Add Client
router.route('/add').post((req, res) => {
    const lastname = req.body.lastname;
    const firstname = req.body.firstname;
    const middlename = req.body.middlename;
    const contactnumber = req.body.contactnumber;
    const address = req.body.address;
    const city = req.body.city;
    const province = req.body.province;
    const status = req.body.status;

    Client.find({
        lastname: lastname,
        firstname:firstname,
        middlename:middlename
    }, (err, client) => {
        if (err) {
            return res.json('404');
        } else if (client.length > 0) {
            return res.json('202');
        } else {
            const newClient = new Client({
                lastname,
                firstname,
                middlename,
                contactnumber,
                address,
                city,
                province,
                status
            });
            newClient.save()
                .then(() => {
                    res.json('101')
                })
                .catch(err => res.status(400).json('Error: ' + err));
        }
    });
});

// Get All Client
router.route('/').get((req, res) => {
    Client.find((err, client) => {
        if (err) {
            return res.json('404');
        } else if (client.length > 0) {
            return res.json(client);

        }else {
            return res.json(client);
        }
    });
});

// Update Client information
router.route('/update/:id').post((req,res) =>{
    Client.findById(req.params.id)
      .then(client => {
        client.lastname = req.body.lastname;
        client.firstname = req.body.firstname;
        client.middlename = req.body.middlename;
        client.contactnumber = req.body.contactnumber;
        client.address = req.body.address;
        client.city = req.body.city;
        client.province = req.body.province;

        client.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
   
});

// Update client status
router.route('/status/:id').post((req,res) =>{
    Client.findById(req.params.id)
      .then(client => {
        client.status = req.body.status;
        client.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
});

// Get client by id
router.route('/:id').get((req,res) =>{
    Client.findById(req.params.id)
        .then(client =>res.json(client))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete Client
router.route('/:id').delete((req, res) => {
    Client.findByIdAndDelete(req.params.id)
        .then(() => res.json('101'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;