import React, { Component } from "react";
import CommentForm from "./commentForm";
import CommentsView from "./commentView";
import { getReply } from "../services/comments";

class PostList extends Component {
  state = {
    display: true,
    comments: [],
  };

  componentDidMount = () => {
    const comments = getReply();
    this.setState({ comments });
  };

  getComments = (id) => {
    let { comments } = this.state;
    comments = comments.filter((c) => c.post_id === id);
    return comments;
  };

  submitReply = () => {
    this.setState({ display: false });
  };

  deleteComment = (comment) => {
    const comments = this.state.comments.filter((c) => c.id !== comment.id);
    this.setState({ comments });
  };

  render() {
    const Reply = ({ postId }) => {
      const [showResults, setShowResults] = React.useState(false);
      let icon = <i className="fa fa-commenting-o" aria-hidden="true"></i>;
      const onClick = () => {
        icon = showResults ? (
          <i className="fa fa-commenting-o" aria-hidden="true"></i>
        ) : (
          <i class="fa fa-times" aria-hidden="true"></i>
        );
        showResults ? setShowResults(false) : setShowResults(true);
      };
      return (
        <div>
          <button
            type="button"
            className="btn-sm btn-primary"
            onClick={onClick}
          >
            Reply {icon}
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

    const Results = ({ postId }) => {
      return <CommentForm postId={postId} onSubmit={this.submitReply} />;
    };

    const { posts, onDelete } = this.props;

    return (
      <React.Fragment>
        {posts.map((post) => (
          <div className="blog-post" key={post.id}>
            <h5 className="blog-post-title">By {post.author_name}</h5>
            <p className="blog-post-meta">
              <span>{post.author_email}</span>
            </p>
            <p>{post.body}</p>
            <div className="row p-3">
              <div className="col col-md-11">
                <Reply postId={post.id} />
              </div>
              <div className="col col-sm-1">
                <button
                  type="button"
                  className="btn-sm btn-danger"
                  onClick={() => onDelete(post)}
                >
                  <i className="fa fa-trash" aria-hidden="true"></i>
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
