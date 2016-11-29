({
	onInit : function(component, event, helper) {
        component.set('v.triggerRedraw', !component.get('v.triggerRedraw'))

        window.addEventListener('resize', function(){
            component.set('v.triggerRedraw', !component.get('v.triggerRedraw'));
        }, true);
	}
})