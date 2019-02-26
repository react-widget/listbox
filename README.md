# react-widget-listbox

## 安装
`npm install --save react-widget-select`

## API

```html
<ListBox options={[{label:lucy, value: lucy}]}>
</ListBox>
```

### ListBox props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | 组件CSS样式前缀 | string | rw-listbox |
| className | 组件className属性 | string | - |
| style | 组件style属性 | React.CSSProperties | - |
| tabIndex | 组件tabIndex属性 | number | - |
| items | 组件数据 | Array\<ItemData | ItemGroupData> | false |
| headerStyle | - | - | - |
| footerStyle | - | - | - |
| bodyStyle | - | - | - |
| valueField | 设置取值字段 | string | value |
| labelField | 设置显示字段 | string | label |
| childrenField | 设置子节点字段 | string | children |
| headerStyle | - | - | - |
| headerStyle | - | - | - |
| headerStyle | - | - | - |
| emptyLabel | 下拉框无内容时显示 | ReactNode | no data. |
| multiple | - | - | - |

| labelInValue | 是否把每个选项的 label 包装到 value 中，会把 Select 的 value 类型从 `string` 变为 `{key: string, label: ReactNode}` 的格式 | boolean | false |
| autoFocus | 默认获取焦点 | boolean | false |
| defaultValue | 指定默认选中的条目 | string|number | - |
| value | 指定默认选中的条目 `受控` | string|number | - |
| disabled | 是否禁用 | boolean | false |

| renderValue | 自定义渲染被选中的选项 | (menu: ReactNode, option: Option) => ReactNode | - |
| renderMenu | 自定义下拉框内容 | (menu: ReactNode, props) => ReactNode | - |
| renderMenuItem | 自定义下拉选项内容 | (label:React.Node, option:Option) => ReactNode | - |
| renderMenuGroupTitle | 自定义下拉分组标题内容 | (label:React.Node, option:Option) => ReactNode | - |
| onBlur | 失去焦点的时回调 | function | - |
| onFocus | 获得焦点时回调 | function | - |
| onChange | 选中 option 时调用此函数 | function(value, option:Option) | - |
| onItemClick | 搜- |  |
| onItemGroupClick | - | - |
| onKeyDown | - | function(open) | - |
| wrapperComponent | - | function | - |
| headerWrapperComponent | - | function | - |
| bodyWrapperComponent | -- | function | - |
| footerWrapperComponent | - | function | - |


### ListBox Methods

| 名称 | 说明 |
| --- | --- |
| blur() | 取消焦点 |
| focus() | 获取焦点 |

### ItemData props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| disabled | 是否禁用 | boolean | false |
| label | 选中该 Option 后，Select 的 title | ReactNode | - |
| value | 默认根据此属性值进行筛选 | string\|number | - |

### ItemGroupData props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 子节点 | Array\<ItemData> | - |
| label | 组名 | string\|React.Element | 无 |
