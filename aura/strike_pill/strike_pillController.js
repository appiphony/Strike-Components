({
    destroyPill: function (component, event, helper) {
        if (component.get('v.isDestroyable')) {
            helper.notifyParent(component);
            helper.destroyComponent(component);
        }
    }
})
