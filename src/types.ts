export type ItemData = Record<string | number, any>;

export type Item = {
	value: any;
	label: React.ReactNode;
	disabled: boolean;
	children?: Item[];
	data: ItemData;
};
