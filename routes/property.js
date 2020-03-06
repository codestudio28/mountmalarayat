const router = require('express').Router();
let Property = require('../models/property.model');

// Add property
router.route('/add').post((req, res) => {
    const block = req.body.block;
    const lot = req.body.lot;
    const type = req.body.type;
    const area = req.body.area;
    const price = req.body.price;
    const status = req.body.status;

    Property.find({
        block: block,
        lot:lot,
        type:type
    }, (err, property) => {
        if (err) {
            return res.json('404');
        } else if (property.length > 0) {
            return res.json('202');

        } else {
            const newProperty = new Property({
                block,
                lot,
                type,
                area,
                price,
                status
            });
            newProperty.save()
                .then(() => {
                    res.json('101')
                })
                .catch(err => res.status(400).json('Error: ' + err));
        }
    });
});

// Get all property
router.route('/').get((req, res) => {
    Property.find((err, property) => {
        if (err) {
            return res.json('404');
        } else if (property.length > 0) {
            return res.json(property);

        }else {
            return res.json(property);
        }
    });
});

// Update Property Information
router.route('/update/:id').post((req,res) =>{
    Property.findById(req.params.id)
      .then(properties => {
        properties.block = req.body.block;
        properties.lot = req.body.lot;
        properties.type = req.body.type;
        properties.area = req.body.area;
        properties.price = req.body.price;
        Property.find({
            block: req.body.block,
            lot:req.body.lot,
            type:req.body.type,
            area:req.body.area,
            price:req.body.price,
        }, (err, property) => {
            if (err) {
                return res.json('404');
            } else if (property.length > 0) {
                return res.json('202');
            } else {
                properties.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
            }
        });

       
      })
      .catch(err => res.status(400).json('Error: '+ err))
});

// update property status
router.route('/status/:id').post((req,res) =>{
 
    Property.findById(req.params.id)
      .then(property => {
        property.status = req.body.status;
        property.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
});

// Get property by id
router.route('/:id').get((req,res) =>{
    Property.findById(req.params.id)
        .then(property =>res.json(property))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete Property
router.route('/:id').delete((req, res) => {
    Property.findByIdAndDelete(req.params.id)
        .then(() => res.json('101'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;