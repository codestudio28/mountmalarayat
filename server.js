const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// 1
const fileUpload = require('express-fileupload');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

// 2
app.use(fileUpload());

app.use(cors());
app.use(express.json());

// mongoose.Promise = global.Promise;
const uri = process.env.ATLAS_URI;
mongoose.connect(process.env.MONGODB_URI || uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true, useCreateIndex: true
}
);


const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDb database established successfully");
})


const userRouter = require('./routes/user');
const propertyRouter = require('./routes/property');
const clientRouter = require('./routes/client');
const proptypeRouter = require('./routes/proptype');
const paymentschemeRouter = require('./routes/paymentscheme');
const messageRouter = require('./routes/message');
const listingsRouter = require('./routes/listings');

app.use('/api/accountrouter',userRouter);
app.use('/api/propertyrouter',propertyRouter);
app.use('/api/clientrouter',clientRouter);
app.use('/api/proptyperouter',proptypeRouter);
app.use('/api/paymentschemerouter',paymentschemeRouter);
app.use('/api/messagerouter',messageRouter);
app.use('/api/listingsrouter',listingsRouter);

// 3
// app.post('/profile', (req, res) => {
//     if (req.files === null) {
//         return res.status(400).json({ msg: 'No file uploaded' });
//     }

//     const file = req.files.file;

//     var tempDate = new Date();
//     var date = tempDate.getFullYear() + '' + (tempDate.getMonth() + 1) + '' + tempDate.getDate() + '' + tempDate.getHours() + '' + tempDate.getMinutes() + '' + tempDate.getSeconds();
//     // const currDate = "Current Date= " + date;

//     file.name = date+''+file.name;

//     file.mv(`${__dirname}/todo-react/public/profile/${file.name}`, err => {
//         if (err) {
//             console.error(err);
//             return res.status(500).send(err);
//         }
       
//         // console.log(file.name);
//         res.json({ fileName: file.name, filePath: `/profile/${file.name}` });
//         // res.json('Article Added!');
//     });
// });



if (process.env.NODE_ENV === "production") {
    app.use(express.static('todo-react/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'todo-react', 'build', 'index.html'));
    });
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
}

);