import React, { Component } from "react";
import CommentForm from "./commentForm";
import CommentsView from "./commentView";
// Get sample reply from pre-saved file
import { getReply } from "../services/comments";

class PostList extends Component {
  state = {
    display: true,
    comments: [],
  };

  // save replies as state
  componentDidMount = () => {
    const comments = getReply();
    this.setState({ comments });
  };

  // get reply(comments) based on post Id
  getComments = (id) => {
    let { comments } = this.state;
    comments = comments.filter((c) => c.post_id === id);
    return comments;
  };

  // maintain status for displaying reply form
  submitReply = () => {
    this.setState({ display: false });
  };

  // Delete reply
  deleteComment = (comment) => {
    const comments = this.state.comments.filter((c) => c.id !== comment.id);
    this.setState({ comments });
  };

  // get reply form on click of 'Reply' button
  render() {
    const Reply = ({ postId }) => {
      const [showResults, setShowResults] = React.useState(false);
      const [reply, setReply] = React.useState("Reply");
      const onClick = () => {
        showResults ? setShowResults(false) : setShowResults(true);
        reply === "Reply" ? setReply("Cancel") : setReply("Reply");
      };
      return (
        <div>
          <button
            type="button"
            className="btn-sm btn-primary"
            onClick={onClick}
          >
            {reply}
          </button>

          {showResults ? (
            <Results
              postId={postId}
              style={this.state.display ? "block" : "none"}
            />
          ) : null}
        </div>
      );
    };

    // display replies(comments) under each post
    const Results = ({ postId }) => {
      return <CommentForm postId={postId} onSubmit={this.submitReply} />;
    };

    const { posts, onDelete } = this.props;
    // sort posts from newest to oldest
    posts.sort((a, b) => b.id - a.id);

    return (
      <React.Fragment>
        {posts.map((post) => (
          <div className="blog-post" key={post.id}>
            <p className="blog-post-title">By {post.author_name}</p>
            <p className="blog-post-meta">
              <span className="font-italic">{post.author_email}</span>
            </p>
            <p>{post.body}</p>
            <div className="row p-2"></div>
            <div className="row p-3">
              <div className="col-11 action" style={{ float: "left" }}>
                <Reply postId={post.id} />
              </div>
              <div className="col-1 action" style={{ float: "left" }}>
                <button
                  type="button"
                  className="btn-sm btn-danger"
                  onClick={() => onDelete(post)}
                >
                  Delete
                </button>
              </div>
            </div>

            <CommentsView
              comments={this.getComments(post.id)}
              onDelete={this.deleteComment}
            />
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export default PostList;
