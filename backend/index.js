const express = require('express');
const cors = require('cors');
const config = require('./config.json');
const app = express();

app.use(cors());
app.use(express.json());

const authRouter = require('./routes/auth')
const productRouter = require('./routes/product')
const cartRouter = require('./routes/cart')
const userRouter = require('./routes/user')
const filterRouter = require('./routes/filter')

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/filter', filterRouter); 

const port = process.env.PORT || config.port
app.listen(port, () => {
    console.log(`ShoeEsy Backend running at port ${port}`);
});

