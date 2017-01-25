(function () {
    var svg = d3.select("#contaner");
    var svgBox = {
        width: 500,
        height: 400,
        padding: {
            top: 20,
            right: 20,
            bottom: 20,
            left: 50
        }
    };

    //数据
    var dataset = [
        [0, 1998],
        [0.2, 3200],
        [0.25, 4100],
        [0.4, 7000],
        [0.6, 9000],
        [0.8, 9900],
        [1.0, 10000]
    ];
    //var dataset = [1998, 3200, 7000, 9000, 9900, 10000];
    
    //设置比例尺
    var scale_x = d3.scale.linear().domain([0, 1.0]).range([0, svgBox.width - svgBox.padding.left - svgBox.padding.right]);
    var scale_y = d3.scale.linear().domain([0, 10000]).range([svgBox.height - svgBox.padding.top - svgBox.padding.bottom, 0]);

    //绘制曲线
    var line_generator = d3.svg.line()
        .x(function (d, i) {
            return scale_x(d[0]);
        })
        .y(function (d, i) {
            return scale_y(d[1]);
        })
        .interpolate("basis");

    //添加曲线图形
    svg.append("g").attr("class", "curve").attr("transform", "translate(" + svgBox.padding.left + "," + svgBox.padding.top + ")");
    d3.select("g").append("path").attr("d", line_generator(dataset));

    //添加坐标轴图形
    var axis_x = d3.svg.axis().scale(scale_x).orient("bottom").ticks(6);
    var axis_y = d3.svg.axis().scale(scale_y).orient("left").ticks(6);
    svg.append("g").call(axis_x).attr("class", "axis").attr("transform", "translate(" + svgBox.padding.left + "," + (svgBox.height - svgBox.padding.bottom) + ")");
    svg.append("g").call(axis_y).attr("class", "axis").attr("transform", "translate(" + svgBox.padding.left + "," + svgBox.padding.top + ")");
})();