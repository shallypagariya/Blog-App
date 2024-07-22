
import Comment from '../model/comment.js';

export const newComment=async(request,response)=>{
    try{
        const comment= await new Comment(request.body);
        comment.save();
        response.status(200).json({msg :'Comment saved successfully'})
    }catch(e){
        response.status(500).json({error : e.message});
    }


}
export const getComments =async(request,reponse)=>{
    try{
       const comments= await Comment.find({postId : request.params.id});
       reponse.status(200).json(comments);
    }catch(e){
        reponse.status(500).json({error : e.message});
    }
}

// export const deleteComment =async(request,reponse)=>{
//     try{
//        const comment= await Comment.findById(request.params.id);
//        await comment.findByIdAndDelete();
//        reponse.status(200).json({msg : 'comment deleted successfully'});
//     }catch(e){
//         reponse.status(500).json({error : e.message});
//     }
// }
//const Comment = require('../models/Comment'); // Assuming you have a Comment model

export const deleteComment = async (request, response) => {
    try {
        const comment = await Comment.findById(request.params.id);
        
        if (!comment) {
            return response.status(404).json({ error: 'Comment not found' });
        }
        
        await comment.deleteOne(); // or comment.remove() depending on your model
        
        return response.status(200).json({ msg: 'Comment deleted successfully' });
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
};
