module.exports = {
  renderSellersMails: function (
    photographers,
    buyerInfo,
    photos,
    photoSrcArray,
    newOrders
  ) {
    return photographers.map((photographer) => {
      return {
        from: '"Example Team" <from@example.com>',
        to: photographer.dataValues.email,
        subject: `Someone ordered something from you!`,
        text: `Hey there, someone ordered something from you`,
        html: `<b>Hey there! </b><br> Someone Ordered something from you:<br />
        <br>Delivery info is:</br>
        <br> ${buyerInfo.buyer_name}</br>
        <br> ${buyerInfo.buyer_address}</br>
        <br> ${buyerInfo.buyer_zipcode}</br>
        <br> ${buyerInfo.buyer_city}</br>
        <br> ${buyerInfo.buyer_country}</br>  
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
  },
  renderBuyersMail: function (buyerInfo, newOrders, photoSrcArray) {
    return {
      from: '"Example Team" <from@example.com>',
      to: buyerInfo.buyer_email,
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
  },
};
