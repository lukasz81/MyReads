import React from 'react';
import SearchBooks from '../SearchBooks';
import createRouterContext from 'react-router-test-context'
import {shallow,configure,mount,render} from 'enzyme';
import { testBooks, jsonHeaders } from './testBooksData';
import Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });

describe('Render SearchBooks Component', () => {
  const findShelf = jest.fn();
  const handleShelfUpdate = jest.fn();
  const reactElement = <SearchBooks />;

  it("should create SearchBooks", () => {
    const testSearchBooksMount = mount(reactElement);
    expect(testSearchBooksMount.find('.search').length === 1).toBe(true);
  });

  it('should set initial state query to empty string', () => {
    const testSearchBooksMount = mount(reactElement);
    expect(testSearchBooksMount.state('query') === '').toBe(true);
	});

});
