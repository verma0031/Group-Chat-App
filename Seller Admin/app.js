const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Product = require('./models/product');

const sequelize = require('./util/database');

const app = express();

app.use(cors());

app.use(bodyParser.json({ extended: false }));

app.post('/user/add-product' , async(req, res, next) => {
    try{
    const price = req.body.price;
    const product = req.body.product;
    const category = req.body.category;

    console.log(price , product , category);

    console.log("post request");

    const data = await Product.create( {
        price: price,
        product: product,
        category: category
    })
    res.status(201).json({newUserDetail : data});
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        })
    };
});

app. get ('/user/get-product' , async (reg, res, next) => {
    const product = await Product.findAll();
    res.status (200) . json ({allUsers: product} )
});

app.delete('/user/delete-product/:id', async (req, res, next) => { 
    const uId = req.params. id;
    await Product.destroy({where: {id: uId}});
    res.sendStatus (200);
})

sequelize.sync()
.then( () => {
    app.listen(1100);
})
.catch( err => console.log(err));