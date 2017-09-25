import React, {Component} from 'react';

class BookShelfs extends Component {
  handleChange = (book,shelf) => {
    this.props.onUpdateShelf(book,shelf)
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
    return(
        <div className="list-books">
          <div className="list-books-title"><h1>MyReads</h1></div>
          <div className="list-books-content">
            {shelves.map( shelf => (
              <div key={shelf.toString()} className="bookshelf">
                <h2 className="bookshelf-title">{this.mapHeaderNames(shelf)}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books.filter( book => book.shelf === shelf).map( book => (
                      <li key={book.id}>
                        <div  className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url("${book.imageLinks.thumbnail}")` }}>
                            </div>
                            <div className="book-shelf-changer">
                              <select
                                defaultValue={`${book.shelf}`}
                                onChange={(event,currentBook=book) => this.handleChange(currentBook,event.target.value)}>
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
                            {book.authors.map( (author,index) => (
                              <span key={index}>{author}<br/></span>
                            ))}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </div>
    )}
  }

export default BookShelfs
