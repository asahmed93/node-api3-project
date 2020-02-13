const express = require('express');
   
const router = express.Router();

const userDB = require('./userDb')
const postDB = require('../posts/postDb')

router.post('/', validateUser, (req, res) => {
  // do your magic!
  const newUser = req.body;

  userDB.insert(newUser)
  .then(user => {
    res.status(201).json(user)
  })
  .catch(err => {
    res.status(500).json({errorMessage: "cannot create user"})
  })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  const newPost = req.body;

  postDB.insert(newPost)
  .then(post => {
    res.status(201).json(post)
  })
  .catch( err => {
    res.status(500).json({errorMessage: "cannot create post"})
  })
});

router.get('/', (req, res) => {
  // do your magic!
  userDB.get()
  .then( user => {
    res.status(200).json(user)
  })
  .catch( err => {
    res.status(500).json({errorMessage: "cannot access user"})
  })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id;

  userDB.getById(id)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(err => {
    res.status(500).json({errorMessage: "cannot access user"})
  })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id;

  userDB.getUserPosts(id)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(err => {
    res.status(500).json({ errorMessage: "cannot access user's post"})
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id;
  
  userDB.remove(id)
  .then(deleted => {
    if(deleted){
      res.status(204).end()
    } else {
      res.status(404).json({ errorMessage: "cannot find user"})
    }
  })
  .catch(err => {
    res.status(500).json({ errorMessage: "cannot delete user"})
  })
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
  const user = req.user;
  const updated = req.body;

  userDB.update(user.id, updated)
  .then(changed => {
    if(changed){
      userDB.getById(user.id)
      .then( updatedUser => {
        res.status(200).json(updatedUser)
      })
      .catch(err => {
        res.status(404).json({errorMessage: "cannot edit user"})
      })
    } else {
      res.status(500).json({ errorMessage: "user cannot be changed"})
    }
  })
  .catch( err => {
    res.status
  })

});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const id = req.params.id || req.body.user_id;

  userDB.getById(id)
  .then(user => {
    if(user){
      return next();
    } else {
      res.status(404).json({ message: "invalid user"})
    }
  })
  .catch(() => {
    res.status(500).json({message: "User is not found"})
  })
}

function validateUser(req, res, next) {
  // do your magic!
  const userArray = Object.keys(req.body)

  if(userArray.length === 0){
    res.status(400).json({ message: "user is not found"})
  }
  if(!req.body.name) {
    res.status(400).json({ message: "must provide name"})
  }
  next();
}

function validatePost(req, res, next) {
  // do your magic!
  if(req.body){
    if(req.body.name){
      next();
    } else {
      res.status(400).json({errorMessage: "No name was provided"})
    }
  } else {
    res.status(400).json({ message: 'No post was found'})
  }
}

module.exports = router;
