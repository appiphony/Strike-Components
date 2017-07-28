({
    format: function(component, event, helper) {
    	
    	

        var value = component.get('v.value');
        var valueData = [];
        try {
            var placeholders = value.split(/(\{.+?\})/);
            var values = helper.getValues(component, event, helper);

            placeholders.forEach(function(placeholder) {
                var data = {};
                var placeholderMatch;

                if (placeholderMatch = placeholder.match(/\{(.+)\}/)) {
                    var placeholderData = placeholderMatch[1].split(',');

                    try {
                        data.value = values[parseInt(placeholderData[0].trim())];

                        if (placeholderData.length > 1) {
                            data.type = placeholderData[1].toLowerCase().trim();

                            if (placeholderData.length > 2) {

                                data.format = placeholderData.slice(2).join(',').trim();
                            }
                        }
                    } catch (e) {
                    	
                        data.value = placeholder;
                    }
                } else {
                	
                    data.value = placeholder;
                }

                valueData.push(data);
            });
        } catch (e) {
            if (typeof value !== 'undefined' && value !== null){
       
            	valueData.push({
            		value: value
            	});
            }
        }

        component.set('v.valueData', valueData);
    },
    getValues: function(component, event, helper) {
        var values = [];

        component.get('v.body').forEach(function(child) {
        	

            if (child.isValid()) {
                if (child.toString().match(/(.*)\b:strike_param\b(.*)/)) {
                    values.push(child.get('v.value'));
                } else {
                    values = values.concat(helper.getValues(child, event, helper));
                }
            }
        });

        return values;
    }
})
