let searchText = document.querySelector(".searchText");

searchText.addEventListener("input", debounce(test, 500, false));

function debounce(func, wait, immediate) {
    let timeout;
    return function () {
        let context = this;
        let args = arguments;
        if (timeout) clearTimeout(timeout); // timeout 不为null
        if (immediate) {
            let callNow = !timeout; // 第一次会立即执行，以后只有事件执行后才会再次触发\
            timeout = setTimeout(() => {
                timeout = null;
            }, wait);
            if (callNow) {
                func.apply(context, args);
            }
        } else {
            timeout = setTimeout(function () {
                func.apply(context, args);
            }, wait);
        }
    };
}

function test() {
    console.log(1);
}
