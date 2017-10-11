import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBookLoading: false,
      shelf: this.props.book.shelf
    };
    this.emitHandleChange = this.emitHandleChange.bind(this);
  }
  static PropTypes = {
    emitHandleChange: PropTypes.function,
    componentWillReceiveProps: PropTypes.function,
    handleChange: PropTypes.function,
    book: PropTypes.element.isRequired
  }
  emitHandleChange(book,shelf) {
    const { handleChange } = this.props;
    handleChange(book,shelf);
    this.setState({
      isBookLoading: true,
      shelf: shelf
     })
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ isBookLoading: false })
  }
  render() {
    const {book} = this.props;
    const {shelf,isBookLoading} = this.state;
    return(
      <div className={(isBookLoading) ? 'book busy':'book'}>
        <div className="book-top">
          {(book.hasOwnProperty('imageLinks') && book.imageLinks.hasOwnProperty('thumbnail')) && (
            <div className="book-cover" style={{width: 128, height: 193, backgroundImage:`url("${book.imageLinks.thumbnail}")`}}>
            </div>
          )}
          <div className="book-shelf-changer">
            <select
              defaultValue={shelf}
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
