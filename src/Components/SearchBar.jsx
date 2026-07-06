import { useState } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch, placeholder }) {

    const [search, setSearch] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(search);
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <input
                type="text"
                value={search}
                placeholder={placeholder}
                onChange={(e) => setSearch(e.target.value)}
            />

            <button type="submit">
                Pesquisar
            </button>
        </form>
    );
}

export default SearchBar;