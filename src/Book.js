import React, {Component} from 'react';

class Book extends Component {
  emitHandleChange = (book,shelf) => {
    this.props.handleChange(book,shelf)
  }
  checkIfExistsInJson = (key) => {
    if (!key.smallThumbnail) return false
    return true
  }
  render(){
    const {book} = this.props;
    return(
      <div  className="book">
        <div className="book-top">
          {this.checkIfExistsInJson(book.imageLinks) && (
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url("${book.imageLinks.smallThumbnail}")` }}>
            </div>
          )}
          <div className="book-shelf-changer">
            <select
              defaultValue={book.shelf ? `${book.shelf}`:`none`}
              onChange={(event,currentBook=book) => this.emitHandleChange(currentBook,event.target.value)}>
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
    )
  }
}
export default Book
