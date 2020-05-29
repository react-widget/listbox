import React from "react";
import { Item } from "./types";
export interface ItemGroupProps {
	item: Item;
	prefixCls: string;
	onClick: any;
}

export default class ItemGroup extends React.Component<ItemGroupProps> {
	static defaultProps = {
		prefixCls: "rw-listbox-item-group",
		label: "",
	};

	handleClick = (e) => {
		const { onClick, item } = this.props;

		if (onClick) {
			onClick(item, e);
		}
	};

	render() {
		const { prefixCls, item, children } = this.props;
		return (
			<div className={prefixCls}>
				<div className={`${prefixCls}-title`} onClick={this.handleClick}>
					{item.label}
				</div>
				<div className={`${prefixCls}-list`}>{children}</div>
			</div>
		);
	}
}
