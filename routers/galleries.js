const { Router } = require("express");
const User = require("../models").user;
const Photo = require("../models").photo;

const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    const galleries = await User.findAll({ include: [Photo] });
    res.send(galleries);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
