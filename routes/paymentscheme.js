const router = require('express').Router();
let Paymentscheme = require('../models/paymentscheme.model');

// Add Payment Scheme
router.route('/add').post((req, res) => {
    const paymentname = req.body.paymentname;
    const percentage = req.body.percentage;
    const numyear = req.body.numyear;
    const status = req.body.status;

    
            const newPaymentscheme = new Paymentscheme({
                paymentname,
                percentage,
                numyear,
                status
            });
            newPaymentscheme.save()
                .then(() => {
                    res.json('101')
                })
       
});
// Get All Payment Scheme
router.route('/').get((req, res) => {
    Paymentscheme.find((err, paymentscheme) => {
        if (err) {
            return res.json('404');
        } else if (paymentscheme.length > 0) {
            return res.json(paymentscheme);

        }else {
            return res.json(paymentscheme);
        }
    });
});


// Update Payment Scheme information
router.route('/update/:id').post((req,res) =>{
    Paymentscheme.findById(req.params.id)
      .then(paymentscheme => {
        paymentscheme.paymentname = req.body.paymentname;
        paymentscheme.percentage = req.body.percentage;
        paymentscheme.numyear = req.body.numyear;

        paymentscheme.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
   
});

// Update payment scheme status
router.route('/status/:id').post((req,res) =>{
    Paymentscheme.findById(req.params.id)
      .then(paymentscheme => {
        paymentscheme.status = req.body.status;
        paymentscheme.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
});


// Get payment scheme by id
router.route('/:id').get((req,res) =>{
    Paymentscheme.findById(req.params.id)
        .then(client =>res.json(client))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete  payment scheme
router.route('/:id').delete((req, res) => {
    Paymentscheme.findByIdAndDelete(req.params.id)
        .then(() => res.json('101'))
        .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;