import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'object.omit';
import ListItem from './ListItem';
import ListItemGroup from './ListItemGroup';
import { isArray, isUndefined, isEqual, each } from './util';
import { hasClass, addClass, removeClass } from 'bplokjs-dom-utils/classes';
import scrollIntoView from 'bplokjs-dom-utils/scrollIntoView';

function noop() { }

function copy(data) {
    return isArray(data) ? [].concat(data) : data;
}

export default class ListBox extends React.Component {

    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        headerStyle: PropTypes.object,
        footerStyle: PropTypes.object,
        bodyStyle: PropTypes.object,
        prefixCls: PropTypes.string,
        valueField: PropTypes.string,
        labelField: PropTypes.string,
        childrenField: PropTypes.string,
        items: PropTypes.array,
        //itemsMap: PropTypes.object,
        defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
        emptyLabel: PropTypes.any,
        multiple: PropTypes.bool,
        disabled: PropTypes.bool,
        autoFocus: PropTypes.bool,
        width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        labelInValue: PropTypes.bool,
        tabIndex: PropTypes.number,
        enableDownUpSelect: PropTypes.bool,
        onItemClick: PropTypes.func,
        onItemGroupClick: PropTypes.func,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        onKeyDown: PropTypes.func,
        renderMenu: PropTypes.func,
        renderMenuGroupTitle: PropTypes.func,
        renderMenuItem: PropTypes.func,
        renderHeader: PropTypes.func,
        renderFooter: PropTypes.func,
        wrapperComponent: PropTypes.node,
        headerWrapperComponent: PropTypes.node,
        bodyWrapperComponent: PropTypes.node,
        footerWrapperComponent: PropTypes.node,
    };

    static defaultProps = {
        prefixCls: 'rw-listbox',
        valueField: 'value',
        labelField: 'label',
        childrenField: 'children',
        labelInValue: false,
        tabIndex: 0,
        emptyLabel: 'Not Found',
        enableDownUpSelect: true,
        //items: [],
        onFocus: noop,
        onBlur: noop,
        onKeyDown: noop,
        wrapperComponent: "div",
        headerWrapperComponent: 'div',
        bodyWrapperComponent: 'div',
        footerWrapperComponent: 'div',
    };

    constructor(props) {
        super(props);

        const selectedValue = [];
        let value;

        // if (!isUndefined(props.value)) {
        //     value = isArray(props.value) ? props.value : [props.value];
        // } else if (!isUndefined(props.defaultValue)) {
        //     value = isArray(props.defaultValue) ? props.defaultValue : [props.defaultValue];
        // }

        if (!isUndefined(props.defaultValue)) {
            value = isArray(props.defaultValue) ? props.defaultValue : [props.defaultValue];
        }

        if (value) {
            selectedValue.push(...value);
        }

        //item 索引id
        this._itemIndex = 0;
        //索引值对应的item.value
        this._indexValueMap = {};
        this._activeIndex = null;


        this.state = {
            selectedValue,
            //items的value=>item对应表
            itemsMap: {}
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const value = nextProps.value;

        if (!isUndefined(value)) {
            return {
                selectedValue: isArray(value) ? copy(value) : [value]
            };
        }

        return {};
    }

    componentDidMount() {
        const { prefixCls, autoFocus } = this.props;
        const el = findDOMNode(this);
        const selector = `.${prefixCls}-item-selected`;

        if (autoFocus) {
            this.focus();
        }

        const selectedItem = el.querySelector(selector);
        if (selectedItem) {
            scrollIntoView(selectedItem, this.getListViewBody());
            //scrollview.scrollIntoView(selectedItem);
        }
    }

    focus() {
        findDOMNode(this).focus();
    }

    blur() {
        findDOMNode(this).blur();
    }

    onItemClick = (item, e) => {
        const { onItemClick } = this.props;
        if (e) {
            scrollIntoView(e.target, this.getListViewBody());
        }

        if (onItemClick) onItemClick(item);
    }

    onItemGroupClick = (item, e) => {
        const { onItemGroupClick } = this.props;
        if (e) {
            scrollIntoView(e.target, this.getListViewBody());
        }

        if (onItemGroupClick) onItemGroupClick(item);
    }

    transformChangeValue(value) {
        const { labelInValue } = this.props;
        const { itemsMap } = this.state;

        if (labelInValue) {
            return isArray(value) ?
                value.map(v => itemsMap[v]) :
                itemsMap[value];
        }

        return value;
    }

    setValue(value) {
        const { multiple, onChange } = this.props;
        const { selectedValue, itemsMap } = this.state;

        if (!multiple) {
            selectedValue.length = 0;
        }

        selectedValue.push(value);

        if (!('value' in this.props)) {
            this.setState({
                selectedValue
            })
        }

        if (onChange) {
            onChange(this.transformChangeValue(multiple ? copy(selectedValue) : selectedValue[0]));
        }
    }

    getVaule() {
        const { multiple } = this.props;
        const { selectedValue } = this.state;

        return this.transformChangeValue(multiple ? copy(selectedValue) : selectedValue[0]);
    }

    onItemSelect = (item, el) => {
        const valueField = 'value';
        this.setValue(item[valueField]);
    }

    onItemDeselect = (item, el) => {
        const { multiple, onChange, labelInValue } = this.props;
        const { selectedValue } = this.state;
        const valueField = 'value';

        if (!multiple) return;

        let newSelectedValue = selectedValue.filter((d) => !isEqual(item[valueField], d));

        if (!('value' in this.props)) {
            this.setState({
                selectedValue: newSelectedValue
            })
        }

        if (onChange) {
            onChange(this.transformChangeValue(copy(newSelectedValue)));
        }

    }

    onKeyDown = (e) => {
        const { prefixCls } = this.props;
        const selector = `.${prefixCls}-item:not(.${prefixCls}-item-disabled)`;
        const activeCls = `${prefixCls}-item-active`;
        const selectCls = `${prefixCls}-item-selected`;
        let list = null;//NodeList[]

        function getActiveIndex(keyCode) {
            let idx = -1;
            const UP = keyCode === 38;
            const DOWN = keyCode === 40;
            let sIdx = -1;

            if (list) {
                //ie no support NodeList.prototype.forEach
                each(list, (item, i) => {
                    if (hasClass(item, activeCls)) {
                        removeClass(item, activeCls);
                        if (UP) {
                            if (idx === -1) idx = i;
                        } else {
                            idx = i;
                        }
                    } else if (idx === -1 && hasClass(item, selectCls)) {
                        sIdx = i;
                    }
                })
            }

            return idx === -1 ? sIdx : idx;
        }

        const props = this.props;
        const state = this.state;
        const dom = findDOMNode(this);
        const UP = e.keyCode === 38;
        const DOWN = e.keyCode === 40;
        const ENTER = e.keyCode === 13;
        const indexValueMap = this._indexValueMap;
        const activeIndex = this._activeIndex;

        if (props.enableDownUpSelect) {
            props.onKeyDown(e);
        }

        if (!list) {
            list = dom.querySelectorAll(selector);
        }

        if (!list.length) return;

        const minIndex = 0;
        const maxIndex = list.length - 1;

        if (UP || DOWN) {
            e.preventDefault();
            let idx = getActiveIndex(e.keyCode);

            if (UP) {
                idx = idx === -1 ? maxIndex : --idx;
                if (idx < 0) idx = maxIndex;
                addClass(list[idx], activeCls);
            } else {
                idx = idx === -1 ? minIndex : ++idx;
                if (idx > maxIndex) idx = 0;
                addClass(list[idx], activeCls);
            }

            this._activeIndex = list[idx].getAttribute('data-index');
            scrollIntoView(list[idx], this.getListViewBody());
            //scrollview.scrollIntoView(list[idx]);
        } else if (ENTER && activeIndex !== null) {
            const value = indexValueMap[activeIndex];
            const item = state.itemsMap[value] || {};
            this.setValue(value);
            //触发onItemClick
            this.onItemClick({
                value,
                label: item[props.labelField]
            });
        }

    }

    renderListItems(items, selectedMap) {
        const { labelField, valueField, childrenField, prefixCls, disabled, renderMenuItem, renderMenuGroupTitle } = this.props;
        const { itemsMap } = this.state;

        return items.map(item => {
            if (typeof item === 'string' || typeof item === 'number') {
                item = {
                    [labelField]: item,
                    [valueField]: item,
                }
            }

            const isGroup = item[childrenField];
            const itemPrefixCls = `${prefixCls}-item`;
            const activeCls = `${prefixCls}-item-active`;
            let onMouseEnter = noop;
            let onMouseLeave = noop;
            let itemIndex = this._itemIndex++;

            if (!isGroup) {
                itemsMap[item[valueField]] = item;
                this._indexValueMap[itemIndex] = item[valueField];

                if (!disabled && !item.disabled) {
                    onMouseEnter = e => {
                        addClass(e.currentTarget, activeCls);
                    }
                    onMouseLeave = e => {
                        removeClass(e.currentTarget, activeCls);
                    }
                }
            }

            return !isGroup ? (
                <ListItem
                    key={item[valueField]}
                    value={item[valueField]}
                    prefixCls={itemPrefixCls}
                    selected={selectedMap[item[valueField]]}
                    disabled={disabled || !!item.disabled}
                    data-index={itemIndex}
                    onClick={this.onItemClick}
                    onSelect={this.onItemSelect}
                    onDeselect={this.onItemDeselect}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    item={item}
                >
                    {renderMenuItem ? renderMenuItem(item[labelField], item) : item[labelField]}
                </ListItem>
            ) : (
                    <ListItemGroup
                        prefixCls={`${itemPrefixCls}-group`}
                        key={item[labelField]}
                        value={item[valueField]}
                        onClick={this.onItemGroupClick}
                        item={item}
                        label={renderMenuGroupTitle ? renderMenuGroupTitle(item[labelField], item) : item[labelField]}
                    >
                        {this.renderListItems(item[childrenField] || [], selectedMap)}
                    </ListItemGroup>
                );
        });
    }

    renderListChild(children, selectedMap) {
        const { labelField, valueField, prefixCls, disabled } = this.props;
        const { itemsMap } = this.state;

        const itemPrefixCls = `${prefixCls}-item`;
        const activeCls = `${prefixCls}-item-active`;

        return React.Children.map(children, child => {
            const props = child.props;

            if (child.type.isListItemGroup) {
                return React.cloneElement(
                    child,
                    {
                        prefixCls: `${itemPrefixCls}-group`
                    },
                    this.renderListChild(props.children, selectedMap)
                );
            }

            let onMouseEnter = noop;
            let onMouseLeave = noop;
            let itemIndex = this._itemIndex++;

            itemsMap[props[valueField]] = Object.assign(
                {},
                omit(props, ['children', 'selected', 'prefixCls']),
                { [labelField]: props.children }
            );
            this._indexValueMap[itemIndex] = props[valueField];

            if (!props.disabled && !disabled) {
                onMouseEnter = e => {
                    addClass(e.currentTarget, activeCls);
                    if (props.onMouseEnter) props.onMouseEnter(e);
                }
                onMouseLeave = e => {
                    removeClass(e.currentTarget, activeCls);
                    if (props.onMouseLeave) props.onMouseLeave(e);
                }
            }

            const newProps = {
                selected: selectedMap[props[valueField]],
                prefixCls: itemPrefixCls,
                'data-index': itemIndex,
                onClick: this.onItemClick,
                onSelect: this.onItemSelect,
                onDeselect: this.onItemDeselect,
                onMouseEnter,
                onMouseLeave,
            };

            if (disabled) {
                newProps.disabled = true;
            }

            return React.cloneElement(child, newProps);
        });
    }

    renderList() {
        const { labelField, valueField, prefixCls, multiple, items, emptyLabel, children } = this.props;
        const { selectedValue } = this.state;

        this.state.itemsMap = {};

        const selectedMap = {};
        selectedValue.forEach(v => selectedMap[v] = true);

        this._itemIndex = 0;
        this._indexValueMap = {};
        this._activeIndex = null;

        if (items && !items.length && !React.Children.count(children)) {
            return emptyLabel;
        }

        const childs = Array.isArray(items) ?
            this.renderListItems(items, selectedMap) :
            this.renderListChild(children, selectedMap);

        return React.Children.count(childs) ? childs : emptyLabel;
    }

    saveListView = (node) => {
        this._listview = node;
    }

    saveListViewHeader = (node) => {
        this._listview_header = node;
    }

    saveListViewBody = (node) => {
        this._listview_body = node;
    }

    saveListViewFooter = (node) => {
        this._listview_footer = node;
    }

    getListView() {
        return findDOMNode(this._listview);
    }

    getListViewHeader() {
        return findDOMNode(this._listview_header);
    }

    getListViewBody() {
        return findDOMNode(this._listview_body);
    }

    getListViewFooter() {
        return findDOMNode(this._listview_footer);
    }

    renderMenu() {
        const {
            bodyWrapperComponent: BodyWrapperComponent,
            prefixCls,
            bodyStyle = {},
            renderMenu,
        } = this.props;

        const Menus = this.renderList();

        return (
            <BodyWrapperComponent
                ref={this.saveListViewBody}
                className={`${prefixCls}-body`}
                style={bodyStyle}
            >
                {renderMenu ? renderMenu(Menus, this.props) : Menus}
            </BodyWrapperComponent>
        );
    }

    render() {
        const {
            className,
            value,
            prefixCls,
            items,
            width,
            height,
            tabIndex,
            disabled,
            enableDownUpSelect,
            onKeyDown,
            onFocus,
            onBlur,
            style = {},
            wrapperComponent: WrapperComponent,
            headerWrapperComponent: HeaderWrapperComponent,
            footerWrapperComponent: FooterWrapperComponent,
            renderHeader,
            renderFooter,
            headerStyle = {},
            footerStyle = {},
        } = this.props;

        if (width) {
            style.width = width;
        }
        if (height) {
            style.height = height;
        }

        const classes = classNames({
            [`${prefixCls}`]: true,
            [className]: className,
            [`${prefixCls}-disabled`]: disabled,
        });

        // scrollViewBodyCls={`${prefixCls}-body`}
        // scrollViewBodyStyle={scrollViewBodyStyle}

        return (
            <WrapperComponent
                ref={this.saveListView}
                tabIndex={tabIndex}
                className={classes}
                style={style}
                onKeyDown={enableDownUpSelect ? this.onKeyDown : onKeyDown}
                onFocus={onFocus}
                onBlur={onBlur}
            >
                {
                    renderHeader ?
                        <HeaderWrapperComponent
                            ref={this.saveListViewHeader}
                            className={`${prefixCls}-header`}
                            style={headerStyle}
                        >
                            {renderHeader()}
                        </HeaderWrapperComponent> :
                        null
                }
                {this.renderMenu()}
                {
                    renderFooter ?
                        <FooterWrapperComponent
                            ref={this.saveListViewFooter}
                            className={`${prefixCls}-footer`}
                            style={footerStyle}
                        >
                            {renderFooter()}
                        </FooterWrapperComponent> :
                        null
                }
            </WrapperComponent>
        );
    }

}