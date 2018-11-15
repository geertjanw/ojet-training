/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your customer ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery',
  'ojs/ojinputtext', 'ojs/ojformlayout', 'ojs/ojavatar', 'ojs/ojlistview',
  'ojs/ojcollectiontabledatasource', 'ojs/ojmodel'],
 function(oj, ko, $) {
  
    function CustomerViewModel() {
      var self = this;
      var self = this;
      var nextKey = 121;
      self.inputEmployeeID = ko.observable(nextKey);
      self.inputFirstName = ko.observable();
      self.inputLastName = ko.observable();
      self.inputHireDate = ko.observable();
      self.inputSalary = ko.observable();
      self.inputImage = ko.observable();

      self.url = 'http://localhost:3000/employees';

      self.collection = new oj.Collection(null, {
        model: new oj.Model.extend({
          idAttribute: 'id',
          urlRoot: self.url
        }),
        url: self.url
      });

      self.dataSourceTable = new oj.CollectionTableDataSource(
        self.collection, null);

      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here. 
       * This method might be called multiple times - after the View is created 
       * and inserted into the DOM and after the View is reconnected 
       * after being disconnected.
       */
      self.connected = function () {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      self.disconnected = function () {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      self.transitionCompleted = function () {
        // Implement if needed
      };

      //build a new model from the observables in the form
      self.buildModel = function () {
            return {
                'id': self.inputEmployeeID(),
                'FIRST_NAME': self.inputFirstName(),
                'LAST_NAME': self.inputLastName(),
                'HIRE_DATE': self.inputHireDate(),
                'SALARY': self.inputSalary(),
                'Image': self.inputImage()
            };
        };

      //used to update the fields based on the selected row:
      self.updateFields = function (model) {
                    self.inputEmployeeID(model.get('id'));
                    self.inputFirstName(model.get('FIRST_NAME'));
                    self.inputLastName(model.get('LAST_NAME'));
                    self.inputHireDate(model.get('HIRE_DATE'));
                    self.inputSalary(model.get('SALARY'));
                    self.inputImage(model.get('Image'));
                };

      self.handleListSelectionChanged = function (event) {
        var selection = event.detail.value;
        if (selection != null) {
          self.modelToUpdate = self.collection.get(selection);
          self.updateFields(self.modelToUpdate);
        }
      };
      
    }
    
    return new CustomerViewModel();
    
  }
          
);
