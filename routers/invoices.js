const { Router } = require("express");
const Invoice = require("../models").invoice;
const Order = require("../models").order;

const router = new Router();

router.post("/", async (req, res, next) => {
  const {
    buyer_name,
    buyer_email,
    buyer_country,
    buyer_city,
    buyer_address,
    buyer_zipcode,
    cart,
  } = req.body;
  try {
    const newInvoice = await Invoice.create({
      buyer_name,
      buyer_email,
      buyer_country,
      buyer_city,
      buyer_address,
      buyer_zipcode,
    });
    console.log("newInvoice:", newInvoice.dataValues.id);
    const ordersToCreate = cart.map((photo) => ({
      quantity: photo.quantity,
      price: 25,
      photoId: photo.photoId,
      invoiceId: newInvoice.dataValues.id,
    }));
    const newOrders = await Order.bulkCreate(ordersToCreate);
    res.send("Invoice+Orders created ");
  } catch (e) {
    next(e);
  }
});

module.exports = router;
