/*
    jquery.pac.js - Prompt, Alert, Confirm integration for jQuery UI made easy.
    Copyright (c) 2016 jsguy
    MIT licensed
 */
(function ($) {
    $.pac = $.pac || {};
    //  You can override these globally
    $.extend($.pac, {
        config: {
            buttonOKLabel: "OK",
            buttonCancelLabel: "Cancel",
            promptLabel: "Prompt",
            confirmLabel: "Confirm",
            alertLabel: "Alert"
        }
    });

    //  Allows you to propmpt the user for a value
    //
    $.prompt = function (text, cb, title, buttonOk, buttonCancel) {
        cb = cb || function () { };
        var $el = $(['<div>',
            '<div>' + text + '</div>', 
            '<div><input type="text" class="promptInput" value=""></div>',
            '</div>'
        ].join("\n"));
        $el.dialog({
            modal: true,
            title: title || $.pac.config.promptLabel,
            buttons: {
                "OK": {
                    text: buttonOk || $.pac.config.buttonOKLabel,
                    click: function () {
                        var $this = $(this),
                            value = $this.find(".promptInput").val();
                        $this.dialog("close");
                        cb(value, true);
                        //  Remove dialog
                        $el.parent(".ui-dialog").remove();
                    }
                },
                "Cancel": {
                    text: buttonCancel || $.pac.config.buttonCancelLabel,
                    click: function () {
                        $(this).dialog("close");
                        cb(null, false);
                        //  Remove dialog
                        $el.parent(".ui-dialog").remove();
                    }
                }
            }
        });
    };

    //  Allows you to propmpt the user for a value on click
    //
    //  Usage:
    //
    //      $('selector').prompt({ text: "Question", [title]: "Title", [yes]: function(){}, [no]: function(){}, [condition]: function(){} })
    //
    //  Where:
    //
    //      text {string} - The text to display to the user
    //      title {string} - Optionally set the title - "prompt" by default
    //      yes {function} - Optionally use a callback for when the user clicks "OK" - is passed the jQuery object for the clicked element
    //      no {function} - Optionally use a callback for when the user clicks "Cancel" - is passed the jQuery object for the clicked element
    //      condition {function} - Optionally returns boolean if we should apply the promptation or not.
    //      buttonOk {String} - Optionally set the text for the "OK" button, defualt is "OK"
    //      buttonCancel {String} - Optionally set the text for the "Cancel" button, default is "Cancel"
    //
    //
    //  $('.myLink').prompt({text: "How many?"});
    //
    //  $('.myLink').prompt({text: "How many?", title: "How many please"});
    //
    //  $('.myLink').prompt({text: "How many?", title: "How many please", yes: function($el){ ... User clicked OK ... }});
    //
    //  $('.myLink').prompt({text: "How many?", title: "How many please", yes: function($el){ ... User clicked OK ... }, no: function($el){ ... User clicked Cancel ... }});
    //
    //  $('.myLink').prompt({text: "How many?", title: "How many please", callback: function(value, result){ ... value = user entered, result = true if OK, false if cancel ... }});
    //  
    $.fn.prompt = function (args, callback) {
        args = args || {};
        if($.type(args) === "string") {
            args = {
                text: args
            };
        }
        $(this).each(function (idx, el) {
            $(el).click(function (e) {
                var showConfirm = $.isFunction(args.condition) ? args.condition() : true;
                if (showConfirm) {
                    e.preventDefault();
                    $.prompt($.isFunction(args.text) ? args.text() : args.text, function (value, result) {
                        callback = callback || args.callback;
                        if(callback) {
                            callback(value, result);
                        } else {
                            if (result) {
                                if (args.yes) {
                                    args.yes(value);
                                }
                            } else {
                                if (args.no) {
                                    args.no();
                                }
                            }
                        }
                    }, $.isFunction(args.title) ? args.title() : args.title);
                    return false;
                }
            });
        });
    };

    //  Allows you to display a modal message
    //
    //  $.alert("Something happen");
    //
    //  $.alert("Main screen turn on");
    //
    $.alert = function (text, title, callback) {
        var $el = $('<div>' + text + '</div>');
        $el.dialog({
            modal: true,
            title: title || $.pac.config.alertLabel,
            buttons: {
                "OK": {
                    text: $.pac.config.buttonOKLabel,
                    click: function () {
                        $(this).dialog("close");
                        if(callback) {
                            callback();
                        }
                        //  Remove dialog
                        $el.parent(".ui-dialog").remove();
                    }
                }
            }
        });
    };

    //  Allows you to display a message on click
    //
    //  Usage:
    //
    //      $('selector').alert({ text: "Message", [title]: "Title"})
    //
    //  Where:
    //
    //      text {string} - The message to display to the user
    //      title {string} - Optionally set the title - "Alert" by default
    //      
    //  $('#someElement').alert("Something happen");
    //
    //  $('#screenActivateButton').alert("Main screen turn on");
    //
    $.fn.alert = function (args, callback) {
        args = args || {};
        if($.type(args) === "string") {
            args = {
                text: args
            };
        }
        $(this).each(function (idx, el) {
            $(el).click(function (e) {
                e.preventDefault();
                $.alert($.isFunction(args.text) ? args.text(): args.text, $.isFunction(args.title) ? args.title(): args.title, callback);
                return false;
            });
        });
    };

    //  Allows you to confirm with the user if something should happen
    //
    //  $.confirm("You sure?", null, function(){
    //      $('#resendGuestEmailForm').submit();
    //  });
    //
    //  $.confirm("You sure?", "Confirm please", function(){
    //      $('#resendGuestEmailForm').submit();
    //  });
    //
    $.confirm = function (text, cb, title, buttonOk, buttonCancel) {
        cb = cb || function () { };
        var $el = $('<div>' + text + '</div>');
        $el.dialog({
            modal: true,
            title: title || $.pac.config.confirmLabel,
            buttons: {
                "OK": {
                    text: buttonOk || $.pac.config.buttonOKLabel,
                    click: function () {
                        $(this).dialog("close");
                        cb(true);
                        //  Remove dialog
                        $el.parent(".ui-dialog").remove();
                    }
                },
                "Cancel": {
                    text: buttonCancel || $.pac.config.buttonCancelLabel,
                    click: function () {
                        $(this).dialog("close");
                        cb(false);
                        //  Remove dialog
                        $el.parent(".ui-dialog").remove();
                    }
                }
            }
        });
    };

    //  Allows you to confirm if something should happen on click
    //  -   By default, if no function specified, we assume it is 
    //      from a link, and determines if the link should be followed
    //
    //  Usage:
    //
    //      $('selector').confirm({ text: "Question", [title]: "Title", [yes]: function(){}, [no]: function(){}, [condition]: function(){} })
    //
    //  Where:
    //
    //      text {string} - The text to display to the user
    //      title {string} - Optionally set the title - "confirm" by default
    //      yes {function} - Optionally use a callback for when the user clicks "OK" - is passed the jQuery object for the clicked element
    //      no {function} - Optionally use a callback for when the user clicks "Cancel" - is passed the jQuery object for the clicked element
    //      condition {function} - Optionally returns boolean if we should apply the confirmation or not.
    //      buttonOk {String} - Optionally set the text for the "OK" button, defualt is "OK"
    //      buttonCancel {String} - Optionally set the text for the "Cancel" button, default is "Cancel"
    //
    //
    //  $('.myLink').confirm({text: "You sure?"});
    //
    //  $('.myLink').confirm({text: "You sure?", title: "Confirm please"});
    //
    //  $('.myLink').confirm({text: "You sure?", title: "Confirm please", yes: function($el){ ... User clicked OK ... }});
    //
    //  $('.myLink').confirm({text: "You sure?", title: "Confirm please", yes: function($el){ ... User clicked OK ... }, no: function($el){ ... User clicked Cancel ... }});
    //
    //  $('.myLink').confirm({text: "You sure?", title: "Confirm please", callback: function(result){ ... result = true if OK, false if cancel ... }});
    //  
    $.fn.confirm = function (args, callback) {
        args = args || {};
        if($.type(args) === "string") {
            args = {
                text: args
            };
        }
        $(this).each(function (idx, el) {
            $(el).click(function (e) {
                var $this = $(this),
                    showConfirm = $.isFunction(args.condition) ? args.condition() : true;
                if (showConfirm) {
                    e.preventDefault();
                    $.confirm($.isFunction(args.text) ? args.text() : args.text, function (result) {
                        callback = callback || args.callback;
                        if(callback) {
                            callback(result);
                        } else {
                            if (result) {
                                if (args.yes) {
                                    args.yes($this);
                                } else if ($this.attr('href')) {
                                    document.location.href = $this.attr('href');
                                }
                            } else {
                                if (args.no) {
                                    args.no($this);
                                }
                            }
                        }
                    }, $.isFunction(args.text) ? args.text() : args.text);
                    return false;
                }
            });
        });
    };

}(window.jQuery || $));
