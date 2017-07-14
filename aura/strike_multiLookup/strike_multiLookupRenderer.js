({
    unrender: function(component) {
        this.superUnrender();

        window.removeEventListener('click', component.handleClick);
    }
})