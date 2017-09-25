import React from 'react'
import {Route,Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks.js'
import BookShelf from './BookShelf.js'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [{
      shelfOne: [],
      shelfTwo: [],
      shelfThree: []
    }]
   }
  putBooksOnShelves = (shelf, book) => {
    this.setState(state => {
      books: this.state.books[0][shelf].push([book])
    });
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      books.forEach((book) => {
        if (book.shelf === 'currentlyReading') {
          this.putBooksOnShelves('shelfOne', book);
        } else if (book.shelf === 'wantToRead') {
          this.putBooksOnShelves('shelfTwo', book);
        } else {
          this.putBooksOnShelves('shelfThree', book);
        }
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
              <BookShelf books={this.state.books} />
              <div className="open-search">
                <Link to='/search'>Add a book</Link>
              </div>
            </div>
          )}/>
      </div> )
  }
}

export default BooksApp
