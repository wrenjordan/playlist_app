import './SearchBar.css';
import React from 'react';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.onSearch = this.onSearch.bind(this);
    }

    onSearch(searchTerm) {
        this.props.onSearch(searchTerm);
    }

    handleTermChange(e) {
        this.setState({searchResults: e.target.value});
    }

    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
                <button className="SearchButton">SEARCH</button>
            </div>
        );
    }
}

export default SearchBar;