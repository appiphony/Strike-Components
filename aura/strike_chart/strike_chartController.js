({
    onInit: function (component, event, helper) {
        component.set('v.scriptsLoaded', true);
        component.set('v.triggerRedraw', !component.get('v.triggerRedraw'));

        component.resize = $A.getCallback(function () {
            if (component.isValid()) {
                component.set('v.fontSize', helper.determineFontSize(component.get('v.containerWidth')));
                component.set('v.chartRendered', false);
                component.set('v.triggerRedraw', !component.get('v.triggerRedraw'));
            } else {
                window.removeEventListener('resize', component.resize);
            }
        });

        window.addEventListener('resize', component.resize, true);
    },
    reRenderCharts: function (component, event, helper) {
        component.set('v.chartRendered', false);
    }
})