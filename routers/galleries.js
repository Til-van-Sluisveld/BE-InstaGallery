const { Router } = require("express");
const User = require("../models").user;
const Photo = require("../models").photo;

const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    const galleries = await User.findAll({ include: [Photo] });
    const response = galleries.map((gallery) => {
      delete gallery.dataValues["password"]; //remove every users password from the response
      return gallery;
    });
    res.send(response);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
