({
    unrender: function(component) {
        this.superUnrender();

        window.removeEventListener('click', component.handleClick);
        window.removeEventListener('keydown', component.handleKeyDown);
    }
})