/*
Strike by Appiphony

Version: 1.0.0
Website: http://www.lightningstrike.io
GitHub: https://github.com/appiphony/Strike-Components
License: BSD 3-Clause License
*/
({
    calculateNubbinPlacement: function(component, placement){
        if(!placement) {
            placement = component.get('v.placement');
        }
        placement = placement.replace('auto ', '');
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
        var adjustment;
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
            if(placement === 'top' && (containerBoundingBox.top - tooltipBoundingBox.height) < windowBoundingBox.top) {
                placement = 'bottom';
            } else if(placement === 'right' && (containerBoundingBox.right + tooltipBoundingBox.width) > windowBoundingBox.right) {
                placement = 'left';
            } else if(placement === 'bottom' && (containerBoundingBox.bottom + tooltipBoundingBox.height) > windowBoundingBox.bottom) {
                placement = 'top';
            } else if(placement === 'left' && (containerBoundingBox.left - tooltipBoundingBox.width) < windowBoundingBox.left) {
                placement = 'right';
            }

            // update nubbin since placement may have changed from the last
            // display
            this.calculateNubbinPlacement(component, placement);
        }

        var tooltipYPos, tooltipXPos;
        var nubbinPadding = 14;

        var tooltipStyle = component.find('tooltipStyle').getElement();

        if (placement === 'right') {
            tooltipXPos = containerWidth + nubbinPadding;
            tooltipYPos = (containerHeight - tooltipHeight) / 2;
        } else if (placement === 'bottom') {
            tooltipXPos = (containerWidth - tooltipWidth) / 2;
            tooltipYPos = containerHeight + nubbinPadding;

            if ((containerLeft + tooltipXPos) < 4) {
                adjustment = Math.abs(containerLeft + tooltipXPos) + 4;

                tooltipXPos += adjustment;
                tooltipStyle.innerHTML = '.st-popover_container .slds-nubbin--top:before { transform: translateX(' + -adjustment + 'px) rotate(45deg); } .st-popover_container .slds-nubbin--top:after { transform: translateX(' + -adjustment + 'px) rotate(45deg); }';
            } else if ((containerRight + Math.abs(tooltipXPos)) > (window.innerWidth - 4)) {
                adjustment = (containerRight + Math.abs(tooltipXPos)) - (window.innerWidth - 4);

                tooltipXPos -= adjustment;
                tooltipStyle.innerHTML = '.st-popover_container .slds-nubbin--top:before { transform: translateX(' + adjustment + 'px) rotate(45deg); } .st-popover_container .slds-nubbin--top:after { transform: translateX(' + adjustment + 'px) rotate(45deg); }';
            }
        } else if (placement === 'left') {
            tooltipXPos = -tooltipWidth - nubbinPadding;
            tooltipYPos = (containerHeight - tooltipHeight) / 2;
        } else { // Top
            tooltipXPos = (containerWidth - tooltipWidth) / 2;
            tooltipYPos = -tooltipHeight - nubbinPadding;

            if ((containerLeft + tooltipXPos) < 4) {
                adjustment = Math.abs(containerLeft + tooltipXPos) + 4;

                tooltipXPos += adjustment;
                tooltipStyle.innerHTML = '.st-popover_container .slds-nubbin--bottom:before { transform: translateX(' + -adjustment + 'px) rotate(45deg); } .st-popover_container .slds-nubbin--bottom:after { transform: translateX(' + -adjustment + 'px) rotate(45deg); }';
            } else if ((containerRight + Math.abs(tooltipXPos)) > (window.innerWidth - 4)) {
                adjustment = (containerRight + Math.abs(tooltipXPos)) - (window.innerWidth - 4);

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
/*
Copyright 2017 Appiphony, LLC

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
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
