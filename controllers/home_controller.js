const Post = require('../models/post')

module.exports.home = function(req, res){
    // return res.render('home', {
    //     title: "Home"
    // });
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts){
        return res.render('home',{
            title: 'Codial',
            posts: posts
        })
    })
}