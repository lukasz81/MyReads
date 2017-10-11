import React from 'react'
import {Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks.js'
import BookShelf from './BookShelf.js'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    results: [],
    shelves: [],
    isLoading: true,
    isAppInError: false
  };
  // this function is going to take search results and compare it with current
  // shelf state. If It finds the same book it will update book's shelf on the
  // search results.
  addShelfIfNeeded = (results) => {
    const booksOnShelves = this.state.books;
    results.map(book => {
      const existingBook = booksOnShelves.find((b) => b.id === book.id);
      return book.shelf = existingBook ? existingBook.shelf : 'none';
    })
    return results
  };
  onSearchForBooks = (query) => {
    const SEAERCH_LIMIT = 10;
    if (query.length > 0) {
      BooksAPI.search(query, SEAERCH_LIMIT).then(results => {
        this.setState(state => ({
          results: state.results = results.error ? [] : this.addShelfIfNeeded(results) // this will handle the error from API
        }))
      })
    } else {
      this.setState(state => ({
        results: state.results = []
      }))
    }
  };
  onUpdateShelf = (book,shelf) => {
    const currentBook = book;
    currentBook.shelf = shelf;
    BooksAPI.update(currentBook, shelf).then(books => {
      this.setState(state => ({
        books: state.books.filter(books => books.id !== currentBook.id).concat([currentBook]),
        isLoading: state.isLoading = false
      }))
    }).catch(error => {
      this.handleError(error);
    })
  };
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      books.forEach(book => {
        this.setState(state => ({
          books: state.books.concat([book]),
          shelves: !state.shelves.includes(book.shelf) ? state.shelves.concat([book.shelf]) : state.shelves.slice(state.shelves[book.shelf]),
          isLoading: state.isLoading = false
        }));
      })
    }).catch(error => {
      this.handleError();
    })
  };
  handleError(error) {
    this.setState(state => ({
      books: state.books = [],
      shelves: state.shelves = [],
      isLoading: state.isLoading = false,
      isAppInError: state.isAppInError = true
    }));
  };
  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchBooks
            searchForBooks={query => this.onSearchForBooks(query)}
            updateShelf={(book,shelf,query) => { this.onUpdateShelf(book,shelf,query)}}
            results={this.state.results}
            books={this.state.books}
            isLoading={this.state.isLoading}
          />
        )}/>
        <Route exact path='/' render={() => (
          <div className={this.state.isLoading ? 'books busy':'books'}>
            <BookShelf
              updateShelf={(book,shelf) => {this.onUpdateShelf(book,shelf)}}
              shelves={this.state.shelves}
              books={this.state.books}
              isAppInError={this.state.isAppInError}
            />
          </div>
        )}/>
      </div> )
  }
};

export default BooksApp
