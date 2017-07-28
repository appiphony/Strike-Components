({
    show: function(component, event, helper){
        window.addEventListener('keyup', component._closeModal);

        var params = {
            preEvent: 'strike_evt_modalShow',
            afterEvent: 'strike_evt_modalShown',
            showModal: true,
            targetEl: 'modal'
        }

        component.set('v.showModal', params.showModal);
        helper.modalTransitioner(component, params);
    },
    hide: function(component, event, helper) {
        window.removeEventListener('keyup', component._closeModal);

        var params = {
            preEvent: 'strike_evt_modalHide',
            afterEvent: 'strike_evt_modalHidden',
            showModal: false,
            targetEl: 'backdrop'
        }

        component.set('v.showModal', params.showModal);
        helper.modalTransitioner(component, params);
    },
    modalTransitioner: function(component, params){
        var targetEl = component.find(params.targetEl).getElement();

        if (targetEl == null) {
            return;
        }

        var preEvent = component.getEvent(params.preEvent);
        var afterEvent = component.getEvent(params.afterEvent);
        var showModal = params.showModal;
        var preEventAttribute = showModal ? 'v.showingModal' : 'v.fadeIn'
        var afterEventAttribute = showModal ? 'v.fadeIn' : 'v.showingModal'

        var transitionListener = $A.getCallback(function(e){
            var el = e.srcElement;

            if(!$A.util.isEmpty(el) && el.id == params.targetEl){
                if(!showModal){
                    component.set(afterEventAttribute, showModal);
                }

                afterEvent.fire();
                targetEl.removeEventListener('transitionend', transitionListener);
            }
        });

        targetEl.addEventListener('transitionend', transitionListener);
        component.set(preEventAttribute, showModal);
        preEvent.fire();

        if(showModal){
            //need to fadeIn on the next rendering cycle
            setTimeout($A.getCallback(function(){
                component.set(afterEventAttribute, showModal);
            }), 5);
        }
    }
})