const { Router } = require("express");
const Invoice = require("../models").invoice;
const Order = require("../models").order;
const Photo = require("../models").photo;
const User = require("../models").user;

const nodemailer = require("nodemailer");
const { nodemailerPass } = require("../config/secrets");

const router = new Router();

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "38fef23bdcd720",
    pass: nodemailerPass,
  },
});

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
    console.log("newOrders:", newOrders);
    //res.send("Invoice+Orders created ");

    const photoIdArray = newOrders.map((order) => order.dataValues.photoId);
    //console.log("photoId's in invoice:", photoIdArray);
    const findingPhotos = photoIdArray.map(async (photo) => {
      const photoFound = await Photo.findByPk(photo);
      return photoFound;
    });

    const photos = await Promise.all(findingPhotos);
    //console.log("photos found:", photos);
    const photoSrcArray = photos.map((photo) => photo.dataValues.src);
    //console.log("array of photo src:", photoSrcArray);
    const photographerIdArray = photos.map((photo) => photo.dataValues.userId);
    //console.log("photographers", photographerIdArray);
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }
    const uniquePhotographers = photographerIdArray.filter(onlyUnique);
    //console.log(uniquePhotographers);
    //res.send("done");

    const findingPhotographer = uniquePhotographers.map(
      async (photographer) => {
        const photographerFound = await User.findByPk(photographer);
        return photographerFound;
      }
    );

    const photographers = await Promise.all(findingPhotographer);
    // console.log("photographer found:", photographers[1].dataValues.email);

    const photographer_mails = photographers.map((photographer) => {
      return {
        from: '"Example Team" <from@example.com>',
        to: photographer.dataValues.email,
        subject: `Someone ordered something from you!`,
        text: `Hey there, someone ordered something from you`,
        html: `<b>Hey there! </b><br> Someone Ordered something from you:<br />
      <br>Delivery info is:</br>
      <br> ${buyer_name}</br>
      <br> ${buyer_address}</br>
      <br> ${buyer_zipcode}</br>
      <br> ${buyer_city}</br>
      <br> ${buyer_country}</br>
      
    <table>
    <thead>
    <tr>
    <th> Photo </th>
    <th> Quantity </th>
    <th> Price </th>
    <th> Total </th>
    </tr>
    </thead>
    <tbody>
    ${photos.map((photo, index) => {
      if (photo.dataValues.userId === photographer.dataValues.id) {
        return `<tr>
          <td>
            <img width="100" src=${photoSrcArray[index]} />
          </td>
          <td>${newOrders[index].dataValues.quantity}</td>
          <td>${newOrders[index].dataValues.price}</td>
          <td>
            ${
              newOrders[index].dataValues.quantity *
              newOrders[index].dataValues.price
            }
          </td>
        </tr>`;
      }
    })}
    </tbody>
    </table`,
      };
    });
    //console.log("seller mails:", photographer_mails);

    const buyer_mail = {
      from: '"Example Team" <from@example.com>',
      to: buyer_email,
      subject: "Your InstaGallery Order",
      text: "Hey there, we have just received your order",
      html: `<b>Hey there! </b><br>  we have just received your order<br />
    <table>
    <thead>
    <tr>
    <th> Photo </th>
    <th> Quantity </th>
    <th> Price </th>
    <th> Total </th>
    </tr>
    </thead>
    <tbody>
    ${newOrders.map((order, index) => {
      return `<tr>
          <td>
            <img width="100" src=${photoSrcArray[index]} />
          </td>
          <td>${order.dataValues.quantity}</td>
          <td>${order.dataValues.price}</td>
          <td>
            ${order.dataValues.quantity * order.dataValues.price}
          </td>
        </tr>`;
    })}
    </tbody>
    </table`,
    };

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

    transport.sendMail(buyer_mail, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      res.send("email sended");
    });
    sendEmailToPhotographers(photographer_mails);
    res.send("invoice created and photographers notified");
  } catch (e) {
    next(e);
  }
});

module.exports = router;
