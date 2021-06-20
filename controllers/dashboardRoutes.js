const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get("/create", withAuth, (req, res) => {
    res.render("createPost")
})

router.get('/', withAuth, async (req, res) => {
    try {
        // Get all post and JOIN with user data
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
          attributes: ["id", "title", "date_created", "post_body"],
          include: [
            {
              model: Comment,
              attributes: ["id", "text", "post_id", "user_id", "created_at"],
              include: {
                model: User,
                attributes: ["username", "email"]
              }
            },
            {
              model: User,
              attributes: ['username', "email"],
            },
          ],
        });
    
        // Serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('dashboard', { 
          posts,
          logged_in: req.session.logged_in 
        });
      } catch (err) {
        res.status(500).json({success: false, err});
      }
})

router.get("/edit/:id", withAuth, (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "title", "date_created", "post_body"],
      include: [
        {
          model: Comment,
          attributes: ["id", "text", "post_id", "user_id", "created_at"],
          include: {
            model: User,
            attributes: ["username", "email"],
          },
        },
        {
          model: User,
          attributes: ["username", "email"],
        },
      ],
    })
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: "No post found with this id" });
          return;
        }
  
        // serialize the data
        const post = data.get({ plain: true });
  
        res.render("editPost", {
          post,
          loggedIn: true,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
module.exports = router