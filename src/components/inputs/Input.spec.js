import React from 'react';
import { shallow, mount } from 'enzyme';
import { InputBase } from './InputBase';
import { InputCurrency } from './InputCurrency';
import { InputDebounce } from './InputDebounce';
import { InputFake } from './InputFake';
import { InputIcon } from './InputIcon';
import { InputIconList } from './InputIconList';
import { InputList } from './InputList';
import { InputMulti } from './InputMulti';
import { InputNumber } from './InputNumber';
import { InputPercent } from './InputPercent';
import { InputTimeout } from './InputTimeout';

const input = shallow(<InputBase />);
const inputCurrencyShallow = shallow(<InputCurrency />);
const inputDebounceShallow = shallow(<InputDebounce />);
const inputFakeShallow = shallow(<InputFake />);
const inputIconShallow = shallow(<InputIcon />);
const inputIconListShallow = shallow(<InputIconList />);
const inputListShallow = shallow(<InputList />);
const inputMultiShallow = shallow(<InputMulti />);
const inputNumberShallow = shallow(<InputNumber />);
const inputPercentShallow = shallow(<InputPercent />);
const inputTimeoutShallow = shallow(<InputTimeout />);

const inputMount = props => mount(<InputBase {...props} />);
const inputCurrency = props => mount(<InputCurrency {...props} />);
const inputDebounce = props => mount(<InputDebounce {...props} />);
const inputFake = props => mount(<InputFake {...props} />);
const inputIcon = props => mount(<InputIcon {...props} />);
const inputIconList = props => mount(<InputIconList {...props} />);
const inputList = props => mount(<InputList {...props} />);
const inputMulti = props => mount(<InputMulti {...props} />);
const inputNumber = props => mount(<InputNumber {...props} />);
const inputPercent = props => mount(<InputPercent {...props} />);
const inputTimeout = props => mount(<InputTimeout {...props} />);

describe('Input Base component', () => {
  it('should render without throwing an error', () => {
    expect(input.exists()).toBeTruthy();
  });

  it('should render with default class', () => {
    expect(input.find('input').hasClass('input')).toBeTruthy();
  });

  it('should render children', () => {
    expect(inputMount({ children: <input /> }).find('input')).toHaveLength(1);
  });

  it('should render simple onChange', () => {
    input.simulate('handleOnChange', { target: { value: 'My new value' } });
    expect(input.find('input').value === 'My new value');
  });

  it('should render props', () => {
    const createUserModal = inputMount({ placeholder: 'New placeholder' });
    expect(createUserModal.prop('placeholder')).toEqual('New placeholder');
  });

  it('should work with keyDown', () => {
    input.find('input').simulate('keypress', { key: 'Enter' });
  });

  it('should work with onBlur', () => {
    input.find('input').simulate('blur');
  });

  it('should work with onFocus', () => {
    input.find('input').simulate('focus');
  });
});

describe('Input Currency component', () => {
  it('should render without throwing an error', () => {
    expect(inputCurrencyShallow.exists()).toBeTruthy();
  });

  it('should render with default class', () => {
    expect(inputCurrencyShallow.hasClass('input')).toBeTruthy();
  });

  it('should render simple onChange', () => {
    inputCurrencyShallow.simulate('handleOnChange', {
      target: { value: 'My new value' },
    });
    expect(inputCurrencyShallow.value === 'My new value');
  });

  it('should have default prefix', () => {
    expect(inputCurrencyShallow.find('NumberFormat').prop('prefix')).toEqual(
      '$',
    );
  });

  it('should render props', () => {
    const currencyProps = inputCurrency({ text_align: 'center' });
    expect(currencyProps.prop('text_align')).toEqual('center');
  });

  it('should work with keyDown', () => {
    inputCurrencyShallow.simulate('keypress', { key: 'Enter' });
  });

  it('should work with onBlur', () => {
    inputCurrencyShallow.simulate('blur');
  });

  it('should work with onFocus', () => {
    inputCurrencyShallow.simulate('focus');
  });
});
describe('Input Debounce component', () => {
  it('should render without throwing an error', () => {
    expect(inputDebounceShallow.exists()).toBeTruthy();
  });

  it('should render with default class', () => {
    expect(inputDebounceShallow.hasClass('input')).toBeTruthy();
  });

  it('should render simple onChange', () => {
    inputDebounceShallow.simulate('handleOnChange', {
      target: { value: 'My new value' },
    });
    expect(inputDebounceShallow.value === 'My new value');
  });

  it('should have default timeout', () => {
    expect(
      inputDebounceShallow.find('DebounceInput').prop('debounceTimeout'),
    ).toEqual(300);
  });

  it('should render props', () => {
    const debounceProps = inputDebounce({ debounceTimeout: 400 });
    expect(debounceProps.prop('debounceTimeout')).toEqual(400);
  });

  it('should work with keyDown', () => {
    inputDebounceShallow.simulate('keypress', { key: 'Enter' });
  });

  it('should work with onBlur', () => {
    inputDebounceShallow.simulate('blur');
  });

  it('should work with onFocus', () => {
    inputDebounceShallow.simulate('focus');
  });
});

describe('Input Fake component', () => {
  it('should render without throwing an error', () => {
    expect(inputFakeShallow.exists()).toBeTruthy();
  });

  it('should render with default class', () => {
    expect(inputFakeShallow.hasClass('inputFake')).toBeTruthy();
  });

  it('should render simple onChange', () => {
    inputFakeShallow.simulate('handleOnChange', {
      target: { value: 'My new value' },
    });
    expect(inputFakeShallow.value === 'My new value');
  });

  it('should change logic with value', () => {
    const fakeProps = inputFake({ value: 'New' });
    expect(fakeProps.find('InputFake > div > p').prop('style')).toEqual({
      textAlign: 'left',
    });
  });

  it('should work with keyDown', () => {
    inputFakeShallow.simulate('keypress', { key: 'Enter' });
  });

  it('should work with onBlur', () => {
    inputFakeShallow.simulate('blur');
  });

  it('should work with onFocus', () => {
    inputFakeShallow.simulate('focus');
  });
});

describe('Input Icon component', () => {
  it('should render without throwing an error', () => {
    expect(inputIconShallow.exists()).toBeTruthy();
  });

  it('should render simple onChange', () => {
    inputIconShallow.simulate('handleOnChange', {
      target: { value: 'My new value' },
    });
    expect(inputIconShallow.value === 'My new value');
  });

  it('should have default icon', () => {
    expect(inputIconShallow.find('div > FontAwesomeIcon').prop('icon')).toEqual(
      'chevron-down',
    );
  });

  it('should render props', () => {
    const iconProps = inputIcon({ prefix: 'one' });
    expect(iconProps.prop('prefix')).toEqual('one');
  });

  it('should work with keyDown', () => {
    inputIconShallow.simulate('keypress', { key: 'Enter' });
  });

  it('should work with onBlur', () => {
    inputIconShallow.simulate('blur');
  });

  it('should work with onFocus', () => {
    inputIconShallow.simulate('focus');
  });
});

describe('Input IconList component', () => {
  it('should render without throwing an error', () => {
    expect(inputIconListShallow.exists()).toBeTruthy();
  });

  it('should render simple onChange', () => {
    inputIconListShallow.simulate('handleOnChange', {
      target: { value: 'My new value' },
    });
    expect(inputIconListShallow.value === 'My new value');
  });

  it('should have default icon', () => {
    expect(
      inputIconListShallow.find('div > FontAwesomeIcon').prop('icon'),
    ).toEqual('list');
  });

  it('should change logic with value', () => {
    const iconListProps = inputIconList({ badge: false });
    expect(
      iconListProps.find('InputIconList > div > FontAwesomeIcon').prop('icon'),
    ).toEqual('list');
  });

  it('should render props', () => {
    const iconPropsList = inputIconList({ prefix: 'one' });
    expect(iconPropsList.prop('prefix')).toEqual('one');
  });

  it('should work with keyDown', () => {
    inputIconListShallow.simulate('keypress', { key: 'Enter' });
  });

  it('should work with onBlur', () => {
    inputIconListShallow.simulate('blur');
  });

  it('should work with onFocus', () => {
    inputIconListShallow.simulate('focus');
  });
});

describe('Input List component', () => {
  it('should render without throwing an error', () => {
    expect(inputListShallow.exists()).toBeTruthy();
  });

  it('should render simple onChange', () => {
    inputListShallow.simulate('handleOnChange', {
      target: { value: 'My new value' },
    });
    expect(inputListShallow.value === 'My new value');
  });

  it('should have default classname', () => {
    expect(inputListShallow.find('div').prop('className')).toEqual(
      'inputListContainer',
    );
  });

  it('should change logic with value', () => {
    const iconListProps = inputList({ badge: false });
    expect(iconListProps.find('InputList').prop('badge')).toEqual(false);
  });

  it('should work with keyDown', () => {
    inputListShallow.simulate('keypress', { key: 'Enter' });
  });

  it('should work with onBlur', () => {
    inputListShallow.simulate('blur');
  });

  it('should work with onFocus', () => {
    inputListShallow.simulate('focus');
  });
});

describe('Input Multi component', () => {
  it('should render without throwing an error', () => {
    expect(inputMultiShallow.exists()).toBeTruthy();
  });

  it('should render simple onChange', () => {
    inputMultiShallow.simulate('handleOnChange', {
      target: { value: 'My new value' },
    });
    expect(inputMultiShallow.value === 'My new value');
  });

  it('should have default classname', () => {
    expect(inputMultiShallow.find('div').prop('className')).toEqual(
      'inputMultiContainer',
    );
  });

  it('should change logic with value', () => {
    const selected = [{ uuid: 1, value: 1 }];
    const iconMultiProps = inputMulti({ selected });
    expect(
      iconMultiProps.find('InputMulti > div > div > FontAwesomeIcon > p')
        .value === 1,
    );
  });

  it('should work with keyDown', () => {
    inputMultiShallow.simulate('keypress', { key: 'Enter' });
  });

  it('should work with onBlur', () => {
    inputMultiShallow.simulate('blur');
  });

  it('should work with onFocus', () => {
    inputMultiShallow.simulate('focus');
  });
});

describe('Input Number component', () => {
  it('should render without throwing an error', () => {
    expect(inputNumberShallow.exists()).toBeTruthy();
  });

  it('should render with default class', () => {
    expect(inputNumberShallow.hasClass('input')).toBeTruthy();
  });

  it('should render simple onChange', () => {
    inputNumberShallow.simulate('handleOnChange', {
      target: { value: 'My new value' },
    });
    expect(inputNumberShallow.value === 'My new value');
  });

  it('should render props', () => {
    const numberProps = inputNumber({ text_align: 'center' });
    expect(numberProps.prop('text_align')).toEqual('center');
  });

  it('should work with keyDown', () => {
    inputNumberShallow.simulate('keypress', { key: 'Enter' });
  });

  it('should work with onBlur', () => {
    inputNumberShallow.simulate('blur');
  });

  it('should work with onFocus', () => {
    inputNumberShallow.simulate('focus');
  });
});

describe('Input Percent component', () => {
  it('should render without throwing an error', () => {
    expect(inputPercentShallow.exists()).toBeTruthy();
  });

  it('should render with default class', () => {
    expect(inputPercentShallow.hasClass('input')).toBeTruthy();
  });

  it('should render simple onChange', () => {
    inputPercentShallow.simulate('handleOnChange', {
      target: { value: 'My new value' },
    });
    expect(inputPercentShallow.value === 'My new value');
  });

  it('should have default suffix', () => {
    expect(inputPercentShallow.find('NumberFormat').prop('suffix')).toEqual(
      '%',
    );
  });

  it('should render props', () => {
    const percentProps = inputPercent({ text_align: 'center' });
    expect(percentProps.prop('text_align')).toEqual('center');
  });

  it('should work with keyDown', () => {
    inputPercentShallow.simulate('keypress', { key: 'Enter' });
  });

  it('should work with onBlur', () => {
    inputPercentShallow.simulate('blur');
  });

  it('should work with onFocus', () => {
    inputPercentShallow.simulate('focus');
  });
});

describe('Input Timeout component', () => {
  it('should render without throwing an error', () => {
    expect(inputTimeoutShallow.exists()).toBeTruthy();
  });

  it('should render with default class', () => {
    expect(inputTimeoutShallow.hasClass('input')).toBeTruthy();
  });

  it('should render simple onChange', () => {
    inputTimeoutShallow.simulate('handleOnChange', {
      target: { value: 'My new value' },
    });
    expect(inputTimeoutShallow.value === 'My new value');
  });

  it('should have default format', () => {
    expect(inputTimeoutShallow.find('NumberFormat').prop('format')).toEqual(
      '##:##',
    );
  });

  it('should render props', () => {
    const timeoutProps = inputTimeout({ text_align: 'center' });
    expect(timeoutProps.prop('text_align')).toEqual('center');
  });

  it('should work with keyDown', () => {
    inputTimeoutShallow.simulate('keypress', { key: 'Enter' });
  });

  it('should work with onBlur', () => {
    inputTimeoutShallow.simulate('blur');
  });

  it('should work with onFocus', () => {
    inputTimeoutShallow.simulate('focus');
  });
});
