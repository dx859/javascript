import React, { Component } from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';

class TabNav extends Component {
  static ProTypes = {
    classPrefix: propTypes.string,
    panels: propTypes.node,
    activeIndex: propTypes.number
  };

  getTabs() {
    const { panels, classPrefix, activeIndex } = this.props;

    return React.Children.map(panels, child => {
      if (!child) {
        return;
      }

      const order = parseInt(child.props.order, 10);

      let classes = classnames({
        [`${classPrefix}-tab`]: true,
        [`${classPrefix}-active`]: activeIndex === order,
        [`${classPrefix}-disabled`]: child.props.disabled
      })

      let events = {};
      if (!child.props.disabled) {
        events = {
          onClick: this.props.onTabClick.bind(this, order)
        };
      }

      const ref = {};
      if (activeIndex === order) {
        ref.ref = 'activeTab';
      }

      return (
        <li
          role="tab"
          aria-disabled={child.props.disabled ? 'true' : 'false'}
          aria-selected={activeIndex === order ? 'true' : 'false'}
          {...events}
          className={classes}
          key={order}
          {...ref}>
          {child.props.tab}
        </li>
      )
    })
  }

  render() {
    const { classPrefix } = this.props;
    const rootClasses = classnames(`${classPrefix}-nav`);
    const classes = classnames(`${classPrefix}-nav`);

    return (
      <div className={rootClasses} role="tablist">
        <ul className={classes}>{this.getTabs()}</ul>
      </div>
    );
  }
}

export default TabNav;