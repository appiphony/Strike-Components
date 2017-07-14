({
	onInit: function(component, event, helper) {
		var fields = component.get('v.fields');

		fields.forEach(function(field, index) {
			if (field.dataType == 'COMPONENT') {
				var type = field.value.type;
				var attributes = field.value.attributes;

                $A.createComponent(type, attributes, function(newCmp, status, errorMessage) {
					if (status === 'SUCCESS') {
						var valueOutput = component.find('value-output')[index];
                        valueOutput.set('v.body', newCmp);
                    }
				});
			}
		});
	}
})
