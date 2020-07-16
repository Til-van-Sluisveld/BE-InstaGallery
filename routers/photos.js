const { Router } = require("express");
const authMiddleware = require("../auth/middleware");
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

router.post("/new", authMiddleware, async (req, res, next) => {
  try {
    const newPhoto = await Photo.bulkCreate(req.body.toImport);
    res.send(newPhoto);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
