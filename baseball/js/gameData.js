// 태그를 생성하는 함수


function makeTag(tagName, text = '') {
    const $newTag = document.createElement(tagName);
    if (text) $newTag.textContent = text;
    return $newTag;
}


function appendNewTag($parent, $target) {
    $parent.appendChild($target);
}


function inputTat({
    $parent,
    tagName,
    text
}) {
    appendNewTag($parent, makeTag(tagName, text));
}


