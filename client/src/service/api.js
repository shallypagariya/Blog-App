// import axios from 'axios'
// import { API_NOTIFICATION_MESSAGES,SERVICE_URLS } from '../constants/config'
// const API_URl='http://localhost:8080'
// const axiosInstance=axios.create({
//     baseURL : API_URl,
//     timeout:10000,
//     headers :{
//         "Content-type":"application/json"
//     }
//     })
//     axiosInstance.interceptors.request.use(
//         function(config){
//             return config;
//         },
//         function (error){
//             return Promise.reject(error)
//         }
//     )
//     axiosInstance.interceptors.response.use(
//         function(response){
//             return processResponse(response);
//         },
//         function (error){
//             return Promise.reject(processError(error));
//         }
//     )

//     const processResponse =(response)=>{
//         if(response?.status===200){
//             return {isSuccess :true,data :response.data}
//         }else{
//             return{
//                 isFailure :true,
//                 status:response?.status,
//                 msg:response?.msg,
//                 code:response?.code
//             }
//         }
//     }
//     const processError= (error)=>{
//         let errorMessage='';
//         if(error.response){
//             // console.log("ERROR IN REASPONSE :",error.toJSON());
//             errorMessage = `ERROR IN RESPONSE: ${JSON.stringify(error.response.data)}`;
//          console.log(errorMessage);
//             return {
//                 isError:true,
//                 msg: API_NOTIFICATION_MESSAGES.responseFailure,
//                 code:error.response.status
//             }
//         }else if(error.request){

//            // console.log("ERROR IN REQUEST :",error.toJSON());
//           errorMessage = `ERROR IN REQUEST: ${JSON.stringify(error.request)}`;
//         console.log(errorMessage);
//             return {
//                 isError:true,
//                 msg: API_NOTIFICATION_MESSAGES.requestFailure,
//                 code:""
//             }
//         }else{
//             errorMessage = `ERROR IN REQUEST: ${JSON.stringify(error.request)}`;
//         console.log(errorMessage);
//             // console.log("ERROR IN NETWORK :",error.toJSON());
//             return {
//                 isError:true,
//                 msg: API_NOTIFICATION_MESSAGES.networkError,
//                 code:""
//             }
//         }
//     }

//     const API={}
//     for(const [key,value] of Object.entries(SERVICE_URLS)){
//        API[key] =(body ,showUploadProgress,showDownloadProgress)=>
//         axiosInstance({
//             method :value.method,
//             url :value.url,
//             data :body,
//             responseType :value.responseType,
//             onUploadProgress: function(progressEvent){
//                 if(showUploadProgress){
//                     let percentageCompleted=Math.round((progressEvent.loaded *100)/progressEvent.total)
//                     showUploadProgress(percentageCompleted)
//                 }
//             },
//                 onDownloadProgress: function(progressEvent){
//                     if(showDownloadProgress){
//                         let percentageCompleted=Math.round((progressEvent.loaded *100)/progressEvent.total)
//                         showDownloadProgress(percentageCompleted)
//                     }
//             }
//         })
//        } 
//     export {API};





import axios from 'axios';
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config';
import { getAccessToken ,getType } from '../utils/common-utils';

const API_URL = 'http://localhost:8080';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "Content-type": "application/json"
    }
});

axiosInstance.interceptors.request.use(
    function(config) {
        if(config.TYPE.params){
            config.params=config.TYPE.params;
        }else if(config.TYPE.query){
            config.url=config.url +'/' + config.TYPE.query;
        }
        return config;
    },
    function(error) {
        console.error("Request error: ", error);
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function(response) {
        return processResponse(response);
    },
    function(error) {
        console.error("Response error: ", error);
        return Promise.reject(processError(error));
    }
);

const processResponse = (response) => {
    if (response?.status === 200) {
        return { isSuccess: true, data: response.data };
    } else {
        return {
            isFailure: true,
            status: response?.status || 'Unknown Status',
            msg: response?.statusText || 'Unknown Error',
            code: response?.code || 'Unknown Code'
        };
    }
};

const processError = (error) => {
    let errorMessage = '';
    if (error.response) {
        errorMessage = `ERROR IN RESPONSE: ${JSON.stringify(error.response.data)}`;
        console.error("Error in Response:", errorMessage);
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.status
        };
    } else if (error.request) {
        errorMessage = `ERROR IN REQUEST: ${JSON.stringify(error.request)}`;
        console.error("Error in Request:", errorMessage);
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ''
        };
    } else {
        errorMessage = `ERROR IN NETWORK: ${error.message}`;
        console.error("Error in Network:", errorMessage);
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: ''
        };
    }
};

const API = {};
for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? {} : body,
            responseType: value.responseType,
            headers:{
                authorization :getAccessToken(),
                "Accept":"application/json,multipart/form-data",
                "Content-Type" :"application/json"
            },
            TYPE :getType(value,body),
            onUploadProgress: function(progressEvent) {
                if (showUploadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress: function(progressEvent) {
                if (showDownloadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentageCompleted);
                }
            }
        });
}

export { API };
