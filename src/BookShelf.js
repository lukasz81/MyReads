import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Book from './Book.js';
import PropTypes from 'prop-types';

class BookShelfs extends Component {
  static PropTypes = {
    books: PropTypes.array.isRequired,
    shelves: PropTypes.array.isRequired
  }
  handleChange = (book,shelf) => {
    this.props.updateShelf(book,shelf)
  }
  mapHeaderNames = (shelf) => {
    switch(shelf) {
      case 'currentlyReading':
        return 'Currently reading'
      case 'wantToRead':
        return 'Want to read'
      default:
        return 'Read'
    }
  }
  render(){
    const {books} = this.props;
    const {shelves} = this.props;
    const {isLoading} = this.props;
    return(
        <div className="list-books">
          <div className="list-books-title"><h1>MyReads</h1></div>
          <div className='list-books-content'>
            {shelves.map( shelf => (
              <div key={shelf.toString()} className="bookshelf">
                <h2 className="bookshelf-title">{this.mapHeaderNames(shelf)}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books.filter( book => book.shelf === shelf).map( book => (
                      <li key={book.id}>
                        <Book handleChange={(book,shelf) => this.handleChange(book,shelf)} book={book}/>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
          <div className="open-search">
            <Link to='/search'>Add a book</Link>
          </div>
        </div>
    )}
  }

export default BookShelfs
