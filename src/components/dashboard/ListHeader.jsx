import React from "react";
import { IoIosSearch } from "react-icons/io";
import Select from "react-select";

const FILTER_BY_OPTIONS = [
  { value: "all", label: "All" },
  { value: "new", label: "New" },
  { value: "complete", label: "Complete" },
  { value: "isFavorite", label: "Favorite" },
];

const ListHeader = (props) => {
  const { searchItem, setSearchItem, filterBy, setFilterBy } = props;
  return (
    <>
      <h2> TODO LIST</h2>
      <div className="header-container">
        <div className="search-container">
          <input
            type="text"
            className="search-box"
            placeholder="search"
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
          />
          <IoIosSearch className="search-icon" />
        </div>
        <div className="filter-container">
          <Select
            onChange={(value) => setFilterBy(value)}
            options={FILTER_BY_OPTIONS}
            value={filterBy}
          />
        </div>
      </div>
    </>
  );
};

export default ListHeader;
