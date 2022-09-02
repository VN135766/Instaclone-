const router = require('express').Router();
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');

router.use('/user', userRoutes);
router.use('/post, postRoutes');
router.use('/post/comment, commentRoutes');

module.exports = router;