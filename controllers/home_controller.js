const Post = require('../models/post');
const User = require('../models/user');



module.exports.home = async function(req, res){

    try{
<<<<<<< HEAD
         // populate the user of each post
=======
        // CHANGE :: populate the likes of each post and comment
>>>>>>> 73b231f7c64fc8a096c073b8f550afad12b39145
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            },
            populate: {
                path: 'likes'
            }
        }).populate('likes');

    
        let users = await User.find({});

        return res.render('home', {
            title: "Codeial | Home",
            posts:  posts,
            all_users: users
        });

    }catch(err){
        console.log('Error', err);
        return;
    }
   
}

// module.exports.actionName = function(req, res){}


// using then
// Post.find({}).populate('comments').then(function());

// let posts = Post.find({}).populate('comments').exec();

// posts.then()
