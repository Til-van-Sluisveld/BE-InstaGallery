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

router.delete("/delete/:id", authMiddleware, async (req, res, next) => {
  //console.log("delete photo with id:", req.params.id);
  try {
    const photoToDelete = await Photo.destroy({ where: { id: req.params.id } });
    if (photoToDelete) {
      res.send("received and destoryed");
    } else {
      res.send("is already destroyed");
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
