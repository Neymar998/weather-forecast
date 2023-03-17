let location_id = 101010100; //默认为北京
let nowCityName = "北京市";
const keyWith = "&key=66defedca8cc4336bdc0f25c8a5176ea"; //和风接口私人专属key
const key = "66defedca8cc4336bdc0f25c8a5176ea";
// 输入汉字等到位置的id
const fromNametoId = "https://geoapi.qweather.com/v2/city/lookup?";

// 获得中国排名前五的热门城市
// https://geoapi.qweather.com/v2/city/top?number=5&range=cn
const hotCity = "https://geoapi.qweather.com/v2/city/top?";

//获得逐小时天气预报
const getHourlyWeather =
    "https://devapi.qweather.com/v7/weather/24h?location=101010100";

//获得某个地方的七天天气
const getDailyWeather =
    "https://devapi.qweather.com/v7/weather/7d?location=101010100";

//空气质量 ：优良中。。。
const airQuality = "https://devapi.qweather.com/v7/air/5d?";

//天气指数 :最下面的生活类型以及等级
const weatherExponent = "https://devapi.qweather.com/v7/indices/1d?type=0";

let btn = document.getElementsByClassName("search_btn")[0];
let back = document.getElementsByClassName("iconBack")[0];
let inputText = document.querySelector(".searchText");
let topCityList = [];
//一周五天的最高温最低温数组
let hightWeaWeek = [];
let lowWeaWeek = [];
let airQualityList = [];
let searchHistoryCity = [];

function btnonclick() {
    document.getElementsByClassName("topShow")[0].classList.add("hide");
    document.querySelector(".searchPage").classList.remove("hide");
}

function backonclick() {
    document.getElementsByClassName("topShow")[0].classList.remove("hide");
    document.querySelector(".searchPage").classList.add("hide");
    document.getElementById("city").innerHTML = nowCityName;
}

function all() {
    getAirQuality();
    getWeatherExponenteDaily();
    showWeekWeather();
    showTipinfo();
}
all();
//将日期转换为星期几
function toWeekDay(fxDate) {
    let datelist = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    return datelist[new Date(fxDate).getDay()];
}
//空气质量
function getAirQuality() {
    axios
        .get(`${airQuality}`, {
            params: {
                location: location_id,
                key,
            },
        })
        .then(function (response) {
            airQualityList = response.data.daily;
            let rank = document.querySelectorAll(".rank");
            for (let i = 0; i < airQualityList.length; i++) {
                if (i < 2) {
                    let daysInfoLevel =
                        document.querySelectorAll(".days--info__level");
                    daysInfoLevel[i].classList.add(
                        `level-${airQualityList[i].level}`
                    );
                }
                rank[i].firstElementChild.classList.add(
                    `level-${airQualityList[i].level}`
                );
            }
        });
}

//发送请求得到热门城市列表
function getHotCity() {
    axios
        .get(`${hotCity}`, {
            params: {
                number: 7,
                range: "cn",
                key,
            },
        })
        .then(function (response) {
            topCityList = response.data.topCityList;
            for (let i = 0; i < topCityList.length; i++) {
                let div = document.createElement("div");
                document.querySelector(".hotCity").append(div);
                div.classList.add("cityFrame");
                div.innerHTML = topCityList[i].name;
            }
        });
}
getHotCity();
//发送请求得到主要的实时温度以及湿度风速（main）
function showTipinfo() {
    axios
        .get("https://devapi.qweather.com/v7/weather/24h?", {
            params: {
                location: location_id,
                key,
            },
        })
        .then(function (response) {
            let responseText = response.data.hourly[0];
            document.querySelector(".info__wea").innerHTML = responseText.text;
            document.querySelector(".info__about--temperature").innerHTML =
                responseText.temp;
            document.querySelector(".info__about--detail").innerHTML = `${
                responseText.windDir
            }${responseText.windScale.slice(0, 1)}级 湿度${
                responseText.humidity
            }%`;
        })
        .catch(function (error) {
            console.log(error);
        });
}

//发送请求得到一周的天气情况
function showWeekWeather() {
    axios
        .get("https://devapi.qweather.com/v7/weather/7d?", {
            params: {
                location: location_id,
                key,
            },
        })
        .then(function (response) {
            let weekWeatherDaily = response.data.daily;
            let iconDay = document.querySelectorAll(".iconDay");
            let iconNight = document.querySelectorAll(".iconNight");
            let textDay = document.querySelectorAll(".textDay");
            let textNight = document.querySelectorAll(".textNight");
            let windDirNight = document.querySelectorAll(".windDirNight");
            let windScaleNight = document.querySelectorAll(".windScaleNight");
            let date = document.querySelectorAll(".date");
            let daysTmp = document.querySelectorAll(".days--temperature");
            let daysWeaText = document.querySelectorAll(".days--weatext");
            let daysIcon = document.querySelectorAll(".days--wealogo");
            //更新一周的天气情况
            hightWeaWeek = [];
            lowWeaWeek = [];
            for (let i = 0; i < iconDay.length; i++) {
                if (i < 2) {
                    daysWeaText[i].innerHTML = weekWeatherDaily[i].textDay;
                    daysTmp[
                        i
                    ].innerHTML = `${weekWeatherDaily[i].tempMin} / ${weekWeatherDaily[i].tempMax}°`;
                    daysIcon[i].innerHTML = "";
                    daysIcon[i].classList.add(
                        `qi-${weekWeatherDaily[i].iconDay}-fill`
                    );
                }
                hightWeaWeek.push(Number(weekWeatherDaily[i].tempMax));
                lowWeaWeek.push(Number(weekWeatherDaily[i].tempMin));

                date[i].innerHTML = toWeekDay(weekWeatherDaily[i].fxDate);
                iconDay[i].classList.add(
                    `qi-${weekWeatherDaily[i].iconDay}-fill`
                );
                iconNight[i].classList.add(
                    `qi-${weekWeatherDaily[i].iconNight}-fill`
                );
                textDay[i].innerHTML = weekWeatherDaily[i].textDay;
                textNight[i].innerHTML = weekWeatherDaily[i].textNight;
                windDirNight[i].innerHTML = weekWeatherDaily[i].windDirNight;
                windScaleNight[i].innerHTML = weekWeatherDaily[
                    i
                ].windScaleNight.slice(0, 1);
            }

            var myChart = echarts.init(document.getElementById("main"));
            // 指定图表的配置项和数据
            var option = {
                xAxis: {
                    type: "category",
                    data: [],
                    show: false, //坐标
                    splitLine: {
                        //网格
                        show: false,
                    },
                },
                yAxis: {
                    type: "value",
                    show: false,
                    splitLine: {
                        show: false,
                    },
                    max: Math.max(hightWeaWeek),
                    min: Math.min(lowWeaWeek),
                    splitNumber: Math.max(hightWeaWeek) - Math.min(lowWeaWeek), //分成好多格
                },
                series: [
                    {
                        data: [...hightWeaWeek],
                        type: "line",
                        itemStyle: {
                            //点的颜色
                            color: "white",
                        },
                        label: {
                            show: true,
                            position: "top",
                            textStyle: {
                                fontSize: 15,
                                textShadowBlur: 0,
                            },
                            opacity: 0.8,
                        },
                        lineStyle: {
                            normal: {
                                color: "white",
                                width: 1,
                                // type: "dashed",
                            },
                        },
                    },
                    {
                        data: [...lowWeaWeek],
                        type: "line",
                        itemStyle: {
                            color: "white",
                        },
                        label: {
                            show: true,
                            position: "bottom",
                            textStyle: {
                                fontSize: 15,
                                textShadowBlur: 0,
                            },
                            opacity: 0.8,
                        },
                        lineStyle: {
                            normal: {
                                color: "white",
                                width: 1,
                                // type: "dashed",
                            },
                        },
                    },
                ],
                grid: {
                    top: "25px",
                    left: "0px",
                    right: "0px",
                    bottom: "25px",
                },
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        });
}

// (function () {
//     const xhr = new XMLHttpRequest();
//     xhr.open("GET", `${getWeather}${key}`);
//     xhr.send();
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState == 4) {
//             if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
//                 defaultinfo = JSON.parse(xhr.responseText);
//                 console.log(defaultinfo.daily[0]);
//             }
//         }
//     };
// })();
function getWeatherExponenteDaily() {
    const xhr = new XMLHttpRequest();
    xhr.open("get", `${weatherExponent}&location=${location_id}${keyWith}`);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                let weatherExponentDaily = JSON.parse(xhr.responseText).daily;
                let liList = document.querySelectorAll(".exponent__ul > li");
                for (let i = 0; i < liList.length; i++) {
                    document.querySelectorAll(".daily__name")[i].innerText =
                        weatherExponentDaily[i].name;
                    document.querySelectorAll(".daily__category")[i].innerText =
                        weatherExponentDaily[i].category;
                }
            }
        }
    };
}

let inputValue = document.querySelector(".searchText");
//搜索框搜索城市得到id
function searchCtiy() {
    axios
        .get(`${fromNametoId}`, {
            params: {
                location: inputValue.value,
                key,
            },
        })
        .then(function (response) {
            //当搜索框没有值时，显示page页面，有值时才显示搜索结果
            if (inputValue.value != "") {
                document.querySelector(".searchhide").classList.add("hide");
                document.querySelector(".searchshow").classList.remove("hide");
            } else {
                document.querySelector(".searchhide").classList.remove("hide");
                document.querySelector(".searchshow").classList.add("hide");
            }
            //fuzzySearch为input框模糊搜索返回的结果
            fuzzySearch = response.data.location;
            if (fuzzySearch) {
                //每次搜索结果都删除上一次的结果
                document.querySelector(".fordelete").remove();
                //重新建立dom
                let fordelete = document.createElement("div");
                fordelete.classList.add("fordelete");
                document.querySelector(".fuzzySearch1").append(fordelete);
                for (let i = 0; i < fuzzySearch.length; i++) {
                    let div = document.createElement("div");
                    div.classList.add("fuzzySearchResult");
                    div.setAttribute("data-location", fuzzySearch[i].id);
                    div.innerHTML = fuzzySearch[i].name;
                    fordelete.append(div);
                }
                fordelete.onclick = function (e) {
                    nowCityName = e.target.innerHTML;
                    location_id = e.target.getAttribute("data-location");
                    inputValue.value = "";
                    all();
                    backonclick();
                    document
                        .querySelector(".searchhide")
                        .classList.remove("hide");
                    document.querySelector(".searchshow").classList.add("hide");
                    searchHistoryCity.push(nowCityName);
                };
            }
        });
}
//搜索城市Enter事件
// inputText.addEventListener("keydown", function (event) {
//     if (event.key == "Enter") {
//         console.log("enter trigger");
//     }
// });

let searchText = document.querySelector(".searchText");

searchText.addEventListener("input", debounce(searchCtiy, 500, false));
//input框模糊搜索防抖
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
