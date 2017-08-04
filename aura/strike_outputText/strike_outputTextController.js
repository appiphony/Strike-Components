({
    handleInit: function(component,event,helper){
    	setTimeout(function(){
    		helper.format(component,event,helper);
    	}, 1);
    },
    handleChange: function(component,event,helper){
    	
    	helper.format(component,event,helper);

    },
    handleChildEvent: function(component,event,helper){
    	if(event.getName() === 'strikeEvent'){
    		event.stopPropagation();
    		helper.format(component,event,helper);
    	}
    }
})
