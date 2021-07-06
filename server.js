const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const data = require('./data');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
dotenv.config();

mongoose.connect(process.env.MONGODB_URI,{

    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const Product = mongoose.model(
    'products', 
    new mongoose.Schema({
        name: String,
        description: String,
        image: String,
        price: Number,
        calorie: Number,
        category: String,
        initial_quantity: Number,
        current_quantity: Number,
    })
);

//req - REQUEST
//res - RESPONSE

app.get('/api/products/seed', async (req, res) => {
    const products = await Product.insertMany (data.products);
    res.send({products});
});

app.get('/api/products', async (req, res) => {
    const{category} = req.query;
    const{current_quantity} = req.query;
    const products = await Product.find (category ? {category} : {});
    res.send(products);
});

app.post('/api/products', async (req, res) => {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
});
app.put('/api/products/:id', async(req, res) => {
    const product = await Product.findById(req.params.id)
    if(product)
    {
        if(req.body.action === 'sub')
        {
            product.current_quantity = product.current_quantity - req.body.quantity;
        }
        else if(req.body.action === 'add'){
            product.current_quantity = product.current_quantity + req.body.quantity; 
        }

        await product.save();

        res.send({message: 'Done'})
    }
    else
    {
        req.statusCode(404).message({message:'Order Not Found'});
    }
})

app.get('/api/categories', (req, res) => {
    res.send(data.categories);
});

const Order = mongoose.model('Order', new mongoose.Schema({
    number: {type: Number, default: 0},
    orderType: String,
    paymentType: String,
    isPaid: {type: Boolean, default: false},
    isReady: {type: Boolean, default: false},
    inProgress: {type: Boolean, default: true},
    isCanceled: {type: Boolean, default: false},
    isDelivered: {type: Boolean, default: false},
    itemsPrice: Number,
    taxPrice: Number,
    totalPrice: Number,
    orderItems:[
    {
        name: String,
        price: Number,
        quantity: Number,
    },
    ],
},
{
    timestamps: true,
}
));

app.get('/api/orders', async (req, res) => {
    const orders = await Order.find({isDelivered: false, isCanceled: false});
    res.send(orders);
});

app.put('/api/orders/:id', async(req, res) => {
    const order = await Order.findById(req.params.id)
    if(order)
    {
        if(req.body.action === 'ready')
        {
            order.isReady = true;
            order.inProgress = false;
        }
        else if(req.body.action === 'deliver')
        {
            order.isDelivered = true;
        }
        else if(req.body.action === 'cancel')
        {
            order.isCanceled = true;
        }
        await order.save();

        res.send({message: 'Done'})
    }
    else
    {
        req.statusCode(404).message({message:'Order Not Found'});
    }
})
// criar request para  fazer um pedido
app.post('/api/orders', async (req, res) => {
    const lastOrder = await Order.find().sort({number: -1}).limit(1);//sort({numbre: -1}) (descendente) limit(1) (vai só tirar o 1º numero)
    const lastNumber = lastOrder.length === 0 ? 0 : lastOrder[0].number;
    if(!req.body.orderType || !req.body.paymentType || !req.body.orderItems || !req.body.orderItems.length === 0)
    {
        return res.send({message: 'Data is required.'});
    }
    const order = await Order({...req.body, number: lastNumber + 1}).save();
    res.send(order);
});

//get port from enviorment se nao usar port 5000
const port = process.env.PORT || 5000;

app.listen(port,() =>{
    console.log(`serve at http://localhost:${port}`);
});