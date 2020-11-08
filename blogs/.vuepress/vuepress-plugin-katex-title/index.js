var katex = require('katex');
const { JSDOM } = require("jsdom");
const renderMathInElement = require("./utils");

function renderKatex(text) {
    let { document } = (new JSDOM("<!DOCTYPE html><p>" + text + "</p>")).window;
    let el = document.querySelector("p");
    renderMathInElement(document.body, {
        delimiters:
            [{ left: "$", right: "$", display: false },
            { left: "$$", right: "$$", display: true },]
    });
    return el.textContent;
}

module.exports = {
    extendPageData($page) {
        while (renderMathInElement === null);
        if (typeof $page.headers !== "object") return;
        for (let i in $page.headers)
            $page.headers[i].renderred_title = renderKatex($page.headers[i].title);
        if ($page.title !== undefined)
            $page.renderred_title = renderKatex($page.title);
    }
}