$(function() {
    // Slider https://kenwheeler.github.io/slick/

    $('[data-slider="slick"]').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        arrows: false,
        dots: true
      });

    $('.modal-work__btn--next').on('click', function(event) {
        event.preventDefault();
        
        let currentSlider = $(this).parents('.modal').find('[data-slider="slick"]');
        
        currentSlider.slick('slickNext');
    });
    
    $('.modal-work__btn--prev').on('click', function(event) {
        event.preventDefault();
        
        let currentSlider = $(this).parents('.modal').find('[data-slider="slick"]');

        currentSlider.slick('slickPrev');
    });

    // Modal
    let modalCall = $("[data-modal]");
    let modalClose = $("[data-close]")

     modalCall.on("click", function(event) {
        event.preventDefault();
        
        let $this = $(this);
        let modalID = $this.data('modal');

        $(modalID).addClass('show');
        $("body").addClass('no-scroll');

        setTimeout(function() {
            $(modalID).find(".modal__dialog").css({
                transform: "rotateX(0)"
            });
        }, 200);

        $('#worksSlider').slick('setPosition'); 
      }); 
    
     modalClose.on("click", function(event) {
        event.preventDefault();
        
        let $this = $(this);
        let modalParent = $this.parents('.modal');

        modalParent.find(".modal__dialog").css({
            transform: "rotateX(90deg)"
            });

        setTimeout(function() {
            modalParent.removeClass('show');
            $("body").removeClass('no-scroll');
        }, 200);  
      });

      $(".modal").on("click", function(event) {
        
        let $this = $(this);

        $this.find(".modal__dialog").css({
            transform: "rotateX(90deg)"
            });

        setTimeout(function() {
              $this.removeClass('show');
              $("body").removeClass('no-scroll');
        }, 200);  
      });

      $(".modal__dialog").on("click", function(event) {
        event.stopPropagation();
      }); 
    
    });

    // Filter

    let filter = $("[data-filter]");

    filter.on('click', function(event) {
        event.preventDefault();

        let cat = $(this).data('filter');

        if (cat == 'all') {
            $("[data-cat]").removeClass('hide');
        } else {
            
            $("[data-cat]").each(function() {

                let WorkCat = $(this).data('cat');
    
                if(WorkCat != cat) {
                    $(this).addClass('hide');
                } else {
                    $(this).removeClass('hide');
                }
            });
        }

    


    















})