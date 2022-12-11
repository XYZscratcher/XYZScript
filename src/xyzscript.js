function Script(code) {
  // 如果用户没有使用“new”关键字，就返回new Script
  if (!(this instanceof Script)) {
    return new Script(code);
  }
}
Script.prototype.toJavaScript = function (input) {
  function tokenizer(input) {

    // `current` 变量就像一个指光标一样让我们可以在代码中追踪我们的位置
    let current = 0;

    // `tokens` 数组用来存我们的标记
    let tokens = [];

    // 首先创建一个`while`循环，在循环里面我们可以将`current`变量增加为我们想要的值
    // 做这一步的原因是因为我们想要在一个循环里多次增加`current`变量的值，因为我们的标记的长度不确定
    while (current < input.length) {
      let char = input[current];

      if (char === '有') {
        tokens.push({
          type: '标签',
          value: '有',
        });
        // `current`自增
        current++;

        // 然后继续进入下一次循环。
        continue;
      }

      if (char === '值') {
        current++;
        if (input[current] === '为') {
          tokens.push({
            type: '符号',
            value: '值为',
          });
          // `current`自增
          current++;

          // 然后继续进入下一次循环。
          continue;
        }
      }

      if (char === '方') {
        current++;
        if (input[current] === '法') {
          tokens.push({
            type: '标签',
            value: '方法',
          });
          // `current`自增
          current++;

          // 然后继续进入下一次循环。
          continue;
        }
      }

      let WHITESPACE_AND_OTHER = /[\s，]/;
      if (WHITESPACE_AND_OTHER.test(char)) {
        current++;
        continue;
      }

      let NUMBERS = /[0-9]/;
      if (NUMBERS.test(char)) {

        // 我们将创建一个`value`字符串，并把字符推送给他
        let value = '';

        // 然后我们将遍历序列中的每个字符，直到遇到一个不是数字的字符
        // 将每个作为数字的字符推到我们的 `value` 并随着我们去增加 `current`
        // 这样我们就能拿到一个完整的数字字符串，例如上面的 123 和 456，而不是单独的 1 2 3 4 5 6
        while (NUMBERS.test(char)) {
          value += char;
          char = input[++current];
        }

        // 接着我们把数字放到标记数组中，用数字类型来描述区分它
        tokens.push({ type: '数字', value });

        // 继续外层的下一次循环
        continue;
      }

      if (char === '“') {
        // 保留一个 `value` 变量来构建我们的字符串标记。
        let value = '';

        // 我们将跳过编辑中开头的双引号
        char = input[++current];

        // 然后我们将遍历每个字符，直到我们到达另一个双引号
        while (char !== '”') {
          value += char;
          char = input[++current];
        }

        // 跳过相对应闭合的双引号.
        char = input[++current];

        // 把我们的字符串标记添加到标记数组中
        tokens.push({ type: '字符串', value });

        continue;
      }

      let LETTERS = /[\u4E00-\u9FA5a-z_$-]/i;
      if (LETTERS.test(char)) {
        let value = '';

        // 同样，我们遍历所有，并将它们完整的存到`value`变量中
        while (LETTERS.test(char)) {
          value += char;
          char = input[++current];
          //console.log(value)
        }

        // 并把这种名称类型的标记存到标记数组中，继续循环
        tokens.push({ type: '名字', value });
        continue;
      }

      let JUHAO = "。";
      if (char === JUHAO) {
        //input[current].replace(JUHAO,";");// 将句号替换成分号
        tokens.push({ type: '符号', value: ";" });
        current++;
        continue;
      }

      let SIZEYUNSUAN = /[\+\*/\-]/;
      if (SIZEYUNSUAN.test(char)) {
        let value = char;
        tokens.push({ type: '符号', value });
        current++;
        continue;
      }

      throw new SyntaxError('I dont know what this character is: ' + char);
    }
    //console.log(tokens);
    return tokens;
  }
  function _toJavaScript(tokens) {
    //console.log(tokens[0].type)
    let i = -1;
    while (i < tokens.length - 1) {
      i++;
      // 判断类型，进行替换
      switch (tokens[i].type) {
        case "标签": {
          tokens[i].value = tokens[i].value.replaceAll("有", "var");
          continue;
        }
        //break;
        case "符号": {
          tokens[i].value = tokens[i].value.replaceAll("值为", "=");
          continue;
        };
        //break;
        case "字符串": {
          tokens[i].value = `"${tokens[i].value}"`;
          continue;
        }
        //break;
      }
    }
    console.log(tokens);
    return tokens.map((x) => { return x.value }).join(" ");
  }
  //console.log(_toJavaScript(tokenizer('有xyz，值为 “1235”')))
  return _toJavaScript(tokenizer(input))
}
//const es = new Script();
//es.toJavaScript(``);
export default Script;
