const Comment = require('../models/comment')
const Post = require('../models/post')
const commentsMailer = require('../mailer/comments_mailer')

module.exports.create = async function(req, res){
    // return res.render('home', {
    //     title: "Home"
    // });
    console.log('heeeeeeeeeeeeeeeeeeeeeeeeeeee')
    try {
        let post = await Post.findById(req.body.post)
        console.log('2')
        if(post){
            console.log('3')
				let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            })
            console.log('4')  
            post.comments.push(comment)
            post.save();
            console.log('5')
            comment = await comment.populate('user', 'name email').execPopulate();
            commentsMailer.newComment(comment);
            if (req.xhr){
            
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }
            console.log('sdlkfnkldsnfk')
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
            let post = await Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}})

            // send the comment id which was deleted back to the views
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }

            req.flash('success', 'Comment deleted')
            return res.redirect('back')
        }else{
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
    } catch(err){
        req.flash('error', 'Error while deleting comment')
        return
    }
}