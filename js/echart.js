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
