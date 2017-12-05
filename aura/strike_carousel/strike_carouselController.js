/*
Strike by Appiphony

Version: 1.0.0
Website: http://www.lightningstrike.io
GitHub: https://github.com/appiphony/Strike-Components
License: BSD 3-Clause License
*/
({
	onInit: function(component, event, helper) {
        var body = component.get('v.body');
        var cards = [];
        body.forEach(function(el) {
            if (el.toString().match(/aura:iteration/)) {
                var children = el.get('v.body');
        		cards = children;

            } else {
                cards.push(el);
            }
        });
		component.set('v.cards', cards);

		window.addEventListener('resize', function() {
			helper.setContainerWidth(component, helper);
			helper.scrollToPage(component, event, helper, component.get('v.currentPage'));
		});

        helper.displayCards(component, event, helper);
	},
    handleChangeCards: function(component, event, helper) {
        helper.displayCards(component, event, helper);
    },
	handleChangeCurrentPage: function(component, event, helper) {
		helper.updateDots(component, event, helper);
	},
	handleClickDot: function(component, event, helper) {
		var page = parseInt(event.target.dataset.page,10);
		helper.scrollToPage(component, event, helper, page);
	},
	handleClickPrevious: function(component, event, helper) {
		var newPage;
		var currentPage = component.get('v.currentPage');
		var lastPageIndex = component.get('v.pages').length - 1;

        if (currentPage > 0) {
            newPage = currentPage - 1;
        } else {
            newPage = lastPageIndex;
        }

        helper.scrollToPage(component, event, helper, newPage);
	},
	handleClickNext: function(component, event, helper) {
		var newPage;
		var currentPage = component.get('v.currentPage');
		var lastPageIndex = component.get('v.pages').length - 1;

        if (currentPage < lastPageIndex) {
            newPage = currentPage + 1;
        } else {
            newPage = 0;
        }

        helper.scrollToPage(component, event, helper, newPage);
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