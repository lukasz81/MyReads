import React, {Component} from 'react';

class Book extends Component {
  state = {
    isBookLoading: false
  }
  emitHandleChange = (book,shelf) => {
    this.props.handleChange(book,shelf)
    this.setState({ isBookLoading: true })
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ isBookLoading: false })
  }

  render() {
    const {book} = this.props;
    return(
      <div className={(this.state.isBookLoading) ? 'book busy':'book'}>
        <div className={book.isLoading ? 'busy':'not-busy'}></div>
        <div className="book-top">
          {(book.hasOwnProperty('imageLinks') && book.imageLinks.hasOwnProperty('thumbnail')) && (
            <div className="book-cover" style={{width: 128, height: 193, backgroundImage:`url("${book.imageLinks.thumbnail}")`}}>
            </div>
          )}
          <div className="book-shelf-changer">
            <select
              defaultValue={book.shelf}
              onChange={(event,currentBook=book) => this.emitHandleChange(currentBook,event.target.value)}>
              <option value="move" disabled>Move to...</option>
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
