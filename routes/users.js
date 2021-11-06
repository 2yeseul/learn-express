const express = require('express');
const User = require('../schemas/user');
const Comment = require('../schemas/comment');

const router = express.Router();

router.route('/')
.get(async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (e) {
    console.error(e);
    next(e);
  }
})
.post(async (req, res, next) => {
  try {
    const user = await User.create({
      name: req.body.name,
      age: req.body.age,
      married: req.body.married,
    });
    console.log(user);
    res.status(201).json(user);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get('/:id/comments', async (req, res, next) => {
  try {
    // 댓글을 쓴 사용자의 아이디로 댓글을 조회한 뒤, populate 메서드로 관련있는 컬렉션의 다큐먼트를 불러온다,
    const comments = Comment.find({ commenter: req.params.id }).populate('commenter');
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;