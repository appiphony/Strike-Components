({
    init: function(component, event, helper){
        component._closeModal = $A.getCallback(function(e){
            var ESCAPE_KEY = 27;

            if(!component.isValid()){
                window.removeEventListener('keyup', component._closeModal);
            } else if(e.keyCode == ESCAPE_KEY && component.get('v.showingModal') == true){
                helper.hide(component, event, helper);
            }
        });

        var randomId = Math.floor(Math.random() * 100000000);
        component.set('v.modalHeaderId', randomId);

        component.set('v.showingModal', component.get('v.showModal'));
        component.set('v.fadeIn', component.get('v.showModal'));
    },
    show: function(component, event, helper){
        helper.show(component, event, helper);
    },
    hide: function(component, event, helper) {
        helper.hide(component, event, helper);
    },
    determineModalState: function(component, event, helper){
        var showModal = component.get('v.showModal');
        var showingModal = component.get('v.showingModal');
        showModal ? helper.show(component, event, helper) : helper.hide(component, event, helper);
    },
    clickedPrimary: function(component, event, helper) {
        var primaryClicked = component.getEvent('strike_evt_modalPrimaryButtonClicked');
        primaryClicked.fire();
    }
})
