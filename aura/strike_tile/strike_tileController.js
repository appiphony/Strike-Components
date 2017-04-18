({
    destroyTile: function (component, event, helper) {
        if (component.get('v.destroyable')) {
            helper.notifyParent(component);
            helper.destroyComponent(component);
        }
    }
})
