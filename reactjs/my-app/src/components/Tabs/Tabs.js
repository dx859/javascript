import React from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';
import TabNav from './TabNav';
import TabContent from './TabContent';
import './style.css';

export default class Tabs extends React.Component {
  static propTypes = {
    className: propTypes.string,
    classPrefix: propTypes.string,
    children: propTypes.oneOfType([
      propTypes.arrayOf(propTypes.node),
      propTypes.node
    ]),
    defaultActiveIndex: propTypes.number,
    activeIndex: propTypes.number,
    onChange: propTypes.func
  };

  static defaultProps = {
    classPrefix: 'tabs',
    onChange: () => {}
  };

  constructor(props) {
    super(props);
    const currProps = this.props;
    this.handleTabClick = this.handleTabClick.bind(this);

    let activeIndex;
    if ('activeIndex' in currProps) {
      activeIndex = currProps.activeIndex;
    } else if ('defaultActiveIndex' in currProps) {
      activeIndex = currProps.defaultActiveIndex;
    }

    this.state = {
      activeIndex,
      prevIndex: activeIndex
    }
  }

  componentWillReceiveProps(nextProps) {
    if ('activeIndex' in nextProps) {
      this.setState({
        activeIndex: nextProps.activeIndex,
      });
    }
  }

  handleTabClick(activeIndex) {
    const prevIndex = this.state.activeIndex;

    if (this.state.activeIndex !== activeIndex &&
      'defaultActiveIndex' in this.props) {
      this.setState({ activeIndex, prevIndex });

      this.props.onChange({ activeIndex, prevIndex });
    }
  }

  renderTabNav() {
    const { classPrefix, children } = this.props;

    return (<TabNav
              key="tabBar"
              classPrefix={classPrefix}
              onTabClick={this.handleTabClick}
              panels={children}
              activeIndex={this.state.activeIndex}/>)
  }

  renderTabContent() {
    const { classPrefix, children } = this.props;

    return (<TabContent
              key="tabcontent"
              classPrefix={classPrefix}
              activeIndex={this.state.activeIndex}
              panels={children}/>);
  }

  render() {
    const { className } = this.props;
    const cx = classnames(className, 'ui-tabs');

    return (
      <div className={cx}>
        {this.renderTabNav()}
        {this.renderTabContent()}
      </div>
    );
  }
}