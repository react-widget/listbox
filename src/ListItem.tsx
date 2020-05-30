import React from "react";
import classNames from "classnames";
import shallowEqual from "shallowequal";

import { Item } from "./types";

export interface ListItemProps {
	prefixCls: string;
	// onSelect: string;
	// onDeselect: string;
	// shallowequal only
	data: {};
	value: any;
	onClick: any;
	onMouseEnter: any;
	onMouseLeave: any;
	selected: boolean;
	disabled: boolean;
	active: boolean;
}

export interface ListItemState {}

export class ListItem extends React.PureComponent<ListItemProps> {
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
		data: {},
	};

	node: HTMLElement;

	// shouldComponentUpdate(nextProps, nextState) {
	// 	return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
	// }

	handleItemClick = (e) => {
		const { onClick, selected, active, value } = this.props;

		// const itemDOM = this.getItemDOM();

		if (onClick) {
			onClick(value, e);
		}

		// if (!selected) {
		// 	onSelect && onSelect(item, itemDOM);
		// } else {
		// 	onDeselect && onDeselect(item, itemDOM);
		// }
	};

	handleMouseEnter = (e: React.MouseEvent) => {
		const { onMouseEnter, value } = this.props;

		onMouseEnter(value, e);
	};

	handleMouseLeave = (e: React.MouseEvent) => {
		const { onMouseLeave, value } = this.props;

		onMouseLeave(value, e);
	};

	saveNode = (dom: React.ReactInstance) => {
		this.node = dom as HTMLElement;
	};

	componentDidUpdate() {
		console.log("update...");
	}

	render() {
		const { prefixCls, selected, children, active, disabled } = this.props;
		const classes = classNames({
			[`${prefixCls}`]: true,
			[`${prefixCls}-active`]: active,
			[`${prefixCls}-selected`]: selected,
			[`${prefixCls}-disabled`]: disabled,
		});

		return (
			<div
				ref={this.saveNode}
				className={classes}
				onClick={this.handleItemClick}
				onMouseEnter={this.handleMouseEnter}
				onMouseLeave={this.handleMouseLeave}
			>
				{children}
			</div>
		);
	}
}

export default ListItem;
