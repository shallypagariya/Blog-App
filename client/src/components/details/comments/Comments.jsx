
// import { Box,TextareaAutosize,Button } from "@mui/material";
// //import { styled } from '@mui/system';
// import { styled } from "@mui/material/styles";
// import { useState ,useContext,useEffect} from "react";
// import {DataContext} from '../../../context/DataProvider';
// import {API} from '../../../service/api';
// import Comment from "./Comment";
// const Container=styled(Box)`
//     margin-top:100px;
//     display:flex;
// `
// const Image=styled('img')({
//     width :50,
//     height :50,
//     borderRadius :'50%'

// })
// const StyledTextArea=styled(TextareaAutosize)`
//         height :100px;
//         width :100%;
//         margin: 0 20px;   
// `

// const intialValues={
//     name :'',
//     postId :'',
//     comments :'',
//     date : new Date()

// }

// export const Comments =({post})=>{
//     const [comment,setComment] =useState(intialValues);
//     const [comments,setComments] =useState([]);
//     const[toggle,setToggle]=useState(false);

//     const url = 'https://static.thenounproject.com/png/12017-200.png'
//     const {acc} = useContext(DataContext);

//     useEffect(()=>{
//         const getData=async()=>{
//             const response=await API.getAllComments(post._id);
//             if(response.isSuccess){
//                 setComments(response.data);
//             }
//         }
//         getData();
//     },[post ,toggle])
//     const handleChange =(e)=>{
//         setComment({
//             ...comment,
//             name :acc.username,
//             postId:post._id,
//             comments :e.target.value
//         })
//     }
//     const addComment=async()=>{
//         let response=await API.newComment(comment);
//         if(response.isSuccess){
//             setComment(intialValues);
//         }
//         setToggle(prevToggle => !prevToggle)
//     }
//     return(

//         <Box>
//             <Container>
//             <Image src={url} alt="dp"/>
//             <StyledTextArea
//                  minRows={5}
//                  placeholder="What's on your mind?"
//                  value={comment.comments}
//                  onChange={handleChange}   
//                     />
//                     <Button variant="contained" color ="primary" size="medium" style={{height :40}} onClick={addComment}>Post</Button>
//             </Container>
//                 <Box>
//                     {
//                         comments && comments.length >0 && comments.map(comment=>{
//                             <Comment comment={comment}/>
//                         })
//                     }
//                 </Box>
            
//         </Box>
//     )
// }
// export default Comments;

import { Box, TextareaAutosize, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState, useContext, useEffect } from "react";
import { DataContext } from '../../../context/DataProvider';
import { API } from '../../../service/api';
import Comment from "./Comment";

const Container = styled(Box)`
    margin-top: 100px;
    display: flex;
`;

const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%'
});

const StyledTextArea = styled(TextareaAutosize)`
    height: 100px;
    width: 100%;
    margin: 0 20px;
`;

const initialValues = {
    name: '',
    postId: '',
    comments: '',
    date: new Date()
};

export const Comments = ({ post }) => {
    const [comment, setComment] = useState(initialValues);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);

    const url = 'https://static.thenounproject.com/png/12017-200.png';
    const { acc } = useContext(DataContext);

    useEffect(() => {
        const getData = async () => {
            const response = await API.getAllComments(post._id);
            if (response.isSuccess) {
                setComments(response.data);
            }
        };
        getData();
    }, [post, toggle]);

    const handleChange = (e) => {
        setComment({
            ...comment,
            name: acc.username,
            postId: post._id,
            comments: e.target.value
        });
    };

    const addComment = async () => {
        let response = await API.newComment(comment);
        if (response.isSuccess) {
            setComment(initialValues);
            setToggle(prevToggle => !prevToggle);
        }
    };

    return (
        <Box>
            <Container>
                <Image src={url} alt="dp" />
                <StyledTextArea
                    minRows={5}
                    placeholder="What's on your mind?"
                    value={comment.comments}
                    onChange={handleChange}
                />
                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    style={{ height: 40 }}
                    onClick={addComment}
                >
                    Post
                </Button>
            </Container>
            <Box>
                {comments && comments.length > 0 && comments.map(comment => (
                    <Comment key={comment._id} comment={comment} setToggle={setToggle} />
                ))}
            </Box>
        </Box>
    );
};

export default Comments;
