jQuery(document).ready(function($) {

    var basicSwiper = new Swiper('.basic__slider', {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: false
        },
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
    });

    $('.tabs').tabs({
        active: 0,
        hide: {
            effect: "fade",
            duration: 200,
        },
        show: {
            effect: "fade",
            duration: 200,
        }
    });

    $(".light-gallery").lightGallery({
        download: false,
        share: false,
        thumbnail: false,
        selector: '.light-gallery__item'
    });

    var reviewsSwiper = new Swiper('.reviews__slider', {
        slidesPerView: 2,
        spaceBetween: 60,
        slidesOffsetBefore: 30,
        slidesOffsetAfter: 30,
        navigation: {
            nextEl: '.reviews .swiper-button-next',
            prevEl: '.reviews .swiper-button-prev',
        },
        breakpoints: {
            998: {
                spaceBetween: 10,
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0,
            },
            720: {
                slidesPerView: 1,
                spaceBetween: 10,
                autoHeight: true,
                slidesOffsetBefore: 0,
                slidesOffsetAfter: 0,
            }
        }
    });

    var examplesSwiper = new Swiper('.examples__slider', {
        slidesPerView: 4,
        spaceBetween: 30,
        navigation: {
            nextEl: '.examples .swiper-button-next',
            prevEl: '.examples .swiper-button-prev',
        },
        breakpoints: {
            1200: {
                spaceBetween: 15
            },
            998: {
                slidesPerView: 3,
                spaceBetween: 10
            },
            720: {
                slidesPerView: 2,
            },
            460: {
                slidesPerView: 1,
            }
        }
    });

    $('.filter').on('click', '.filter__item', function(event) {
        event.preventDefault();
        $('.filter__item').removeClass('active');
        $(this).addClass('active');
    });

    $('.toggle_burger').on('click', function(event) {
        $('.toggle_burger').toggleClass('close');
    });

    $('.header__toggle').on('click', function(event) {
        $('.header__overlay').toggleClass('visible');
        $('.header__menu').toggleClass('visible');
    });

    $('.header__overlay').on('click', function(event) {
        $('.header__overlay, .header__menu').removeClass('visible');
        $('.toggle_burger').removeClass('close');
    });

    $('.v_menu_toggle').on('click', function(event) {
        $(this).toggleClass('visible');
    });
    $('.v_menu__item').on('click', function(event) {
        $(this).parents('.v_menu').parent().find('.v_menu_toggle').removeClass('visible')
    });

    $('.header__menu__arr').on('click', function(event) {
        $('.collapse').not($(this).parents('.collapse')).removeClass('collapse').removeClass('collapse');
        $(this).parent().toggleClass('collapse');
    });

    if ($('.map_canvas').length) {
        mapInitialize();
    }
});

function mapInitialize() {

    $('.map_canvas').each(function(index, el) {
        elem = "map_canvas_" + (index + 1);
        coord = [];
        center = [];
        brooklyn = [];
        $(this).find('.coord').each(function(index, el) {
            coord[index] = $(this).attr('data-coord').split(',');
            brooklyn[index] = {
                lat: Number(coord[index][0]),
                lng: Number(coord[index][1]),
            };
        });
        for (var i = 0; i < brooklyn.length; i++) {
            center[i] = {
                lat: brooklyn[i].lat,
                lng: brooklyn[i].lng
            }
        }
        var stylez = [{
            featureType: "all",
            elementType: "all",
            stylers: [{
                    saturation: -100
                } // <-- THIS
            ]
        }];
        var mapOptions = {
            zoom: 16,
            center: center[0],
            mapTypeControl: false,
            scrollwheel: false,
            navigationControl: false,
            scaleControl: false,
            draggable: true,
            streetViewControl: false,
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_TOP
            }
        };

        if ($(window).width() <= 1180) {
            mapOptions.draggable = false;
        }

        map = new google.maps.Map(document.getElementById(elem), mapOptions);

        mapType = new google.maps.StyledMapType(stylez, {
            name: "Grayscale"
        });
        map.mapTypes.set('tehgrayz', mapType);
        map.setMapTypeId('tehgrayz');

        marker = new google.maps.Marker({
            map: map,
            position: brooklyn[0],
            icon: '../images/ico/map-mark.svg'
        });
    });


}