import React, { Component } from "react";
import Joi from "joi-browser";
import { savePost } from "../services/posts";

class PostForm extends Component {
  state = {
    data: { author_name: "", author_email: "", body: "" },
    errors: {},
  };

  // define schema to validate fields
  schema = {
    author_name: Joi.string().required().label("Author Name"),
    author_email: Joi.string().email().required().label("Author Email"),
    body: Joi.string().required().min(10).required().label("Post Content"),
  };

  // field validation against schema
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

  // validate each property
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  // handling change event for each property
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  // rander input fields dynamically
  renderInput(name, label, type, placeholder) {
    const { data, errors } = this.state;
    return (
      <React.Fragment>
        <div className="form-group">
          <label>{label}</label>
          <input
            type={type}
            className="form-control"
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

  // handle submit, validate form and save post
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    // user's post will be submitted.
    savePost(this.state.data);
    this.props.history.push("/posts");
  };

  render() {
    const { data, errors } = this.state;
    return (
      <React.Fragment>
        <h4> Create Post</h4>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("author_name", "Author Name", "text", "")}
          {this.renderInput(
            "author_email",
            "Author Email",
            "email",
            "name@example.com"
          )}
          <div className="form-group">
            <label for="post">Post</label>
            <textarea
              className="form-control"
              name="body"
              rows="3"
              value={data.body}
              onChange={this.handleChange}
            ></textarea>
            {errors.body && (
              <div className="alert alert-danger"> {errors.body}</div>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary mb-2"
            //disabled={this.validate()}
          >
            Submit Post
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default PostForm;
