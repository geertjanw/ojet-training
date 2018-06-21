# Oracle JET Training Materials

The purpose of this script is to put together a CRUD scenario in an Oracle JET application. You'll start by setting up a fake REST server, next you'll set up an Oracle JET application that connects to it and displays its payload, and finally you'll use the Composite Component Architecture to create a reusable custom element for displaying the payload in different modules and components.

## Part 1: Set Up the Environment

In this part, you publish data that will be used in the other parts that follows.

   1. Set up the Fake REST Server: https://www.npmjs.com/package/fake-rest-server
   2. Download and put anywhere on disk: https://github.com/geertjanw/ojet-training/blob/master/employeeData.json
   3. Run in the terminal: 
```js #button { border: none; }
json-server --watch employeeData.json
```
   4. Go to http://localhost:3000/employees and see your data via your fake REST endpoint:
   
<table><tr><td>   
<img src="Screen%20Shot%202018-06-21%20at%2015.15.15.png" alt="alt text" width="400" height="250">
</td></tr></table>
            
## Part 2: Simple Usage of Oracle JET

In this part, you set up a new Oracle JET application, explore the Oracle JET Cookbook, and set up a grid and form that display the data published in the previous part.
   
### (a) Getting Started

Follow the instructions on the Getting Started page to install the ojet-cli:

http://www.oracle.com/webfolder/technetwork/jet/globalGetStarted.html

The above can be summarized to the following:

1. Download and install the latest LTS version of Node from http://nodejs.org.

2. Install the Oracle JET command line tool:

```js #button { border: none; }
npm install -g @oracle/ojet-cli
```

### (b) Creating an Oracle JET Application

1. Run the following in the terminal:

```js #button { border: none; }
ojet create EmployeeManager --template=navdrawer
```
2. CD into 'EmployeeManager' and run the following in the terminal and look in the browser:

```js #button { border: none; }
ojet serve
```

After a few moments, you should see this:

<table><tr><td>   
<img src="Screen%20Shot%202018-06-21%20at%2015.37.46.png" alt="alt text" width="400" height="250">
</td></tr></table>

3. In your editor, open the sources, explore the structure, and learn about what everything does.

4. Make a change in the 'Dashboard.html' file and notice what happens in the browser, without needing to refresh.

### (c) Showing Data in an Oracle JET Grid

1. Explore the Oracle JET Cookbook: go to oraclejet.org, click 'Use Cookbook', and look around.

Especially, for purposes of these instructions, take a look at the ojDataGrid and CRUD scenarios:

http://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=crud&demo=CRUDGrid

http://www.oracle.com/webfolder/technetwork/jet/jsdocs/oj.ojDataGrid.html

In the above, look at the JS documentation, the description, variations, etc.

2. Here is a simple ojDataGrid, a simplified version of the above references. Copy it below and paste it into the 'Dashboard.html' file in your application:

```html #button { border: none; }
<oj-data-grid 
     id="datagrid" 
     style="height:200px; max-width:477px" 
     data="[[dataSource]]" 
     selection-mode.row="single" 
     dnd.reorder.row="enable" 
     header.column.style="width:100px" > 
</oj-data-grid>
```

3. Above, notice that 'dataSource' is referenced, which you need to define in 'Dashboard.js' copy/paste the following code for that purpose:

```js #button { border: none; }
self.collection = new oj.Collection(null, {
   model: new oj.Model.extend({idAttribute: 'EMPLOYEE_ID'}),
   url: 'http://localhost:3000/employees'
});

self.dataSource = new oj.CollectionDataGridDataSource(
   self.collection, {
      rowHeader: 'EMPLOYEE_ID',
      columns: ['FIRST_NAME', 'LAST_NAME', 'HIRE_DATE', 'SALARY']
   });
```   

4. To use the 'ojDataGrid', reference the following in the 'define' block of the 'Dashboard.js' file:

```js #button { border: none; }
'ojs/ojdatagrid', 'ojs/ojcollectiondatagriddatasource'
```

5. In your application, you should now see this:

<table><tr><td>   
<img src="Screen%20Shot%202018-06-21%20at%2015.50.55.png" alt="alt text" width="400" height="250">
</td></tr></table>

### (c) Displaying the Selected Data in an Oracle JET Form

1. Add properties, using Knockout Observables, to the 'Dashboard.js' file:

```js #button { border: none; }
var nextKey = 121;
self.inputEmployeeID = ko.observable(nextKey);
self.inputFirstName = ko.observable('Jane');
self.inputLastName = ko.observable('Doe');
self.inputHireDate = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date()));
self.inputSalary = ko.observable(15000);
```

2. Add code for updating the model when there are changes in the view:

```js #button { border: none; }
//build a new model from the observables in the form
self.buildModel = function () {
   return {
     'EMPLOYEE_ID': self.inputEmployeeID(),
     'FIRST_NAME': self.inputFirstName(),
     'LAST_NAME': self.inputLastName(),
     'HIRE_DATE': self.inputHireDate(),
     'SALARY': self.inputSalary()
   };
};

//used to update the fields based on the selected row:
self.updateFields = function (model) {
   self.inputEmployeeID(model.get('EMPLOYEE_ID'));
   self.inputFirstName(model.get('FIRST_NAME'));
   self.inputLastName(model.get('LAST_NAME'));
   self.inputHireDate(model.get('HIRE_DATE'));
   self.inputSalary(model.get('SALARY'));
};
```

3. Create a selection handler that you'll be referencing in the grid:

```js #button { border: none; }
self.handleSelectionChanged = function (event) {
     var selection = event.detail['value'][0];
     if (selection != null) { 
         var rowKey = selection['startKey']['row'];
         self.modelToUpdate = self.collection.get(rowKey);
         self.updateFields(self.modelToUpdate);
     }
};
```

4. Back in 'Dashboard.html', add an attribute to connect selection changes to your handler above:

```html #button { border: none; }
on-selection-changed="[[handleSelectionChanged]]"
```

5. Display the values of the selected row in the table via the form below, add it below the grid in 'Dashboard.html':

```html #button { border: none; }
<oj-form-layout id="form-container" label-edge="top"> 
    <oj-input-text id="firstNameInput" label-hint="First Name" value="[[inputFirstName]]"></oj-input-text> 
    <oj-input-text id="lastNameInput" label-hint="Last Name" value="[[inputLastName]]"></oj-input-text> 
    <oj-input-text id="inputHireDate" label-hint="Date Hired" value="[[inputHireDate]]"></oj-input-text> 
    <oj-input-text id="inputSalary" label-hint="Salary" value="[[inputSalary]]"></oj-input-text> 
</oj-form-layout> 
```

6. Include a reference to 'ojs/ojinputtext' and to 'ojs/ojformlayout' in the 'define' block of 'Dashboard.js'.

7. In your application, you should now see this, i.e., when a row is selected its values should be visible in the form:

<table><tr><td>   
<img src="Screen%20Shot%202018-06-21%20at%2016.02.46.png" alt="alt text" width="400" height="250">
</td></tr></table>
   
## Day 3: Smart Usage of Oracle JET

In this part, you create a reusable CCA component that follows the W3C Web Component specification.

### (a) Getting Started

1. In the Terminal, in the root of your project, run the following:

```js #button { border: none; }
ojet create component my-employee-form
```

2. Take a look at your source structure and find the new 'my-employee-form' CCA component.

3. Load the loader into the ViewModel, declare the new custom element in the View, then look in the browser and notice the message from the CCA component.

4. Move the form-container into the HTML view of the 'my-employee-form' CCA component:

```html #button { border: none; }
<oj-form-layout id="form-container" label-edge="top"> 
    <oj-input-text id="firstNameInput" label-hint="First Name" value="[[inputFirstName]]"></oj-input-text> 
    <oj-input-text id="lastNameInput" label-hint="Last Name" value="[[inputLastName]]"></oj-input-text> 
    <oj-input-text id="inputHireDate" label-hint="Date Hired" value="[[inputHireDate]]"></oj-input-text> 
    <oj-input-text id="inputSalary" label-hint="Salary" value="[[inputSalary]]"></oj-input-text> 
</oj-form-layout> 
```

5. Declare the 'my-employee-form' custom element a few times in 'Dashboard.html', instead of the form-container that you currently have there, and notice that you now see multiple charts.

```html #button { border: none; }
<my-employee-form></my-employee-form>
<my-employee-form></my-employee-form>
```

### (b) Setting Properties

1. In 'component.json', add a 'chartType' property:

```js #button { border: none; }
"properties": {
    "chartType": {
        "type": "string"
    }
},
```

2. In 'dashboard.html', use the property in your 'my-chart' custom elements:

```html #button { border: none; }
<my-chart chart-type="bar"></my-chart>
<my-chart chart-type="pie"></my-chart>
```

3. In 'my-chart-viewmodel.js', create a new Knockout property that is initialized by the custom element's context, i.e., by 'bar' and by 'pie' in the two examples above:

```js #button { border: none; }
self.chartType = ko.observable(context.properties.chartType);
```

4. In 'my-chart-view.html', change the value of the combobox to '{{chartType}}' and the type of the chart to '[[chartType]]'.

5. After the above works correctly, replace some of the other properties in the CCA component so that they can be set from the Dashboard module.

