import React, {Component} from 'react';

class BookShelfs extends Component {
  render(){
    const {books} = this.props;
    const {shelfOne} = this.props.books[0];
    const {shelfTwo} = this.props.books[0];
    const {shelfThree} = this.props.books[0];
    return(
        <div className="list-books">
          <div className="list-books-title"><h1>MyReads</h1></div>
          <div className="list-books-content">
            <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {shelfOne.map( shelf => (
                      <li key={shelf[0].id}>
                        <div  className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url("${shelf[0].imageLinks.thumbnail}")` }}>
                            </div>
                            <div className="book-shelf-changer">
                              <select>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{shelf[0].title}</div>
                          <div className="book-authors">
                            {shelf[0].authors.map( (author,index) => (
                              <span key={index}>{author}<br/></span>
                            ))}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
                <h2 className="bookshelf-title">Want to read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {shelfTwo.map( shelf => (
                      <li key={shelf[0].id}>
                        <div  className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url("${shelf[0].imageLinks.thumbnail}")` }}>
                            </div>
                            <div className="book-shelf-changer">
                              <select>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{shelf[0].title}</div>
                          <div className="book-authors">
                            {shelf[0].authors.map( (author,index) => (
                              <span key={index}>{author}<br/></span>
                            ))}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {shelfThree.map( shelf => (
                      <li key={shelf[0].id}>
                        <div  className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url("${shelf[0].imageLinks.thumbnail}")` }}>
                            </div>
                            <div className="book-shelf-changer">
                              <select>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{shelf[0].title}</div>
                          <div className="book-authors">
                            {shelf[0].authors.map( (author,index) => (
                              <span key={index}>{author}<br/></span>
                            ))}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
            </div>
          </div>
        </div>
    )}
  }

export default BookShelfs
