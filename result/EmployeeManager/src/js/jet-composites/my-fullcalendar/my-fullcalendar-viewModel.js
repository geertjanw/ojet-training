/**
 Copyright (c) 2015, 2018, Oracle and/or its affiliates.
 The Universal Permissive License (UPL), Version 1.0
 */
'use strict';
define(
        ['knockout', 'jquery', 'ojL10n!./resources/nls/my-fullcalendar-strings', 'fullcalendar'], function (ko, $, componentStrings) {

    function ExampleComponentModel(context) {
        var self = this;

        var element = context.element;

        self.selectedDate = ko.observable();

        //At the start of your viewModel constructor
        var busyContext = oj.Context.getContext(context.element).getBusyContext();
        var options = {"description": "CCA Startup - Waiting for data"};
        self.busyResolve = busyContext.addBusyState(options);

        self.composite = context.element;

        //Example observable
        self.messageText = ko.observable('Hello from Example Component');

        self.properties = context.properties;
        self.res = componentStrings['my-fullcalendar'];
        // Example for parsing context properties
        // if (context.properties.name) {
        //     parse the context properties here
        // }

        //Once all startup and async activities have finished, relocate if there are any async activities
        self.busyResolve();

        self.date = ko.observable();

        function clickDay(event) {
            if (event.type === 'click' || (event.type === 'keypress' && event.keyCode === 13)) {
                var params = {
                    'bubbles': true,
                    'detail': {
                        'id': context.properties.id,
                        'date': self.selectedDate()
                    }
                };
                element.dispatchEvent(new CustomEvent('dayClick', params));
            }
        };

        function addListener() {
            element.addEventListener('click', clickDay);
            element.addEventListener('keypress', clickDay);
        };

        function removeListener() {
            element.removeEventListener('click', clickDay);
            element.removeEventListener('keypress', clickDay);
        };

        self.attached = function (context) {
            $('#' + context.properties.id).fullCalendar({
                dayClick: function (date) {
                    self.selectedDate(date.format());
                },
                selectable: true
            });
            addListener();
        };

        self.disconnected = function (context) {
            removeListener();
        };

    };

    //Lifecycle methods - uncomment and implement if necessary 
    //ExampleComponentModel.prototype.activated = function (context) {
    //};

    //ExampleComponentModel.prototype.connected = function (context) {
    //};

    //ExampleComponentModel.prototype.bindingsApplied = function (context) {
    //};

    //ExampleComponentModel.prototype.disconnect = function(context){
    //};

    //ExampleComponentModel.prototype.propertyChanged = function(context){
    //};

    return ExampleComponentModel;
});