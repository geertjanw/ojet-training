/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 
    'text!../endpoints.json',
    'ojs/ojdatagrid', 
    'ojs/ojcollectiondatagriddatasource',
    'my-employee-form/loader'],
        function (oj, ko, $, endpoints) {
            
            function DashboardViewModel() {
                var self = this;
                
                var nextKey = 121;
                self.inputEmployeeID = ko.observable(nextKey);
                self.inputFirstName = ko.observable();
                self.inputLastName = ko.observable();
                self.inputHireDate = ko.observable();
                self.inputSalary = ko.observable();
                
                self.buildModel = function () {
                    return {
                        'id': self.inputEmployeeID(),
                        'FIRST_NAME': self.inputFirstName(),
                        'LAST_NAME': self.inputLastName(),
                        'HIRE_DATE': self.inputHireDate(),
                        'SALARY': self.inputSalary()
                    };
                };

                self.updateFields = function (model) {
                    self.inputEmployeeID(model.get('id'));
                    self.inputFirstName(model.get('FIRST_NAME'));
                    self.inputLastName(model.get('LAST_NAME'));
                    self.inputHireDate(model.get('HIRE_DATE'));
                    self.inputSalary(model.get('SALARY'));
                };
                
                self.update = function () {
                    self.empl = self.collection.get(self.inputEmployeeID());
                    self.empl.save(self.buildModel(), {
                        contentType: 'application/json',
                        success: function (model, response) {
                            console.log(self.inputEmployeeID() + ' -- updated successfully')
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log(self.inputEmployeeID() + " -- " + jqXHR);
                        }
                    });
                };
                
                self.create = function (event) {
                    if (self.inputEmployeeID(nextKey) < nextKey) {
                        self.inputEmployeeID(nextKey);
                    }
                    nextKey += 1;
                    self.inputEmployeeID(nextKey);
                    self.collection.create(self.buildModel(), {
                        wait: true,
                        contentType: 'application/json',
                        success: function (model, response) {
                            console.log(self.inputEmployeeID() + ' -- new record created successfully')
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log(self.inputEmployeeID() + " -- " + jqXHR);
                        }
                    });
                };
                
                self.remove = function () {
                    self.modelToUpdate = self.collection.remove(self.buildModel());
                    self.modelToUpdate.destroy();
                };
                
                self.handleSelectionChanged = function (event) {
                    var selection = event.detail['value'][0];
                    if (selection != null) {
                        var rowKey = selection['startKey']['row'];
                        self.modelToUpdate = self.collection.get(rowKey);
                        self.updateFields(self.modelToUpdate);
                    }
                };
                
                self.url = JSON.parse(endpoints).employees;

                self.collection = new oj.Collection(null, {
                    model: new oj.Model.extend({
                        idAttribute: 'id',
                        urlRoot: self.url}),
                    url: self.url
                });

                self.dataSource = new oj.CollectionDataGridDataSource(
                        self.collection, {
                            rowHeader: 'id',
                            columns: ['FIRST_NAME', 'LAST_NAME', 'HIRE_DATE', 'SALARY']
                        });
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
            }

            /*
             * Returns a constructor for the ViewModel so that the ViewModel is constructed
             * each time the view is displayed.  Return an instance of the ViewModel if
             * only one instance of the ViewModel is needed.
             */
            return new DashboardViewModel();
        }
);
