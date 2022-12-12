import Sc from "./xyzscript.js"
let x=new Sc()
console.log(x.toJavaScript(`
有我的第一个变量，值为“hello,world!”。
有a，值为空。`))
