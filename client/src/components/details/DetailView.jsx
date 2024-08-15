

import React, { useEffect, useState, useContext} from "react";
import { Box, Typography, styled } from "@mui/material";
import { useParams ,Link} from "react-router-dom";
import { API } from "../../service/api";
import { Edit, Delete } from '@mui/icons-material';
import { DataContext } from "../../context/DataProvider";
import { useNavigate} from "react-router-dom";
import Comments from "./comments/Comments";


const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0,
    },
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover',
});

const Heading = styled(Typography)`
    font-size: 38px;
    font-weight: 600;
    text-align: center;
    margin: 50px 0 10px 0;
`;

const IconWrapper = styled(Box)`
    float: right;
`;

const EditIcon = styled(Edit)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
    cursor: pointer;
`;

const DeleteIcon = styled(Delete)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
    cursor: pointer;
`;

const Author = styled(Box)`
    color: #878787;
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
`;

const DetailView = () => {
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const { acc } = useContext(DataContext);
    const navigate=useNavigate();

    const url = post?.picture || 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.getPostById(id);
                if (response.isSuccess) {
                    setPost(response.data);
                } else {
                    console.error("API response error:", response);
                    setError(response);
                }
            } catch (err) {
                console.error("Fetch error:", err);
                setError({ msg: { title: "Error", message: err.message } });
            }
        };
        fetchData();
    }, [id]);

    const deleteBlog = async() =>{
       try{
         let response =await API.deletePost(post._id);
        if(response.isSuccess){
            navigate('/');
        }else {
            console.error("Failed to delete post");
        }
    } catch (err) {
        console.error("Error deleting post:", err);
    }
};

    

    if (error) {
        //console.log(error.msg.message);
        return (
            <Container>
                <Typography variant="h4" color="error">Error is: {error.msg.title}</Typography>
               
                <Typography variant="body1" color="error">{error.msg.message}</Typography>
            </Container>
        );
    }

    if (!post) {
        return <Typography>Loading...</Typography>;
    }

    return (
        
        <Container>
            <Image src={url} alt="blog" />
            <IconWrapper>
        
                {acc.username === post.username && (
                    <>
                        < Link to={`/update/${post._id}`}><EditIcon color="primary" /></Link>
                        <DeleteIcon onClick={deleteBlog}color="error" />
                    </>
                )}
            </IconWrapper>
            <Heading>{post.title}</Heading>
            <Author>
                <Typography variant="body1">Author : {post.username}</Typography>
                <Typography variant="body1">{new Date(post.createdDate).toDateString()}</Typography>
            </Author>
            <Typography variant="body1">{post.description}</Typography>
            <Comments post={post}/>
        </Container>
    );
};

export default DetailView;
