import React from 'react';
import PropTypes from 'prop-types';

export default class ItemGroup extends React.Component {

    static propTypes = {
        label: PropTypes.node,
        value: PropTypes.any,
        children: PropTypes.node,
        prefixCls: PropTypes.string,
        onClick: PropTypes.func,
        item: PropTypes.object,
    }

    static defaultProps = {
        prefixCls: 'rw-listbox-item-group',
        label: '',
    };

    static isListItemGroup = true;

    handleClick = (e) => {
        const {
            value,
            label,
            children,
            onClick,
            item
        } = this.props;

        if (onClick) {
            onClick(item || {
                value, label, children
            }, e);
        }
    }

    render() {
        const { prefixCls, label, children, ...others } = this.props;
        return (
            <div className={prefixCls}>
                <div
                    {...others}
                    className={`${prefixCls}-title`}
                    onClick={this.handleClick}
                >{label}</div>
                <div className={`${prefixCls}-list`}>
                    {children}
                </div>
            </div>
        );
    }

}
