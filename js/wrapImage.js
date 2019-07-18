$(document).ready(function () {
  wrapImageWithFancyBox();
});


/**
 * Wrap images with fancybox support.
 */
function wrapImageWithFancyBox() {
  $('img')
  .not('.no-box')
  .not('.bandage')
  .not('.sidebar-image img')
  .not('#author-avatar img')
  .not(".mdl-menu img")
  .not("#friendly_links img")
  .each(function () {
    var $image = $(this);
    var imageCaption = $image.attr('alt');
    var $imageWrapLink = $image.parent('a');
    if ($imageWrapLink.length < 1) {
      var src = this.getAttribute('data-original');
      var idx = src.lastIndexOf('?');
      if (idx != -1) {
        src = src.substring(0, idx);
      }
      $imageWrapLink = $image.wrap('<a href="' + src + '"></a>').parent('a');
    }

    $imageWrapLink.attr('data-fancybox', 'images');
    if (imageCaption) {
      $imageWrapLink.attr('data-caption', imageCaption);
    }

  });

  $().fancybox({
    selector: '[data-fancybox="images"]',
    thumbs: true,
    hash: false,
    loop: false,
  });

}
