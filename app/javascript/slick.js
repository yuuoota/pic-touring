$(function() {
  $('.slider').slick({
    dots: true,
    infinite: false
  });
  $('.slider').on('afterChange', function() {
    var currentSlide = $('.slider').slick('slickCurrentSlide');
  });
});