app.post('/checkout', (req, res) => {
    const cart = req.body.cart;
    // Do something with the cart data (e.g. save to a database)
    res.render('checkout', { cart });
  });
  