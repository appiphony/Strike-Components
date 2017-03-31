({
    destroyComponent: function (component) {
        component.destroy();
    },
    notifyParent: function (component) {
        component.getEvent("strike_evt_componentDestroyed").fire();
    }
})
