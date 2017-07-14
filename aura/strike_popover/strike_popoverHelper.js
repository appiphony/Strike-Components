({
    calculateNubbinPlacement: function(component, placement){
        if(!placement) {
            var placement = component.get('v.placement');
        }
        placement = placement.replace('auto ', '');
        var variant = component.get('v.variant');
        var nubbinPlacement;

        switch (placement){
            case 'top' : nubbinPlacement = 'slds-nubbin--bottom'; break;
            case 'bottom' : nubbinPlacement = 'slds-nubbin--top'; break;
            case 'left' : nubbinPlacement = 'slds-nubbin--right'; break;
            case 'right' : nubbinPlacement = 'slds-nubbin--left'; break;
            default : nubbinPlacement = 'slds-nubbin--bottom';
        }

        if (variant === 'panels' && (placement === 'left' || placement === 'right')) {
            nubbinPlacement += '-top';
        }

        component.set('v.nubbinPlacement', nubbinPlacement);
    },
    calculatePopoverPosition: function(component) {
        var popoverEl = component.find('popover').getElement();
        var popoverBoundingBox = popoverEl.getBoundingClientRect();
        var popoverWidth = Math.ceil(popoverBoundingBox.width);
        var popoverHeight = popoverBoundingBox.height;

        var containerEl = component.find('popoverContainer').getElement();
        var containerBoundingBox = containerEl.getBoundingClientRect();
        var containerWidth = containerBoundingBox.width;
        var containerHeight = containerBoundingBox.height;
        var containerLeft = containerBoundingBox.left;
        var containerRight = containerBoundingBox.right;

        var variant = component.get('v.variant');
        var placement = component.get('v.placement');

        // Check for auto placement
        if(placement.startsWith('auto ')) {

            // Remove auto placement to perform bounding checks on preferred placement
            placement = placement.replace('auto ', '');

            // Construct the window bounding box.

            // The height of the sticky global header is not accessible in any way
            // so it must be hardcoded. This may change during releases.
            // var globalHeaderHeight = 90;

            // In LEX, document.body.getBoundingClientRect() does not return the
            // correct values so we will construct a box ourselves using the
            // inner width and height of the window (viewport)
            var windowBoundingBox = {
                top: 0,
                right: window.innerWidth,
                bottom: window.innerHeight,
                left: 0
            };

            // Validate that there is space for the preferred placements. If there is
            // not, invert the placement
            if(placement === 'top' && (containerBoundingBox.top - popoverBoundingBox.height) < windowBoundingBox.top) {
                placement = 'bottom';
            } else if(placement === 'right' && (containerBoundingBox.right + popoverBoundingBox.width) > windowBoundingBox.right) {
                placement = 'left';
            } else if(placement === 'bottom' && (containerBoundingBox.bottom + popoverBoundingBox.height) > windowBoundingBox.bottom) {
                placement = 'top';
            } else if(placement === 'left' && (containerBoundingBox.left - popoverBoundingBox.width) < windowBoundingBox.left) {
                placement = 'right';
            }

            // update nubbin since placement may have changed from the last
            // display
            this.calculateNubbinPlacement(component, placement);
        }

        var popoverYPos, popoverXPos;
        var nubbinPadding = 14;

        var popoverStyle = component.find('popoverStyle').getElement();

        if (placement == 'right') {
            popoverXPos = containerWidth + nubbinPadding;

            if (variant === 'panels') {
                popoverYPos = -25;
            } else {
                popoverYPos = (containerHeight - popoverHeight) / 2;
            }

            if (popoverHeight > window.innerHeight) {
                var popoverAdjustment = 10 - containerBoundingBox.top;
                var nubbinAdjustment = (popoverYPos - popoverAdjustment);
                popoverStyle.innerHTML = '.st-popover_container .slds-nubbin--left:before { transform: translateY(' + nubbinAdjustment + 'px) rotate(45deg); } .st-popover_container .slds-nubbin--left:after { transform: translateY(' + nubbinAdjustment + 'px) rotate(45deg); }';

                popoverYPos = popoverAdjustment;
            } else {
                popoverStyle.innerHTML = '';
            }
        } else if (placement == 'bottom') {
            popoverXPos = (containerWidth - popoverWidth) / 2;
            popoverYPos = containerHeight + nubbinPadding;

            if ((containerLeft + popoverXPos) < 4) {
                var adjustment = Math.abs(containerLeft + popoverXPos) + 4;

                popoverXPos += adjustment;
                popoverStyle.innerHTML = '.st-popover_container .slds-nubbin--top:before { transform: translateX(' + -adjustment + 'px) rotate(45deg); } .st-popover_container .slds-nubbin--top:after { transform: translateX(' + -adjustment + 'px) rotate(45deg); }';
            } else if ((containerRight + Math.abs(popoverXPos)) > (window.innerWidth - 4)) {
                var adjustment = (containerRight + Math.abs(popoverXPos)) - (window.innerWidth - 4);

                popoverXPos -= adjustment;
                popoverStyle.innerHTML = '.st-popover_container .slds-nubbin--top:before { transform: translateX(' + adjustment + 'px) rotate(45deg); } .st-popover_container .slds-nubbin--top:after { transform: translateX(' + adjustment + 'px) rotate(45deg); }';
            }
        } else if (placement == 'left') {
            popoverXPos = -popoverWidth - nubbinPadding;

            if (variant === 'panels') {
                popoverYPos = -25;
            } else {
                popoverYPos = (containerHeight - popoverHeight) / 2;
            }

            if (popoverHeight > window.innerHeight) {
                var popoverAdjustment = 10 - containerBoundingBox.top;
                var nubbinAdjustment = (popoverYPos - popoverAdjustment);
                popoverStyle.innerHTML = '.st-popover_container .slds-nubbin--right:before { transform: translateY(' + nubbinAdjustment + 'px) rotate(45deg); } .st-popover_container .slds-nubbin--right:after { transform: translateY(' + nubbinAdjustment + 'px) rotate(45deg); }';

                popoverYPos = popoverAdjustment;
            } else {
                popoverStyle.innerHTML = '';
            }
        } else { // Top
            popoverXPos = (containerWidth - popoverWidth) / 2;
            popoverYPos = -popoverHeight - nubbinPadding;

            if ((containerLeft + popoverXPos) < 4) {
                var adjustment = Math.abs(containerLeft + popoverXPos) + 4;

                popoverXPos += adjustment;
                popoverStyle.innerHTML = '.st-popover_container .slds-nubbin--bottom:before { transform: translateX(' + -adjustment + 'px) rotate(45deg); } .st-popover_container .slds-nubbin--bottom:after { transform: translateX(' + -adjustment + 'px) rotate(45deg); }';
            } else if ((containerRight + Math.abs(popoverXPos)) > (window.innerWidth - 4)) {
                var adjustment = (containerRight + Math.abs(popoverXPos)) - (window.innerWidth - 4);

                popoverXPos -= adjustment;
                popoverStyle.innerHTML = '.st-popover_container .slds-nubbin--bottom:before { transform: translateX(' + adjustment + 'px) rotate(45deg); } .st-popover_container .slds-nubbin--bottom:after { transform: translateX(' + adjustment + 'px) rotate(45deg); }';
            }
        }

        return {
            popoverXPos : popoverXPos,
            popoverYPos : popoverYPos,
            width : popoverWidth
        }
    },
    forceHide: function(component, event, helper) {
        component.set('v.preventHide', false);
        helper.tryToHide(component, event, helper);
    },
    hidePopover: function(component, event, helper) {
        if (component.get('v.withClose') !== true) {
            component.set('v.preventHide', false);
            helper.tryToHide(component, event, helper);
        }
    },
    setIconDisplay: function(component, event, helper) {
        var theme = component.get('v.theme');
        var shouldInvertIcon = !(theme === 'default' || theme === 'warning');

        component.set('v.shouldInvertIcon', shouldInvertIcon);
    },
    showPopover: function(component, event, helper) {
        var popoverStyleOptions = helper.calculatePopoverPosition(component);
        var popoverStyle = 'position: absolute; left: ' + popoverStyleOptions.popoverXPos + 'px; top: ' + popoverStyleOptions.popoverYPos + 'px;';
        component.set('v.popoverStyle', popoverStyle);
        component.set('v.showPopover', true);
    },
    tryToHide: function(component, event, helper) {
        window.setTimeout($A.getCallback(function() {
            if (!component.get('v.preventHide')) {
                var popoverStyle = component.find('popoverStyle').getElement();

                popoverStyle.innerHTML = '';
                component.set('v.showPopover', false);
                component.set('v.popoverStyle', '');
            }
        }), 100);
    }
})