import React, { Component } from 'react';

/*
React 官方同样推荐使用受控表单组件。总结下React 受控组件更新state 的流程：
(1) 可以通过在初始state 中设置表单的默认值。
(2) 每当表单的值发生变化时，调用 onChange 事件处理器。
(3) 事件处理器通过合成事件对象 e 拿到改变后的状态，并更新应用的state。
(4) setState 触发视图的重新渲染，完成表单组件值的更新。
 */
class FormDemo extends Component {
  state = {
    inputValue: '',
    textareaValue: '',
    radioValue: '',
    hobbyValue: [],
    selectValue: 'coconut',
    name: '',
    age: '',
  }

  handleInputChange = (e) => {
    this.setState({
      inputValue: e.target.value.toUpperCase(),
    })
  }

  handleTextareaChange = (e) => {
    this.setState({
      textareaValue: e.target.value,
    })
  }

  handleRadio = (e) => {
    this.setState({
      radioValue: e.target.value,
    });
  }

  handleCheckbox = (e) => {
    const { checked, value } = e.target;
    let hobbyValue = this.state.hobbyValue;
    if (checked && hobbyValue.indexOf(value) === -1) {
      hobbyValue.push(value);
    } else {
      hobbyValue = hobbyValue.filter(i => i !== value);
    }
    this.setState({
      hobbyValue,
    });
  }

  handleSelect = (e) => {
    this.setState({
      selectValue: e.target.value
    })
  }

  handleChange(name, e) {
    const { value } = e.target;
    this.setState({
      [name]: value 
    });
  }

  render() {
    return (
      <div>
        <h3>单行输入和多行输入</h3>
        <p>单行输入：<input type="text" value={this.state.inputValue} onChange={this.handleInputChange} /></p>
        <p>多行输入：<textarea value={this.state.textareaValue} onChange={this.handleTextareaChange} cols="30" rows="10" /></p>
        
        <h3>单选按钮与复选框</h3>
        <p>性别：
          <label>男
            <input type="radio" value="男" checked={this.state.radioValue === '男'} onChange={this.handleRadio} />
          </label>
          <label>女
            <input type="radio" value="女" checked={this.state.radioValue === '女'} onChange={this.handleRadio} />
          </label>
        </p>
        <p>爱好：
          <label>足球
            <input type="checkbox" value="football" checked={this.state.hobbyValue.indexOf('football') !== -1} onChange={this.handleCheckbox}/>
          </label>
          <label>篮球
            <input type="checkbox" value="basketball" checked={this.state.hobbyValue.indexOf('basketball') !== -1} onChange={this.handleCheckbox}/>
          </label>
          <label>网球
            <input type="checkbox" value="tennis" checked={this.state.hobbyValue.indexOf('tennis') !== -1} onChange={this.handleCheckbox}/>
          </label>
        </p>

        <h3>select下拉框</h3>
        <p>
          <select value={this.state.selectValue} onChange={this.handleSelect}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </p>
        <h3>使用一个事件绑定多个表单域</h3>
        <p>姓名：<input type="text" value={this.state.name} onChange={this.handleChange.bind(this, 'name')}/></p>
        <p>年龄：<input type="text" value={this.state.age} onChange={this.handleChange.bind(this, 'age')}/></p>
      </div>
    );
  }
}

export default FormDemo;