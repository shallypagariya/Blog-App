
//api notifications

export const API_NOTIFICATION_MESSAGES={
    loading:{
        title :'Loading...',
        message :'Data is being loaded,Pleade wait'
    },
    success :{
        title:'success',
        message :'Data successFully Loaded'
    },
    responseFailure :{
        title :'Error',
        message:'An Error occured while fetching response from the server,Please try again'
    },
    requestFailure :{
        title :'Error',
        message :'An Error occured while parsing resquest  data ,Please try again'
    },
    networkError :{
        title :'Error',
        message:'Unable to connect.Please check newtork connection'
    }
}
//API _SERVICE CALLS
export const SERVICE_URLS={
    userSignup :{url : '/signup',method :'POST'},
    userLogin :{url : '/login',method :'POST'},
    uploadFile :{url :'/file/upload',method :'POST'},
    createPost:{url :'/create',method :'POST'},
    getAllPosts:{url:'/posts',method :'GET',params :true},
    getPostById:{url:'/post',method :'GET',query :true},
    updatePost :{url :'update',method :'PUT',query : true},
    deletePost :{url :'delete',method :'DELETE',query : true},
    newComment :{url :'/comment/new' ,method :'POST'},
    getAllComments :{url :'comments' ,method :'GET',query :true},
    deleteComment :{url :'comment/delete' ,method :'DELETE',query :true}

}