"use strict";
const User = require("../models").user;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const user1 = await User.findOne({
      where: { name: "aesops.fables" },
    });
    const user2 = await User.findOne({
      where: { name: "the_unpaid_extra" },
    });

    return queryInterface.bulkInsert(
      "photos",
      [
        {
          description:
            "|SUBTLE CONCLUSIONS|\nThe conclusion is subtle\nAmongst hermetic gutter-bugs huddled\nPeasants, and drunks\nCritics to junks\nSick dictators, \nHaters\nKings to alley urchins\nMonarchs, \nNarcs \nTo liars \nwith live wires\nCircling the wild fires",
          info:
            "Photo by Aesopica in Pailón Del Diablo. Afbeelding kan het volgende bevatten: plant, boom, buiten, natuur en water",
          src:
            "https://scontent-amt2-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/102544404_681121346075105_7960575689756575852_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com&_nc_cat=105&_nc_ohc=bx-rMPZ1GwQAX8fpkLR&oh=3b3b9558417346cf01f628892dcf41bc&oe=5F14E5DC",
          createdAt: new Date(),
          updatedAt: new Date(),
          user_id: user1.id,
        },
        {
          description:
            "|SOLE CRUSADERS|\nThis little light of mine, \nshines at a hundred billion times,\nthe magnitude of every star,\nWithin an ample sky sample.\n\nI alerted my sole crusaders,\nTo trade the games;\nPrescribed them strict diets of DDT and Kelthane.",
          info:
            "Photo by Aesopica in Pailón Del Diablo. Afbeelding kan het volgende bevatten: plant, boom, buiten, natuur en water",
          src:
            "https://scontent-amt2-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/102882514_2996301533816683_1256111348205271249_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com&_nc_cat=107&_nc_ohc=whQ98hugxZQAX-BQ4yY&oh=ffe467ec17f624a74a3c83b6cf09c560&oe=5F14F1C6",
          createdAt: new Date(),
          updatedAt: new Date(),
          user_id: user1.id,
        },
        {
          description:
            "|MERIT|\nIt festers when ingested.\nGlorious vellum,\nAddressing helots to zealots,\nTo Jezebel's, to hellish felons.\n\nGranted, \nMy span of attention is not what it used to be.\nBut most of y'all delinquents ain't amusing me no more, \nKid, merit",
          info:
            "Photo by Aesopica in Pailón Del Diablo. Afbeelding kan het volgende bevatten: plant, boom, buiten en natuur",
          src:
            "https://scontent-amt2-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/102555209_671073413741299_2128212586172845560_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com&_nc_cat=107&_nc_ohc=QyyLhpjsNSMAX9ACDU6&oh=e5dde217495c0cf176dee97f6d8e5939&oe=5F1518CD",
          createdAt: new Date(),
          updatedAt: new Date(),
          user_id: user1.id,
        },
        {
          description: "‘Swoosh.’",
          info:
            "Photo by Alex Schepers in Capitale des Pays-Bas with @tspaulino. Afbeelding kan het volgende bevatten: lucht, wolk en buiten",
          src:
            "https://scontent-ams4-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/c0.180.1440.1440a/s640x640/102699041_270699604014735_4865778452251826561_n.jpg?_nc_ht=scontent-ams4-1.cdninstagram.com&_nc_cat=103&_nc_ohc=CkmZTMMin_UAX_q1gzT&oh=7c27538dfde17eb6b4bc81f4a3947a06&oe=5F1450AE",
          createdAt: new Date(),
          updatedAt: new Date(),
          user_id: user2.id,
        },
        {
          description:
            "‘These words are my everything, or maybe just my only thing.’",
          info:
            "Photo by Alex Schepers in New York, New York. Geen fotobeschrijving beschikbaar.",
          src:
            "https://scontent-amt2-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/c0.135.1080.1080a/s640x640/46908643_726681477715734_7868322290557046977_n.jpg?_nc_ht=scontent-amt2-1.cdninstagram.com&_nc_cat=106&_nc_ohc=KvIvA2e11EgAX9qzZ4j&oh=76e15cb6e2e419da86fde5b99990b3a5&oe=5F13A25E",
          createdAt: new Date(),
          updatedAt: new Date(),
          user_id: user2.id,
        },
        {
          description: "‘Going back soon.’",
          info:
            "Photo by Alex Schepers in Seoul, Korea. Geen fotobeschrijving beschikbaar.",
          src:
            "https://scontent-ams4-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/c0.135.1080.1080a/s640x640/47690688_340446976775759_6625730726435810257_n.jpg?_nc_ht=scontent-ams4-1.cdninstagram.com&_nc_cat=111&_nc_ohc=1-cWRI7DYsMAX9xLVI4&oh=0435b0b7a4013b53cc5570905693a058&oe=5F15D8C0",
          createdAt: new Date(),
          updatedAt: new Date(),
          user_id: user2.id,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("photos", null, {});
  },
};
