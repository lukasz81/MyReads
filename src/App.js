import React from 'react'
import {Route,Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks.js'
import BookShelf from './BookShelf.js'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books:[]
   }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log(books);
      this.setState({ books })
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
