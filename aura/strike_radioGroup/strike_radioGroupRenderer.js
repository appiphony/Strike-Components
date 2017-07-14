({
	// Your renderer method overrides go here
    afterRender: function(component, helper) {
        this.superAfterRender();

    	helper.selectRadioButtonFromValue(component, helper);
    }
})