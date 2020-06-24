const { Router } = require("express");
const Invoice = require("../models").invoice;

const router = new Router();

router.post("/", async (req, res, next) => {
  //console.log("invoice:", { ...req.body });
  try {
    const newInvoice = await Invoice.create({ ...req.body });
    res.send(newInvoice.data);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
