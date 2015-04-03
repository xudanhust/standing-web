'use strict';

(function($){

    var func = {
        init: function(){
            this.modal();
            this.setting();
        },
        modal: function(){
            var body = $('body'),
                modal = $('.modal');

            body.on('click', 'table a.btn-danger', function(e){
                e.preventDefault();
                modal.modal();
                modal.find('.btn-danger').attr('href', $(this).attr('href') + '/confirm');
            });
        },
        setting: function(){
            // var setting = $('#setting'),
            //     all = setting.find('input'),
            //     check = setting.find('[type=checkbox]'),
            //     start = setting.find('[name=start]'),
            //     end = setting.find('[name=end]');

            // all.on('change', function(){
            //     var checked = check.prop('checked'),
            //         startTime = start.val(),
            //         endTime = end.val();

            //     if(checked && startTime && endTime && new Date(startTime) <= new Date(endTime)){
            //
            //     }
            // });

        }
    };

    $(function(){
        func.init();
    });

})(jQuery);


