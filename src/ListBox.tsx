import React from "react";
import { findDOMNode } from "react-dom";
import classNames from "classnames";
import ListItem from "./ListItem";
import ListItemGroup from "./ListItemGroup";
import { isArray, isUndefined, isEqual, each } from "./util";
import hasClass from "dom-helpers/hasClass";
import addClass from "dom-helpers/addClass";
import removeClass from "dom-helpers/removeClass";
import scrollIntoView from "dom-helpers/scrollTo";

export type ItemData = Record<string | number, any>;

export type Item = {
	value: any;
	label: React.ReactNode;
	children?: Item[];
	data: ItemData;
};

export interface ListBoxProps {
	prefixCls: string;
	className: string;
	style: React.CSSProperties;
	width: number | string;
	height: number | string;
	tabIndex: number;
	multiple: boolean;
	defaultValue: any[];
	value: any[];
	disabled: boolean;
	autoFocus: boolean;
	valueField: any;
	labelField: any;
	childrenField: any;
	headerStyle: any;
	footerStyle: any;
	bodyStyle: any;
	data: ItemData[];
	items: any;
	itemsMap: any;
	emptyLabel: any;
	labelInValue: boolean;
	enableDownUpSelect: boolean;
	fixListBodyHeightOnIE: boolean;
	onItemClick: any;
	onItemGroupClick: any;
	onChange: any;
	onFocus: any;
	onBlur: any;
	onKeyDown: any;
	renderMenu: any;
	renderMenuGroupTitle: any;
	renderMenuItem: any;
	renderHeader: any;
	renderFooter: any;
	wrapperComponent: any;
	headerWrapperComponent: any;
	bodyWrapperComponent: any;
	footerWrapperComponent: any;
}
export interface ListBoxState {
	items: Item[];
	itemsMap: Record<any, Item>;
	value: any[];
}

function isIE() {
	const userAgent = navigator.userAgent;
	const isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1;
	const isIE11 = userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1;

	return isIE || isIE11;
}

function noop() {}

function copy(data) {
	return isArray(data) ? [].concat(data) : data;
}

function dataProcessor(props: ListBoxProps) {
	const { data, valueField, childrenField, labelField } = props;
	const items: Item[] = [];
	const itemsMap: Record<any, Item> = {};

	function walk(data: Item[], pChildren: Item[]) {
		data.forEach((item) => {
			pChildren.push({
				value: data[valueField],
				label: data[labelField],
			});
			if (item[childrenField] && Array.isArray(item[childrenField])) {
				toMaps(item[childrenField]);
			} else {
				maps[item[valueField]] = item;
			}
		});
	}

	walk(data, items);

	return maps;
}

export class ListBox extends React.Component<ListBoxProps, ListBoxState> {
	static defaultProps = {
		prefixCls: "rw-listbox",
		valueField: "value",
		labelField: "label",
		childrenField: "children",
		labelInValue: false,
		tabIndex: 0,
		emptyLabel: "Not Found",
		enableDownUpSelect: true,
		fixListBodyHeightOnIE: true,
		data: [],
		itemsMap: null,
		onFocus: noop,
		onBlur: noop,
		onKeyDown: noop,
		wrapperComponent: "div",
		headerWrapperComponent: "div",
		bodyWrapperComponent: "div",
		footerWrapperComponent: "div",
	};

	static getDerivedStateFromProps(nextProps: ListBoxProps, state: ListBoxState) {
		// const value = nextProps.value;
		// let itemsMap = nextProps.itemsMap || {};

		// if (!nextProps.itemsMap) {
		// 	itemsMap = getItemsMap(nextProps);
		// }

		// const newState: Partial<ListBoxState> = {
		// 	itemsMap,
		// };

		return {
			...dataProcessor(nextProps),
			value:
				nextProps.value === undefined
					? state.value
					: Array.isArray(nextProps.value)
					? nextProps.value
					: [nextProps.value],
		};
	}

	constructor(props: ListBoxProps, context: any) {
		super(props, context);

		// const selectedValue = [];
		// let value;

		// if (!isUndefined(props.defaultValue)) {
		// 	value = isArray(props.defaultValue) ? props.defaultValue : [props.defaultValue];
		// }

		// if (value) {
		// 	selectedValue.push(...value);
		// }

		//item 索引id
		this._itemIndex = 0;
		//索引值对应的item.value
		this._indexValueMap = {};
		this._activeIndex = null;

		this.state = {
			items: [],
			itemsMap: {},
			value:
				props.defaultValue === undefined
					? []
					: Array.isArray(props.defaultValue)
					? props.defaultValue
					: [props.defaultValue],
		};
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

		if (onItemClick) onItemClick(item, e);
	};

	onItemGroupClick = (item, e) => {
		const { onItemGroupClick } = this.props;
		if (e) {
			scrollIntoView(e.target, this.getListViewBody());
		}

		if (onItemGroupClick) onItemGroupClick(item, e);
	};

	transformChangeValue(value) {
		const { labelInValue } = this.props;
		const { itemsMap } = this.state;

		if (labelInValue) {
			return isArray(value) ? value.map((v) => itemsMap[v]) : itemsMap[value];
		}

		return value;
	}

	setValue(value) {
		const { multiple, onChange } = this.props;
		const { selectedValue } = this.state;

		if (!multiple) {
			selectedValue.length = 0;
		}

		selectedValue.push(value);
		if (!("value" in this.props)) {
			this.setState({
				selectedValue,
			});
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
		const { valueField } = this.props;
		this.setValue(item[valueField]);
	};

	onItemDeselect = (item, el) => {
		const { multiple, onChange, valueField } = this.props;
		const { selectedValue } = this.state;

		if (!multiple) return;

		let newSelectedValue = selectedValue.filter((d) => !isEqual(item[valueField], d));

		if (!("value" in this.props)) {
			this.setState({
				selectedValue: newSelectedValue,
			});
		}

		if (onChange) {
			onChange(this.transformChangeValue(copy(newSelectedValue)));
		}
	};

	onKeyDown = (e) => {
		const { prefixCls } = this.props;
		const selector = `.${prefixCls}-item:not(.${prefixCls}-item-disabled)`;
		const activeCls = `${prefixCls}-item-active`;
		const selectCls = `${prefixCls}-item-selected`;
		let list = null; //NodeList[]

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
				});
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

			this._activeIndex = list[idx].getAttribute("data-index");
			scrollIntoView(list[idx], this.getListViewBody());
		} else if (ENTER && activeIndex !== null) {
			const value = indexValueMap[activeIndex];
			const item = state.itemsMap[value];
			this.setValue(value);
			//触发onItemClick
			this.onItemClick(item);
		}
	};

	renderListItems(items, selectedMap) {
		const {
			labelField,
			valueField,
			childrenField,
			prefixCls,
			disabled,
			renderMenuItem,
			renderMenuGroupTitle,
		} = this.props;

		return items.map((item) => {
			const isGroup = item[childrenField];
			const itemPrefixCls = `${prefixCls}-item`;
			const activeCls = `${prefixCls}-item-active`;
			let onMouseEnter = noop;
			let onMouseLeave = noop;
			let itemIndex = this._itemIndex++;

			if (!isGroup) {
				this._indexValueMap[itemIndex] = item[valueField];

				if (!disabled && !item.disabled) {
					onMouseEnter = (e) => {
						addClass(e.currentTarget, activeCls);
					};
					onMouseLeave = (e) => {
						removeClass(e.currentTarget, activeCls);
					};
				}
			}

			return !isGroup ? (
				<ListItem
					key={item[valueField]}
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
					label={
						renderMenuGroupTitle
							? renderMenuGroupTitle(item[labelField], item)
							: item[labelField]
					}
				>
					{this.renderListItems(item[childrenField] || [], selectedMap)}
				</ListItemGroup>
			);
		});
	}

	renderList() {
		const { items, emptyLabel } = this.props;
		const { selectedValue } = this.state;

		const selectedMap = {};
		selectedValue.forEach((v) => (selectedMap[v] = true));

		this._itemIndex = 0;
		this._indexValueMap = {};
		this._activeIndex = null;

		if (items && !items.length) {
			return emptyLabel;
		}

		return this.renderListItems(items, selectedMap);
	}

	saveListView = (node) => {
		this._listview = node;
	};

	saveListViewHeader = (node) => {
		this._listview_header = node;
	};

	saveListViewBody = (node) => {
		this._listview_body = node;
	};

	saveListViewFooter = (node) => {
		this._listview_footer = node;
	};

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
	//修正IE对flex支持不够完善
	resizeListBoxBodyHeight() {
		const dom = this.getListView();
		const header = this.getListViewHeader();
		const footer = this.getListViewFooter();
		const body = this.getListViewBody();

		body.style.maxHeight = "";

		const hasScroll = dom.scrollHeight > dom.clientHeight;

		const headerHeight = header ? header.offsetHeight : 0;
		const footerHeight = footer ? footer.offsetHeight : 0;

		if (hasScroll) {
			body.style.maxHeight = dom.clientHeight - headerHeight - footerHeight + "px";
		}
	}

	componentDidMount() {
		const fixListBodyHeightOnIE = this.props.fixListBodyHeightOnIE;
		if (isIE() && fixListBodyHeightOnIE) {
			this.resizeListBoxBodyHeight();
		}
	}

	componentDidUpdate() {
		const fixListBodyHeightOnIE = this.props.fixListBodyHeightOnIE;
		if (isIE() && fixListBodyHeightOnIE) {
			this.resizeListBoxBodyHeight();
		}
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
			prefixCls,
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
				{renderHeader ? (
					<HeaderWrapperComponent
						ref={this.saveListViewHeader}
						className={`${prefixCls}-header`}
						style={headerStyle}
					>
						{renderHeader(this.props)}
					</HeaderWrapperComponent>
				) : null}
				{this.renderMenu()}
				{renderFooter ? (
					<FooterWrapperComponent
						ref={this.saveListViewFooter}
						className={`${prefixCls}-footer`}
						style={footerStyle}
					>
						{renderFooter(this.props)}
					</FooterWrapperComponent>
				) : null}
			</WrapperComponent>
		);
	}
}
