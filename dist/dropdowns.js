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

  var Dropdown = function(element, options) {
    this.$btn = $(element);
    this.$menu = this.$btn.siblings('.dropdown');
    this.$container = this.$btn.closest('.btn-group');
    this.options = options || {};
  };

  Dropdown.prototype.isVisible = function() {
    return this.$container.hasClass('open');
  };

  Dropdown.prototype.show = function() {
    // Show event
    var showEvent = $.Event('show.lt.dropdown', {
      relatedTarget: this.$menu[0]
    });
    this.$btn.trigger(showEvent);

    // Allow event to be prevented
    if (showEvent.isDefaultPrevented()) { return; }

    // Hide all open menus
    hideAll();

    // Open dropdown
    this.$container.addClass('open');
    this.$btn.attr('aria-expanded', true);

    // Register escape key
    this.optionsEscape();

    // Register arrow keys
    this.dropdownKeydown();

    // Focus dropdown
    this.dropdownFocus();

    // Callback
    this.options.onShow.call(this, this.$menu, this.$btn);

    // Shown event
    var shownEvent = $.Event('shown.lt.dropdown', {
      relatedTarget: this.$menu[0]
    });
    this.$btn.trigger(shownEvent);
  };

  Dropdown.prototype.hide = function() {
    // Hide event
    var hideEvent = $.Event('hide.lt.dropdown', {
      relatedTarget: this.$menu[0]
    });
    this.$btn.trigger(hideEvent);

    // Allow event to be prevented
    if (hideEvent.isDefaultPrevented()) { return; }

    // Close dropdown
    this.$container.removeClass('open');
    this.$btn.attr('aria-expanded', false);

    // Unregister escape key
    this.optionsEscape();

    // Unregister arrow keys
    this.dropdownKeydown();

    // Restore focus
    this.restoreFocus();

    // Callback
    this.options.onHide.call(this, this.$menu, this.$btn);

    // Hidden event
    var hiddenEvent = $.Event('hidden.lt.dropdown', {
      relatedTarget: this.$menu[0]
    });
    this.$btn.trigger(hiddenEvent);
  };

  Dropdown.prototype.optionsEscape = function() {
    if (this.isVisible() && this.options.esc) {
      this.$menu.on('keydown.close.lt.dropdown', $.proxy(function(e) {
        if (e.which === 27) {
          this.hide();
        }
      }, this));
    } else {
      this.$menu.off('keydown.close.lt.dropdown');
    }
  };

  Dropdown.prototype.dropdownKeydown = function() {
    if (this.isVisible()) {
      this.$menu.on('keydown.lt.dropdown', $.proxy(function(e) {
        if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) { return; }

        e.preventDefault();
        e.stopPropagation();

        var $items = this.$menu.find('li:not(.dropdown-divider)');
        var currentIndex = $items.index($(e.target).closest('li'));
        var maxIndex = $items.length - 1;

        if ((e.which === 38 || e.which === 74) && currentIndex > 0) { // up
          $items.eq(currentIndex - 1).find('a').focus();
        }
        else if ((e.which === 40 || e.which === 75) && currentIndex < maxIndex) { // down
          $items.eq(currentIndex + 1).find('a').focus();
        }
      }, this));
    } else {
      this.$menu.off('keydown.lt.dropdown');
    }
  };

  Dropdown.prototype.dropdownFocus = function() {
    this.$menu.find('li:visible:first a').focus();
  };

  Dropdown.prototype.restoreFocus = function() {
    this.$btn.focus();
  };

  Dropdown.prototype.toggle = function() {
    if (this.isVisible()) {
      this.hide();
    } else {
      this.show();
    }
  };

  // Define jQuery plugin
  function Plugin(method) {
    return this.each(function() {
      var $toggle = $(this);
      var settings = $.extend({}, Plugin.defaults, $toggle.data(), typeof method === 'object' && method);

      var data = $toggle.data('lt.dropdown');
      if (!data) {
        data = new Dropdown(this, settings);
        $toggle.data('lt.dropdown', data);
      }
      if (typeof method === 'string') { data[method](); }
    });
  }

  Plugin.defaults = {
    onShow: function() {},
    onHide: function() {},
    esc: true
  };

  $.fn.dropdown = Plugin;

  // Events
  $(document).on('click.lt.dropdown', '[data-toggle="dropdown"]', function(e) {
    e.preventDefault();
    Plugin.call($(this), 'toggle');
  });

})(jQuery);
