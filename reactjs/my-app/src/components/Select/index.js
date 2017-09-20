import React from 'react';

export default class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{
        checked: false,
        value: 'red',
      },{
        checked: false,
        value: 'green',
      },{
        checked: false,
        value: 'yellow',
      },]
    };
  }

  handleClick(index, e) {
    this.setState((state, props) => {
      state.items[index].checked = !state.items[index].checked
      return {
        items: state.items
      }
    })
  }

  render() {
    return (
      <div>
        <div><input type="text" placeholder="点击选择类容"/></div>
        <ul>
          {
            this.state.items.map((item, index) => <SelectItem key={index} handleClick={this.handleClick.bind(this, index)} value={item.value} checked={item.checked}/> )
          }
        </ul>
      </div>
    );
  }
}


const SelectItem = (props) => <li style={props.checked ? {color: 'red'} : {color: '#666'}} onClick={props.handleClick}>{props.value}</li>;