import React from 'react';

function PostCard({ title, content, featuredImage }) {
    console.log('Rendering post:', { title, content, featuredImage }); // Log the post data to verify

    return (
        <div className="post-card">
            {featuredImage && <img src={featuredImage} alt={title} className="post-card-image" />}
            <h2>{title}</h2>
            <p>{content}</p>
        </div>
    );
}

export default PostCard;
