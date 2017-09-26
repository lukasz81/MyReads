import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import sortBy from 'sort-by';

class SearchBooks extends Component {
  handleChange = (query) => {
    this.props.searchForBooks(query)
  }
  handleSelectChange = (book,shelf) => {
    this.props.updateShelf(book,shelf)
  }
  render() {
    const {results} = this.props;
    const sortedResults = (results.length > 0) ? results.sort(sortBy('title')) : [];
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/"/>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              onChange={(event) => {this.handleChange(event.target.value)}}
              placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {sortedResults.map( book => (
              <li key={book.id}>
                <div  className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url("${book.imageLinks.thumbnail}")` }}>
                    </div>
                    <div className="book-shelf-changer">
                      <select
                        defaultValue={ book.shelf ? `${book.shelf}`:`none`}
                        onChange={(event,currentBook=book) => this.handleSelectChange(currentBook,event.target.value)}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">
                    {book.authors !== undefined && (
                      <div>
                        {book.authors.map( (author,index) => (
                          <span key={index}>{author}<br/></span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}
export default SearchBooks
