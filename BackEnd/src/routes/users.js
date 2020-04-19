const {Router} = require('express')
const router = Router();

const { getUsers , createUsers ,deleteUser } =require('../controllers/users.controller')

router.route('/')
    .get(getUsers)
    .post(createUsers)

router.route('/:id')
  .delete(deleteUser)


module.exports = router;