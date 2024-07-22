// import { Box, Typography,styled } from "@mui/material";
// import { useContext } from "react";
// import {Delete } from '@mui/icons-material'
// import { DataContext } from "../../../context/DataProvider";

// const Component =styled(Box)`
//     margin-top :30px;
//     background :#F5F5F5;
//     padding : 10px;
// `
// const Container=styled(Box)`
//     display :flex; 
//     margin-bottom :5px;           
// `
// const Name=styled(Typography)`
//       font-weight:600  ;
//       font-size:18px;
//       margin-right :20px;
// `
// const StyledDate=styled(Typography)`
//         color :#878787;
//         font-size :14px;        
// `
// const DeleteIcon=styled()`
//         margin-left :auto;        
// `

// const Comment =({comment})=>{
//     const {acc}= useContext(DataContext);
//     return (
//         <Component>
//             <Container>
//             <Name>{comment.name}</Name>
//             <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
//             {
//                 comment.name===acc.username && <DeleteIcon/>
//             }
//             </Container>
//             <Box>
// <Typography>{comment.comments}</Typography>
//             </Box>
//         </Component>
//     )
// }
// export default Comment;
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useContext } from "react";
import { Delete } from '@mui/icons-material';
import { DataContext } from "../../../context/DataProvider";
import { API } from "../../../service/api";

const Component = styled(Box)`
    margin-top: 30px;
    background: #F5F5F5;
    padding: 10px;
`;

const Container = styled(Box)`
    display: flex; 
    margin-bottom: 5px;           
`;

const Name = styled(Typography)`
    font-weight: 600;
    font-size: 18px;
    margin-right: 20px;
`;

const StyledDate = styled(Typography)`
    color: #878787;
    font-size: 14px;        
`;

const DeleteIcon = styled(Delete)`
    margin-left: auto;        
`;

const Comment = ({ comment ,setToggle}) => {
    const { acc } = useContext(DataContext);

    const removeComment=async()=>{
    //    let response= await API.deleteComment(comment._id);
    //    if(response.isSuccess){
    //     setToggle(prevToggle =>!prevToggle)
    //    }
    // }
    try {
        let response = await API.deleteComment(comment._id);
        if (response.isSuccess) {
            setToggle(prevToggle => !prevToggle);
        } else {
            console.error('Failed to delete comment:', response);
        }
    } catch (error) {
        console.error('Error deleting comment:', error);
    }
};
    return (
        <Component>
            <Container>
                <Name>{comment.name}</Name>
                <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
                {comment.name === acc.username && <DeleteIcon onClick={removeComment}/>}
            </Container>
            <Box>
                <Typography>{comment.comments}</Typography>
            </Box>
        </Component>
    );
};

export default Comment;
