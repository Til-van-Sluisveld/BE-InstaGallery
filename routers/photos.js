const { Router } = require("express");
const Photo = require("../models").photo;

const router = new Router();

router.get("/:id", async (req, res, next) => {
  try {
    const photo = await Photo.findByPk(req.params.id);
    res.send(photo);
  } catch (e) {
    next(e);
  }
});

router.post("/new", async (req, res, next) => {
  //   console.log("request body:", req.body);
  const { description, info, src, userId } = req.body;
  try {
    const newPhoto = await Photo.create({ description, info, src, userId });
    res.send(newPhoto);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
