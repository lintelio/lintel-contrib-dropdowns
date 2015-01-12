(function() {
  'use strict';

  function hideAll() {
    $('.btn-dropdown-toggle').each(function() {
      var btn = $(this).data('lt.dropdown');
      if (btn && btn.isVisible()) {
        btn.hide();
      }
    });
  }

  var Dropdown = function(element) {
    this.btn = $(element);
    this.menu = this.btn.siblings('.dropdown');
    this.container = this.btn.closest('.btn-group');
  };

  Dropdown.prototype.isVisible = function() {
    return this.container.hasClass('open');
  };

  Dropdown.prototype.show = function() {
    // Show event
    var showEvent = $.Event('show.lt.dropdown', {
      relatedTarget: this.menu[0]
    });

    this.btn.trigger(showEvent);

    // Allow event to be prevented
    if (showEvent.isDefaultPrevented()) { return; }

    // Hide all open menus
    hideAll();

    // Open dropdown
    this.container.addClass('open');
    this.btn.attr('aria-expanded', true);

    // Shown event
    var shownEvent = $.Event('shown.lt.dropdown', {
      relatedTarget: this.menu[0]
    });

    this.btn.trigger(shownEvent);
  };

  Dropdown.prototype.hide = function() {
    // Hide event
    var hideEvent = $.Event('hide.lt.dropdown', {
      relatedTarget: this.menu[0]
    });

    this.btn.trigger(hideEvent);

    // Allow event to be prevented
    if (hideEvent.isDefaultPrevented()) { return; }

    // Close dropdown
    this.container.removeClass('open');
    this.btn.attr('aria-expanded', false);

    // Hidden event
    var hiddenEvent = $.Event('hidden.lt.dropdown', {
      relatedTarget: this.menu[0]
    });

    this.btn.trigger(hiddenEvent);
  };

  Dropdown.prototype.toggle = function() {
    if (this.isVisible()) {
      this.hide();
    } else {
      this.show();
    }
  };

  // Define jQuery plugin
  function Plugin(method, options) {
    var settings = $.extend({}, Plugin.defaults, options);

    return this.each(function() {
      var $this = $(this);

      var data = $this.data('lt.dropdown');
      if (!data) {
        data = new Dropdown(this);
        $this.data('lt.dropdown', data);
      }
      if (typeof method === 'string') { data[method](); }

      settings.callback.call($this);
    });
  }

  Plugin.defaults = {
    callback: function() {}
  };

  $.fn.dropdown = Plugin;

  // Events
  $(document).on('click.lt.dropdown', '.btn-dropdown-toggle', function(e) {
    e.preventDefault();
    Plugin.call($(this), 'toggle');
  });

})(jQuery);
