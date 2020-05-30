const router = require('express').Router();
let Voucher = require('../models/voucher.model');

// Add Amort
router.route('/add').post((req, res) => {
    const dates = req.body.dates;
    const payee = req.body.payee;
    const amount = req.body.amount;
    const cv = req.body.cv;
    const bank = req.body.bank;
    const cheque = req.body.cheque;
    const terms = req.body.terms;
    const prepared = req.body.prepared;
    const noted = req.body.noted;
    const approved = req.body.approved;
    const status = req.body.status;

    const newVoucher = new Voucher({
        dates,
        payee,
        amount,
        cv,
        bank,
        cheque,
        terms,
        prepared ,
        noted,
        approved,
        status
    });

        newVoucher.save()
                .then(() => {
                    res.json('101')
                })
                .catch(err => res.status(400).json('Error: ' + err));
     
   
});

// Get All Amort
router.route('/').get((req, res) => {
    Voucher.find((err, voucher) => {
        if (err) {
            return res.json('404');
        } else if (voucher.length > 0) {
            return res.json(voucher);

        }else {
            return res.json(voucher);
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