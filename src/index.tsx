import React from "react";
import { findDOMNode } from "react-dom";
import classNames from "classnames";
import ListItem from "./ListItem";
import ListItemGroup from "./ListItemGroup";
import hasClass from "dom-helpers/hasClass";
import addClass from "dom-helpers/addClass";
import removeClass from "dom-helpers/removeClass";
import scrollIntoView from "dom-helpers/scrollTo";

const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_ENTER = 13;
const DEFAULT_ACTIVE_VALUE = Symbol("DefaultActiveValue");

export type ItemData = Record<string | number, any>;

export type Item = {
	value: any;
	label: React.ReactNode;
	disabled: boolean;
	children?: Item[];
	data: ItemData;
	ref: React.RefObject<ListItem>;
};

export interface ListBoxProps {
	prefixCls?: string;
	className?: string;
	style?: React.CSSProperties;
	width?: number | string;
	height?: number | string;
	tabIndex?: number;
	multiple?: boolean;
	defaultValue?: any[];
	value?: any[];
	disabled?: boolean;
	autoFocus?: boolean;
	valueField?: string;
	labelField?: string;
	disabledField?: string;
	childrenField?: any;
	headerStyle?: any;
	footerStyle?: any;
	bodyStyle?: any;
	data?: ItemData[];
	items?: any;
	itemsMap?: any;
	emptyLabel?: any;
	enableDownUpSelect?: boolean;
	fixListBodyHeightOnIE?: boolean;
	onSelect?: (value: any | any[], data: {}[] | {}) => void;
	onItemClick?: any;
	onItemGroupClick?: any;
	onChange?: (value: any | any[], data: {}[] | {}) => void;
	onFocus?: any;
	onBlur?: any;
	onKeyDown?: any;
	onMouseLeave?: any;
	renderMenu?: any;
	renderMenuGroupTitle?: any;
	renderMenuItem?: any;
	renderHeader?: any;
	renderFooter?: any;
	wrapperComponent?: any;
	headerWrapperComponent?: any;
	bodyWrapperComponent?: any;
	footerWrapperComponent?: any;
}
export interface ListBoxState {
	items: Item[];
	itemList: Item[];
	itemsMap: Record<any, Item>;
	value: any[];
	prevProps?: ListBoxProps;
	activeItem?: Item | null;
}

function isIE() {
	const userAgent = navigator.userAgent;
	const isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1;
	const isIE11 = userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1;

	return isIE || isIE11;
}

function noop() {}

function dataProcessor(props: ListBoxProps) {
	const { data, valueField, childrenField, labelField, disabledField } = props;
	const items: Item[] = [];
	const itemList: Item[] = [];
	const itemsMap: Record<any, Item> = {};

	function walk(dataset: {}[], pChildren: Item[]) {
		dataset.forEach((data) => {
			const item: Item = {
				value: data[valueField!],
				label: data[labelField!],
				disabled: data[disabledField!],
				data,
				ref: React.createRef(),
			};

			itemList.push(item);
			pChildren.push(item);

			itemsMap[data[valueField!]] = item;

			if (data[childrenField] && Array.isArray(data[childrenField])) {
				walk(data[childrenField], (item.children = []));
			}
		});
	}

	walk(data!, items);

	return {
		items,
		itemList,
		itemsMap,
	};
}

export class ListBox extends React.Component<ListBoxProps, ListBoxState> {
	static defaultProps = {
		prefixCls: "rw-listbox",
		valueField: "value",
		labelField: "label",
		disabledField: "disabled",
		childrenField: "children",
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
		if (nextProps === state.prevProps) {
			return null;
		}

		return {
			...dataProcessor(nextProps),
			value:
				nextProps.value === undefined
					? state.value
					: Array.isArray(nextProps.value)
					? nextProps.value
					: [nextProps.value],
			prevProps: nextProps,
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
		// this._itemIndex = 0;
		// //索引值对应的item.value
		// this._indexValueMap = {};
		// this._activeIndex = null;

		this.state = {
			items: [],
			itemList: [],
			itemsMap: {},
			value:
				props.defaultValue === undefined
					? []
					: Array.isArray(props.defaultValue)
					? props.defaultValue
					: [props.defaultValue],
		};
	}

	protected popupInstance: React.ReactInstance;
	protected refHandlers = {};

	// componentDidMount() {
	// 	const { prefixCls, autoFocus } = this.props;
	// 	const el = findDOMNode(this);
	// 	const selector = `.${prefixCls}-item-selected`;

	// 	if (autoFocus) {
	// 		this.focus();
	// 	}

	// 	const selectedItem = el.querySelector(selector);
	// 	if (selectedItem) {
	// 		scrollIntoView(selectedItem, this.getListViewBody());
	// 	}
	// }

	focus() {
		(findDOMNode(this) as HTMLElement).focus();
	}

	blur() {
		(findDOMNode(this) as HTMLElement).blur();
	}

	getItemByValue(value: any): Item | null {
		return this.state.itemsMap[value] || null;
	}

	fireChange(value: any) {}

	// onItemClick = (item, e) => {
	// 	const { onItemClick } = this.props;
	// 	if (e) {
	// 		scrollIntoView(e.target, this.getListViewBody());
	// 	}

	// 	if (onItemClick) onItemClick(item, e);
	// };

	// onItemGroupClick = (item, e) => {
	// 	const { onItemGroupClick } = this.props;
	// 	if (e) {
	// 		scrollIntoView(e.target, this.getListViewBody());
	// 	}

	// 	if (onItemGroupClick) onItemGroupClick(item, e);
	// };

	// transformChangeValue(value) {
	// 	const { labelInValue } = this.props;
	// 	const { itemsMap } = this.state;

	// 	if (labelInValue) {
	// 		return isArray(value) ? value.map((v) => itemsMap[v]) : itemsMap[value];
	// 	}

	// 	return value;
	// }

	setValue(value) {
		const { multiple, onChange } = this.props;
		// const { selectedValue } = this.state;

		// if (!multiple) {
		// 	selectedValue.length = 0;
		// }

		// selectedValue.push(value);
		// if (!("value" in this.props)) {
		// 	this.setState({
		// 		selectedValue,
		// 	});
		// }

		// if (onChange) {
		// 	onChange(this.transformChangeValue(multiple ? copy(selectedValue) : selectedValue[0]));
		// }
	}

	// getVaule() {
	// 	const { multiple } = this.props;
	// 	const { selectedValue } = this.state;

	// 	return this.transformChangeValue(multiple ? copy(selectedValue) : selectedValue[0]);
	// }

	// onItemSelect = (item, el) => {
	// 	const { valueField } = this.props;
	// 	this.setValue(item[valueField]);
	// };

	// onItemDeselect = (item, el) => {
	// 	const { multiple, onChange, valueField } = this.props;
	// 	const { selectedValue } = this.state;

	// 	if (!multiple) return;

	// 	let newSelectedValue = selectedValue.filter((d) => !isEqual(item[valueField], d));

	// 	if (!("value" in this.props)) {
	// 		this.setState({
	// 			selectedValue: newSelectedValue,
	// 		});
	// 	}

	// 	if (onChange) {
	// 		onChange(this.transformChangeValue(copy(newSelectedValue)));
	// 	}
	// };

	scrollActiveItemIntoView() {
		const { activeItem } = this.state;

		if (activeItem && activeItem.ref.current) {
			scrollIntoView(activeItem.ref.current.node);
		}
	}

	protected getActiveIndex() {
		const items = this.state.itemList.filter((item) => !item.children);
		let currentActive =
			this.state.activeItem || this.getItemByValue(this.state.value[0]) || items[0];

		if (!currentActive) return -1;

		for (let i = 0; i < items.length; i++) {
			if (currentActive.value === items[i].value) {
				return i;
			}
		}

		return -1;
	}

	protected getNextActiveItem(code: React.KeyboardEvent<Element>["keyCode"]) {
		const items = this.state.itemList.filter((item) => !item.children);
		let activeItem: Item | null = null;
		if (!items.length) return activeItem;

		let activeIndex = this.getActiveIndex();

		while (--items.length) {
			if (code === KEY_DOWN) {
				activeIndex++;
			} else if (code === KEY_UP) {
				activeIndex--;
				if (activeIndex < 0) {
					activeIndex = items.length - 1;
				}
			}

			activeIndex = activeIndex % items.length;

			activeItem = items[activeIndex];

			if (activeItem && activeItem.disabled) continue;

			break;
		}

		return activeItem;
	}

	onKeyDown = (e: React.KeyboardEvent) => {
		const { activeItem } = this.state;
		const keyCode = e.keyCode;

		if (keyCode === KEY_DOWN || keyCode === KEY_UP) {
			e.preventDefault();
			this.setState(
				{
					activeItem: this.getNextActiveItem(keyCode),
				},
				() => {
					this.scrollActiveItemIntoView();
				}
			);
		} else if (activeItem && keyCode === KEY_ENTER) {
			this.fireChange(activeItem.value);
		}
	};

	handleMouseLeave = (e: React.MouseEvent) => {
		const { onMouseLeave } = this.props;

		this.setState({
			activeItem: null,
		});

		onMouseLeave?.(e);
	};

	handleItemMouseEnter = (cValue: any) => {
		this.setState({
			activeItem: this.getItemByValue(cValue),
		});
	};

	handleItemMouseLeave = (cValue: any) => {
		this.setState({
			activeItem: null,
		});
	};

	handleItemClick = (cValue: any, e: React.MouseEvent<HTMLElement>) => {
		const { multiple, onChange, onSelect } = this.props;
		const { value } = this.state;
		const item = this.getItemByValue(cValue);

		if (!item) return;

		scrollIntoView(e.currentTarget);

		if (item.disabled) return;

		if (this.props.value === undefined) {
			this.setState({
				value: [item.value],
			});
		}

		onChange?.(value, item.data);

		onSelect?.(value, item.data);

		// const newValues = [];

		// if (multiple) {
		// } else {
		// 	this.setState({
		// 		value: item.value,
		// 	});
		// }
	};

	handleGroupClick = (e: React.MouseEvent) => {};

	renderGroup(item: Item, selectedMap) {
		const { prefixCls } = this.props;

		return (
			<div className={`${prefixCls}-item-group`}>
				<div className={`${prefixCls}-group-title`}>{item.label}</div>
				<div className={`${prefixCls}-group-list`}>
					{this.renderListItems(item.children!, selectedMap)}
				</div>
			</div>
		);
	}

	renderListItems(items: Item[], selectedMap) {
		const {
			labelField,
			valueField,
			childrenField,
			prefixCls,
			disabled,
			renderMenuItem,
			renderMenuGroupTitle,
		} = this.props;
		const { activeItem, value } = this.state;

		return items.map((item) => {
			const isGroup = item.children;
			const itemPrefixCls = `${prefixCls}-item`;
			const groupPrefixCls = `${prefixCls}-group`;
			const activeCls = `${prefixCls}-item-active`;

			return item.children ? (
				<ListItemGroup
					prefixCls={groupPrefixCls}
					item={item}
					onClick={this.handleGroupClick}
				>
					{this.renderListItems(item.children, selectedMap)}
				</ListItemGroup>
			) : (
				<ListItem
					key={item.value}
					ref={item.ref}
					prefixCls={itemPrefixCls}
					data={item.data}
					value={item.value}
					disabled={item.disabled}
					selected={value.indexOf(item.value) !== -1}
					active={activeItem?.value === item.value}
					onClick={this.handleItemClick}
					onMouseEnter={this.handleItemMouseEnter}
					onMouseLeave={this.handleItemMouseLeave}
				>
					{renderMenuItem ? renderMenuItem(item.data) : item.label}
				</ListItem>
			);
		});

		// 	let onMouseEnter = noop;
		// 	let onMouseLeave = noop;
		// 	let itemIndex = this._itemIndex++;

		// 	if (!isGroup) {
		// 		this._indexValueMap[itemIndex] = item[valueField];

		// 		if (!disabled && !item.disabled) {
		// 			onMouseEnter = (e) => {
		// 				addClass(e.currentTarget, activeCls);
		// 			};
		// 			onMouseLeave = (e) => {
		// 				removeClass(e.currentTarget, activeCls);
		// 			};
		// 		}
		// 	}

		// 	return !isGroup ? (
		// 		<ListItem
		// 			key={item[valueField]}
		// 			prefixCls={itemPrefixCls}
		// 			selected={selectedMap[item[valueField]]}
		// 			disabled={disabled || !!item.disabled}
		// 			data-index={itemIndex}
		// 			onClick={this.onItemClick}
		// 			onSelect={this.onItemSelect}
		// 			onDeselect={this.onItemDeselect}
		// 			onMouseEnter={onMouseEnter}
		// 			onMouseLeave={onMouseLeave}
		// 			item={item}
		// 		>
		// 			{renderMenuItem ? renderMenuItem(item[labelField], item) : item[labelField]}
		// 		</ListItem>
		// 	) : (
		// 		<ListItemGroup
		// 			prefixCls={`${itemPrefixCls}-group`}
		// 			key={item[labelField]}
		// 			value={item[valueField]}
		// 			onClick={this.onItemGroupClick}
		// 			item={item}
		// 			label={
		// 				renderMenuGroupTitle
		// 					? renderMenuGroupTitle(item[labelField], item)
		// 					: item[labelField]
		// 			}
		// 		>
		// 			{this.renderListItems(item[childrenField] || [], selectedMap)}
		// 		</ListItemGroup>
		// 	);
		// });
	}

	renderList() {
		const { emptyLabel } = this.props;
		const { value, items } = this.state;

		const selectedMap = {};
		value.forEach((v) => (selectedMap[v] = true));

		// this._itemIndex = 0;
		// this._indexValueMap = {};
		// this._activeIndex = null;

		if (items && !items.length) {
			return emptyLabel;
		}

		return this.renderListItems(items, selectedMap);
	}

	// saveListView = (node) => {
	// 	this._listview = node;
	// };

	// saveListViewHeader = (node) => {
	// 	this._listview_header = node;
	// };

	// saveListViewBody = (node) => {
	// 	this._listview_body = node;
	// };

	// saveListViewFooter = (node) => {
	// 	this._listview_footer = node;
	// };

	// getListView() {
	// 	return findDOMNode(this._listview) as HTMLElement;
	// }

	// getListViewHeader() {
	// 	return findDOMNode(this._listview_header) as HTMLElement;
	// }

	// getListViewBody() {
	// 	return findDOMNode(this._listview_body) as HTMLElement;
	// }

	// getListViewFooter() {
	// 	return findDOMNode(this._listview_footer) as HTMLElement;
	// }
	//修正IE对flex支持不够完善
	// resizeListBoxBodyHeight() {
	// 	const dom = this.getListView();
	// 	const header = this.getListViewHeader();
	// 	const footer = this.getListViewFooter();
	// 	const body = this.getListViewBody();

	// 	body.style.maxHeight = "";

	// 	const hasScroll = dom.scrollHeight > dom.clientHeight;

	// 	const headerHeight = header ? header.offsetHeight : 0;
	// 	const footerHeight = footer ? footer.offsetHeight : 0;

	// 	if (hasScroll) {
	// 		body.style.maxHeight = dom.clientHeight - headerHeight - footerHeight + "px";
	// 	}
	// }

	// componentDidMount() {
	// 	const fixListBodyHeightOnIE = this.props.fixListBodyHeightOnIE;
	// 	if (isIE() && fixListBodyHeightOnIE) {
	// 		this.resizeListBoxBodyHeight();
	// 	}
	// }

	// componentDidUpdate() {
	// 	const fixListBodyHeightOnIE = this.props.fixListBodyHeightOnIE;
	// 	if (isIE() && fixListBodyHeightOnIE) {
	// 		this.resizeListBoxBodyHeight();
	// 	}
	// }

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
				// ref={this.saveListViewBody}
				// onMouseLeave={this.handleMouseLeave}
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
			[className!]: className,
			[`${prefixCls}-disabled`]: disabled,
		});

		return (
			<WrapperComponent
				// ref={this.saveListView}
				tabIndex={tabIndex}
				className={classes}
				style={style}
				onKeyDown={enableDownUpSelect ? this.onKeyDown : this.onKeyDown}
				onFocus={onFocus}
				onBlur={onBlur}
			>
				{renderHeader ? (
					<HeaderWrapperComponent
						// ref={this.saveListViewHeader}
						className={`${prefixCls}-header`}
						style={headerStyle}
					>
						{renderHeader(this.props)}
					</HeaderWrapperComponent>
				) : null}
				{this.renderMenu()}
				{renderFooter ? (
					<FooterWrapperComponent
						// ref={this.saveListViewFooter}
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

export default ListBox;
