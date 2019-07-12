import test from 'ava';
import React from 'react';
import {spy} from 'sinon';
import {shallow} from 'enzyme';
import Checkbox from '../../../app/renderer/components/Checkbox';

test('render `div`', t => {
	const component = shallow(<Checkbox label="x" value="x"/>);
	t.is(component.dive().type(), 'div');
});

test('forwards `ref`', t => {
	const ref = React.createRef();
	const component = shallow(<Checkbox ref={ref} label="x" value="x"/>);
	t.is(component.prop('forwardedRef'), ref);
});

test('pass `props` to `input`', t => {
	const foo = 'foo';
	const component = shallow(<Checkbox foo={foo} label="x" value="x"/>).dive();
	t.is(component.find('input').prop('foo'), foo);
});

test('set `className` prop', t => {
	const component = shallow(<Checkbox label="x" value="x"/>).dive();
	t.true(component.prop('className').includes('Checkbox'));
});

test('set `type` prop on `input`', t => {
	const component = shallow(<Checkbox label="x" value="x"/>).dive();
	t.is(component.find('input').prop('type'), 'checkbox');
});

test('has `className` prop', t => {
	const className = 'foo';
	const component = shallow(<Checkbox className={className} label="x" value="x"/>).dive();
	t.true(component.prop('className').includes(className));
});

test('has `checked` prop', t => {
	const component = shallow(<Checkbox checked label="x" value="x"/>).dive();
	t.true(component.prop('className').includes('Checkbox--checked'));
});

test('has `disabled` prop', t => {
	const component = shallow(<Checkbox disabled label="x" value="x"/>).dive();
	t.true(component.prop('className').includes('Checkbox--disabled'));
	t.true(component.find('input').prop('disabled'));
});

test('has `value` prop', t => {
	const value = 'foo';
	const component = shallow(<Checkbox label="x" value={value}/>).dive();
	t.is(component.find('input').prop('value'), value);
});

test('has `onChange` prop', t => {
	const event = {};
	const onChange = spy();
	const component = shallow(<Checkbox label="x" value="x" onChange={onChange}/>).dive();
	const checked = component.state('checked');
	component.find('input').simulate('change', event);
	t.true(onChange.calledWith(!checked, event));
	t.is(component.state('checked'), !checked);
});

test('has `label` prop', t => {
	const label = 'foo';
	const component = shallow(<Checkbox label={label} value="x"/>).dive();
	t.is(component.find('.Checkbox__label').text(), label);
});

test('show checkmark icon when `checked` prop is `true`', t => {
	const component = shallow(<Checkbox label="x" value="x"/>).dive();
	component.find('input').simulate('change');
	t.is(component.find('.checkmark-icon').length, 1);
});
