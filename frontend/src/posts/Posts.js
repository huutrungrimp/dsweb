import { Row, Col } from "react-bootstrap";

import React from "react";
import PostList from "./PostList";
import PostDetail from "./PostDetail";

const Posts = ({ posts }) => {
  console.log(posts);
  return (
    <Row style={{ marginTop: "70px" }}>
      <Col xs={12} md={3} style={{minHeight:'130px'}}>
        <div className='postlist'><PostList posts={posts} /></div>
      </Col>
      <Col xs={12} md={9}>
        <PostDetail posts={posts} />
      </Col>
    </Row>
  );
};

export default Posts;
