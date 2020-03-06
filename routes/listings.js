const router = require('express').Router();
let Listings = require('../models/listings.model');

// Add Client
router.route('/add').post((req, res) => {
    const housemodel = req.body.housemodel;
    const lotarea = req.body.lotarea;
    const floorarea = req.body.floorarea;
    const bedroom = req.body.bedroom;
    const bathroom = req.body.bathroom;
    const tcp = req.body.tcp;
    const image = req.body.image;
    const status = req.body.status;

        const newListings = new Listings({
            housemodel,
            lotarea,
            floorarea,
            bedroom,
            bathroom,
            tcp,
            image,
            status
        });
        newListings.save()
            .then(() => {
                res.json('101')
            })
        .catch(err => res.status(400).json('Error: ' + err));
        
   
});
module.exports = router;