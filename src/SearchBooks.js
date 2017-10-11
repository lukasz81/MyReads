import React, {Component} from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import sortBy from 'sort-by';
import Book from './Book.js';
import BooksApp from './App.js';
import { Debounce } from 'react-throttle';

class SearchBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {query: ''};
    this.handleChange = this.handleChange.bind(this);
  }
  static PropTypes = {
    results: PropTypes.array.isRequired,
    handleChange: PropTypes.function,
    handleSelectChange: PropTypes.function
  }
  handleChange = (query) => {
    this.setState({
      query: query.trim()
    })
    this.props.searchForBooks(query)
  }
  handleSelectChange = (book,shelf) => {
    this.props.updateShelf(book,shelf)
  }
  render() {
    const {results} = this.props;
    const {handleChange,handleSelectChange} = this;
    const sortedResults = (results && results.length > 0) ? results.sort(sortBy('title')) : [];
    return(
      <Router>
        <div className='search'>
          <Route path='/search' render={() => (
            <div className="search-books">
              <div className="search-books-bar">
                <Link className="close-search" to="/"/>
                <div className="search-books-input-wrapper">
                  <Debounce time="400" handler="onChange">
                    <input
                      className="test"
                      type="text"
                      onChange={event => {handleChange(event.target.value)}}
                      placeholder="Search by title or author"/>
                </Debounce>
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                  {sortedResults.length === 0 && (
                    <p>NO RESULTS</p>
                  )}
                  {sortedResults.map(book => (
                    <li key={book.id}>
                      <Book handleChange={(book,shelf) => handleSelectChange(book,shelf)} book={book}/>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}/>
        <Route exact path="/" component={BooksApp}/>
      </div>
    </Router>
    )
  }
}
export default SearchBooks
