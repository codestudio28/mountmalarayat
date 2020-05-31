const router = require('express').Router();
let Voucher = require('../models/voucher.model');

// Add Amort
router.route('/add').post((req, res) => {
    const dates = req.body.dates;
    const payee = req.body.payee;
    const amount = req.body.amount;
    const cv = req.body.cv;
    const bank = req.body.bank;
    const explanation = req.body.explanation;
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
        explanation,
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

// Update voucher
router.route('/update/:id').post((req,res) =>{
    Voucher.findById(req.params.id)
      .then(voucher => {
        voucher.dates = req.body.dates;
        voucher.payee = req.body.payee;
        voucher.amount = req.body.amount;
        voucher.cv = req.body.cv;
        voucher.bank = req.body.bank;
        voucher.explanation = req.body.explanation;
        voucher.cheque = req.body.cheque;
        voucher.terms = req.body.terms;
        voucher.prepared = req.body.prepared;
        voucher.noted = req.body.noted;
        voucher.approved = req.body.approved;

        voucher.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
   
});

// Update voucher status
router.route('/status/:id').post((req,res) =>{
    Voucher.findById(req.params.id)
      .then(voucher => {
        voucher.status = req.body.status;
        voucher.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
});

// Get client by id
// router.route('/:id').get((req,res) =>{
//     Client.findById(req.params.id)
//         .then(client =>res.json(client))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

// Delete Client
router.route('/:id').delete((req, res) => {
    Voucher.findByIdAndDelete(req.params.id)
        .then(() => res.json('101'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;