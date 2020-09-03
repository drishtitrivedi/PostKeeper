import React from "react";

const SearchBox = ({ onSearch }) => {
  return (
    <React.Fragment>
      <form className="form-inline d-flex justify-content-end md-form form-sm active-pink active-pink-2 mt-2">
        <input
          className="form-control form-control-sm ml-3"
          name="body"
          type="text"
          placeholder="Search by Post..."
          aria-label="Search"
          onChange={(v) => onSearch(v)}
        />

        <input
          className="form-control form-control-sm ml-3"
          name="author_name"
          type="text"
          placeholder="Search by Author..."
          aria-label="Search"
          onChange={(v) => onSearch(v)}
        />

        <input
          className="form-control form-control-sm ml-3"
          name="author_email"
          type="text"
          placeholder="Search by Email..."
          aria-label="Search"
          onChange={(v) => onSearch(v)}
        />
        {/* <i class="fa fa-search" aria-hidden="true"></i> */}
      </form>
    </React.Fragment>
  );
};

export default SearchBox;
