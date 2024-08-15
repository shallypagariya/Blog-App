


import Post from "../model/post.js";

export const createPost = async (request, response) => {
    console.log("post received");
    try {
        const post = new Post(request.body);
        await post.save();  // Await the save operation to ensure it completes
        return response.status(200).json('Post saved successfully!!');
    } catch (error) {
        console.error("Error saving post:", error);  // Log the error
        return response.status(500).json({ msg: error.message });
    }
};

export const getAllPosts =async(request,response)=>{
    let category =request.query.category;
    let posts;
    try{
        if(category){
            posts=await Post.find({categories : category})
        }else{
             posts =await Post.find({});
        }
        return response.status(200).json(posts)

    }catch(e){
        return response.status(500).json({msg: e.message})
    }
}
export const getPost =async(request,response)=>{
    console.log("hii")
    try{
        const post=await Post.findById(request.params.id);

        return response.status(200).json(post);

    }catch(e){
        return response.status(500).json({msg : e.message})
    }
}
export const updatePost =async(request,response)=>{
 
    try{
        const post=await Post.findById(request.params.id);
        if(!post){
            return response.status(404).json({msg : 'post not found'});

        }
        await Post.findByIdAndUpdate(request.params.id,{$set :request.body})
        return response.status(200).json({msg :'post updated successfully'});

    }catch(e){
        return response.status(500).json({msg : e.message})
    }
}


export const deletePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        if (!post) {
            return response.status(404).json({ msg: 'Post not found' });
        }
        await Post.findByIdAndDelete(request.params.id); 
        return response.status(200).json({ msg: 'Post deleted successfully' });
    } catch (e) {
        return response.status(500).json({ msg: e.message });
    }
};
