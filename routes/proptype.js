const router = require('express').Router();
let Propertytype = require('../models/proptype.model');

// Add Proptype
router.route('/add').post((req, res) => {
    const typename = req.body.typename;
    const description = req.body.description;
    const equity = req.body.equity;
    const misc = req.body.misc;
    const status = req.body.status;

    Propertytype.find({
        typename: typename
    }, (err, propertytype) => {
        if (err) {
            return res.json('404');
        } else if (propertytype.length > 0) {
            return res.json('202');
        } else {
            const newPropertytype = new Propertytype({
                typename,
                description,
                equity,
                misc,
                status
            });
            newPropertytype.save()
                .then(() => {
                    res.json('101')
                })
                .catch(err => res.status(400).json('Error: ' + err));
        }
    });
});

// Get All proptype
router.route('/').get((req, res) => {
    Propertytype.find((err, proptype) => {
        if (err) {
            return res.json('404');
        } else if (proptype.length > 0) {
            return res.json(proptype);

        }else {
            return res.json(proptype);
        }
    });
});

// Update Property type information
router.route('/update/:id').post((req,res) =>{
    Propertytype.findById(req.params.id)
      .then(proptype => {
        proptype.typename = req.body.typename;
        proptype.description = req.body.description;
        proptype.equity = req.body.equity;
        proptype.misc = req.body.misc;
        proptype.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
   
});

// Update property type status
router.route('/status/:id').post((req,res) =>{
    Propertytype.findById(req.params.id)
      .then(proptype => {
        proptype.status = req.body.status;
        proptype.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
});

// Get property type by id
router.route('/:id').get((req,res) =>{
    Propertytype.findById(req.params.id)
        .then(proptype =>res.json(proptype))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete Property type
router.route('/:id').delete((req, res) => {
    Propertytype.findByIdAndDelete(req.params.id)
        .then(() => res.json('101'))
        .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;