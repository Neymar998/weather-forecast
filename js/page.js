let btn = document.getElementsByClassName("search_btn")[0];
let back = document.getElementsByClassName("iconBack")[0];
let inputText = document.querySelector(".searchText");

btn.onclick = function () {
    document.getElementsByClassName("topShow")[0].classList.add("hide");
    document.querySelector(".searchPage").classList.remove("hide");
    // getHotCity();
};

back.onclick = function () {
    document.getElementsByClassName("topShow")[0].classList.remove("hide");
    document.querySelector(".searchPage").classList.add("hide");
};

//搜索城市Enter事件
inputText.addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
    }
});
