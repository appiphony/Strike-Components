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
        var tooltipWidth = Math.ceil(tooltipBoundingBox.width);
        var tooltipHeight = tooltipBoundingBox.height;

        var containerEl = component.find('tooltipContainer').getElement();
        var containerBoundingBox = containerEl.getBoundingClientRect();
        var containerWidth = containerBoundingBox.width;
        var containerHeight = containerBoundingBox.height;
        var containerLeft = containerBoundingBox.left;
        var containerRight = containerBoundingBox.right;

        var placement = component.get('v.placement');

        var tooltipYPos, tooltipXPos;
        var nubbinPadding = 14;

        var tooltipStyle = component.find('tooltipStyle').getElement();

        if (placement == 'right') {
            tooltipXPos = containerWidth + nubbinPadding;
            tooltipYPos = (containerHeight - tooltipHeight) / 2;
        } else if (placement == 'bottom') {
            tooltipXPos = (containerWidth - tooltipWidth) / 2;
            tooltipYPos = containerHeight + nubbinPadding;

            if ((containerLeft + tooltipXPos) < 4) {
                var adjustment = Math.abs(containerLeft + tooltipXPos) + 4;

                tooltipXPos += adjustment;
                tooltipStyle.innerHTML = '.st-popover_container .slds-nubbin--top:before { transform: translateX(' + -adjustment + 'px) rotate(45deg); } .st-popover_container .slds-nubbin--top:after { transform: translateX(' + -adjustment + 'px) rotate(45deg); }';
            } else if ((containerRight + Math.abs(tooltipXPos)) > (window.innerWidth - 4)) {
                var adjustment = (containerRight + Math.abs(tooltipXPos)) - (window.innerWidth - 4);

                tooltipXPos -= adjustment;
                tooltipStyle.innerHTML = '.st-popover_container .slds-nubbin--top:before { transform: translateX(' + adjustment + 'px) rotate(45deg); } .st-popover_container .slds-nubbin--top:after { transform: translateX(' + adjustment + 'px) rotate(45deg); }';
            }
        } else if (placement == 'left') {
            tooltipXPos = -tooltipWidth - nubbinPadding;
            tooltipYPos = (containerHeight - tooltipHeight) / 2;
        } else { // Top
            tooltipXPos = (containerWidth - tooltipWidth) / 2;
            tooltipYPos = -tooltipHeight - nubbinPadding;

            if ((containerLeft + tooltipXPos) < 4) {
                var adjustment = Math.abs(containerLeft + tooltipXPos) + 4;

                tooltipXPos += adjustment;
                tooltipStyle.innerHTML = '.st-popover_container .slds-nubbin--bottom:before { transform: translateX(' + -adjustment + 'px) rotate(45deg); } .st-popover_container .slds-nubbin--bottom:after { transform: translateX(' + -adjustment + 'px) rotate(45deg); }';
            } else if ((containerRight + Math.abs(tooltipXPos)) > (window.innerWidth - 4)) {
                var adjustment = (containerRight + Math.abs(tooltipXPos)) - (window.innerWidth - 4);

                tooltipXPos -= adjustment;
                tooltipStyle.innerHTML = '.st-popover_container .slds-nubbin--bottom:before { transform: translateX(' + adjustment + 'px) rotate(45deg); } .st-popover_container .slds-nubbin--bottom:after { transform: translateX(' + adjustment + 'px) rotate(45deg); }';
            }
        }

        return {
            tooltipXPos : tooltipXPos,
            tooltipYPos : tooltipYPos,
            width : tooltipWidth
        }
    }
})
