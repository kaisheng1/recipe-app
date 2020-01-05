import React, { useState } from "react";
//bootstrap
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
//icon
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState("");
  const onSubmit = e => {
    e.preventDefault();
    onSearch(search);
  };
  return (
    <form className="mt-2 mb-2" onSubmit={onSubmit}>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-bar"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </InputGroup>
    </form>
  );
};

export default SearchBar;
