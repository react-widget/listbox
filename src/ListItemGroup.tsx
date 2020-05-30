import React from "react";

import { Item, ItemData } from "./types";
export interface ItemGroupProps {
	item: Item;
	prefixCls: string;
	renderGroupTitle?: (data: ItemData) => React.ReactNode;
	getGroupTitleProps?: (data: ItemData) => React.HTMLAttributes<HTMLElement>;
}

export default class ItemGroup extends React.Component<ItemGroupProps> {
	render() {
		const { prefixCls, item, children, renderGroupTitle, getGroupTitleProps } = this.props;

		const customProps = getGroupTitleProps ? getGroupTitleProps(item.data) : {};

		return (
			<div className={prefixCls}>
				<div {...customProps} className={`${prefixCls}-title`}>
					{renderGroupTitle ? renderGroupTitle(item.data) : item.label}
				</div>
				<div className={`${prefixCls}-list`}>{children}</div>
			</div>
		);
	}
}
