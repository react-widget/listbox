# ListBox

ListBox组件

## 安装

`npm install --save react-widget-listbox`


## 使用

[![Edit react-widget-listbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/nice-moser-kqj7y?fontsize=14&hidenavigation=1&theme=dark)

```js
import React from "react";
import Trigger from "react-widget-listbox";
import "react-widget-listbox/style";

export default function App() {
  return (
    <div
      className="App"
      style={{
        padding: 100
      }}
    >
      <ListBox
        data={[
            {
                value: 'Banana',
                label: 'Banana'
            }, {
                value: 'Orange',
                label: 'Orange'
            }, {
                value: 'Apple',
                label: 'Apple'
            }, {
                value: 'Mango',
                label: 'Mango'
            }, 
        ]}  
      />
    </div>
  );
}


```


### Interfaces

```ts
export declare type ItemData = Record<string | number, any>;
export declare type ValueType = number | string;
export declare type Item = {
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
```

### defaultProps
```js
{
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
}
```

### 基础样式

```css
.rw-listbox {
	border-radius: 3px;
	position: relative;
	background: #fff;
	display: flex;
	flex-direction: column;
	border: 1px solid #10161a26;
	padding: 5px;
}

.rw-listbox-body {
	flex: 1;
	overflow: auto;
	overflow-x: hidden;
}

.rw-listbox-item-group .rw-listbox-item {
	padding-left: 23px;
}

.rw-listbox-group-title {
	display: flex;
	padding: 5px 7px;
	line-height: 20px;
	user-select: none;
	color: rgb(24, 32, 38);
}

.rw-listbox-item {
	display: flex;
	border-radius: 2px;
	padding: 5px 7px;
	line-height: 20px;
	cursor: pointer;
	user-select: none;
	color: rgb(24, 32, 38);
}

.rw-listbox-item-active {
	background-color: rgba(167, 182, 194, 0.3);
}

.rw-listbox-item:active {
	background-color: rgba(115, 134, 148, 0.3);
}

.rw-listbox-item.rw-listbox-item-selected {
	color: #fff;
	background-color: #137cbd;
}
.rw-listbox-disabled .rw-listbox-item,
.rw-listbox-item.rw-listbox-item-disabled {
	background-color: inherit;
	color: rgba(167, 182, 194, 0.6);
	cursor: default;
}

.rw-listbox-group-title {
	font-weight: 400;
}
.rw-listbox-group-list .rw-listbox-item {
	padding-left: 24px;
}

```
