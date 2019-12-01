const cheerio = require('cheerio')

class TextExporter {
  init(html) {
    const $ = cheerio.load(html);
    let strings = [];
    let count = 0;
    allText($("html")[0])
    function allText(html) {
      // текст
      $(html.children).each(function () {
        if ($(this)[0].type == "text") {
          let text = $(this).text().match(/\S+(.|\n)+\S+/);
          text ? text = text[0] : text = "";
          const wrap = $(`<span data-count="${count}"></span>`);
          if (text) {
            $(this).replaceWith(wrap);
            strings.push(text.replace(/[\s\t ]{2,}/g, ' '))
            count++;
          }
        } else {
          allText($(this)[0])
        }
      })

    }
    // плейсхолдеры
    $('[placeholder]').each(function () {
      let placeholderName = $(this).attr('placeholder');
      $(this).attr('data-placeholder', count)
      $(this).attr('data-placeholder-translate', placeholderName)
      strings.push(placeholderName)
      count++;
    })
    // description
    let description = $('[name="description"]');
    if (description.attr('content')) {
      description.attr('data-description-index', count);
      description.attr('data-description', description.attr('content'));
      strings.push(description.attr('content'))
      count++
    }
    return {html: strings}
  }
}
module.exports = TextExporter;