
define('service/Slides',['jquery'],function($){
    var SlideService = function(){

    }
    SlideService.prototype.fetchTrainingSlides = function(){
        var slidesDef = new $.Deferred();
        var reqDef = $.ajax({
            type : 'GET',
            url : '/data/training-slides.html'
        });
        reqDef.then(function(response){
            slidesDef.resolve($(response).find(' > *'));
        });
        return slidesDef;
    };
    return SlideService;
});

define('app/Slideshow',['service/Slides'],function(SlideService){
    var App = function(args){
        this.$el = args.$el;
        this.window = args.window;
        console.log('this',this)
    };
    App.prototype.start = function(){
        var slidesDef = new SlideService().fetchTrainingSlides();
        slidesDef.then($.proxy(function(){
            this.renderSlides.apply(this,arguments);
        },this));
    };
    App.prototype.renderSlides= function(slides){
        var i = slides.length;
        while(i--){
            var slide = $(slides[i]);
            (function(slide){
                var slideId = slide.data('slide-id');
                var navLink = $('<a href="#">'+slideId+'</a>').on('click',$.proxy(function(e){
                    e.preventDefault();
                    this.window.scrollTo(0,slide.offset().top);
                },this));
                var li = $('<li/>');
                this.$el.find('nav ul').prepend(li.append(navLink));
            }).call(this,slide);
            this.$el.find('.slides').prepend(slide);
        }



    };
    return App;
});