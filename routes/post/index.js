const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const axios = require('axios')
const {verifyToken} = require('../../util/jwt');
const { setPost,getPost } = require('../../db/post');
dotenv.config();

router.post("/write",async(req,res,next)=>{
  const requestToken = req.headers.authorization.split(' ')[1];

  const user_id = verifyToken(requestToken).id;
  if(user_id){
    const result = setPost(req.body['mainText'],req.body['title'],req.body['url'],req.body['menu']);
    if(!result){return res.status(403);}
    return res.send('sucess post');
  }else{
    return res.status(401);
  }
});

router.get("/read",async(req,res,next)=>{
  const result = await getPost(req.query.postId);
  if(!result){return res.json({error:true});}
  return res.json(result);
});

module.exports = router;