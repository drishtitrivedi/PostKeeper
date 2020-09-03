import React, { Component } from "react";
import { saveReply } from "../services/comments";
import Joi from "joi-browser";

class CommentForm extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    data: { post_id: "", reply_name: "", reply_email: "", reply_body: "" },
    errors: {},
  };

  schema = {
    post_id: Joi.number().required(),
    reply_name: Joi.string().required().label("Reply Name"),
    reply_email: Joi.string().email().required().label("Reply Email"),
    reply_body: Joi.string().required().label("Reply"),
  };

  componentDidMount() {
    const { postId } = this.props;
    const { data } = this.state;
    data.post_id = postId;
    this.setState({ data });
  }

  validate = () => {
    const options = {
      abortEarly: false,
    };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderInput(name, label, type, placeholder) {
    const { data, errors } = this.state;
    return (
      <React.Fragment>
        <div className="form-group">
          <label>{label}</label>
          <input
            type={type}
            className="form-control form-control-sm"
            name={name}
            value={data[name]}
            onChange={this.handleChange}
            placeholder={placeholder}
          />
          {errors[name] && (
            <div className="alert alert-danger"> {errors[name]}</div>
          )}
        </div>
      </React.Fragment>
    );
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    // user's reply will be submitted.
    console.log(this.state.data);
    saveReply(this.state.data);
    this.props.onSubmit();
  };

  render() {
    const { data, errors } = this.state;

    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit} className="p-3">
          <input
            type="hidden"
            value={data.post_id}
            name="post_id"
            onChange={this.handleChange}
          />
          {this.renderInput("reply_name", "Replier Name", "text", "")}
          {this.renderInput(
            "reply_email",
            "Replier Email",
            "email",
            "name@example.com"
          )}
          <div className="form-group">
            <label>Reply</label>
            <textarea
              className="form-control form-control-sm"
              name="reply_body"
              rows="2"
              value={data.reply_body}
              onChange={this.handleChange}
            ></textarea>
            {errors.reply_body && (
              <div className="alert alert-danger"> {errors.reply_body}</div>
            )}
          </div>
          <button type="submit" className="btn-sm btn-primary mb-2">
            Post
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default CommentForm;
