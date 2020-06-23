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

module.exports = router;
