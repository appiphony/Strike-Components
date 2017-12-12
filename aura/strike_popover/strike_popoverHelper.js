/*Strike by Appiphony

Version: 1.0.0
Website: http://www.lightningstrike.io
GitHub: https://github.com/appiphony/Strike-Components
License: BSD 3-Clause License*/
({
    calculateNubbinPlacement: function(component, placement){
        if(!placement) {
            placement = component.get('v.placement');
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
        var popoverAdjustment;
        var adjustment;
        var nubbinAdjustment;
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

        if (placement === 'right') {
            popoverXPos = containerWidth + nubbinPadding;

            if (variant === 'panels') {
                popoverYPos = -25;
            } else {
                popoverYPos = (containerHeight - popoverHeight) / 2;
            }

            if (popoverHeight > window.innerHeight) {
                popoverAdjustment = 10 - containerBoundingBox.top;
                nubbinAdjustment = (popoverYPos - popoverAdjustment);
                popoverStyle.innerHTML = '.st-popover_container .slds-nubbin--left:before { transform: translateY(' + nubbinAdjustment + 'px) rotate(45deg); } .st-popover_container .slds-nubbin--left:after { transform: translateY(' + nubbinAdjustment + 'px) rotate(45deg); }';

                popoverYPos = popoverAdjustment;
            } else {
                popoverStyle.innerHTML = '';
            }
        } else if (placement === 'bottom') {
            popoverXPos = (containerWidth - popoverWidth) / 2;
            popoverYPos = containerHeight + nubbinPadding;
            
            if ((containerLeft + popoverXPos) < 4) {
                adjustment = Math.abs(containerLeft + popoverXPos) + 4;

                popoverXPos += adjustment;
                popoverStyle.innerHTML = '.st-popover_container .slds-nubbin--top:before { transform: translateX(' + -adjustment + 'px) rotate(45deg); } .st-popover_container .slds-nubbin--top:after { transform: translateX(' + -adjustment + 'px) rotate(45deg); }';
            } else if ((containerRight + Math.abs(popoverXPos)) > (window.innerWidth - 4)) {
                adjustment = (containerRight + Math.abs(popoverXPos)) - (window.innerWidth - 4);

                popoverXPos -= adjustment;
                popoverStyle.innerHTML = '.st-popover_container .slds-nubbin--top:before { transform: translateX(' + adjustment + 'px) rotate(45deg); } .st-popover_container .slds-nubbin--top:after { transform: translateX(' + adjustment + 'px) rotate(45deg); }';
            }
        } else if (placement === 'left') {
            popoverXPos = -popoverWidth - nubbinPadding;

            if (variant === 'panels') {
                popoverYPos = -25;
            } else {
                popoverYPos = (containerHeight - popoverHeight) / 2;
            }

            if (popoverHeight > window.innerHeight) {
                popoverAdjustment = 10 - containerBoundingBox.top;
                nubbinAdjustment = (popoverYPos - popoverAdjustment);
                popoverStyle.innerHTML = '.st-popover_container .slds-nubbin--right:before { transform: translateY(' + nubbinAdjustment + 'px) rotate(45deg); } .st-popover_container .slds-nubbin--right:after { transform: translateY(' + nubbinAdjustment + 'px) rotate(45deg); }';

                popoverYPos = popoverAdjustment;
            } else {
                popoverStyle.innerHTML = '';
            }
        } else { // Top
            popoverXPos = (containerWidth - popoverWidth) / 2;
            popoverYPos = -popoverHeight - nubbinPadding;

            if ((containerLeft + popoverXPos) < 4) {
                adjustment = Math.abs(containerLeft + popoverXPos) + 4;

                popoverXPos += adjustment;
                popoverStyle.innerHTML = '.st-popover_container .slds-nubbin--bottom:before { transform: translateX(' + -adjustment + 'px) rotate(45deg); } .st-popover_container .slds-nubbin--bottom:after { transform: translateX(' + -adjustment + 'px) rotate(45deg); }';
            } else if ((containerRight + Math.abs(popoverXPos)) > (window.innerWidth - 4)) {
                adjustment = (containerRight + Math.abs(popoverXPos)) - (window.innerWidth - 4);

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
/*Copyright 2017 Appiphony, LLC

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the 
following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following 
disclaimer.
2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following 
disclaimer in the documentation and/or other materials provided with the distribution.
3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote 
products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, 
INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, 
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR 
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, 
WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE 
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.*/