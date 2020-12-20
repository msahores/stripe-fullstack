import express from 'express';
import cors from 'cors';

// todo: add a stripe key
const stripe = require('stripe')(process.env.STRIPE_PASS);
const uuid = require('uuid/v4');

const app = express();
const port: number | string = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(cors());

// routes
app.get('/', (req, res) => {
  res.send('It Works');
});

app.post('/payment', (req, res) => {
  const { product, token } = req.body;
  console.log('PRODUCT', product);
  console.log('PRICE', product.price);
  // const idempotencyKey = uuid();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {},
        {
          idem,
        }
      );
    });
});

// listen
app.listen(port, () => console.log(`Listening at port ${port}`));
