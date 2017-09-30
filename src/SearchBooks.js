import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import sortBy from 'sort-by';
import Book from './Book.js';

class SearchBooks extends Component {
  static PropTypes = {
    results: PropTypes.array.isRequired
  }
  handleChange = (query) => {
    this.props.searchForBooks(query)
  }
  handleSelectChange = (book,shelf) => {
    this.props.updateShelf(book,shelf)
  }
  render() {
    const {results} = this.props;
    const {books} = this.props;
    const sortedResults = (results.length > 0) ? results.sort(sortBy('title')) : [];
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/"/>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              onChange={ event => {this.handleChange(event.target.value)} }
              placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {sortedResults.length === 0 && (
              <p>NO RESULTS</p>
            )}
            {sortedResults.map( book => (
              <li key={book.id}>
                <Book handleChange={ (book,shelf) => this.handleSelectChange(book,shelf)} books={books} book={book}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}
export default SearchBooks
