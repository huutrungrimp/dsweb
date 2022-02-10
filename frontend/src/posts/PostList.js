import React from "react";
import { Link } from "react-router-dom";

const PostList = ({ posts }) => {
  console.log(posts);

  return (
    <div>
      {Object.keys(posts).length === 0 ? (
        ""
      ) : (
        <div>
          <h5>Posts</h5>
          {posts.map((post) => (
            <ul className="list-unstyled">
              <li>
                <Link to={"/posts/" + post.id} key={"post" + post.id}>
                  {post.title}
                </Link>
              </li>
            </ul>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;
