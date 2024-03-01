import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components/Index.jsx";
import services from "../appwrite/config.js";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = ()=>{

    const [posts, setPosts] = useState({});
    const {slug} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        if(slug){
            services.getPost(slug).then((post)=>{
                if(post){
                    setPosts(post);
                }
            })
        }
        else{
            navigate("/");
        }
    }, [slug, navigate]);


    return !posts ? null : (
        <div className="py-8">
            <Container>
                <PostForm post={posts}/>
            </Container>
        </div>
    )
}

export default EditPost;