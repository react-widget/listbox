import React from "react";
import classNames from "classnames";
import shallowEqual from "shallowequal";

import { Item } from "./types";

export interface ListItemProps {
	prefixCls: string;
	// onSelect: string;
	// onDeselect: string;
	onClick: any;
	onMouseEnter: any;
	onMouseLeave: any;
	selected: boolean;
	active: boolean;
	item: Item;
}

export interface ListItemState {}

export default class ListItem extends React.Component<ListItemProps> {
	// static propTypes = {
	//     prefixCls: PropTypes.string,
	//     onSelect: PropTypes.func,
	//     onDeselect: PropTypes.func,
	//     onClick: PropTypes.func,
	//     onMouseEnter: PropTypes.func,
	//     onMouseLeave: PropTypes.func,
	//     selected: PropTypes.bool,
	//     disabled: PropTypes.bool,
	//     item: PropTypes.object,
	// }

	static defaultProps = {
		prefixCls: "rw-listbox-item",
		selected: false,
		disabled: false,
	};

	shouldComponentUpdate(nextProps, nextState) {
		return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
	}

	handleItemClick = (e) => {
		const { onClick, selected, item, active } = this.props;
		// const itemDOM = this.getItemDOM();
		if (item.disabled) return;

		if (onClick) {
			onClick(item, e);
		}

		// if (!selected) {
		// 	onSelect && onSelect(item, itemDOM);
		// } else {
		// 	onDeselect && onDeselect(item, itemDOM);
		// }
	};
	// saveItem = (dom) => {
	// 	this.node = dom;
	// };

	// getItemDOM() {
	// 	return this.node;
	// }

	render() {
		const {
			prefixCls,
			item,
			selected,
			children,
			active,
			onMouseEnter,
			onMouseLeave,
		} = this.props;
		const classes = classNames({
			[`${prefixCls}`]: true,
			[`${prefixCls}-active`]: active,
			[`${prefixCls}-selected`]: selected,
			[`${prefixCls}-disabled`]: item.disabled,
		});

		return (
			<div
				// ref={this.saveItem}
				className={classes}
				onClick={this.handleItemClick}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
			>
				{children}
			</div>
		);
	}
}
