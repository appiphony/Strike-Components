({
	init : function(component, event, helper) {
        var action = component.get('c.determineIfOwned');
        action.setParams({
            recordId: component.get('v.recordId')
        });
        
        action.setCallback(this, function(response){
            var isOwner = response.getReturnValue(); 
            console.log('********** made it back ' + isOwner);
            component.set('v.loadBadge', true);
            
            if(isOwner){
                component.set('v.label', 'You are the owner of this account');
                component.set('v.theme', 'success');
            } else {
                component.set('v.label', 'You are not the owner of this account');
                component.set('v.theme', 'warning');
            }
        });
        
        $A.enqueueAction(action);
	}
})