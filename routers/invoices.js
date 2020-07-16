const { Router } = require("express");
const Invoice = require("../models").invoice;
const Order = require("../models").order;
const Photo = require("../models").photo;
const User = require("../models").user;

const nodemailer = require("nodemailer");
const { nodemailerPass, nodemailerUser } = require("../config/secrets");
const { renderSellersMails, renderBuyersMail } = require("../emails/invoicing");

const router = new Router();

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: nodemailerUser,
    pass: nodemailerPass,
  },
});

router.post("/", async (req, res, next) => {
  const { buyerInfo, cart } = req.body;
  try {
    const newInvoice = await Invoice.create({ ...buyerInfo });

    const ordersToCreate = cart.map((photo) => ({
      quantity: photo.quantity,
      price: 25,
      photoId: photo.photoId,
      invoiceId: newInvoice.dataValues.id,
    }));
    const newOrders = await Order.bulkCreate(ordersToCreate);

    const photoIdArray = newOrders.map((order) => order.dataValues.photoId);

    const findingPhotos = photoIdArray.map(async (photo) => {
      const photoFound = await Photo.findByPk(photo);
      return photoFound;
    });

    const photos = await Promise.all(findingPhotos);

    const photoSrcArray = photos.map((photo) => photo.dataValues.src);

    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }
    const photographersToFind = photos
      .map((photo) => photo.dataValues.userId)
      .filter(onlyUnique)
      .map(async (photographer) => {
        const photographerFound = await User.findByPk(photographer);
        return photographerFound;
      });

    const photographers = await Promise.all(photographersToFind);

    const photographerMails = renderSellersMails(
      photographers,
      buyerInfo,
      photos,
      photoSrcArray,
      newOrders
    );

    const buyerMail = renderBuyersMail(buyerInfo, newOrders, photoSrcArray);

    function sendEmailToPhotographers(mails) {
      mails.forEach((mail) => {
        transport.sendMail(mail, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log("Message sent: %s", info.messageId);
          res.send("email sended");
        });
      });
    }

    transport.sendMail(buyerMail, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      res.send("email sended");
    });
    sendEmailToPhotographers(photographerMails);
    res.send("invoice created and photographers notified");
  } catch (e) {
    next(e);
  }
});

module.exports = router;
