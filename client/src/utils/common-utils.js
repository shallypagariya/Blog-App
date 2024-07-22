

export const getAccessToken =() =>{
    return sessionStorage.getItem('accessToken');
}
export const addElipis= (str,limit) =>{
    return str.length>limit ? str.substring(0,limit) +'...' : str;
}
export const getType =(value,body)=>{
    if(value.params){
        return  {params : body}
    }else if(value.query){
        if(typeof body ==='object'){
            return {query : body._id}
        } else{
            return {query :body}
        }
    }
    return {};
}
// export const getAccessToken = () => {
//     return sessionStorage.getItem('accessToken') || ''; // Handle null case
// }

// export const addElipsis = (str, limit) => {
//     if (typeof str !== 'string') return str; // Ensure str is a string
//     return str.length > limit ? str.substring(0, limit) + '...' : str;
// }

// export const getType = (value, body) => {
//     if (value.params) {
//         return { params: body };
//     } else if (value.query) {
//         if (typeof body === 'object' && body !== null) {
//             return { query: body._id };
//         } else {
//             return { query: body };
//         }
//     }
//     return {};
// }

