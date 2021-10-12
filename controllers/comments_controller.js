const Comment = require('../models/comment')
const Post = require('../models/post')

module.exports.create = async function(req, res){
    // return res.render('home', {
    //     title: "Home"
    // });
    try {
        let post = await Post.findById(req.body.post)
        if(post){
				let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            })
                
            post.comments.push(comment)
            post.save();
            req.flash('success', 'Comment created')
            res.redirect('/')
        }
    } catch(err){
        req.flash('error', 'Error while creating comment')
        return
    }
}

module.exports.destroy = async function(req, res){
    let comment = await Comment.findById(req.params.id);
    try{
        if(comment.user == req.user.id){
            let postId = comment.post;
            comment.remove();
            let posts = await Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}})
            req.flash('success', 'Comment deleted')
            return res.redirect('back')
        }else{
            req.flash('success', 'User cannot delete comment')
            return res.redirect('back')
        }
    } catch(err){
        req.flash('error', 'Error while deleting comment')
        return
    }
}