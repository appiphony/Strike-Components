({
	drawChart: function(component, helper, chartConfig) {
		var chartType = chartConfig.type;
		var chartToDraw = chartType + 'Chart';
		if(chartType === 'pie' || chartType === 'donut') chartToDraw = 'pieDonutChart';
        helper[chartToDraw](component, helper, chartConfig);
	},

	lineChart: function(component, helper, chartConfig){
        var divContainer = d3.select(component.find(chartConfig.containerAuraId).getElement());
        var chartWidth = helper.getWidth(chartConfig.containerWidth);
        var chartHeight = helper.getHeight(chartWidth);
        
        helper.addDiv(component, chartConfig.containerAuraId, 'title', chartConfig.title, chartWidth);
        
        var svg = divContainer.append('svg')
            .attr('width', chartConfig.containerWidth)
            .attr('height', helper.getHeight(chartConfig.containerWidth));

        helper.addDiv(component, chartConfig.containerAuraId, 'subtitle', chartConfig.subtitle, chartWidth);

        var xDomain = helper.addDomain(chartConfig.data, 'x');
        var yDomain = helper.addDomain(chartConfig.data, 'y');

        var xAxisDataType = chartConfig.xAxisDataType;
        var yAxisDataType = chartConfig.yAxisDataType;

        var xScale = xAxisDataType === 'number' ? d3.scaleLinear() : d3.scaleTime();
        xScale = xScale.range([0, chartWidth]).domain(xDomain);

        var yScale = yAxisDataType === 'number' ? d3.scaleLinear() : d3.scaleTime();
        yScale = yScale.range([chartHeight, 0]).domain(yDomain);


        var numberValuesFormatFunc = function (d) { return helper.abbreviateNumber(d) };
        var dateValuesFormatFunc = function (d) { return d3.timeFormat('%b %d')(d) };

        var xAxis = helper.addAxis(helper, 'bottom', xScale, 0, xAxisDataType === 'number' ? numberValuesFormatFunc : dateValuesFormatFunc);
        var yAxis = helper.addAxis(helper, 'left', yScale, 0, yAxisDataType === 'number' ? numberValuesFormatFunc : dateValuesFormatFunc);


        var g = svg.append('g').attr('transform', 'translate(' + (chartWidth * .2) + ', ' + (chartWidth * .07) + ')');

        g.append('g')
            .attr('transform', 'translate(0,' + chartHeight + ')')
            .attr('class', 'x sc-axis')
            .call(xAxis)

        g.append('g')
            .attr('class', 'y sc-axis')
            .call(yAxis)


        var shouldShowAxisLabels = helper.shouldShowAxisLabels(g, chartWidth);
        if (shouldShowAxisLabels) {
            helper.addLabel(g, 'x label', 0, chartWidth / 2, chartHeight * 1.2, chartWidth * .03,'middle', chartConfig.xAxisLabel, '#8b8b8b');
            helper.addLabel(g, 'y label', -90, -(chartWidth * .34), -(chartHeight * .22), chartWidth * .03, 'middle', chartConfig.yAxisLabel, '#8b8b8b');
        }


        var line = d3.line()
            .x(function(d) { return xScale(d.x); })
            .y(function(d) { return yScale(d.y); });

        g.append('path')
            .datum(chartConfig.data)
            .attr('class', 'sc-line')
            .attr('d', line);


        var area = d3.area()
            .x(function(d) { return xScale(d.x); })
            .y0(function(d) { return yScale(d.y); })
            .y1(chartHeight);

        g.append('path')
            .datum(chartConfig.data)
            .attr('class', 'sc-lc-area')
            .attr('d', area);


        var circles = g.selectAll('circles')
                      .data(chartConfig.data)
                      .enter()
                      .append('g');

        // Add outer circle.
        helper.addCircle(circles, function(d) { return xScale(d.x); }, function(d) { return yScale(d.y); }, 20, '', 'transparent', 'transparent', 0)
        helper.addCircle(circles, function(d) { return xScale(d.x); }, function(d) { return yScale(d.y); }, 5, '', 'white', '#00a1e0', 2)


        var focus = g.append('g').style('display', 'none');
        focus.append('line')
            .attr('id', 'focusLineX')
            .attr('class', 'sc-lc-focus-line');
        focus.append('line')
            .attr('id', 'focusLineY')
            .attr('class', 'sc-lc-focus-line');
        focus.append('circle')
            .attr('id', 'focusCircle')
            .attr('r', 5)
            .attr('class', 'sc-lc-focus-circle');

        var tooltip = helper.addDiv(component, chartConfig.containerAuraId, 'tooltip', 'tooltip', 'label');
        circles.on('mouseover', function(d) {
            focus.style('display', null); 
        });

        circles.on('mouseout', function(d) {
            tooltip.style('display', 'none');
            focus.style('display', 'none'); 

        });

        circles.on('mousemove', function(d) {
            var x = xScale(d.x);
            var y = yScale(d.y);

            focus.select('#focusCircle')
                .attr('cx', x)
                .attr('cy', y);
            focus.select('#focusLineX')
                .attr('x1', x).attr('y1', yScale(yDomain[0]))
                .attr('x2', x).attr('y2', yScale(yDomain[1]));
            focus.select('#focusLineY')
                .attr('x1', xScale(xDomain[0])).attr('y1', y)
                .attr('x2', xScale(xDomain[1])).attr('y2', y);


            var formatFirstLine = xAxisDataType === 'number' ? function (d) { return helper.abbreviateNumber(d) } : function (d) { return d3.timeFormat('%b %d')(d) };
            var formatSecondLine = yAxisDataType === 'number' ? function (d) { return helper.abbreviateNumber(d) } : function (d) { return d3.timeFormat('%b %d')(d) };

            tooltip.style('top', (d3.event.layerY + 10) + 'px').style('left', (d3.event.layerX + 10) + 'px');
            tooltip.select('.label').html(
                '<span class="sc-axis-label">' + chartConfig.xAxisLabel + ': </span><span class="sc-axis-value">' + formatFirstLine(d.x) + '</span><br/>' +
                '<span class="sc-axis-label">' + chartConfig.yAxisLabel + ': </span><span class="sc-axis-value">' + formatSecondLine(d.y) + '</span>'
            )
            tooltip.style('display', 'block');
        });

        helper.addThreshold(chartConfig.thresholdValue, chartConfig.thresholdLabel, chartWidth, yDomain, g, 0, chartWidth, yScale(chartConfig.thresholdValue), yScale(chartConfig.thresholdValue), 'end', chartWidth, yScale(chartConfig.thresholdValue), 0);
    },
    bubbleChart: function(component, helper, chartConfig){
        var data = chartConfig.data;
        var divContainer = d3.select(component.find(chartConfig.containerAuraId).getElement());
        var chartWidth = helper.getWidth(chartConfig.containerWidth);
        var chartHeight = helper.getHeight(chartWidth);
        
        helper.addDiv(component, chartConfig.containerAuraId, 'title', chartConfig.title, chartWidth);

        var svg = divContainer.append('svg')
            .attr('width', chartConfig.containerWidth)
            .attr('height', helper.getHeight(chartConfig.containerWidth));
        
        helper.addDiv(component, chartConfig.containerAuraId, 'subtitle', chartConfig.subtitle, chartWidth);

        // Circles Calculations
        var xAxisMin = d3.min(data, function(d) { return d.x; });
        var xAxisMax = d3.max(data, function(d) { return d.x; });
        var yAxisMin = d3.min(data, function(d) { return d.y; });
        var yAxisMax = d3.max(data, function(d) { return d.y; });
        
        var sizeMin = 5;
        var sizeMax = Math.max(Math.min(chartWidth, chartHeight) * .05, sizeMin);
        var dataSizeMax = 1,
            dataSizeMin = 0,
            dataXMax = 1,
            dataXMin = 0,
            dataYMax = 1,
            dataYMin = 0;

        if (data.length > 0) {
            // make sure the smaller circles don't get covered up
            data.sort(function(a, b) {
                return a.size < b.size;
            });

            dataSizeMax = data[0].size;
            dataSizeMin = data[0].size;
            dataXMax = data[0].x;
            dataXMin = data[0].x;
            dataYMax = data[0].y;
            dataYMin = data[0].y;

            for (var i = 0; i < data.length; i++) {
                dataSizeMax = Math.max(dataSizeMax, data[i].size);
                dataSizeMin = Math.min(dataSizeMin, data[i].size);
                dataXMax = Math.max(dataXMax, data[i].x);
                dataXMin = Math.min(dataXMin, data[i].x);
                dataYMax = Math.max(dataYMax, data[i].y);
                dataYMin = Math.min(dataYMin, data[i].y);
            }
        }

        dataXMax = xAxisMax;
        dataXMin = xAxisMin;
        dataYMax = yAxisMax;
        dataYMin = yAxisMin;

        dataSizeMax = dataSizeMin == dataSizeMax ? dataSizeMax + 1 : dataSizeMax;
        dataXMax = dataXMin == dataXMax ? dataXMax + 1 : dataXMax;
        dataYMax = dataYMin == dataYMax ? dataYMax + 1 : dataYMax;

        var xScaleSizeBuffer = function() {
            return Math.abs(sizeMax / chartWidth * (dataXMax - dataXMin));
        }
        var yScaleSizeBuffer = function() {
            return Math.abs(sizeMax / chartHeight * (dataYMax - dataYMin));
        }


        var xDomain = [xAxisMin - xScaleSizeBuffer() * 1.2, xAxisMax];
        var yDomain = [yAxisMin - yScaleSizeBuffer() * 1.2, yAxisMax];

        var xAxisDataType = chartConfig.xAxisDataType;
        var yAxisDataType = chartConfig.yAxisDataType;

        var xScale = xAxisDataType === 'number' ? d3.scaleLinear() : d3.scaleTime();
        xScale = xScale.range([0, chartWidth]).domain(xDomain);

        var yScale = yAxisDataType === 'number' ? d3.scaleLinear() : d3.scaleTime();
        yScale = yScale.range([chartHeight, 0]).domain(yDomain);

        var numberValuesFormatFunc = function (d) { return helper.abbreviateNumber(d) };
        var dateValuesFormatFunc = function (d) { return d3.timeFormat('%b %d')(d) };

        var xAxis = helper.addAxis(helper, 'bottom', xScale, 0, xAxisDataType === 'number' ? numberValuesFormatFunc : dateValuesFormatFunc);
        var yAxis = helper.addAxis(helper, 'left', yScale, 0, yAxisDataType === 'number' ? numberValuesFormatFunc : dateValuesFormatFunc);

        
        var g = svg.append('g').attr('transform', 'translate(' + (chartWidth * .2) + ', ' + (chartWidth * .07) + ')');

        g.append('g')
            .attr('transform', 'translate(0,' + chartHeight + ')')
            .attr('class', 'x sc-axis')
            .call(xAxis)

        g.append('g')
            .attr('class', 'y sc-axis')
            .call(yAxis)


        var shouldShowAxisLabels = helper.shouldShowAxisLabels(g, chartWidth);
        if (shouldShowAxisLabels) {
            helper.addLabel(g, 'x label', 0, chartWidth / 2, chartHeight * 1.2, chartWidth * .03,'middle', chartConfig.xAxisLabel, '#8b8b8b');
            helper.addLabel(g, 'y label', -90, -(chartWidth * .34), -(chartHeight * .22), chartWidth * .03, 'middle', chartConfig.yAxisLabel, '#8b8b8b');
        }


        var color = d3.scaleOrdinal(d3.schemeCategory10);
        var sizeScale = function(size) {
            return Math.abs(((size - dataSizeMin) / (dataSizeMax - dataSizeMin) * (sizeMax - sizeMin)) + sizeMin);
        }

        var circles = g.selectAll('circles')
            .data(data)
            .enter()
            .append('g');

        circles.append('circle')
            .attr('cx', function(d) { return xScale(d.x); })
            .attr('cy', function(d) { return yScale(d.y); })
            .attr('r', function(d) {
                return sizeScale(d.size);
            })
            .style('fill', function(d, i) {
                return d.color ? d.color : color(i);
            })
            .style('stroke', function(d, i) {
                return d.color ? d.color : color(i);
            })
            .style('stroke-width', 2)
            

        var focus = g.append('g').style('display', 'none');
        var tooltip = helper.addDiv(component, chartConfig.containerAuraId, 'tooltip', 'tooltip', 'label');
        circles.on('mouseover', function(d) {
            focus.style('display', null); 
        });

        circles.on('mouseout', function(d) {
            tooltip.style('display', 'none');
            focus.style('display', 'none'); 
        });

        circles.on('mousemove', function(d) {
            var x = xScale(d.x);
            var y = yScale(d.y);

            var formatFirstLine = xAxisDataType === 'number' ? function (d) { return helper.abbreviateNumber(d) } : function (d) { return d3.timeFormat('%b %d')(d) };
            var formatSecondLine = yAxisDataType === 'number' ? function (d) { return helper.abbreviateNumber(d) } : function (d) { return d3.timeFormat('%b %d')(d) };

            tooltip.style('top', (d3.event.layerY + 10) + 'px').style('left', (d3.event.layerX + 10) + 'px');
            tooltip.select('.label').html(
                '<span class="sc-axis-label">' + chartConfig.xAxisLabel + ': </span><span class="sc-axis-value">' + formatFirstLine(d.x) + '</span><br/>' +
                '<span class="sc-axis-label">' + chartConfig.yAxisLabel + ': </span><span class="sc-axis-value">' + formatSecondLine(d.y) + '</span>'
            )
            tooltip.style('display', 'block');
        });

        helper.addThreshold(chartConfig.thresholdValue, chartConfig.thresholdLabel, chartWidth, yDomain, g, 0, chartWidth, yScale(chartConfig.thresholdValue), yScale(chartConfig.thresholdValue), 'end', chartWidth, yScale(chartConfig.thresholdValue), 0);
    },
	barChart: function(component, helper, chartConfig){
		var isVertical = chartConfig.orientation === 'vertical'; 

		var xAxisLabel = isVertical ? chartConfig.xAxisLabel : chartConfig.yAxisLabel;
		var yAxisLabel = isVertical ? chartConfig.yAxisLabel : chartConfig.xAxisLabel;

        var divContainer = d3.select(component.find(chartConfig.containerAuraId).getElement());
        var chartWidth = helper.getWidth(chartConfig.containerWidth);
        var chartHeight = helper.getHeight(chartWidth);
        
        helper.addDiv(component, chartConfig.containerAuraId, 'title', chartConfig.title, chartWidth);
        
        var svg = divContainer.append('svg')
            .attr('width', chartConfig.containerWidth)
            .attr('height', helper.getHeight(chartConfig.containerWidth));

        helper.addDiv(component, chartConfig.containerAuraId, 'subtitle', chartConfig.subtitle, chartWidth);

		var xDomain = helper.addDomain(chartConfig.data, 'label');
        var yDomain = helper.addDomain(chartConfig.data, 'value');
		
		var horizontalXScale = d3.scaleBand().range([chartHeight, 0]).padding(0.1).domain(chartConfig.data.map(function(d) { return d.label; }));
		var horizontalYScale = d3.scaleLinear().range([0, chartWidth]).domain([d3.min(chartConfig.data, function(d) { return d.value; }) * (-1.01), d3.max(chartConfig.data, function(d) { return d.value; })]);
		var verticalXScale = d3.scaleBand().range([0, chartWidth]).padding(0.1).domain(chartConfig.data.map(function(d) { return d.label; }));
		var verticalYScale = d3.scaleLinear().range([chartHeight, 0]).domain([d3.min(chartConfig.data, function(d) { return d.value; }) * (-1.01), d3.max(chartConfig.data, function(d) { return d.value; })]);

		var xScale = isVertical ? verticalXScale : horizontalYScale;
		var yScale = isVertical ? verticalYScale : horizontalXScale;

		var valueFormatFunc = function (d) {
			var isDateOrNumber = (d instanceof Date) || (!isNaN(parseFloat(d)) && isFinite(d));
			return isDateOrNumber ? d3.timeFormat('%b %d')(d) : d;
		};
		var labelFormatFunc = function (d) { return helper.abbreviateNumber(d) };

		var horizontalXAxis = helper.addAxis(helper, 'bottom', xScale, 0, labelFormatFunc);
        var horizontalYAxis = helper.addAxis(helper, 'left', yScale, 0, valueFormatFunc);
        var verticalXAxis = helper.addAxis(helper, 'bottom', xScale, 0, valueFormatFunc);
        var verticalYAxis = helper.addAxis(helper, 'left', yScale, 0, labelFormatFunc);

  		var xAxis = isVertical ? verticalXAxis : horizontalXAxis;
        var yAxis = isVertical ? verticalYAxis : horizontalYAxis;


		var g = svg.append('g').attr('transform', 'translate(' + (chartWidth * .2) + ', ' + (chartWidth * .05) + ')');

		var barX = isVertical ? function(d) { return xScale(d.label); } : function(d) { return yScale(d.value); };
		var barY = isVertical ? function(d) { return yScale(d.value); } : function(d) { return yScale(d.label); };
		var barWidth = isVertical ? xScale.bandwidth() : function(d) { return xScale(d.value); };
		var barHeight = isVertical ? function(d) { return chartHeight - yScale(d.value); } : yScale.bandwidth();

		var bars = g.selectAll('.sc-bc-bar')
			.data(chartConfig.data)
			.enter()
			.append('rect')
			.attr('class', 'sc-bc-bar')
			.attr('x', barX)
			.attr('width', barWidth)
			.attr('y', barY)
			.attr('height', barHeight);

        var tooltip = helper.addDiv(component, chartConfig.containerAuraId, 'tooltip', 'tooltip', 'label');
        bars.on('mouseover', function(d) {

        	var xAxisValue = isVertical ? valueFormatFunc(d.label) : labelFormatFunc(d.value);
        	var yAxisValue = isVertical ? labelFormatFunc(d.value) : valueFormatFunc(d.label);

        	formatHtml(xAxisLabel, xAxisValue, yAxisLabel, yAxisValue);

        	function formatHtml(xAxisLabel, xAxisValue, yAxisLabel, yAxisValue){
        		tooltip.select('.label').html(
	            	'<span class="sc-axis-label">' + xAxisLabel + ': </span><span class="sc-axis-value">' + xAxisValue + '</span><br/>' +
	                '<span class="sc-axis-label">' + yAxisLabel + ': </span><span class="sc-axis-value">' + yAxisValue + '</span>'
	   			);
        	};
      
            tooltip.style('display', 'block');
		});

		bars.on('mouseout', function(d) {
			tooltip.style('display', 'none');
		});

		bars.on('mousemove', function(d) {
		 	tooltip.style('top', (d3.event.layerY + 10) + 'px')
				.style('left', (d3.event.layerX + 10) + 'px');
		});

		if(isVertical){
			helper.addThreshold(chartConfig.thresholdValue, chartConfig.thresholdLabel, chartWidth, yDomain, g, 0, chartWidth, yScale(chartConfig.thresholdValue), 
								yScale(chartConfig.thresholdValue), 'end', chartWidth, yScale(chartConfig.thresholdValue), 0);
		
		} else {
			helper.addThreshold(chartConfig.thresholdValue, chartConfig.thresholdLabel, chartWidth, yDomain, g, xScale(chartConfig.thresholdValue), xScale(chartConfig.thresholdValue), 
							0, chartHeight, 'start', xScale(chartConfig.thresholdValue), 0, 90);
		}

        g.append('g')
            .attr('transform', 'translate(0,' + chartHeight + ')')
            .attr('class', 'x sc-axis')
            .call(xAxis)

        g.append('g')
            .attr('class', 'y sc-axis')
            .call(yAxis)


        var shouldShowAxisLabels = helper.shouldShowAxisLabels(g, chartWidth);
        if (shouldShowAxisLabels) {
            helper.addLabel(g, 'x label', 0, chartWidth / 2, chartHeight * 1.2, chartWidth * .03,'middle', chartConfig.xAxisLabel, '#8b8b8b');
            helper.addLabel(g, 'y label', -90, -(chartWidth * .34), -(chartHeight * .22), chartWidth * .03, 'middle', chartConfig.yAxisLabel, '#8b8b8b');
        }
	},
	pieDonutChart: function(component, helper, chartConfig){
		var isDonut = chartConfig.type === 'donut';

		var total = d3.sum(chartConfig.data.map(function(d) {
			return d.value;
		}));

		var size = chartConfig.containerWidth * .6;
		var radius = size / 2;
		var colors = d3.scaleOrdinal().range(['#00a4e3', '#16325c', '#76ded9', '#08a69e', '#e2cd81', 
											  '#e49e24', '#c03a38', '#fdb665', '#63b07f', '#0d716a']);

        var divContainer = d3.select(component.find(chartConfig.containerAuraId).getElement());
        var chartWidth = helper.getWidth(chartConfig.containerWidth);
        var chartHeight = helper.getHeight(chartWidth);
        
        helper.addDiv(component, chartConfig.containerAuraId, 'title', chartConfig.title, chartWidth);

        var svg = divContainer.append('svg')
            .attr('width', chartConfig.containerWidth)
            .attr('height', helper.getHeight(chartConfig.containerWidth))
            .append('g')
            .attr('transform', 'translate(' + (size * .55) +  ',' + (size * .55) + ')');

        helper.addDiv(component, chartConfig.containerAuraId, 'subtitle', chartConfig.subtitle, chartWidth);

		var donutWidth = size * .2;
		var arc = d3.arc()
			.innerRadius(isDonut ? radius - donutWidth : 0)
			.outerRadius(radius);

		var pie = d3.pie()
				.value(function(d) { return d.value; })
				.sort(null);

        var tooltip = helper.addDiv(component, chartConfig.containerAuraId, 'tooltip', 'tooltip', 'label');
		var path = svg.selectAll('g')
			.data(pie(chartConfig.data))
			.enter()
			.append('path')
			.attr('class', 'sc-section')
			.attr('d', arc)
			.attr('fill', function(d, i) {
				return colors(d.data.label);
			});

		path.on('mouseover', function(d) {
			var percent = Math.round(1000 * d.data.value / total) / 10;
			tooltip.select('.label').html(
				'<span class="sc-axis-label">Territory: </span><span class="sc-axis-value">' + d.data.label + '</span><br/>' +
				'<span class="sc-axis-label">' + 'Sales' + ': </span><span class="sc-axis-value">' +  helper.abbreviateNumber(d.data.value) + '</span><br/>' +
				'<span class="sc-pdc-section-percent">' + percent + '% of ' + helper.abbreviateNumber(total) + '</span>');
			tooltip.style('display', 'block');
		});

		path.on('mouseout', function(d) {
			tooltip.style('display', 'none');
		});

		path.on('mousemove', function(d) {
		 	tooltip.style('top', (d3.event.layerY + 10) + 'px').style('left', (d3.event.layerX + 10) + 'px');
		});

		var legendCircleRadius = size * .027;
		var legendSpacing = size * .02;
		var legend = svg.selectAll('.sc-pdc-legend')
			.data(pie(chartConfig.data))
			.enter()
			.append('g')
			.attr('class', 'sc-pdc-legend')
			.attr('transform', function(d, i) {
				var legendRectHeight = 2 * legendCircleRadius + legendSpacing;
				var vert = (i * legendRectHeight) - 180;
				var offset =  legendRectHeight * 6 / 2;
				var horz = -2 * (2 * legendCircleRadius);
				var vert = i * legendRectHeight - (offset * .555);
				return 'translate(' + (size * .6) + ',' + vert + ')';
			});
			
		helper.addCircle(legend, size * .44, -size * .2, legendCircleRadius, '', function(d) { return colors(d.data.label); }, '', 0);
		helper.addLabel(legend, '', 0, size * .37, -size * .187, size * .04, 'end', function(d) { return d.data.label; })

        legend.on('mouseover', function(d) {
            var percent = Math.round(1000 * d.data.value / total) / 10;
            tooltip.select('.label').html(
                '<span class="sc-axis-label">Territory: </span><span class="sc-axis-value">' + d.data.label + '</span><br/>' +
                '<span class="sc-axis-label">' + 'Sales' + ': </span><span class="sc-axis-value">' +  helper.abbreviateNumber(d.data.value) + '</span><br/>' +
                '<span class="sc-pdc-section-percent">' + percent + '% of ' + helper.abbreviateNumber(total) + '</span>');
            tooltip.style('display', 'block');
        });

        legend.on('mouseout', function(d) {
            tooltip.style('display', 'none');
        });

        legend.on('mousemove', function(d) {
            tooltip.style('top', (d3.event.layerY + 10) + 'px').style('left', (d3.event.layerX + 10) + 'px');
        });

		if (isDonut) helper.addLabel(svg, '', 0, 0, (size * .07) / 2, size * .07, 'middle', helper.abbreviateNumber(total));
	},
	gaugeChart: function(component, helper, chartConfig){
        var data = chartConfig.data[0];
        var minValue = data.minValue;
        var maxValue = data.maxValue;
            
        if(minValue >= maxValue){
            var error = helper.throwError('minValue should be lower than maxValue');        
            console.log(error.stack);
        };

        var size = chartConfig.containerWidth * .9;
        var minAngle = -90;
        var maxAngle = 90;
        var range = maxAngle - minAngle;
        var arcWidth = size * .04;
        var arcInset = size * .05;
        var radius = size / 2;
        var pointerHeadLength = Math.round(radius * .65);
        var pointerWidth = size * .013;
        var pointerTailLength = size * .013;
        var arcColors = d3.scaleOrdinal().range(['#c23934', '#ffb75d', '#00716b']);

        var divContainer = d3.select(component.find(chartConfig.containerAuraId).getElement());
        var chartWidth = helper.getWidth(chartConfig.containerWidth);
        var chartHeight = helper.getHeight(chartWidth);
        
        helper.addDiv(component, chartConfig.containerAuraId, 'title', chartConfig.title, chartWidth);

        var svg = divContainer.append('svg')
            .attr('class', 'gaugeChartSVG')
            .attr('width', chartConfig.containerWidth) // push it to the right
            .attr('height', helper.getHeight(chartConfig.containerWidth))
            .append('g')
            .attr('transform', 'translate(' + (size * .0575) +  ',' + (size * .04) + ')');

        helper.addDiv(component, chartConfig.containerAuraId, 'subtitle', chartConfig.subtitle, chartWidth);

        function deg2rad(deg) {
            return deg * Math.PI / 180;
        };

        function centerTranslation() {
            return 'translate('+ radius + ',' +  radius + ')';
        };

        // a linear scale that maps domain values to a percent from minValue to maxValue
        var scale = d3.scaleLinear().range([0, 1]).domain([minValue, maxValue]);

        var sections = {
            0: chartConfig.lowLabel,
            1: chartConfig.midLabel,
            2: chartConfig.highLabel
        };
        var numberOfSections = Object.keys(sections).length;

        function percentToRange(percent, min, max) {
            var ret = ((max - min) * percent + min);
            return Math.round(ret * 100) / 100;
        }

        var ticks = [
            minValue, 
            percentToRange(.33, minValue, maxValue).toFixed(2),  
            percentToRange(.66, minValue, maxValue).toFixed(2),  
            maxValue
        ];

        var tickData = d3.range(numberOfSections).map(function() { return 1 / numberOfSections; });
        
        var arc = d3.arc()
            .innerRadius(radius - arcWidth - arcInset)
            .outerRadius(radius - arcInset)
            .startAngle(function(d, i) {
                var ratio = d * i;
                return deg2rad(minAngle + (ratio * range));
            })
            .endAngle(function(d, i) {
                var ratio = d * (i+1);
                return deg2rad(minAngle + (ratio * range));
            });

        var arcs = svg.append('g')
            .attr('class', 'arc')
            .attr('transform', centerTranslation);

        var path = arcs.selectAll('path')
            .data(tickData)
            .enter()
            .append('path')
            .attr('class', 'sc-section')
            .attr('fill', function(d, i) {
                return arcColors(d * i);
            })
            .attr('d', arc);


        var labelInset = size * .02;
        var labels = svg.append('g')
            .attr('class', 'label')
            .attr('transform', centerTranslation);

        labels.selectAll('text')
            .data(ticks)
            .enter()
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('font-size', size * .04)
            .attr('transform', function(d) {
                var ratio = scale(d);
                var newAngle = minAngle + (ratio * range);
                return 'rotate(' + newAngle +') translate(0,' + (labelInset - radius) +')';
            })
            .text(function(d){ return helper.abbreviateNumber(d)});


        var whiteTicks = svg.append('g')
            .attr('class', 'whiteTicks')
            .attr('transform', centerTranslation);

        var whiteTicksData = ticks.map(function(tick){ return tick; });
        whiteTicksData.shift(); // Remove first item
        whiteTicksData.pop(); // Remove last item

        function whiteTicksTransformFunc(d) {
            var ratio = scale(d);
            var newAngle = minAngle + (ratio * range) + .5;
            return 'rotate(' + newAngle +') translate(0,' + ( - radius + arcInset) +')';
        }
        helper.addTicks(helper, whiteTicks, 'rect', whiteTicksData, arcWidth * .2, arcWidth * 1.15, 'white', whiteTicksTransformFunc);


        var innerArcWidth = size * .08;
        var innerArcInset = size * .095;
        var innerArc = d3.arc()
            .innerRadius(radius - innerArcWidth - innerArcInset)
            .outerRadius(radius - innerArcInset)
            .startAngle(deg2rad(minAngle))
            .endAngle(deg2rad(maxAngle));

        var innerArcs = svg.append('g')
            .attr('class', 'arc777')
            .attr('transform', centerTranslation);

        innerArcs.selectAll('path')
            .data(tickData)
            .enter()
            .append('path')
            .attr('fill', '#F4F6F9')
            .attr('d', innerArc);

        
        var smallTicks = svg.append('g')
            .attr('class', 'smallTicks')
            .attr('transform', centerTranslation);

        var numOfSmallTicks = 12;
        var partition = (maxValue - minValue) / numOfSmallTicks;
        
        var smallTicksData = [];
        for (var i=0; i<=numOfSmallTicks; i++) {
            smallTicksData.push(minValue + partition * i);
        }

        function smallTicksTransformFunc(d){
            var ratio = scale(d);
            var newAngle = minAngle + (ratio * range) - .5;
            return 'rotate(' + newAngle +') translate(0,' + (-radius * .81) +')';
        }
        helper.addTicks(helper, smallTicks, 'rect', smallTicksData, innerArcWidth * .078, innerArcWidth / 2, 'lightgray', smallTicksTransformFunc);


        var lineData = [
            [pointerWidth / 2, 0],
            [0, -pointerHeadLength],
            [-(pointerWidth / 2), 0],
            [0, pointerTailLength],
            [pointerWidth / 2, 0]
        ];

        helper.addCircle(svg, radius, radius, size * .04, '', '#F4F6F9', '#E2E7EF', size * .0055);
        helper.addCircle(svg, radius, radius, size * .02, '', 'black', '', 0);

        var pointerLine = d3.line().curve(d3.curveMonotoneX);
        var pg = svg.append('g').data([lineData])
                .attr('class', 'pointer')
                .attr('transform', centerTranslation);

        var pointer = pg.append('path')
            .attr('d', pointerLine ) //function(d) { return pointerLine(d) +'Z';}
            .attr('transform', 'rotate(' + minAngle +')');


        var tooltip = helper.addDiv(component, chartConfig.containerAuraId, 'tooltip', 'tooltip', 'label');
        path.on('mouseover', function(d, i) {
            tooltip.select('.label').html('<span class="axisValue">' + sections[i] + '</span>');
            tooltip.style('display', 'block');
        });

        path.on('mouseout', function(d) {
            tooltip.style('display', 'none');
        });

        path.on('mousemove', function(d) {
            tooltip.style('top', (d3.event.layerY + 10) + 'px')
                .style('left', (d3.event.layerX + 10) + 'px');
        });

        var valueLabel = helper.addLabel(svg, 'label valueLabel', 0, radius, radius + size * .11, size * .05, 'middle', '');
        var rangeLabel = helper.addLabel(svg, 'label valueLabel', 0, radius, radius + size * .155, size * .035, 'middle', '');

        var valueRanges = [];
        ticks.forEach(function(item, index) {  
            if (!$A.util.isEmpty(ticks[index]) && !$A.util.isEmpty(ticks[index + 1])) {
                var tempArray = [];
                tempArray.push(Number(item), Number(ticks[index + 1]));  
                valueRanges.push(tempArray);
            };
        });
                

        setTimeout(function(){
            moveTheNeedle(data.value);
        }, 1500);

        function moveTheNeedle(value, newConfiguration){
            function getValueProperties(value) {
                var rangeProperties = {};
                valueRanges.forEach(function(valueRange, index){
                    if(valueRange[0] <= value && value <= valueRange[1]) {
                        rangeProperties.value = '(' + helper.abbreviateNumber(valueRange[0])  + ' to ' + helper.abbreviateNumber(valueRange[1]) + ')';
                        rangeProperties.color = arcColors((1 / valueRanges.length) * index);
                        return;
                    };
                });
                return rangeProperties;
            };

            var rangeProperties = getValueProperties(value);
            valueLabel.text(helper.abbreviateNumber(value))
                .attr('fill', rangeProperties.color);

            rangeLabel.text(rangeProperties.value)
                .attr('fill', rangeProperties.color);

            var ratio = scale(value);
            var angle = minAngle + (ratio * range);

            function tween(d, i, a) {
                return d3.interpolateString('rotate(' + minAngle  + ', 0, 0)', 'rotate(' + angle + ', 0, 0)');
            }

            var transitionMs = 4000;
            pointer.transition()
                .duration(transitionMs)
                .ease(d3.easeElasticOut)
                .attrTween('transform', tween);
        };
    },
	

    getWidth: function(basedOnWidth){
        return basedOnWidth * .75;
    },
    getHeight: function(basedOnWidth){
        return basedOnWidth * .66;
    },
    shouldShowAxisLabels: function(parent, chartWidth){
        var xAxisLabels = d3.selectAll('g .x text');
        var numberOfXAxisTicks = xAxisLabels.size();
        var widestXAxisLabel = 0;
        xAxisLabels.each(function() {
            widestXAxisLabel = Math.max(widestXAxisLabel, this.clientWidth);
        });

        var shouldRotateXAxisLabels = ((widestXAxisLabel + 8) * numberOfXAxisTicks) > chartWidth;
        if(shouldRotateXAxisLabels){
            parent.selectAll('.x text')
                .style('text-anchor', 'end')
                .attr('dx', '-.8em')
                .attr('dy', '-.55em')
                .attr('transform', function(){
                    return 'translate(' + (0) + ',' + (0) +') ' + 'rotate(-90)';
                })
        }

        var yAxisLabels = d3.selectAll('g .y text');
        var widestYAxisLabel = 0;
        yAxisLabels.each(function() {
            widestYAxisLabel = Math.max(widestYAxisLabel, this.clientWidth);
        });

        var shouldHideYAxisLabels = widestYAxisLabel > chartWidth * .1;

        return (chartWidth > 280 && (!shouldRotateXAxisLabels && !shouldHideYAxisLabels)) 
    },
	addCircle: function(parent, circleX, circleY, radius, cssClass, fill, stroke, strokeWidth){	
		parent.append('circle')
            .attr('cx', circleX)
            .attr('cy', circleY)
            .attr('r', radius)
            .attr('class', cssClass)
            .style('fill', fill)
            .style('stroke', stroke)
            .style('stroke-width', strokeWidth);
	},
	addTicks: function(helper, ticks, shape, data, chartWidth, chartHeight, fill, transformFunc){
		ticks.selectAll(shape)
			.data(data)
			.enter()
			.append('rect')
			.attr('width', chartWidth)
			.attr('height', chartHeight)
			.style('fill', fill)
			.attr('transform', transformFunc)
			.text(function(d){ return helper.abbreviateNumber(d)});
	},
	addLabel: function(parent, cssClass, rotation, x, y, fontSize, textAnchor, label, fill){
		var label = parent.append('text')
	    	.attr('class', cssClass)
	        .attr('text-anchor', textAnchor)
			.attr('transform', 'rotate(' + rotation + ')')
	        .attr('x', x)
	        .attr('y', y)
	        .attr('font-size', fontSize)
	        .attr('dy', '0em')
	        .text(label);

        if(fill !== undefined) label.attr('fill', fill); 
	    return label;
	},
    addDiv: function(component, containerAuraId, type, label, chartWidth){
        var div = d3.select(component.find(containerAuraId).getElement()).append('div');
        
        if(type === 'tooltip'){
            div.attr('class', 'sc-tooltip')
            div.append('div').attr('class', 'label');
        
        } else if (type === 'title'){
            div.attr('class', 'slds-p-bottom--small slds-text-align--left slds-text-body--small  slds-p-left--small')
                .style('font-size', chartWidth * .0376 + 'px')
                .html(label);

        } else if(type === 'subtitle'){
            div.attr('class', 'slds-p-top--small slds-text-align--right slds-text-body--small  slds-p-right--small') 
                .style('font-size', chartWidth * .0376 + 'px')
                .html(label);
        }
        return div;
    },
	addThreshold: function(thresholdValue, thresholdLabel, chartWidth, domain, parent, lineX1, lineX2, lineY1, lineY2, textAnchor, textX, textY, rotateAngle){
		if(thresholdValue && domain[0] <= thresholdValue && domain[1] >= thresholdValue) {
            parent.append('line')
                .attr('x1', lineX1)
                .attr('y1', lineY1)
                .attr('x2', lineX2)
                .attr('y2', lineY2)
                .attr('class', 'sc-threshold-line');
            parent.append('text')
                .attr('dy', '-.4em')
                .attr('text-anchor', textAnchor)
                .attr('font-size', chartWidth * .025)
                .text(thresholdLabel)
				.attr('transform', 'translate(' + textX + ', ' + textY + ') rotate(' + rotateAngle + ')')
                .attr('class', 'sc-threshold-text')
        }
	},
    addDomain: function(data, axis) {
		return d3.extent(data, function(d) { return d[axis]; })
	},
	addAxis: function(helper, orientation, scale, tickSizeOuter, tickFormat) {
    	if(orientation === 'bottom'){
			return d3.axisBottom().scale(scale).tickSizeOuter(tickSizeOuter).tickFormat(tickFormat);
			
		} else if(orientation === 'left'){
			return d3.axisLeft().scale(scale).tickSizeOuter(tickSizeOuter).tickFormat(tickFormat);
		}
    },
	abbreviateNumber: function(amount){
        amount = Number(amount);

        if ((Math.abs(amount) / Math.pow(10, 12)) >= 1) {
            return parseFloat((amount / Math.pow(10, 12)).toFixed(1)) + 'T';
        
        } else if ((Math.abs(amount) / Math.pow(10, 9)) >= 1) {
            return parseFloat((amount / Math.pow(10, 9)).toFixed(1)) + 'B';
        
        } else if ((Math.abs(amount) / Math.pow(10, 6)) >= 1) {
            return parseFloat((amount / Math.pow(10, 6)).toFixed(1)) + 'M';
        
        } else if ((Math.abs(amount) / Math.pow(10, 3)) >= 1) { 
            return parseFloat((amount / Math.pow(10, 3)).toFixed(2)) + 'K';
        }
        return parseFloat(amount.toFixed(2));
    },
    throwError: function(errorMessage){
        function ErrorMessage() {
            var temp = Error.apply(this, arguments);
            temp.name = this.name = 'Error Message';
            this.message = temp.message;
            if(Object.defineProperty) {
                /*this.stack = */Object.defineProperty(this, 'stack', { 
                    get: function() {
                        return temp.stack
                    },
                    configurable: true
                })
            } else {
                this.stack = temp.stack
            }
        }

        //inherit prototype using ECMAScript 5 (IE 9+)
        ErrorMessage.prototype = Object.create(Error.prototype, {
            constructor: {
                value: ErrorMessage,
                writable: true,
                configurable: true
            }
        });

        return new ErrorMessage(errorMessage);
    }
})