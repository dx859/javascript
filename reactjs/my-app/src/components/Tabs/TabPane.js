import React from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';

class TabPane extends React.Component {
    static PropTypes = {
        tab: propTypes.oneOfType([propTypes.string, propTypes.node]).isRequired,
        order: propTypes.string.isRequired,
        disable: propTypes.bool,
        isActive: propTypes.bool
    };

    render() {
        const {classPrefix, className, isActive, children} = this.props;

        const classes = classnames({
            [className]: className,
            [`${classPrefix}-panel`]: true,
            [`${classPrefix}-active`]: isActive
        })

        return (
            <div role="tabpanel" className={classes} aria-hidden={!isActive}>
                {children}
            </div>
        );
    }
}

export default TabPane;