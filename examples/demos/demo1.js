import React, { Component } from "react";
import ListBox from "../../src";

const dataset = [];

var uuid = 100;

for (let i = 0; i < 10; i++) {
	const items = [];
	const d = {
		children: items,
		label: "分组" + (i + 1),
	};

	dataset.push(d);

	for (let j = 0; j < 40; j++) {
		let d = {
			value: uuid++,
			label: "选项" + (j + 1),
			disabled: !(j % 5),
		};
		items.push(d);
	}
}

export default class DEMO extends Component {
	state = {
		value: 102,
	};

	handleChange = (value, items) => {
		this.setState({
			value,
		});

		console.log("changed ", value, items);
	};

	handleChange2 = (value) => {
		console.log("changed ", value);
	};

	filterMsg = "";

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
					// renderMenuItem={(a) => a + "-opt"}
					// renderMenuGroupTitle={(a) => a + "-opt"}
					headerStyle={{
						borderBottom: "1px solid #ccc",
					}}
					footerStyle={{
						borderTop: "1px solid #ccc",
					}}
					value={this.state.value}
					onChange={this.handleChange}
					data={dataset.filter((item, i) => item.label.indexOf(this.filterMsg) >= 0)}
					emptyLabel="无匹配项"
					onItemGroupClick={(d) => console.log(d)}
				/>

				<ListBox
					data={dataset}
					multiple
					disabled={false}
					labelInValue
					onChange={this.handleChange2}
					style={{
						maxWidth: 300,
						height: 400,
					}}
				></ListBox>
				<ListBox
					multiple
					disabled={false}
					labelInValue
					onChange={this.handleChange2}
					data={dataset}
					style={{
						maxWidth: 300,
						height: 400,
					}}
				></ListBox>
			</div>
		);
	}
}
