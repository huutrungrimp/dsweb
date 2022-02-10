import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Row, Form } from "react-bootstrap";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

import { FacebookShareButton, FacebookIcon } from "react-share";
import { useParams } from "react-router-dom";

export default function PostDetail({ posts }) {
  const postID = useParams().postID;
  console.log(postID);
  // console.log(posts);
  const post =
    postID === undefined
      ? posts[0]
      : posts.filter((post) => post.id === parseInt(postID))[0];
  // const post = posts.filter((post) => post.id === parseInt(postID))[0];
  console.log(post);
  // console.log(post.content);

  return (
    <Row>
      <div className="col-9">
        <ReactMarkdown
          children={post.content}
          remarkPlugins={[gfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              console.log(props);
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, "")}
                  style={a11yDark}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        />
      </div>

      <div className="col-6">
        <h5>Leave your comments</h5>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Leave your comments</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
        </Form>
      </div>
      <div className="row row-cols-10">
        <div className="col-1">
          <ThumbUpIcon color="primary" />
        </div>
        <div className="col-1">
          <ThumbDownAltIcon />
        </div>
        <div className="col-2">
          <FacebookShareButton>
            <FacebookIcon size={36} />
          </FacebookShareButton>
        </div>
      </div>
    </Row>
  );
}
