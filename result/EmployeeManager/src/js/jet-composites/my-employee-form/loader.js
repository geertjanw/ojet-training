/**
  Copyright (c) 2015, 2018, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(['ojs/ojcomposite', 'text!./my-employee-form-view.html', './my-employee-form-viewModel', 'text!./component.json', 'css!./my-employee-form-styles', 'ojs/ojcomposite'],
  function(Composite, view, viewModel, metadata) {
    Composite.register('my-employee-form', {
      view: view, 
      viewModel: viewModel, 
      metadata: JSON.parse(metadata)
    });
  }
);