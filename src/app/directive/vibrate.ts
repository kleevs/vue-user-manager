import Vue from "vue";
import { run } from '../../domain/tool/animation';

Vue.directive('vibrate', {
    update: function (el, binding) {
        var isVibrate = binding.value;
        var last = binding.oldValue;
        if (!last && isVibrate) {
            run(el, 'rubberBand');
        }
    }
});