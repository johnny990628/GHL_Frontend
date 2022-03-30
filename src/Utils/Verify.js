export const verifyID = value => {
    //建立字母分數陣列(A~Z)
    var city = [1, 10, 19, 28, 37, 46, 55, 64, 39, 73, 82, 2, 11, 20, 48, 29, 38, 47, 56, 65, 74, 83, 21, 3, 12, 30]
    value = value.toUpperCase()
    //使用「正規表達式」檢驗格式
    if (value.search(/^[A-Z](1|2)\d{8}$/i) === -1) {
        return false
    } else {
        //將字串分割為陣列(IE必需這麼做才不會出錯)
        value = value.split('')
        //計算總分
        var total = city[value[0].charCodeAt(0) - 65]
        for (let i = 1; i <= 8; i++) {
            total += eval(value[i] * (9 - i))
        }
        //補上檢查碼(最後一碼)
        total += eval(value[9])
        //檢查比對碼(餘數應為0);
        return total % 10 === 0
    }
}

export const verifyPhone = value => {
    //正則表達式驗證手機或市話號碼
    return value.search(/\d{2,4}-?\d{3,4}-?\d{3,4}#?(\d+)?/) !== -1
}
