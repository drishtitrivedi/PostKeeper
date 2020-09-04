import React from "react";

const CommentsView = ({ comments, onDelete }) => {
  comments.sort((a, b) => b.id - a.id);
  return (
    <React.Fragment>
      <div className="container">
        {comments.map((c) => (
          <div key={c.id} className="row p-2 mb-3 bg-light rounded">
            <div className="col-md-11">
              <p>
                By {c.reply_name}
                <span className="blog-post-meta font-italic">
                  ({c.reply_email})
                </span>
              </p>
              <p className="mb-0">{c.reply_body}</p>
              <a className="remove" onClick={() => onDelete(c)}>
                <i class="fa fa-trash"></i> Remove
              </a>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default CommentsView;
