/*
Strike by Appiphony

Version: 1.0.0
Website: http://www.lightningstrike.io
GitHub: https://github.com/appiphony/Strike-Components
License: BSD 3-Clause License
*/
({
    displayCards: function(component, event, helper) {
		var body = component.get('v.body')[0];
		if(!$A.util.isEmpty(body)) {
			var cardCount = component.get('v.cards').length;
			var pageCount = Math.ceil(cardCount / 3);
			var spacerCount = pageCount % cardCount || 0;
			component.set('v.pages', new Array(pageCount));
			component.set('v.spacers', new Array(spacerCount));
		}
    },
    scrollToPage: function(component, event, helper, pageNumber) {
		var containerWidth = component.get('v.containerWidth');

		if (containerWidth > 480) {
			var carouselBody = component.find('carousel-body').getElement();
			var carouselBodyWidth = carouselBody.getBoundingClientRect().width;
			var currentPage = component.get('v.currentPage');
			var increment = (carouselBodyWidth * (pageNumber - currentPage)) / 60;
			var speed = 250; // Milliseconds
			var frameCount = 0;

			var slideInterval = setInterval(function() {
	            frameCount++;
				window.requestAnimationFrame(function() {
		            carouselBody.scrollLeft += increment;
				});

	            if (frameCount === 60) {
	                clearInterval(slideInterval);
	                currentPage = pageNumber;
					window.requestAnimationFrame(function() {
		                carouselBody.scrollLeft = carouselBodyWidth * currentPage;
					});
	            }
	        }, speed * 0.01667);

			component.set('v.currentPage', pageNumber);
			helper.updateDots(component, event, helper);
		}
	},
	updateDots: function(component, event, helper) {
		var dots = component.find('dot');
		var currentPage = component.get('v.currentPage');

		dots.forEach(function(self, index) {
			if (index === currentPage) {
				self.getElement().classList.add('sc-pagination__dot_selected');
			} else {
				self.getElement().classList.remove('sc-pagination__dot_selected');
			}
		});
	},
	setContainerWidth: function(component, helper) {
		if (component.getElement() !== null) {
			var containerWidth = Math.ceil(component.getElement().getBoundingClientRect().width);
			component.set('v.containerWidth', containerWidth);
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