$(document).ready(function() {
    $("form.valid_form").each(function(index) {
        var it = $(this);
        it.validate({
            rules: {
                Имя_пользователя: {
                    required: true,
                },
                Телефон_пользователя: {
                    required: true,
                },
            },
            messages: {},
            errorPlacement: function(error, element) {},
            submitHandler: function(form) {
                var data = new FormData(it[0]);
                $.ajax({
                    type: "POST",
                    url: "../send.php",
                    data: data,
                    cache: false,
                    processData: false,
                    contentType: false,
                    success: function(response) {
                        $('.popup, .overlay').removeClass('visible');
                        $('.success, .overlay').addClass('visible');
                        it.find('input').val('');
                        it.find('textarea').val('');
                        setTimeout(function() {
                            $('.success, .overlay').removeClass('visible');
                        }, 3000);
                    }
                });
                return false;
            },
            success: function() {},
            highlight: function(element, errorClass) {
                $(element).addClass('error');
            },
            unhighlight: function(element, errorClass, validClass) {
                $(element).removeClass('error');
            }
        });
    });
});