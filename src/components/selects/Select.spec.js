import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { Select } from './Select';
import { SelectCheckbox } from './SelectCheckbox';
import { SelectMethod } from './SelectMethod';
import { SelectMulti } from './SelectMulti';

const mockStore = configureMockStore();
const store = mockStore({
  lookups: {
    parameter_methods: [],
  },
  row: {
    command_line_prefix: 'text',
    command_line_assignment_char: 'text',
    parameter_method_name: 'text',
    parameter_method_id: 1,
    command_line_escaped: true,
    command_line_ignore_name: true,
    is_encrypted: true,
  },
});

const selectShallow = shallow(<Select />);
const selectMount = props => mount(<Select {...props} />);

const selectCheckboxShallow = shallow(<SelectCheckbox />);
const selectCheckboxMount = props => mount(<SelectCheckbox {...props} />);

const selectMultiShallow = shallow(<SelectMulti />);
const selectMultiMount = props => mount(<SelectMulti {...props} />);

const selectMethodShallow = shallow(
  <Provider store={store}>
    <SelectMethod
      rows={[]}
      row={{
        command_line_prefix: 'text',
        command_line_assignment_char: 'text',
        parameter_method_name: 'text',
        parameter_method_id: 1,
        command_line_escaped: true,
        command_line_ignore_name: true,
        is_encrypted: true,
      }}
    />
  </Provider>,
);
const selectMethodMount = props =>
  mount(
    <Provider store={store}>
      <SelectMethod
        {...props}
        rows={[]}
        row={{
          command_line_prefix: 'text',
          command_line_assignment_char: 'text',
          parameter_method_name: 'text',
          parameter_method_id: 1,
          command_line_escaped: true,
          command_line_ignore_name: true,
          is_encrypted: true,
        }}
      />
    </Provider>,
  );

describe('Select Base component', () => {
  it('should render without throwing an error', () => {
    expect(selectShallow.exists()).toBeTruthy();
  });

  it('should render with default claass', () => {
    expect(
      selectShallow.find('Scrollbars').hasClass('selectScroll'),
    ).toBeTruthy();
  });

  it('should render simple onChange', () => {
    selectShallow.simulate('handleOnChange', {
      target: { value: 'My new value' },
    });
    expect(selectShallow.find('Scrollbars').value === 'My new value');
  });

  it('should render props', () => {
    const createUserModal = selectMount({ select_title: 'New Title' });
    expect(createUserModal.prop('select_title')).toEqual('New Title');
  });

  it('should render props with array of data', () => {
    const createUserModal = selectMount({
      rows: [{ uuid: 1, value: 'One item' }, { uuid: 2, value: 'Second item' }],
      row_key: 'value',
    });
    const children = createUserModal.find(
      'Select > Scrollbars > div > div > div > p',
    );
    expect(children).toHaveLength(2);
  });

  it('should work with keyDown', () => {
    selectShallow.find('Scrollbars').simulate('keypress', { key: 'Enter' });
  });

  it('should work with onBlur', () => {
    selectShallow.find('Scrollbars').simulate('blur');
  });

  it('should work with onFocus', () => {
    selectShallow.find('Scrollbars').simulate('focus');
  });
});

describe('Select Checkbox component', () => {
  it('should render without throwing an error', () => {
    expect(selectCheckboxShallow.exists()).toBeTruthy();
  });

  it('should render with default class', () => {
    expect(
      selectCheckboxShallow.find('Scrollbars').hasClass('selectScroll'),
    ).toBeTruthy();
  });

  it('should render simple onChange', () => {
    selectCheckboxShallow.simulate('handleOnChange', {
      target: { value: 'My new value' },
    });
    expect(selectCheckboxShallow.find('Scrollbars').value === 'My new value');
  });

  it('should render props', () => {
    const propsMount = selectCheckboxMount({ select_title: 'New Title' });
    expect(propsMount.prop('select_title')).toEqual('New Title');
  });

  it('should render props with array of data', () => {
    const propsMount = selectCheckboxMount({
      rows: [{ uuid: 1, value: 'One item' }, { uuid: 2, value: 'Second item' }],
      row_key: 'value',
    });
    const children = propsMount.find(
      'SelectCheckbox > Scrollbars > div > div > div > Checkbox',
    );
    expect(children).toHaveLength(2);
  });

  it('should work with keyDown', () => {
    selectCheckboxShallow
      .find('Scrollbars')
      .simulate('keypress', { key: 'Enter' });
  });

  it('should work with onBlur', () => {
    selectCheckboxShallow.find('Scrollbars').simulate('blur');
  });

  it('should work with onFocus', () => {
    selectCheckboxShallow.find('Scrollbars').simulate('focus');
  });
});

describe('Select Method component', () => {
  it('should render without throwing an error', () => {
    expect(selectMethodShallow.exists()).toBeTruthy();
  });

  it('should render props', () => {
    const propsMount = selectMethodMount({ select_title: 'New Title' });
    expect(
      propsMount
        .find('Provider > Connect(ConnectedSelectMethod)')
        .prop('select_title'),
    ).toEqual('New Title');
  });
});

describe('Select Multi component', () => {
  it('should render without throwing an error', () => {
    expect(selectMultiShallow.exists()).toBeTruthy();
  });

  it('should render with default class', () => {
    expect(
      selectMultiShallow.find('Scrollbars').hasClass('selectScroll'),
    ).toBeTruthy();
  });

  it('should render simple onChange', () => {
    selectMultiShallow.simulate('handleOnChange', {
      target: { value: 'My new value' },
    });
    expect(selectMultiShallow.find('Scrollbars').value === 'My new value');
  });

  it('should render props', () => {
    const propsMount = selectMultiMount({ select_title: 'New Title' });
    expect(propsMount.prop('select_title')).toEqual('New Title');
  });

  it('should render props with array of data', () => {
    const propsMount = selectMultiMount({
      rows: [{ uuid: 1, value: 'One item' }, { uuid: 2, value: 'Second item' }],
      row_key: 'value',
    });
    const children = propsMount.find(
      'SelectMulti > Scrollbars > div > div > div > p',
    );
    expect(children).toHaveLength(2);
  });

  it('should work with keyDown', () => {
    selectMultiShallow
      .find('Scrollbars')
      .simulate('keypress', { key: 'Enter' });
  });

  it('should work with onBlur', () => {
    selectMultiShallow.find('Scrollbars').simulate('blur');
  });

  it('should work with onFocus', () => {
    selectMultiShallow.find('Scrollbars').simulate('focus');
  });
});

