import React from 'react'
import {Route,Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks.js'
import BookShelf from './BookShelf.js'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    shelves: []
  };

  onUpdateShelf = (book,shelf) => {
    const currentBook = book;
    currentBook.shelf = shelf;
    BooksAPI.update(book, shelf).then( books => {
      this.setState( state => ({
        books: state.books.filter( books => books.id !== currentBook.id ).concat([currentBook])
      }))
    })
  }
  componentDidMount() {
    BooksAPI.getAll().then( books => {
      books.forEach(book => {
        this.setState(state => {
          books: this.state.books.push(book)
          shelves: !this.state.shelves.includes(book.shelf) ? this.state.shelves.push(book.shelf) : null
        });
      })
    })
  }
  render() {
    return (
      <div className="app">
          <Route path='/search' render={({history}) => (
            <SearchBooks changeState={() => {
                history.push('/');
              }}/>
          )}/>
        <Route exact path='/' render={() => (
            <div>
              <BookShelf onUpdateShelf={ (book,shelf) => { this.onUpdateShelf(book,shelf) }}
                         shelves={this.state.shelves}
                         books={this.state.books} />
              <div className="open-search">
                <Link to='/search'>Add a book</Link>
              </div>
            </div>
          )}/>
      </div> )
  }
}

export default BooksApp
