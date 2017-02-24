({
    unrender : function(component){
        this.superUnrender();
        window.removeEventListener('keyup', component._closeModal);
    }
})