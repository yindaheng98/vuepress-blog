var katex = require('katex');
const { JSDOM } = require("jsdom");
const renderMathInElement = require("./utils");

module.exports = {
    extendPageData($page) {
        while (renderMathInElement === null);
        if (typeof $page.headers !== "object") return;
        for (let i in $page.headers) {
            let h = $page.headers[i];
            let { document } = (new JSDOM("<!DOCTYPE html><p>" + h.title + "</p>")).window;
            let el = document.querySelector("p");
            renderMathInElement(document.body, {
                delimiters:
                    [{ left: "$", right: "$", display: false },
                    { left: "$$", right: "$$", display: true },]
            });
            $page.headers[i].title = el.textContent;
        }
    }
}