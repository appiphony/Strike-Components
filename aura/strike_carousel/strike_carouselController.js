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
		var page = parseInt(event.srcElement.dataset.page);
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