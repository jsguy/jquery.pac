# jquery.pac

Prompt, Alert, Confirm integration for jQuery UI made easy.


## Installation

Include jQuery and jQuery UI, plus jquery.pac

```html
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
<script src="jquery.pac.js"></script>
```


## Usage

Each method can be used on an element, (as a "click" binder), or by itself.

This will alert when you click the ".hello" button

```javascript
$('button.hello').alert("Hello!");
```

This will imediately alert

```javascript
$.alert("Hello!");
```

You can also pass in an options object instead, if you want more control over the prompt, all options include:

* **text** {string} - The text to display to the user
* **title** {string} - Optionally set the title - "Prompt" by default
* **callback** {function} - A callback for when the user clicks either button, value is `true` if they clicked the "OK" button, `false` if they clicked the "cancel" button
* **yes** {function} - A callback for when the user clicks "OK" - is passed the jQuery object for the clicked element
* **no** {function} - A callback for when the user clicks "Cancel" - is passed the jQuery object for the clicked element
* **buttonOk** {String} - Optionally set the text for the "OK" button, defualt is "OK"
* **buttonCancel** {String} - Optionally set the text for the "Cancel" button, default is "Cancel"

The `yes`, `no` and `buttonCancel` options are only used for the `prompt` and `confirm` methods.

This example will imediately alert, with a custom title

```javascript
$.alert({
	title: "My fancy alert box",
	text: "Hello!"
});
```


## Prompt

The prompt method can simply prompt for a value to be input

```javascript
$('#p1').prompt("How many red balloons?", function(value, result){
	// value is the input, and result is true if they clicked the "OK" button, false if they clicked the "cancel" button.
});
```

This example prompts immediately, with a custom title

$.prompt({
	title: "You must enter the number of balloons",
	text: "How many red balloons would you like?",
	callback: function(value, result){
		// value is the input, and result is true if they clicked the "OK" button, false if they clicked the "cancel" button
	}
});


## Alert

The alert method can simply show a message in a dialog

```javascript
$.alert("Hello!");
```


## Confirm

The confirm method asks a "yes or no" question

```javascript
$('.confirm').confirm("You sure?", function(value){
	$.alert(value? "I'm glad you're sure!": "Ok, cancel it is!");
});
```

The confirm box works in a special way when applied to a link - if you apply it without a callback function, like so:

```javascript
$('.link').confirm("Do you really want to go there?");
```

Then it will not follow the link, unless the user clicks the "OK" button.

