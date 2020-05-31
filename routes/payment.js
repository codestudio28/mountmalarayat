const router = require('express').Router();
let Payment = require('../models/payment.model');

// Add Payment
router.route('/add').post((req, res) => {
    const clientid = req.body.clientid;
    const propertyid = req.body.propertyid;
    const paymentdate = req.body.paymentdate;
    const amorttype = req.body.amorttype;
    const amortamount = req.body.amortamount;
    const amortpenalty = req.body.amortpenalty;
    const runningbalance = req.body.runningbalance;
    const payment2 = req.body.payment2;
    const aror = req.body.aror;
    const paymenttype = req.body.paymenttype;
    const chequenumber = req.body.chequenumber;
    const bankname = req.body.bankname;
    const branch = req.body.branch;
    const datepaid = req.body.datepaid;
    const status = req.body.status;

   
    Payment.find({
        clientid: clientid,
        propertyid:propertyid,
        paymentdate:paymentdate,
        amorttype:amorttype
    }, (err, payment) => {
        if (err) {
            return res.json('404');
        } else if (payment.length > 0) {
            return res.json('202');
        } else {
            const newPayment = new Payment({
                clientid,
                propertyid,
                paymentdate,
                amorttype,
                amortamount,
                amortpenalty,
                runningbalance,
                payment2,
                aror,
                paymenttype,
                chequenumber,
                bankname,
                datepaid,
                branch,
                status,
            });
        
            newPayment.save()
                        .then(() => {
                            res.json('101')
                        })
                        .catch(err => res.status(400).json('Error: ' + err));
        }
    });

    
        
   
});

// Get All Amort
router.route('/').get((req, res) => {
    Payment.find((err, payment) => {
        if (err) {
            return res.json('404');
        } else if (payment.length > 0) {
            return res.json(payment);

        }else {
            return res.json(payment);
        }
    });
});
// void misc
router.route('/updatenewmisc/:id').post((req,res) =>{
    Payment.findById(req.params.id)
      .then(payment => {
        payment.runningbalance = req.body.runningbalance;
        payment.amortpenalty = req.body.amortpenalty;
        
        payment.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
   
});

// void eqt
router.route('/updateneweqt/:id').post((req,res) =>{
    Payment.findById(req.params.id)
      .then(payment => {
        payment.runningbalance = req.body.runningbalance;
        payment.amortpenalty = req.body.amortpenalty;
      
        payment.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
   
});
// void misc/old
router.route('/updateoldmisc/:id').post((req,res) =>{
    Payment.findById(req.params.id)
      .then(payment => {
        payment.status = req.body.status;
        payment.amortpenalty = req.body.amortpenalty;
        payment.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
   
});
// void eqt/old
router.route('/updateoldeqt/:id').post((req,res) =>{
    Payment.findById(req.params.id)
      .then(payment => {
        payment.status = req.body.status;
        payment.amortpenalty = req.body.amortpenalty;
        payment.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
   
});
// Update MF UNPAID
router.route('/unpaid/:id').post((req,res) =>{
    Payment.findById(req.params.id)
      .then(payment => {
        payment.amortpenalty = req.body.amortpenalty;
        payment.status = req.body.status;

        payment.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
   
});
// Update MF CASH
router.route('/update/:id').post((req,res) =>{
    Payment.findById(req.params.id)
      .then(payment => {
        payment.payment2 = req.body.payment2;
        payment.amortpenalty = req.body.amortpenalty;
        payment.runningbalance = req.body.runningbalance;
        payment.paymenttype = req.body.paymenttype;
        payment.aror = req.body.aror;
        payment.status = req.body.status;
        payment.datepaid = req.body.datepaid;
        payment.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
   
});
// Update MF CHEQUE
router.route('/updates/:id').post((req,res) =>{
    Payment.findById(req.params.id)
      .then(payment => {
        payment.payment2 = req.body.payment2;
        payment.amortpenalty = req.body.amortpenalty;
        payment.paymenttype = req.body.paymenttype;
        payment.aror = req.body.aror;
        payment.chequenumber= req.body.chequenumber;
        payment.bankname= req.body.bankname;
        payment.branch= req.body.bankbranch;
        payment.status = req.body.status;
        payment.datepaid = req.body.datepaid;
        payment.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
   
});

// Update client status
router.route('/status/:id').post((req,res) =>{
    Payment.findById(req.params.id)
      .then(payment => {
        payment.status = req.body.status;
        payment.save()
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
    Payment.findByIdAndDelete(req.params.id)
        .then(() => res.json('101'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;