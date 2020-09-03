import React, { Component } from "react";
import PostList from "./postList";
import { getPosts } from "../services/posts.js";
import SearchBox from "./search";

class Posts extends Component {
  state = {
    posts: [],
    searchQuery: "",
    searchBy: "",
  };

  componentDidMount() {
    this.setState({ posts: getPosts() });
  }

  deletePost = (post) => {
    const posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });
  };

  handleSearch = (e) => {
    this.setState({ searchQuery: e.target.value, searchBy: e.target.name });
  };

  render() {
    const { posts, searchQuery, searchBy } = this.state;
    let filteredPosts = posts;
    console.log(posts);

    if (searchQuery) {
      if (searchBy === "author_name")
        filteredPosts = posts.filter((p) =>
          p.author_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      if (searchBy === "author_email")
        filteredPosts = posts.filter((p) =>
          p.author_email.toLowerCase().includes(searchQuery.toLowerCase())
        );
      if (searchBy === "body")
        filteredPosts = posts.filter((p) =>
          p.body.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    return (
      <React.Fragment>
        <SearchBox onSearch={this.handleSearch} />
        <PostList onDelete={this.deletePost} posts={filteredPosts} />
      </React.Fragment>
    );
  }
}

export default Posts;
