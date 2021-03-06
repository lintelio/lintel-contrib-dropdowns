lintel-contrib-dropdowns
========================

> Dropdowns for lintel.

[![npm](https://img.shields.io/npm/v/lintel-contrib-dropdowns.svg)](https://www.npmjs.com/package/lintel-contrib-dropdowns)
[![Bower](https://img.shields.io/bower/v/lintel-contrib-dropdowns.svg)](https://github.com/lintelio/lintel-contrib-dropdowns)


## Getting Started
This module requires Lintel.

If you haven't used [Lintel](http://lintel.io/) before, be sure to check out the [Getting Started](http://lintel.io/getting-started) guide, as it explains how to install and use this module. Once you're familiar with that process, you may install this module with this command:

```shell
bower install lintel-contrib-dropdowns --save
```

Once the module has been installed, you will have to load it in your main SASS file:

```scss
@import "bower_components/lintel-contrib-dropdowns/sass/dropdowns.scss"
```

This module also includes a JavaScript component, which you will have to load separately.

```html
<script src="bower_components/lintel-contrib-dropdowns/dist/dropdowns.min.js" type="text/javascript"></script>
```

You can use [wiredep](https://github.com/taptapship/wiredep) or [grunt-wiredep](https://github.com/stephenplusplus/grunt-wiredep) to automatically inject files in your build process.


## Variables
Check the vars file in the `sass` folder to see the full list of variables you can customize.

#### $dropdown-*
Variables relating to the dropdown list.

#### $dropdown-item-*  
Variables relating to individual items (`<a>`s).

#### $dropdown-divider-*
Variables related to the dropdown divider.


## JavaScript

### Options

Name      | Type                           | Default             | Description
--------- | ------------------------------ | ------------------- | -----------
onShow    | function                       |                     | Callback function to execute every time dropdown is shown.
onHide    | function                       |                     | Callback function to execute every time dropdown is hidden.
esc       | boolean                        | true                | Close modal on escape key.


### Methods

Name      | Description
--------- | -----------
toggle    | Toggle dropdown. 
show      | Show dropdown. 
hide      | Hide modal.


### Events

Event                | Description
-------------------- | ------------------------------
show.lt.dropdown     | Fires immediately before dropdown is shown. Can prevent dropdown from showing here.
shown.lt.dropdown    | Fires immediately after dropdown is shown.
hide.lt.dropdown     | Fires immediately before dropdown is hidden. Can prevent dropdown from hiding here.
hidden.lt.dropdown   | Fires immediately after dropdown is hidden.


### Data-attr
Add `data-toggle="dropdown"` to the `.btn-dropdown-toggle`.
You can add additional options as data-attributes.

```html
<div class="btn-group">
  <button class="btn btn-dropdown-toggle" data-toggle="dropdown" type="button" aria-haspopup="true" aria-expanded="false">
    Dropdown
    <span class="btn-caret" aria-hidden="true"></span>
  </button>
  <ul class="dropdown" role="menu">
    ...
  </ul>
</div>
```


### jQuery
Call the jQuery plugin on the modal, passing in any options and the related target (button).

```js
var options = {
  onShow: function(menu, button) {
    console.log('onShow', this, menu, button);
  },
  onHide: function(menu, button) {
    console.log('onHide', this, menu, button);
  },
  esc: false
};

$('#myButton').click(function(e) {
  $(this).dropdown(options);  // this == #myButton
});
```

Alternatively, you can use the default options:
```js
$('#myButton').click(function(e) {
  $(this).dropdown('toggle'); // this == #myButton
});
```


## Examples

#### Single Dropdown
```html
<div class="btn-group">
  <button class="btn btn-dropdown-toggle" type="button" aria-expanded="false">
    Dropdown
    <span class="btn-caret" aria-hidden="true"></span>
  </button>
  <ul class="dropdown" role="menu">
    <li><a href="#">Action 1</a></li>
    <li><a href="#">Action 2</a></li>
    <li><a href="#">Action 3</a></li>
  </ul>
</div>
```

#### Split Dropdown
```html
<div class="btn-group">
  <button class="btn" type="button" aria-expanded="false">Split Dropdown</button>
  <button class="btn btn-dropdown-toggle" type="button" aria-label="More Options"><span class="btn-caret" aria-hidden="true"></span></button>
  <ul class="dropdown" role="menu">
    <li><a href="#">Action 1</a></li>
    <li><a href="#">Action 2</a></li>
    <li><a href="#">Action 3</a></li>
    <li class="dropdown-divider"></li>
    <li><a href="#">Alt Action 1</a></li>
  </ul>
</div>
```

#### Open Dropdown
The javascript component of this library will take care of the `.open` and `aria-expanded` property.
```html
<div class="btn-group open">
  <button class="btn btn-dropdown-toggle" type="button" aria-expanded="true">...</button>
  ...
</div>
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).


## License
Copyright (c) 2015 Marius Craciunoiu. Licensed under the MIT license.
