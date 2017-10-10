import React from 'react';
import SearchBooks from '../SearchBooks';
import createRouterContext from 'react-router-test-context'
import {configure,mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });

describe('Render SearchBooks Component', () => {
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
