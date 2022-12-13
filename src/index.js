import Sc from "./xyzscript.js"
let x=new Sc()
/*console.log(x.toJavaScript(`
有我的第一个变量，值为“hello,world!”。
有a，值为(1+1)*2。
打印(1+2)`))*/
eval(x.toJavaScript(`
有b，值为“hello,world!”。
有a，值为(1+1)*2。
打印(a*2)。
打印(b 的 replaceAll(“!”、“!!!”))。
打印(b 的 replace 的 toString())`))
