import React from "react";

const CommentsView = ({ comments, onDelete }) => {
  return (
    <React.Fragment>
      <div className="container">
        {comments.map((c) => (
          <div key={c.id} className="row p-2 mb-3 bg-light rounded">
            <div className="col-md-11">
              <p className="font-italic">
                By {c.reply_name}{" "}
                <span className="text-muted">({c.reply_email})</span>
              </p>
              <p className="mb-0">{c.reply_body}</p>
            </div>
            <div className="col col-sm-1">
              <a className="remove" onClick={() => onDelete(c)}>
                <i className="fa fa-minus-square" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default CommentsView;
