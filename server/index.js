const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // When you are using your own api in frontend and backend
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT'],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    key: 'userId',
    secret: 'cdacProject',
    resave: false,
    // saveUninitialized: false,
    saveUninitialized: true,
    cookie: {
      expires: false,
    },
  })
);

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '',
  database: 'cdac',
});

app.post('/register', (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  db.query(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, password],
    (err, result) => {
      console.log(err);
    }
  );
});

app.get('/login', (req, res) => {
  if (req.session.users) {
    res.send({ loggedIn: true, user: req.session.users });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  db.query(
    'SELECT * FROM `users` WHERE email = ? AND password = ?',
    [email, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        req.session.users = result;
        res.send(result);
      } else {
        res.send({ message: 'Wrong email/password combination' });
      }
    }
  );
});

app.post('/create_location', (req, res) => {
  const location = req.body.location;
  const status = 1;
  db.query(
    'INSERT INTO location (location, status) VALUES (?, ?)',
    [location, status],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send('Location Inserted');
      }
    }
  );
});

app.get('/get_location', (req, res) => {
  db.query(
    'SELECT * FROM location WHERE status = 1 ORDER BY id DESC',
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put('/update_location', (req, res) => {
  const id = req.body.id;
  const status = req.body.status;
  db.query(
    'UPDATE location SET status = ? WHERE id = ?',
    [status, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post('/addItem', (req, res) => {
  const itemName = req.body.itemName;
  const itemPrice = req.body.itemPrice;
  const status = 1;
  db.query(
    'INSERT INTO menu (name, price, status) VALUES (?, ?, ?)',
    [itemName, itemPrice, status],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send('Menu Added');
      }
    }
  );
});

app.get('/getItem', (req, res) => {
  db.query(
    'SELECT * FROM menu WHERE status = 1 ORDER BY id DESC',
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put('/deleteItem', (req, res) => {
  const id = req.body.id;
  const status = req.body.status;
  db.query(
    'UPDATE menu SET status = ? WHERE id = ?',
    [status, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post('/addOrderCustomer', (req, res) => {
  const customerId = req.body.customerId;
  const location = req.body.location;
  const itemId = req.body.itemId;
  const qty = req.body.quantity;
  const total = req.body.price;
  const status = 1;
  db.query(
    'INSERT INTO orders (customerID, location, itemId, qty, total, status) VALUES (?, ?, ?, ?, ? ,?)',
    [customerId, location, itemId, qty, qty * total, status],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send('Menu Added');
      }
    }
  );
});

app.post('/getItemByCustomer', (req, res) => {
  const location = req.body.location;
  const userId = req.body.userId;
  db.query(
    'SELECT orders.id, orders.location, menu.name, orders.qty, orders.total, orders.status FROM orders RIGHT JOIN menu ON orders.itemId = menu.id WHERE orders.location = ? AND orders.customerID = ? ORDER BY orders.id DESC',
    [location, userId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get('/getAllOrder', (req, res) => {
  db.query(
    'SELECT orders.id, orders.location, menu.name, orders.qty, orders.total, orders.status FROM orders RIGHT JOIN menu ON orders.itemId = menu.id WHERE orders.status != 3 ORDER BY orders.id DESC',
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put('/updateStatus', (req, res) => {
  const id = req.body.id;
  const status = req.body.statusUpdate;
  db.query(
    'UPDATE orders SET status = ? WHERE id = ?',
    [status + 1, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(3001, () => {
  console.log('running server on 3001');
});
