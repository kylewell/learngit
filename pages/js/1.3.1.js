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
        [0, 55],
        [1 / 6, 65],
        [2 / 6, 75],
        [3 / 6, 80],
        [4 / 6, 75],
        [5 / 6, 65],
        [1, 55]
    ];
    //var dataset = [1998, 3200, 7000, 9000, 9900, 10000];

    //设置比例尺
    var scale_x = d3.scale.linear().domain([0, 1.0]).rangeRound([0, svgBox.width - svgBox.padding.left - svgBox.padding.right]);
    var scale_y = d3.scale.linear().domain([0, 120]).range([svgBox.height - svgBox.padding.top - svgBox.padding.bottom, 0]);

    //绘制曲线
    var line_generator = d3.svg.line()
        .x(function (d, i) {
            return scale_x(d[0]);
        })
        .y(function (d, i) {
            return Math.round(scale_y(d[1]));
        })
        .interpolate("cardinal");

    //添加曲线图形
    svg.append("g").attr("class", "curve").attr("transform", "translate(" + svgBox.padding.left + "," + svgBox.padding.top + ")");
    d3.select("g").append("path").attr("d", line_generator(dataset));

    //添加坐标轴图形
    var axis_x = d3.svg.axis().scale(scale_x).orient("bottom").ticks(7);
    var axis_y = d3.svg.axis().scale(scale_y).orient("left").ticks(7);
    svg.append("g").call(axis_x).attr("class", "axis").attr("transform", "translate(" + svgBox.padding.left + "," + (svgBox.height - svgBox.padding.bottom) + ")");
    svg.append("g").call(axis_y).attr("class", "axis").attr("transform", "translate(" + svgBox.padding.left + "," + svgBox.padding.top + ")");

    //添加圆点
    var drag = false;
    var activeCircle = null;
    var mouseX = 0,
        mouseY = 0;
    var circles = svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", function (d, i) {
            return scale_x(d[0]);
        })
        .attr("cy", function (d, i) {
            return Math.round(scale_y(d[1]));
        })
        .attr("r", 5)
        .attr("transform", "translate(" + svgBox.padding.left + "," + svgBox.padding.top + ")")
        .style("position", "absolute")
        .on("mousedown", function () {
            drag = true;
            activeCircle = d3.select(this);
        })
        .on("mouseup", function () {
            drag = false;
            activeCircle = null;
        })
        .on("mousemove", function (d, i) {
            if (drag && activeCircle) {
                mouseX = d3.event.offsetX;
                mouseY = d3.event.offsetY;
                if (mouseX < 0) {
                    mouseX = 0
                }
                if (mouseY < 0) {
                    mouseY = 0
                }

                var currentY = mouseY - svgBox.padding.top;
                dataset[i][1] = scale_y.invert(currentY);
                activeCircle.attr("cy", currentY);
                d3.select(".curve").select("path").attr("d", line_generator(dataset));
            }

            return false;
        });
})();