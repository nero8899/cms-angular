/**
 * Colour changer
 * An example module changing colours triggered by module manager
 */
(function (window, document) {
  function ColorChanger () {
  };

  ColorChanger.prototype.changeColor = function (state) {
    var color = '#09f';

    if (state === 0) {
      color = '#f90';
    } else if (state === 1) {
      color = '#f09';
    } else if (state === 2) {
      color = '#90f';
    }

    $(document.body).css('background-color', color);
  };

  ColorChanger.prototype.destroy = function () {
    $(document.body).css('background-color', '');
  };

  window.ColorChanger = ColorChanger;
}(window, document, undefined));