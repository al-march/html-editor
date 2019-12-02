const cheerio = require('cheerio')
const he = require('he')

class TextExporter {

  init(html) {
    const self = this;
    const $ = cheerio.load(html);
    let count = 0
    let allWorlds = $('body').text().replace(/[\s\t ]{2,}/g, ' ').toLowerCase().split('');
    let alphabet = [... new Set(allWorlds)].toString().split(',').join('').replace(/[!@#%-/–_=+,<>?/'";:{}\[\]\.\(\)\*\&\^\$]*/g, '');

    allText($("body")[0])
    function allText(html) {
      $(html.children).each(function () {
        if ($(this)[0].type == "text") {
          let text = $(this).text().match(/\S+(.|\n)+\S+/);
          text ? text = text[0] : text = "";
          count++
          if (text && count % 5 == 0) {
            const strArr = text.split(' ')
            strArr.splice(2, 0, `<span style='display: none' class="blabla__text">${self.str_random(alphabet)}</span>`)
            let newStr = strArr.join(' ')
            $(this).replaceWith(newStr);
          }
        } else {
          allText($(this)[0])
        }
      })
    }
    return he.decode($.html())
  }
  // генерация случайного текста
  str_random(alphabet) {

    const random = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min
    }

    let result = '';
    let words = alphabet;
    let max_position = words.length - 1;

    let j = 0;
    while (j < random(8, 12)) {
      let world = ''
      for (let i = 0; i < random(5, 7); ++i) {
        let position = Math.floor(Math.random() * max_position);
        world = world + words.substring(position, position + 1);
      }
      result += " " + world
      j++
    }
    return result;
  }

}
module.exports = TextExporter;