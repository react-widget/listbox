import React from "react";
import classNames from "classnames";
import shallowEqual from "shallowequal";

import { Item, ItemData } from "./types";

export interface ListItemProps {
	prefixCls: string;
	data: {};
	value: any;
	onClick: any;
	onMouseEnter: any;
	onMouseLeave: any;
	selected: boolean;
	disabled: boolean;
	active: boolean;
	getItemProps: (data: ItemData) => React.HTMLAttributes<HTMLElement>;
}

export interface ListItemState {}

export class ListItem extends React.PureComponent<ListItemProps> {
	static defaultProps = {
		data: {},
	};

	node: HTMLElement;

	saveNode = (dom: React.ReactInstance | null) => {
		this.node = dom as HTMLElement;
	};

	componentDidUpdate() {
		console.log("update...");
	}

	render() {
		const {
			prefixCls,
			selected,
			children,
			active,
			disabled,
			getItemProps,
			onMouseEnter,
			onMouseLeave,
			data,
			value,
			onClick,
		} = this.props;

		const customProps = getItemProps(data);

		const classes = classNames({
			[`${prefixCls}`]: true,
			[`${prefixCls}-active`]: active,
			[`${prefixCls}-selected`]: selected,
			[`${prefixCls}-disabled`]: disabled,
			[customProps.className!]: customProps.className,
		});

		return (
			<div
				ref={this.saveNode}
				{...customProps}
				className={classes}
				onClick={(e) => {
					onClick(value, e);
					customProps.onClick?.(e);
				}}
				onMouseEnter={(e) => {
					onMouseEnter(value, e);
					customProps.onMouseEnter?.(e);
				}}
				onMouseLeave={(e) => {
					onMouseLeave(value, e);
					customProps.onMouseLeave?.(e);
				}}
			>
				{children}
			</div>
		);
	}
}

export default ListItem;
