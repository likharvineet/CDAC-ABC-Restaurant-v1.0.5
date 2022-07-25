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
  const itemType = req.body.itemType;
  const status = 1;
  db.query(
    'INSERT INTO menu (name, item_type, price, status) VALUES (?, ?, ?, ?)',
    [itemName, itemType, itemPrice, status],
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
  const status = req.body.statusUpdate;
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
  const orderList = req.body.orderList;
  const total = req.body.price;
  const status = 1;
  const payment_status = 1;
  const orderId = req.body.orderId;
  db.query(
    'INSERT INTO orders (customerID, location, orderList, total, status, payment_status, orderId) VALUES (?, ?, ?, ?, ? ,?, ?)',
    [customerId, location, orderList, total, status, payment_status, orderId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send('Menu Added');
      }
    }
  );
});

app.put('/updatePayment', (req, res) => {
  const orderId = req.body.orderId;
  const paymentType = req.body.paymentType;
  const payment_status = 2;
  db.query(
    'UPDATE orders SET payment_status = ? ,payment_type = ? WHERE orderId = ?',
    [payment_status, paymentType, orderId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post('/getItemByCustomer', (req, res) => {
  const location = req.body.location;
  const orderId = req.body.orderId;
  // db.query(
  //   'SELECT * from orders WHERE orderId = ? AND location = ? AND payment_status = ?',
  //   [orderId, location, 2],
  //   (err, result) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       let resultArr = [];
  //       resultArr[0] = result;
  //       resultArr[1] = result[0].orderList;
  //       res.send(resultArr);
  //     }
  //   }
  // );
  db.query(
    'SELECT location, orderList, total, status, payment_type, payment_status, orderId from orders WHERE orderId = ? AND location = ? AND payment_status = ?',
    [orderId, location, 2],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        //  let resultArr = [];
        //  resultArr[0] = result;
        //  resultArr[1] = result[0].orderList;
        //  res.send(resultArr);
      }
    }
  );
  // db.query(
  //   'SELECT orders.id, orders.location, menu.name, orders.qty, orders.total, orders.status FROM orders RIGHT JOIN menu ON orders.itemId = menu.id WHERE orders.location = ? AND orders.orderId = ? ORDER BY orders.id DESC',
  //   [location, orderId],
  //   (err, result) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       res.send(result);
  //       console.log(result);
  //     }
  //   }
  // );
});

app.get('/getAllOrder', (req, res) => {
  db.query(
    'SELECT id, location, total, status, orderList, orderId, payment_type, payment_status FROM orders  WHERE status != 3 ORDER BY id DESC',
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
         res.send(result);
        // console.log(result);
      }
    }
  );
  // db.query(
  //   'SELECT location, orderList, total, status, payment_type, payment_status, orderId from orders WHERE orderId = ? AND location = ? AND payment_status = ?',
  //   [orderId, location, 2],
  //   (err, result) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       res.send(result);
  //       //  let resultArr = [];
  //       //  resultArr[0] = result;
  //       //  resultArr[1] = result[0].orderList;
  //       //  res.send(resultArr);
  //     }
  //   }
  // );
  // db.query(
  //   'SELECT orders.id, orders.location, menu.name, orders.qty, orders.total, orders.status FROM orders RIGHT JOIN menu ON orders.itemId = menu.id WHERE orders.status != 3 ORDER BY orders.id DESC',
  //   (err, result) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       res.send(result);
  //     }
  //   }
  // );
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
