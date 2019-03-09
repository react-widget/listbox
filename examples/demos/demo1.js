import React, { Component } from 'react';
import ListBox from '../../src';

const { ListItem, ListItemGroup } = ListBox

const dataset = [];

var uuid = 100;

for (let i = 0; i < 10; i++) {
    const items = [];
    const d = {
        children: items,
        label: '分组' + (i + 1)
    }

    dataset.push(d)

    for (let j = 0; j < 40; j++) {
        let d = {
            value: uuid++,
            label: '选项' + (j + 1),
            disabled: j % 2
        }
        items.push(d)
    }
}


export default class DEMO extends Component {

    state = {
        value: 2
    }


    handleChange = (value) => {
        this.setState({
            value
        })

        console.log('changed ', value)
    }

    handleChange2 = (value) => {
        console.log('changed ', value)
    }

    filterMsg = ''

    render() {

        return (
            <div>
                <ListBox
                    style={{
                        maxWidth: 300,
                        maxHeight: 400,
                    }}
                    autoFocus
                    renderHeader={() => <h3>header</h3>}
                    renderFooter={() => <h3>footer</h3>}
                    renderMenu={(a) => a}
                    renderMenuItem={(a) => a + '-opt'}
                    renderMenuGroupTitle={(a) => a + '-opt'}
                    headerStyle={{
                        borderBottom: '1px solid #ccc'
                    }}
                    footerStyle={{
                        borderTop: '1px solid #ccc'
                    }}
                    value={this.state.value}
                    onChange={this.handleChange}
                    items={dataset.filter((item, i) => item.label.indexOf(this.filterMsg) >= 0)}
                    emptyLabel="无匹配项"
                    onItemGroupClick={(d) => console.log(d)}
                />

                <ListBox
                    multiple
                    disabled={false}
                    labelInValue
                    onChange={this.handleChange2}
                    defaultValue="V03"
                    style={{
                        maxWidth: 300,
                        height: 400,
                    }}
                >
                    <ListItemGroup label="V">
                        <ListItem value="V01">V01<span style={{
                            position: 'absolute',
                            right: 10,
                            top: 0,
                        }}><strong>Hot</strong></span></ListItem>
                        <ListItem value="V02">V02</ListItem>
                        <ListItem value="V03">V03</ListItem>
                        <ListItem value="V04">V04</ListItem>
                    </ListItemGroup>
                    <ListItemGroup label="X">
                        <ListItem value="X01">X01</ListItem>
                        <ListItem value="X02">X02</ListItem>
                        <ListItem value="X03">X03</ListItem>
                        <ListItem value="X04">X04</ListItem>
                    </ListItemGroup>
                </ListBox>
                <ListBox
                    multiple
                    disabled={false}
                    labelInValue
                    onChange={this.handleChange2}
                    defaultValue="V03"
                    style={{
                        maxWidth: 300,
                        height: 400,
                    }}
                ></ListBox>
            </div >
        );
    }

}
