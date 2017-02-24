({
    calculateNubbinPlacement: function(component){
        var placement = component.get('v.placement');
        var nubbinPlacement;

        switch (placement){
            case 'top' : nubbinPlacement = 'slds-nubbin--bottom'; break;
            case 'bottom' : nubbinPlacement = 'slds-nubbin--top'; break;
            case 'left' : nubbinPlacement = 'slds-nubbin--right'; break;
            case 'right' : nubbinPlacement = 'slds-nubbin--left'; break;
            default : nubbinPlacement = 'slds-nubbin--bottom';
        }

        component.set('v.nubbinPlacement', nubbinPlacement);
    },
    calculateTooltipPosition: function(component) {
        var tooltipEl = component.find('tooltip').getElement();
        var tooltipBoundingBox = tooltipEl.getBoundingClientRect();
        var tooltipWidth = tooltipBoundingBox.width;
        var tooltipHeight = tooltipBoundingBox.height;

        var containerEl = component.find('tooltipContainer').getElement();
        var containerBoundingBox = containerEl.getBoundingClientRect();
        var containerWidth = containerBoundingBox.width;
        var containerHeight = containerBoundingBox.height;

        var placement = component.get('v.placement');

        var tooltipYPos, tooltipXPos;
        var nubbinPadding = 14;

        if (placement == 'right') {
            tooltipXPos = containerWidth + nubbinPadding;
            tooltipYPos = (containerHeight - tooltipHeight) / 2;
        } else if (placement == 'bottom') {
            tooltipXPos = (containerWidth - tooltipWidth) / 2;
            tooltipYPos = containerHeight + nubbinPadding;
        } else if (placement == 'left') {
            tooltipXPos = -tooltipWidth - nubbinPadding;
            tooltipYPos = (containerHeight - tooltipHeight) / 2;
        } else {
            tooltipXPos = (containerWidth - tooltipWidth) / 2;
            tooltipYPos = -tooltipHeight - nubbinPadding;
        }

        return {
            tooltipXPos : tooltipXPos,
            tooltipYPos : tooltipYPos,
            width : tooltipWidth
        }
    }
})