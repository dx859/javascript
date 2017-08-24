import React, {Component} from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';

class TabContent extends Component {
    static propTypes = {
        classPrefix: propTypes.string,
        panels: propTypes.node,
        activeIndex: propTypes.number
    }

    getTabPanes() {
        const {classPrefix, activeIndex, panels} = this.props;

        return React.Children.map(panels, child => {
            if (!child) {
                return;
            }
            const order = parseInt(child.props.order, 10);
            const isActive = activeIndex === order;

            return React.cloneElement(child, {
                classPrefix,
                isActive,
                children: child.props.children,
                key: `tabpane-${order}`
            })
        })
    }

    render() {
        const {classPrefix} = this.props;
        const classes = classnames(`${classPrefix}-content`)

        return (
            <div className={classes}>
                {this.getTabPanes()}
            </div>
        );
    }
}

export default TabContent;