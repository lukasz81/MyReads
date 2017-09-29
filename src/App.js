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
    isLoading: true
  };

  onSearchForBooks = (query) => {
    const limit = 10;
    if (query.length > 0) {
      BooksAPI.search(query, limit).then( results => {
        this.setState( state => ({
          results: state.results = results
        }))
      })
    } else {
      this.setState( state => ({
        results: state.results = []
      }))
    }
  }
  onUpdateShelf = (book,shelf) => {
    const currentBook = book;
    currentBook.shelf = shelf;
    BooksAPI.update(currentBook, shelf).then( books => {
      this.setState( state => ({
        books: state.books.filter( books => books.id !== currentBook.id ).concat([currentBook])
      }))
    })
  }
  addOnlyUniqueValues = (value) => {
    if (!this.state.shelves.includes(value)) {
      this.state.shelves.concat([value])
    } else {
      return
    }
  }
  componentDidMount() {
    BooksAPI.getAll().then( books => {
      books.forEach(book => {
        this.setState(state => ({
          books: state.books.concat([book]),
          shelves: !state.shelves.includes(book.shelf) ? state.shelves.concat([book.shelf]) : state.shelves.slice(state.shelves[book.shelf]),
          isLoading: state.isLoading = false
        }));
      })
    })
  }
  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchBooks
            searchForBooks={query => this.onSearchForBooks(query)}
            updateShelf={ (book,shelf) => { this.onUpdateShelf(book,shelf) }}
            results={this.state.results}
          />
        )}/>
        <Route exact path='/' render={() => (
          <div className={this.state.isLoading ? 'busy':''}>
            <BookShelf
              updateShelf={ (book,shelf) => { this.onUpdateShelf(book,shelf) }}
              shelves={this.state.shelves}
              books={this.state.books}
              isLoading={this.state.isLoading}
            />
          </div>
        )}/>
      </div> )
  }
}

export default BooksApp
