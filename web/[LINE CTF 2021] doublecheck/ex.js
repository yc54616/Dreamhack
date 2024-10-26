const buf = Buffer.allocUnsafe(2)
 
// const unicode = String.fromCharCode(256*2+0x2e)
 
unicode = "Ｎ"

buf[0] = unicode.charCodeAt(0)
 
console.log(unicode)

console.log(buf)