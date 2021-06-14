const { Comment } = require("../models");

const commentSeeds = [
  {
    user_id: 3,
    post_id: 1,
    text: "Great blog post there Hermione!",
  },
  {
    user_id: 3,
    post_id: 4,
    text: "Amazing nice",
  },
  {
    user_id: 1,
    post_id: 4,
    text: "Is that an MVC Yee",
  },
  {
    user_id: 3,
    post_id: 5,
    text: "This is so great i can't unsee this",
  },
  {
    user_id: 3,
    post_id: 2,
    text: "Wow how did you came up with such. Great post",
  },
  {
    user_id: 3,
    post_id: 4,
    text: "Nice one man",
  },
  {
    user_id: 3,
    post_id: 3,
    text: "Very helpful. Thanks Fam",
  },
];

const seedComments = () => Comment.bulkCreate(commentSeeds);

module.exports = seedComments;
