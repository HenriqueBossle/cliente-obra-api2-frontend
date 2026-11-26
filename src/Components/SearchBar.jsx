import { useState } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch, placeholder }) {

    const [search, setSearch] = useState("");
    const [searching, setSearching] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (searching) return;

        setSearching(true);
        try {
            await onSearch(search);
        } finally {
            setSearching(false);
        }
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <input
                type="text"
                value={search}
                placeholder={placeholder}
                onChange={(e) => setSearch(e.target.value)}
            />

            <button type="submit" disabled={searching}>
                {searching ? "Pesquisando..." : "Pesquisar"}
            </button>
        </form>
    );
}

export default SearchBar;
