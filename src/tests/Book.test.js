import React from 'react'
import Book from '../Book'
import { testBooks } from './testBooksData';
import {shallow,configure,mount,render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });

describe('Render Book Component', () => {
  const handleChange = jest.fn();
  const book = testBooks.books[0];
  const emitHandleChange = jest.fn();
  const reactElement = <Book key={book.id}
        title={book.title}
        authors={book.authors}
        coverImageUrl={book.imageLinks.thumbnail}
        handleChange={handleChange}
        shelf={book.shelf}
        book={book} />

  it("should create book", () => {
    const testBookRender = render(reactElement);
    expect(testBookRender).toBeDefined();
  });

  it("should have class 'busy' if state:{isLoading:true}", () => {
    const testBook = shallow(reactElement);
    testBook.setState({ isBookLoading: true });
    expect(testBook.hasClass('busy') === true).toEqual(true);
  });

  it("should NOT have class 'busy' if state:{isLoading:false}", () => {
    const testBook = shallow(reactElement);
    testBook.setState({ isBookLoading: false });
    expect(testBook.hasClass('busy') === true).toEqual(false);
  });

  it("should contain book-cover if book has one", () => {
    const testBook = render(reactElement);
    expect(testBook.find('.book-cover').length > 0).toEqual(true);
  });

  it("should NOT contain book-cover if book has NOT have one", () => {
    book.imageLinks = '';
    const testBook = render(reactElement);
    expect(testBook.find('.book-cover').length > 0).toEqual(false);
  });

  it('should change the shelf', () => {
    const testBook = mount(reactElement);
    expect(testBook.state('shelf')).toBe(book.shelf);
    testBook.instance().emitHandleChange(book,'test');
    expect(testBook.state('shelf') === 'test').toBe(true);
  });

  it("should change state on componentWillReceiveProps", () => {
    const testBook = mount(reactElement);
    testBook.instance().componentWillReceiveProps();
    expect(testBook.state('isBookLoading') === false).toBe(true);
  });

});
