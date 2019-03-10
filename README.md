# react-widget-listbox

## 安装
`npm install --save react-widget-listbox`

## API

```html
<ListBox 
items={[{label:lucy, value: lucy}]}
>
</ListBox>
```

### ListBox props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | 组件CSS样式前缀 | string | rw-listbox |
| className | 组件className属性 | string | - |
| style | 组件style属性 | React.CSSProperties | - |
| width | css快捷属性 | number | - |
| height | css快捷属性 | number | - |
| tabIndex | 组件tabIndex属性 | number | - |
| multiple | 多选模式, 多选模式下value是数组 | boolean | false |
| defaultValue | 指定默认选中的条目 | string\|number|Array\<string\|number> | - |
| value | 指定默认选中的条目 `受控` | string\|number|Array\<string\|number> | - |
| autoFocus | 默认获取焦点 | boolean | false |
| disabled | 是否禁用 | boolean | false |
| valueField | 设置取值字段 | string | value |
| labelField | 设置显示字段 | string | label |
| childrenField | 设置子节点字段 | string | children |
| headerStyle | 设置header的样式，renderHeader启用时有效 | React.CSSProperties | - |
| footerStyle | 设置footer的样式，renderFooter启用时有效 | React.CSSProperties | - |
| bodyStyle | 设置body的样式 | React.CSSProperties | - |
| items | 组件数据 | Array\<ItemData | ItemGroupData> | [] |
| itemsMap | 组件数据Hash表 | Object\<string, ItemData> | [] |
| emptyLabel | 无内容时显示 | ReactNode | Not Found. |
| labelInValue | 开启后`onChange(ItemData \| Array\<ItemData>)` | boolean | false |
| enableDownUpSelect | 开启可通过上下方向键选择项目 | boolean | true |
| fixListBodyHeightOnIE | IE下会自动设置body的maxHeight，如果CSS中已经确定可以关闭 | boolean | true |
| onItemClick | 列表项点击时触发，注：如果开启`enableDownUpSelect`并回车时也会触发 | function(item: ItemData, e: Event) => ReactNode | - |
| onItemGroupClick | 列表分组項点击时触发 | function(item: ItemGroupData, e: Event) | - |
| onChange | 数据改变时触发 | function(item: number\|string\|ItemData \| Array\<ItemData\|string\|number>) | - |
| onBlur | 失去焦点的时回调 | function | - |
| onFocus | 获得焦点时回调 | function | - |
| onKeyDown | 键盘按下时触发 | function | - |
| renderMenu | 自定义列表框内容 | (menus: Array\<ReactNode>, props) => ReactNode | - |
| renderMenuItem | 自定义列表项内容 | (label:React.Node, item:ItemData) => ReactNode | - |
| renderMenuGroupTitle | 自定义列表项分组标题内容 | (label:React.Node, item:ItemGroupData) => ReactNode | - |
| renderHeader | 渲染列表项头部 | function(props): ReactNode | null |
| renderFooter | 渲染列表项尾部 | function(props): ReactNode | null |
| wrapperComponent | ListBox最外层容器组件 | ReactNode | div |
| headerWrapperComponent | ListBox头部容器组件 | ReactNode | div |
| bodyWrapperComponent | ListBox列表项容器组件 | ReactNode | div |
| footerWrapperComponent | ListBox尾部容器组件 | ReactNode | div |


### ListBox Methods

| 名称 | 说明 |
| --- | --- |
| blur() | 取消焦点 |
| focus() | 获取焦点 |

### ItemData props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| disabled | 是否禁用 | boolean | false |
| label | 列表项的title | ReactNode | - |
| value | 列表项值 | any | - |

### ItemGroupData props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 子节点 | Array\<ItemData> | - |
| label | 组名 | string\|React.Element | 无 |
