const nodeMailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.newComment = (comment) => {
    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
       from: 'arpan@codingninjas.in',
       to: comment.user.email,
       subject: "New Comment Published!",
       html: htmlString
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }

<<<<<<< HEAD
        console.log('Message sent', info);
=======
        // console.log('Message sent', info);
>>>>>>> 73b231f7c64fc8a096c073b8f550afad12b39145
        return;
    });
}