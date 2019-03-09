import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';

export default class ListItem extends React.Component {

    static propTypes = {
        prefixCls: PropTypes.string,
        onSelect: PropTypes.func,
        onDeselect: PropTypes.func,
        onClick: PropTypes.func,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
        selected: PropTypes.bool,
        disabled: PropTypes.bool,
        item: PropTypes.object,
    }

    static defaultProps = {
        prefixCls: 'rw-listbox-item',
        selected: false,
        disabled: false,
    }

    static isListItem = true;

    shouldComponentUpdate(nextProps, nextState) {
        return !shallowEqual(this.props, nextProps) ||
            !shallowEqual(this.state, nextState);
    }

    handleItemClick = (e) => {
        const { onSelect, onDeselect, onClick, selected, disabled, item } = this.props;
        const itemDOM = this.getItemDOM();
        if (disabled) return;

        if (onClick) {
            onClick(item, e);
        }

        if (!selected) {
            onSelect && onSelect(item, itemDOM)
        } else {
            onDeselect && onDeselect(item, itemDOM)
        }
    }

    saveItem = (dom) => {
        this.node = dom;
    }

    getItemDOM() {
        return this.node;
    }

    render() {
        const { prefixCls, disabled, selected, children, onMouseEnter, onMouseLeave } = this.props;
        const classes = classNames({
            [`${prefixCls}`]: true,
            [`${prefixCls}-selected`]: selected,
            [`${prefixCls}-disabled`]: disabled,
        });

        return <div
            ref={this.saveItem}
            className={classes}
            onClick={this.handleItemClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {children}
        </div>;
    }

}