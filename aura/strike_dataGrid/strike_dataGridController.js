
({
	init : function(component, event, helper) {
		helper.formatData(component, event, helper);
	},
	handleDataChange : function(component, event, helper){
		helper.formatData(component, event, helper);
	},
	handleColumnHeaderClick : function(component, event, helper){
		helper.sortTable(component, event, helper);
	}
})