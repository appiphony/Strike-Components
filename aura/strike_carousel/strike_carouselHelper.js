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
			if (index == currentPage) {
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