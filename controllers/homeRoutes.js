const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all post and JOIN with user data
    const postData = await Post.findAll({
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
    console.log(posts)

    // Pass serialized data and session flag into template
    // res.json(postData)
    res.render('homepage', { 
      posts,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json({success: false, err});
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id
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

    let post = postData.get({ plain: true });
    post.comments.forEach(i => {
      if(i.user_id == req.session.user_id) {
        i.isOwner = true
      } else {
        i.isOwner = false
      }
    })
    // res.json(post)
    res.render('singlePost', {
      post,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route


router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;
