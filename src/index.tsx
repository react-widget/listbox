import React from "react";
import { findDOMNode } from "react-dom";
import classNames from "classnames";
import ListItem from "./ListItem";
import ListItemGroup from "./ListItemGroup";
import scrollIntoView from "dom-helpers/scrollTo";

export const version = "%VERSION%";

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
	/** 样式前缀 */
	prefixCls?: string;
	/** 样式名 */
	className?: string;
	/** 样式属性 */
	style?: React.CSSProperties;
	/** tabIndex值 */
	tabIndex?: number;
	/** 支持多选，开启多选后，defaultValue/value为数组 */
	multiple?: boolean;
	/** 默认选中值 */
	defaultValue?: ValueType | ValueType[];
	/** 选中值(受控) */
	value?: ValueType | ValueType[];
	/** 禁用 */
	disabled?: boolean;
	/** 只读 */
	readOnly?: boolean;
	/** 自动获取焦点 */
	autoFocus?: boolean;
	/** 数据集 */
	data?: ItemData[];
	/** 设置data数据的值字段 */
	valueField?: string;
	/** 设置data数据的显示字段 */
	labelField?: string;
	/** 设置data数据的禁用字段 */
	disabledField?: string;
	/** 设置data数据的子节点字段 */
	childrenField?: string;
	/** 设置renderHeader后CSS属性 */
	headerStyle?: React.CSSProperties;
	/** 设置renderFooter后CSS属性 */
	footerStyle?: React.CSSProperties;
	/** 设置列表容器CSS属性 */
	bodyStyle?: React.CSSProperties;
	/** 无数据时显示内容 */
	emptyLabel?: React.ReactNode;
	/** 获取列表项属性 */
	getItemProps?: (data: ItemData) => React.HTMLAttributes<HTMLElement>;
	/** 获取分组标题项属性 */
	getGroupTitleProps?: (data: ItemData) => React.HTMLAttributes<HTMLElement>;
	/** 自定义渲染分组标题 */
	renderGroupTitle?: (data: ItemData) => React.ReactNode;
	/** 自定义渲染列表项内容 */
	renderItem?: (data: ItemData, item: Item) => React.ReactNode;
	/** 自定义渲染器 */
	renderer?: (listBody: React.ReactNode) => React.ReactNode;
	// Invalid
	fixListBodyHeightOnIE?: boolean;
	onSelect?: (value: string | number, data: ItemData) => void;
	onDeselect?: (value: ValueType, data: ItemData) => void;
	onChange?: (value: ValueType | ValueType[], data: ItemData[] | ItemData) => void;
	onFocus?: (e: React.FocusEvent) => void;
	onBlur?: (e: React.FocusEvent) => void;
	onKeyDown?: (e: React.KeyboardEvent) => void;
	onMouseLeave?: (e: React.MouseEvent) => void;
	wrapperComponent: React.ElementType;
	bodyWrapperComponent: React.ElementType;
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
		bodyWrapperComponent: "div",
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

	protected fireSelect(item: Item) {
		const { onSelect } = this.props;
		onSelect?.(item.value, item);
	}

	protected fireDeselect(item: Item) {
		const { onDeselect } = this.props;
		onDeselect?.(item.value, item);
	}

	protected setValue(newValue: any[]) {
		const { multiple, onChange } = this.props;

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
		const { multiple, readOnly, disabled } = this.props;
		const { value } = this.state;
		const idx = value.indexOf(item.value);

		if (readOnly || disabled) {
			return;
		}

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

	protected handleMouseLeave = (e: React.MouseEvent) => {
		const { onMouseLeave } = this.props;

		this.setState({
			activeItem: null,
		});

		onMouseLeave?.(e);
	};

	protected handleItemMouseEnter = (cValue: any) => {
		this.setState({
			activeItem: this.getItemByValue(cValue),
		});
	};

	protected handleItemMouseLeave = (cValue: any) => {
		this.setState({
			activeItem: null,
		});
	};

	protected handleItemClick = (cValue: any, e: React.MouseEvent<HTMLElement>) => {
		const item = this.getItemByValue(cValue);

		if (!item) return;

		scrollIntoView(e.currentTarget);

		if (item.disabled) return;

		this.toggleSelectItem(item);
	};

	protected getItemProps = (data: ItemData): React.HTMLAttributes<HTMLElement> => {
		const { getItemProps } = this.props;

		return getItemProps ? getItemProps(data) : {};
	};

	protected renderListItems(items: Item[]) {
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

	protected renderList() {
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

	protected renderBody() {
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
			readOnly,
			onFocus,
			onBlur,
			style,
			wrapperComponent: WrapperComponent,
			renderer,
		} = this.props;

		const classes = classNames({
			[`${prefixCls}`]: true,
			[className!]: className,
			[`${prefixCls}-disabled`]: disabled,
			[`${prefixCls}-readonly`]: readOnly,
		});

		const listBody = this.renderBody();

		return (
			<WrapperComponent
				tabIndex={tabIndex}
				className={classes}
				style={style}
				onKeyDown={this.onKeyDown}
				onFocus={onFocus}
				onBlur={onBlur}
			>
				{renderer ? renderer(listBody) : listBody}
			</WrapperComponent>
		);
	}
}

export default ListBox;
