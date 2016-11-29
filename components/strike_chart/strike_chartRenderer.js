({
	render : function(component, helper) {
	    var ret = this.superRender();
	    return ret;
	},
	rerender : function(component, helper){
	    var ret = this.superRerender();

	    var chartConfig = {
            containerAuraId: 'chart',
            containerWidth: component.find('chartContainer').getElement().clientWidth,
            
            type: component.get('v.type'),
            data: component.get('v.data'),
            title: component.get('v.title'),
            subtitle: component.get('v.subtitle'),

			// LINE CHART SPECIFIC ATTRIBUTES
            xAxisLabel: component.get('v.xAxisLabel'),
            yAxisLabel: component.get('v.yAxisLabel'),
            xAxisDataType: component.get('v.xAxisDataType'),
            yAxisDataType: component.get('v.yAxisDataType'),
            thresholdValue: component.get('v.thresholdValue'),  

			// BAR CHART SPECIFIC ATTRIBUTES
			orientation: component.get('v.orientation'),

			// GAUGE CHART SPECIFIC ATTRIBUTES
            lowLabel: component.get('v.lowLabel'),
          	midLabel: component.get('v.midLabel'),
            highLabel: component.get('v.highLabel') 
        };

        // Format Threshold label based on data type and value
        var formattedThresholdLabel = '';
        if(component.get('v.type') === 'bar' || component.get('v.yAxisDataType') === 'number'){
        	formattedThresholdLabel = component.get('v.thresholdLabel') + ' (' + helper.abbreviateNumber(component.get('v.thresholdValue')) + ')';
        
        } else {
        	formattedThresholdLabel = component.get('v.thresholdLabel') + ' (' + d3.timeFormat('%b %d')(component.get('v.thresholdValue')) + ')';
        } 
        chartConfig.thresholdLabel = formattedThresholdLabel;


	    var chartDiv = component.find('chart').getElement();
        chartDiv.innerHTML = '';
        chartConfig.containerWidth = component.find('chartContainer').getElement().clientWidth;
		helper.drawChart(component, helper, chartConfig);

		return ret;
	},
	afterRender: function (component, helper) {
	    this.superAfterRender();
	},
	unrender: function () {
	    this.superUnrender();
	}
})