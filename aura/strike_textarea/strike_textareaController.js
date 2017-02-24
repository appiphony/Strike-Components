({
    onInit: function(component, event, helper) {
        helper.setHeight(component,event,helper);

		var randomNumber = Math.floor(1000 + Math.random() * 9000);

		component.set('v.idNumber', randomNumber);
    },
    sizeChanged: function(component,event,helper){

        helper.setHeight(component,event,helper);
    }
})