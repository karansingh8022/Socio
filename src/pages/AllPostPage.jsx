import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components/Index";
import services from "../appwrite/config";

const AllPostPage = ()=>{
    const [posts, setPosts] = useState([]);
    useEffect(()=>{}, []);

    services.getActivePost([]).then((post)=>{
        if(post){
            setPosts(post.documents);
        }
    })

    
    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {
                        posts.map((post)=>(
                            <div key={post.$id} className="p-2 w-1/4">
                                <PostCard {...post}/>
                            </div>
                        ))
                    }
                </div>
            </Container>

        </div>
    )
}

export default AllPostPage;