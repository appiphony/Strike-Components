({
    afterRender: function(component, helper) {
        helper.setContainerWidth(component, helper);
        this.superAfterRender();
    }
})