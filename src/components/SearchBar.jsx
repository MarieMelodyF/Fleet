const SearchBar = ({ search, setSearch }) => {
  return (
    <div>
      <input
        type="search"
        placeholder="Search a movie"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
          console.log(event.target.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
