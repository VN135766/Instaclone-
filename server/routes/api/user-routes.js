const router = require('express').Router()

const {
  getAllUsers,
  getUserById,
  createUser,
  authenticateLogin,
  lookupUserByToken,
  followUser,
  getFollowing
} = require('../../controllers/user-controller')

// Declare the routes that point to the controllers above
router.route('/')
  .get(getAllUsers)
  .post(createUser)

router.route("/auth")
  .post(authenticateLogin)

router.route("/lookup")
  .get(lookupUserByToken)

router.route('/follow')
  .get(getFollowing)

router.route('/follow/:id')
  .put(followUser)

router.route('/:id')
  .get(getUserById)



module.exports = router;