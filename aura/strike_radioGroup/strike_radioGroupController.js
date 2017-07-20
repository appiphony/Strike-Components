({
    onInit: function(component, event, helper) {
        helper.selectRadioButtonFromValue(component, event, helper);
    },
	handleClickRadio : function(component, event, helper) {
        var checkedRadioButton = event.getSource();
        var value = checkedRadioButton.get('v.value');
        component.set('v.value', value);
	}
})