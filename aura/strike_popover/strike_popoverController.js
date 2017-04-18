({
    init: function (component, event, helper) {
        helper.calculateNubbinPlacement(component);
        helper.setIconDisplay(component, event, helper);
    },
    handleChangePlacement: function(component, event, helper) {
        helper.calculateNubbinPlacement(component);
        if(component.get('v.withClose') === true && component.get('v.showPopover') === true) {
            helper.showPopover(component, event, helper);
        }
    },
    handleChangeTheme: function(component, event, helper) {
        helper.setIconDisplay(component, event, helper);
    },
    handleChangeWithClose: function(component, event, helper) {
        if (component.get('v.withClose') === false) {
            helper.hidePopover(component, event, helper);
        }
    },
    handleClickClose: function(component, event, helper) {
        helper.forceHide(component, event, helper);        
    },
    handleMouseLeaveElement: function(component, event, helper) {
        helper.hidePopover(component, event, helper);
    },
    handleMouseLeaveOrBlurElement: function (component, event, helper) {
        helper.hidePopover(component, event, helper);
    },
    handleMouseLeavePopover: function(component, event, helper) {
        helper.hidePopover(component, event, helper);
    },
    handleMouseOverOrFocusElement: function (component, event, helper) {
        helper.showPopover(component, event, helper);
    },
    handleMouseOverPopover: function(component, event, helper) {
        component.set('v.preventHide', true);
    }
})