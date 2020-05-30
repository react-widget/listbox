import React from "react";
import { findDOMNode } from "react-dom";
import classNames from "classnames";
import ListItem from "./ListItem";
import ListItemGroup from "./ListItemGroup";
import scrollIntoView from "dom-helpers/scrollTo";

const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_ENTER = 13;

export type ItemData = Record<string | number, any>;
export type ValueType = number | string;

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
	tabIndex?: number;
	multiple?: boolean;
	defaultValue?: ValueType | ValueType[];
	value?: ValueType | ValueType[];
	disabled?: boolean;
	autoFocus?: boolean;
	valueField?: string;
	labelField?: string;
	disabledField?: string;
	childrenField?: string;
	headerStyle?: React.CSSProperties;
	footerStyle?: React.CSSProperties;
	bodyStyle?: React.CSSProperties;
	data?: ItemData[];
	emptyLabel?: React.ReactNode;
	getItemProps?: (data: ItemData) => React.HTMLAttributes<HTMLElement>;
	getGroupTitleProps?: (data: ItemData) => React.HTMLAttributes<HTMLElement>;
	// Invalid
	fixListBodyHeightOnIE?: boolean;
	onSelect?: (value: string | number, data: ItemData) => void;
	onDeselect?: (value: ValueType, data: ItemData) => void;
	onChange?: (value: ValueType | ValueType[], data: ItemData[] | ItemData) => void;
	onFocus?: (e: React.FocusEvent) => void;
	onBlur?: (e: React.FocusEvent) => void;
	onKeyDown?: (e: React.KeyboardEvent) => void;
	onMouseLeave?: (e: React.MouseEvent) => void;
	renderGroupTitle?: (data: ItemData) => React.ReactNode;
	renderItem?: (data: ItemData, item: Item) => React.ReactNode;
	// TODO:
	renderHeader?: () => React.ReactNode;
	renderFooter?: () => React.ReactNode;
	wrapperComponent: React.ElementType;
	headerWrapperComponent: React.ElementType;
	bodyWrapperComponent: React.ElementType;
	footerWrapperComponent: React.ElementType;
}
export interface ListBoxState {
	items: Item[];
	itemList: Item[];
	itemsMap: Record<any, Item>;
	value: any[];
	prevProps?: ListBoxProps;
	activeItem?: Item | null;
}

// function isIE() {
// 	const userAgent = navigator.userAgent;
// 	const isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1;
// 	const isIE11 = userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1;

// 	return isIE || isIE11;
// }

function dataProcessor(props: ListBoxProps) {
	const { data, valueField, childrenField, labelField, disabledField } = props;
	const items: Item[] = [];
	const itemList: Item[] = [];
	const itemsMap: Record<any, Item> = {};

	function walk(dataset: ItemData[], pChildren: Item[]) {
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

			if (data[childrenField!] && Array.isArray(data[childrenField!])) {
				walk(data[childrenField!], (item.children = []));
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
	static defaultProps: ListBoxProps = {
		prefixCls: "rw-listbox",
		valueField: "value",
		labelField: "label",
		disabledField: "disabled",
		childrenField: "children",
		tabIndex: 0,
		emptyLabel: "Not Found",
		fixListBodyHeightOnIE: true,
		data: [],
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

	// protected refHandlers = {};

	focus() {
		(findDOMNode(this) as HTMLElement).focus();
	}

	blur() {
		(findDOMNode(this) as HTMLElement).blur();
	}

	getItemByValue(value: any): Item | null {
		return this.state.itemsMap[value] || null;
	}

	fireSelect(item: Item) {
		const { onSelect } = this.props;
		onSelect?.(item.value, item);
	}

	fireDeselect(item: Item) {
		const { onDeselect } = this.props;
		onDeselect?.(item.value, item);
	}

	setValue(newValue: any[]) {
		const { multiple, onChange, onSelect } = this.props;

		if (this.props.value === undefined) {
			this.setState({
				value: newValue,
			});
		}

		if (multiple) {
			const items = newValue.map((value) => this.getItemByValue(value)?.data!);
			onChange?.(newValue, items);
		} else {
			if (!newValue.length) return;
			const item = this.getItemByValue(newValue[0]);
			onChange?.(newValue[0], item?.data!);
		}
	}

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

	toggleSelectItem(item: Item) {
		const { multiple } = this.props;
		const { value } = this.state;
		const idx = value.indexOf(item.value);

		if (multiple) {
			if (idx === -1) {
				this.setValue([...value, item.value]);
			} else {
				const newValue = [...value];
				newValue.splice(idx, 1);
				this.setValue(newValue);
			}

			if (idx !== -1) {
				this.fireSelect(item);
			} else {
				this.fireDeselect(item);
			}
		} else if (idx === -1) {
			this.setValue([item.value]);
		}
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
			this.toggleSelectItem(activeItem);
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
		const item = this.getItemByValue(cValue);

		if (!item) return;

		scrollIntoView(e.currentTarget);

		if (item.disabled) return;

		this.toggleSelectItem(item);
	};

	getItemProps = (data: ItemData): React.HTMLAttributes<HTMLElement> => {
		const { getItemProps } = this.props;

		return getItemProps ? getItemProps(data) : {};
	};

	renderListItems(items: Item[]) {
		const { prefixCls, renderItem, renderGroupTitle, getGroupTitleProps } = this.props;
		const { activeItem, value } = this.state;

		return items.map((item) => {
			const itemPrefixCls = `${prefixCls}-item`;
			const groupPrefixCls = `${prefixCls}-group`;

			return item.children ? (
				<ListItemGroup
					getGroupTitleProps={getGroupTitleProps}
					prefixCls={groupPrefixCls}
					item={item}
					renderGroupTitle={renderGroupTitle}
				>
					{this.renderListItems(item.children)}
				</ListItemGroup>
			) : (
				<ListItem
					key={item.value}
					ref={item.ref}
					prefixCls={itemPrefixCls}
					data={item.data}
					value={item.value}
					disabled={item.disabled}
					getItemProps={this.getItemProps}
					selected={value.indexOf(item.value) !== -1}
					active={activeItem?.value === item.value}
					onClick={this.handleItemClick}
					onMouseEnter={this.handleItemMouseEnter}
					onMouseLeave={this.handleItemMouseLeave}
				>
					{renderItem ? renderItem(item.data, item) : item.label}
				</ListItem>
			);
		});
	}

	renderList() {
		const { emptyLabel } = this.props;
		const { items } = this.state;

		if (!items.length) {
			return emptyLabel;
		}

		return this.renderListItems(items);
	}

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

	componentDidMount() {
		const { autoFocus, fixListBodyHeightOnIE } = this.props;
		const { value } = this.state;

		// if (isIE() && fixListBodyHeightOnIE) {
		// 	this.resizeListBoxBodyHeight();
		// }

		if (autoFocus) {
			this.focus();
		}

		if (value.length) {
			const item = this.getItemByValue(value[0]);
			if (item && item.ref.current) {
				scrollIntoView(item.ref.current.node);
			}
		}
	}

	renderMenu() {
		const { bodyWrapperComponent: BodyWrapperComponent, prefixCls, bodyStyle } = this.props;

		return (
			<BodyWrapperComponent className={`${prefixCls}-body`} style={bodyStyle}>
				{this.renderList()}
			</BodyWrapperComponent>
		);
	}

	render() {
		const {
			className,
			prefixCls,

			tabIndex,
			disabled,
			onFocus,
			onBlur,
			style,
			wrapperComponent: WrapperComponent,
			headerWrapperComponent: HeaderWrapperComponent,
			footerWrapperComponent: FooterWrapperComponent,
			renderHeader,
			renderFooter,
			headerStyle,
			footerStyle,
		} = this.props;

		const classes = classNames({
			[`${prefixCls}`]: true,
			[className!]: className,
			[`${prefixCls}-disabled`]: disabled,
		});

		return (
			<WrapperComponent
				tabIndex={tabIndex}
				className={classes}
				style={style}
				onKeyDown={this.onKeyDown}
				onFocus={onFocus}
				onBlur={onBlur}
			>
				{renderHeader ? (
					<HeaderWrapperComponent className={`${prefixCls}-header`} style={headerStyle}>
						{renderHeader()}
					</HeaderWrapperComponent>
				) : null}
				{this.renderMenu()}
				{renderFooter ? (
					<FooterWrapperComponent className={`${prefixCls}-footer`} style={footerStyle}>
						{renderFooter()}
					</FooterWrapperComponent>
				) : null}
			</WrapperComponent>
		);
	}
}

export default ListBox;
