
var cl=function (msg) {
    console.log(msg)
}

cl(['1','2','3'].map(parseInt))
cl(parseInt('10'))
cl(parseInt('19',10))
cl(parseInt('11',2))
cl(parseInt('17',8))
cl(parseInt('1f',16))
cl(parseInt('010'))
//如果省略该参数或其值为 ‘0‘，则数字将以 10 为基础来解析。如果它以 ‘”0x”‘ 或 ‘”0X”‘ 开头，将以 16 为基数。

// 如果该参数小于 2 或者大于 36，则 ‘parseInt()‘ 将返回 ‘NaN‘。

// var parseInt=function (string,radix) {
//     return string + '-'+radix
// }

['1','2','3'].map(parseInt)

// array1.map(callbackfn[, thisArg])
// function callbackfn(value, index, array1)
// map传递三个参数value,index,array;parseInt()接收两个参数string,radix;