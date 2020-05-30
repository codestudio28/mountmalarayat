const router = require('express').Router();
let Account = require('../models/user.model');

// Add user
router.route('/add').post((req, res) => {
    const usertype = req.body.usertype;
    const email = req.body.email;
    const password = req.body.password;
    const image = req.body.image;
    const lastname = req.body.lastname;
    const firstname = req.body.firstname;
    const middlename = req.body.middlename;
    const date_created = req.body.date_created;
    const status = req.body.status;

    Account.find({
        email: email
    }, (err, account) => {
        if (err) {
            return res.json('404');
        } else if (account.length > 0) {
            return res.json('202');

        } else {
            const newUser = new Account({
                usertype,
                email,
                password,
                image,
                lastname,
                firstname,
                middlename,
                date_created,
                status
            });
            newUser.save()
                .then(() => {
                    res.json('101')
                })
                .catch(err => res.status(400).json('Error: ' + err));
        }
    });
});

// Get all active administrator
router.route('/active').get((req, res) => {
    const status='ACTIVE';
    const usertypes='administrator';
    Account.find({
        status: status,
        usertype:usertypes
    }, (err, account) => {
        if (err) {
            return res.json('404');
        } else if (account.length > 0) {
            return res.json(account);

        }else {
            return res.json(account);
        }
    });
});
// Get all active administrator
router.route('/super').get((req, res) => {
    const status='ACTIVE';
    const usertypes='superadministrator';
    Account.find({
        status: status,
        usertype:usertypes
    }, (err, account) => {
        if (err) {
            return res.json('404');
        } else if (account.length > 0) {
            return res.json(account);

        }else {
            return res.json(account);
        }
    });
});
// Get All Administrator
router.route('/').get((req, res) => {
    Account.find((err, account) => {
        if (err) {
            return res.json('404');
        } else if (account.length > 0) {
            return res.json(account);

        }else {
            return res.json(account);
        }
    });
});

// Update Administrator

// update administrator
router.route('/update/:id').post((req,res) =>{
    Account.findById(req.params.id)
      .then(account => {
        account.lastname = req.body.lastname;
        account.firstname = req.body.firstname;
        account.middlename = req.body.middlename;
        account.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
});


// update administrator profile
router.route('/update/profile/:id').post((req,res) =>{
    Account.findById(req.params.id)
      .then(account => {
        account.image = req.body.image;
        account.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
});

// update administrator from active to remove
router.route('/remove/:id').post((req,res) =>{
    const status = req.body.status;
    Account.findById(req.params.id)
      .then(account => {
        account.status = status;
        account.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
});

// update administrator from remove to active
router.route('/retrieve/:id').post((req,res) =>{
    const status = req.body.status;
    Account.findById(req.params.id)
      .then(account => {
        account.status = status;
        account.save()
                  .then(() => res.json('101'))
                  .catch(err => res.status(400).json('Error: ' + err))
      })
      .catch(err => res.status(400).json('Error: '+ err))
});

//Delete Administrator
router.route('/:id').delete((req, res) => {
    Account.findByIdAndDelete(req.params.id)
        .then(() => res.json('Account deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get all remove administrator
router.route('/remove').get((req, res) => {
    const status='REMOVED';
    const usertypes='administrator';
    Account.find({
        status: status,
        usertype:usertypes
    }, (err, account) => {
        if (err) {
            return res.json('404');
        } else if (account.length > 0) {
            return res.json(account);

        }else {
            return res.json(account);
        }
    });
});

// Get administrator by id
router.route('/:id').get((req,res) =>{
    Account.findById(req.params.id)
        .then(account =>res.json(account))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Login
router.route('/login').post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const status = "ACTIVE";

    Account.find({
        email : email,
        password : password,
        status : status
    }, (err, account) => {
        if (err) {
            return res.json('404');
        } else if (account.length > 0) {
            return res.json(account);

        } else {
            return res.json('303');
        }
    });
});

module.exports = router;