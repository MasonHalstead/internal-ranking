import React from 'react';
import { mount, shallow } from 'enzyme';
import TextArea from './TextArea';

const input = () => shallow(<TextArea />);
const inputMount = props => mount(<TextArea {...props} />);

describe('TextArea component', () => {
  it('should render without throwing an error', () => {
    expect(input().exists()).toBeTruthy();
  });

  it('should render TextArea', () => {
    expect(input().find('Memo()')).toHaveLength(1);
  });

  it('should render props', () => {
    expect(
      input()
        .find('Memo()')
        .props('disabled').value === false,
    );
  });

  it('should render with default class', () => {
    expect(input().hasClass('container')).toBeTruthy();
  });

  it('should render simple onChange', () => {
    input().simulate('handleOnChange', {
      target: { value: 'My new value' },
    });
    expect(input().value === 'My new value');
  });

  it('should have default background', () => {
    expect(
      inputMount()
        .find('TextArea')
        .prop('background'),
    ).toEqual('transparent');
  });

  it('should render props', () => {
    const debounceProps = inputMount({ placeholder: 'New Placeholder' });
    expect(debounceProps.find('TextArea').prop('placeholder')).toEqual(
      'New Placeholder',
    );
  });

  it('should work with keyDown', () => {
    input().simulate('keypress', { key: 'Enter' });
  });

  it('should work with onBlur', () => {
    input().simulate('blur');
  });

  it('should work with onFocus', () => {
    input().simulate('focus');
  });
});
