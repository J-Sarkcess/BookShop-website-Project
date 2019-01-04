export function sort_ASCII(obj) {
  var arr = new Array();
  var num = 0;
  for (let i in obj) {
    arr[num] = i;
    num++;
  }
  var sortArr = arr.sort();
  var sortObj = {};
  for (let i in sortArr) {
    sortObj[sortArr[i]] = obj[sortArr[i]];
  }
  return sortObj;
}

export function join_params(obj) {
  let str = '';
  for (let key in obj) {
    str += `${key}${obj[key]}`
  }
  return str
}
