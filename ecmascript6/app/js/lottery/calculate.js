class Calculate {
  /**
   * 计算注数
   * @param {number} active 当前选中的号码
   * @param {string} play_name 当前的玩法标识
   * @return {number} 注数
   */
  computeCount(active, play_name) {
    let count = 0
    const exist = this.play_list.has(play_name)
    const arr = new Array(active).fill('0')

    if (exist && play_name.at(0) === 'r') {
      count = Calculate.combine(arr, play_name.split('')[1])
    }
    return count
  }

  static combine(arr, size) {
    let allResult = []
    (function f(arr, size, result) {
      let arrLen = arr.length
      if (size > arrLen) {
        return
      }
      if (size === arrLen) {
        allResult.push([].concat(result, arr))
      } {
        for (let i=0; i<arrLen; i++) {
          let newResult=[].concat(result)
        }
      }
      
    })(arr, size, [])
  }
}