import React, {Component} from 'react';

class Book extends Component {
  state = {
    isBookLoading: false
  }
  emitHandleChange = (book,shelf) => {
    this.props.handleChange(book,shelf)
    this.setState({ isBookLoading: true })
  };
  checkForShelf = (currentBook) => {
    const booksOnShelves = this.props.books;
    let shelf;
    if (booksOnShelves) {
      booksOnShelves.forEach( bookOnShelf => {
        if (bookOnShelf.id === currentBook.id) { shelf = bookOnShelf.shelf };
        return
      })
    } else {
      shelf = currentBook.shelf
    }
    return shelf ? shelf : 'none'
  }
  render() {
    const {book} = this.props;
    const {shouldShowLoading} = this.props
    return(
      <div className={(this.state.isBookLoading && shouldShowLoading) ? 'book busy':'book'}>
        <div className="book-top">
          {(book.hasOwnProperty('imageLinks') && book.imageLinks.hasOwnProperty('thumbnail')) && (
            <div className="book-cover" style={{width: 128, height: 193, backgroundImage:`url("${book.imageLinks.thumbnail}")`}}>
            </div>
          )}
          <div className="book-shelf-changer">
            <select
              defaultValue={this.checkForShelf(book)}
              onChange={(event,currentBook=book) => this.emitHandleChange(currentBook,event.target.value)}>
              <option value="" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.hasOwnProperty('authors') && (
            <div>
              {book.authors.map( (author,index) => (
                <span key={index}>{author}<br/></span>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
}
export default Book
