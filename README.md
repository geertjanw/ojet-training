# Oracle JET Training Materials

The purpose of this script is to show how to put together a CRUD scenario in an Oracle JET application. You'll start by setting up [JSON Server, which is a fake REST server](https://scotch.io/tutorials/json-server-as-a-fake-rest-api-in-frontend-development), next you'll set up an Oracle JET application that connects to it and displays its payload, and finally you'll use the Composite Component Architecture to create a reusable custom element for displaying the payload in different modules and components, interacting with CRUD functionality defined in the application.

The application you'll create in this workshop will look as follows:

<table><tr><td>   
<img src="Screen%20Shot%202018-06-24%20at%2022.35.42.png" alt="alt text" width="500" height="420">
</td></tr></table>

#### Table of Contents

Part 1: Set Up the Environment
   * Getting the Node Package Manager
   * Getting Data
   * Getting Oracle JET

Part 2: Simple Usage of Oracle JET
   * Creating an Oracle JET Application
   * Showing Data in an Oracle JET Grid
   * Displaying the Selected Data in an Oracle JET Form

Part 3: Smart Usage of Oracle JET
   * Creating a CCA Component
   * Creating a Nested CCA Component
   * Creating CRUD Functionality

## Part 1: Set Up the Environment

All the activities in this section should be done on the command line in a Terminal window.

### (a) Getting the Node Package Manager

Node.js is a JavaScript runtime, which provides 'npm', that is, the Node Package Manager, that you will use in the sections that follow to set up the environment that you need.

To verify the Node Package Manager is installed, run the following, which should show you the version of the Node Package Manager:
```js #button { border: none; }   
npm -v
```

If version 5.6.0 or higher is not shown, you need to install the latest LTS version of Node.

Download and install the latest LTS version of Node from http://nodejs.org.

### (b) Getting Data

In this part, you set up the [JSON Server](https://scotch.io/tutorials/json-server-as-a-fake-rest-api-in-frontend-development) to publish mock data that will be visualized in the Oracle JET application that you'll create via the instructions that follow.

   1. Set up the JSON Server, as follows:
```js #button { border: none; }   
npm install -g json-server
```   
Details: https://github.com/typicode/json-server

   2. Download and put this file anywhere on disk:
   
https://github.com/geertjanw/ojet-training/blob/master/employeeData.json

   3. Run in the terminal: 
```js #button { border: none; }
json-server --watch employeeData.json
```
   4. Go to http://localhost:3000/employees and see your data via your fake REST endpoint:
   
<table><tr><td>   
<img src="Screen%20Shot%202018-06-21%20at%2015.15.15.png" alt="alt text" width="400" height="250">
</td></tr></table>

### (c) Getting Oracle JET

In this part, you install the Oracle JET command-line interface.

1. Install the Oracle JET command-line interface:

```js #button { border: none; }
npm install -g @oracle/ojet-cli
```

2. Run the following to check installation succeeded:

```js #button { border: none; }
ojet help
```

You should see this:

<table><tr><td>   
<img src="Screen%20Shot%202018-06-22%20at%2022.47.54.png" alt="alt text" width="400" height="250">
</td></tr></table>

You are now ready to get started with Oracle JET!
            
## Part 2: Simple Usage of Oracle JET

In this part, you set up a new Oracle JET application, explore the Oracle JET Cookbook, and set up a grid and form that display the data published in the previous part.
   
### (a) Creating an Oracle JET Application

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

4. Make a change in the 'dashboard.html' file and notice what happens in the browser, without needing to refresh.

### (b) Showing Data in an Oracle JET Grid

1. Explore the Oracle JET Cookbook: go to oraclejet.org, click 'Use Cookbook', and look around.

Especially, for purposes of these instructions, take a look at the ojDataGrid and CRUD scenarios:

http://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=crud&demo=CRUDGrid

http://www.oracle.com/webfolder/technetwork/jet/jsdocs/oj.ojDataGrid.html

In the above, look at the JS documentation, the description, variations, etc.

2. Here is a simple ojDataGrid, a simplified version of the above references. Copy it below and paste it into the 'dashboard.html' file in your application:

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

3. Above, notice that 'dataSource' is referenced, which you need to define in 'dashboard.js'. Copy/paste the following code for that purpose into 'dashboard.js' (paste it directly below the 'var self = this' statement):

```js #button { border: none; }
self.url = 'http://localhost:3000/employees';

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
```  

**Note:** In the above, we're making use of constructs that help you to quickly and effectively model and display your underlying data, in particular, [oj.Model](https://docs.oracle.com/cd/E86256_01/jet/reference-jet/oj.Model.html), [oj.Collection](https://docs.oracle.com/cd/E86256_01/jet/reference-jet/oj.Collection.html), and [oj.CollectionDataGridDataSource](https://docs.oracle.com/cd/E86256_01/jet/reference-jet/oj.CollectionDataGridDataSource.html). In turn, these concepts are based on Backbone syntax, e.g., [Backbone 'Collections'](http://backbonejs.org/#Model-Collections).

4. To use the 'ojDataGrid', reference the following at the end of the 'define' block of the 'dashboard.js' file:

```js #button { border: none; }
'ojs/ojdatagrid', 'ojs/ojcollectiondatagriddatasource'
```

5. Save your changes. In your application, you should now see this:

<table><tr><td>   
<img src="Screen%20Shot%202018-06-21%20at%2015.50.55.png" alt="alt text" width="400" height="250">
</td></tr></table>

**Tip:** For centralized management of your endpoints, create an 'endpoints.json' file in your 'src/js' folder, load it in a 'define' block as 'text!../endpoints.json', reference it as 'endpoints' in the callback function, and then replace hardcoded references with 'JSON.parse(endpoints).employees', assuming the file's content is as follows:

```js #button { border: none; }
{
    "employees": "http://localhost:3000/employees"
}
```

Be aware that the order in which the parameters are listed in a 'define' block must match the order in which they are referenced in the callback function, i.e., 'text!../endpoints.json' is 4th in the list in the define block and therefore its reference 'endpoints' must be 4th in the list in the callback function, as shown below:

```js #button { border: none; }
define(['ojs/ojcore', 'knockout', 'jquery', 'text!../endpoints.json', 
    'ojs/ojdatagrid', 'ojs/ojcollectiondatagriddatasource',
    'jet-composites/my-employee-form/loader'],
        function (oj, ko, $, endpoints) {
```

### (c) Displaying the Selected Data in an Oracle JET Form

1. Add properties, using Knockout Observables, to the 'dashboard.js' file:

```js #button { border: none; }
var nextKey = 121;
self.inputEmployeeID = ko.observable(nextKey);
self.inputFirstName = ko.observable();
self.inputLastName = ko.observable();
self.inputHireDate = ko.observable();
self.inputSalary = ko.observable();
```

2. Add code for updating the model when there are changes in the view:

```js #button { border: none; }
//build a new model from the observables in the form
self.buildModel = function () {
   return {
     'id': self.inputEmployeeID(),
     'FIRST_NAME': self.inputFirstName(),
     'LAST_NAME': self.inputLastName(),
     'HIRE_DATE': self.inputHireDate(),
     'SALARY': self.inputSalary()
   };
};

//used to update the fields based on the selected row:
self.updateFields = function (model) {
   self.inputEmployeeID(model.get('id'));
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

4. Back in 'dashboard.html', add an attribute to connect selection changes to your handler above:

```html #button { border: none; }
on-selection-changed="[[handleSelectionChanged]]"
```

5. Display the values of the selected row in the table via the form below, add it below the grid in 'dashboard.html':

```html #button { border: none; }
<oj-form-layout id="form-container" label-edge="top"> 
    <oj-input-text id="firstNameInput" label-hint="First Name" value="[[inputFirstName]]"></oj-input-text> 
    <oj-input-text id="lastNameInput" label-hint="Last Name" value="[[inputLastName]]"></oj-input-text> 
    <oj-input-text id="inputHireDate" label-hint="Date Hired" value="[[inputHireDate]]"></oj-input-text> 
    <oj-input-text id="inputSalary" label-hint="Salary" value="[[inputSalary]]"></oj-input-text> 
</oj-form-layout> 
```

6. To use the 'ojInputText' and 'ojDialog', reference the following at the end of the 'define' block of the 'dashboard.js' file:

```js #button { border: none; }
'ojs/ojinputtext', 'ojs/ojformlayout'
```

7. In your application, you should now see this, i.e., when a row is selected its values should be visible in the form:

<table><tr><td>   
<img src="Screen%20Shot%202018-06-21%20at%2016.02.46.png" alt="alt text" width="400" height="250">
</td></tr></table>
   
## Part 3: Smart Usage of Oracle JET

In this part, you create a reusable CCA component that follows the W3C Web Component specification.

### (a) Creating a CCA Component

We'll create a new CCA component, add properties, and express them as attributes in the view of a module.

1. In the Terminal, first kill the 'ojet' process, and then, in the root of your project, run the following:

```js #button { border: none; }
ojet create component my-employee-form
```

Take a look at your source structure, find the new 'my-employee-form' CCA component, and explore its structure.

2. Load the loader in the 'define' block of the ViewModel:

```js #button { border: none; }
'jet-composites/my-employee-form/loader'
```

3. Move the form-container (from step 5 in the previous section) into the 'my-employee-form-view.html' file of the 'my-employee-form' CCA component:

```html #button { border: none; }
<oj-form-layout id="form-container" label-edge="top"> 
    <oj-input-text id="firstNameInput" label-hint="First Name" value="[[inputFirstName]]"></oj-input-text> 
    <oj-input-text id="lastNameInput" label-hint="Last Name" value="[[inputLastName]]"></oj-input-text> 
    <oj-input-text id="inputHireDate" label-hint="Date Hired" value="[[inputHireDate]]"></oj-input-text> 
    <oj-input-text id="inputSalary" label-hint="Salary" value="[[inputSalary]]"></oj-input-text> 
</oj-form-layout> 
```

4. Move the references to 'ojs/ojinputtext' and 'ojs/ojformlayout' from the end of the 'define' block of the 'dashboard.js' file to the end of the 'define' block of the 'my-employee-form-viewModel.js' file.

5. In 'component.json', within your 'my-employee-form' CCA component, add content to the 'properties' section, like this:

```js #button { border: none; }
"properties": {
   "firstName": {
       "type":"string"
    },
    "lastName": {
       "type":"string"
     },
     "hireDate": {
        "type":"string"
     },
     "hireSalary": {
         "type":"number"
     }
  },
```

6. Back in the 'my-employee-form-view.html', reference the properties above via the '$props' construction:

```html #button { border: none; }
<oj-input-text id="firstNameInput" label-hint="First Name" value="[[$props.firstName]]"></oj-input-text> 
<oj-input-text id="lastNameInput" label-hint="Last Name" value="[[$props.lastName]]"></oj-input-text> 
<oj-input-text id="inputHireDate" label-hint="Date Hired" value="[[$props.hireDate]]"></oj-input-text> 
<oj-input-text id="inputSalary" label-hint="Salary" value="[[$props.hireSalary]]"></oj-input-text> 
```

**Tip:** What is "$props"? Use ''$props'' to reference properties that need to be visualized in the view of CCA components.

7. Use the 'my-employee-form' custom element a few times in 'dashboard.html', as shown below, instead of the form-container that you currently have there, then run 'ojet serve' in the Terminal again, and notice that you now see multiple forms.

```html #button { border: none; }
<my-employee-form></my-employee-form>
<my-employee-form></my-employee-form>
```

You can initialize the properties by using attributes with hyphens where the camelcase is used, e.g., the 'firstName' property is expressed as the 'first-name' attribute, shown below:

```html #button { border: none; }
<my-employee-form first-name='James' last-name='Smith'></my-employee-form>
<my-employee-form first-name='Sally'></my-employee-form>
```

You can refer to properties in the module so that when a row is selected in the grid, the view is automatically updated:

```html #button { border: none; }
<my-employee-form first-name='[[inputFirstName]]' last-name='[[inputLastName]]'></my-employee-form>
```

### (b) Creating a Nested CCA Component

In this part, we're going to reuse our CCA component inside a new CCA component, to provide a new view for the same type of data, i.e., employee data.

<table><tr><td>   
<img src="Screen%20Shot%202018-06-25%20at%2014.25.16.png" alt="alt text" width="500" height="420">
</td></tr></table>

1. Let's start by reusing the 'my-employee-form' CCA component in a different module, e.g., in the Incidents module, which consists of the 'incidents.html' and 'incidents.js' file. In the 'incidents.js' file, reference the CCA component at the end of the 'define' block:

```js #button { border: none; }
'jet-composites/my-employee-form/loader'
```
Next, create an Observable Array providing the data, in 'incidents.js':

```js #button { border: none; }
self.employees = ko.observableArray();
$.getJSON("http://localhost:3000/employees").
        then(function (data) {
            var tempArray = [];
            $.each(data, function () {
                tempArray.push({
                    empno: this.id,
                    name: this.FIRST_NAME,
                    lastname: this.LAST_NAME,
                    hiredate: this.HIRE_DATE,
                    salary: this.SALARY
                });
            });
            self.employees(tempArray);
        });
```
Next, display the CCA component for each of the 'employees', in 'incidents.html':
```html #button { border: none; }
<oj-bind-for-each data="[[employees]]"> 
      <template> 
             <my-employee-form 
                  first-name="[[$current.data.name]]" 
                  last-name="[[$current.data.lastname]]" 
                  hire-date="[[$current.data.hiredate]]" 
                  hire-salary="[[$current.data.salary]]"> 
             </my-employee-form> 
             <hr/> 
       </template> 
</oj-bind-for-each>
```

**Tip:** What is "$current.data"? Use "$current.data" to reference the current row and access its data.

Now, in the application, you should see an employee form for each iteration of the 'employees' array.

2. The HTML above is quite verbose, it could be expressed more compactly like this, assuming we had a CCA component named 'my-employee-container', which would automatically do the above for us:

```html #button { border: none; }
<my-employee-form-container data="[[employees]]"/>
```

3. In the Terminal, first kill the 'ojet' process, and then, in the root of your project, run the following:

```js #button { border: none; }
ojet create component my-employee-form-container
```

4. Similar as in the previous section, you now need to do the following:

   * load the 'loader.js' file from the 'my-employee-form-container' component into the ViewModel of a module, i.e., into 'incidents.js'
    * load the 'loader.js' file from the 'my-employee-form' component in the ViewModel of the 'my-employee-form-container' component, i.e., into the 'my-employee-form-container-viewModel.js', and note that you can now remove the reference to it from the 'incidents.js' file
   * add a property named 'data' of type 'array' to the 'component.json' file of the 'my-employee-form-container' component
   * move the View code from the module, i.e., from the 'incidents.html' file, into the 'my-employee-form-container-view.html' file and make sure to reference the 'data' property as '[[$props.data]]', instead of '[[employees]]'
   
5. Use the new custom element, i.e., 'my-employee-form-container', as follows in 'incidents.html':

```html #button { border: none; }
<my-employee-form-container data="[[employees]]"/>
```

Start the 'ojet serve' process again and note that you are now using a nested CCA component.

6. We can make the container CCA component more interesting by including an [ojCollapsible](http://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=collapsible&demo=basicCollapsible):

```html #button { border: none; }
<oj-bind-for-each data="[[$props.data]]">
    <template> 
        <oj-collapsible>
            <span slot="header">
                <span>
                    <oj-bind-text value="[[$current.data.empno]]"></oj-bind-text>
                </span>
            </span>
            <my-employee-form 
                first-name="[[$current.data.name]]" 
                last-name="[[$current.data.lastname]]" 
                hire-date="[[$current.data.hiredate]]" 
                hire-salary="[[$current.data.hiresalary]]"> 
            </my-employee-form>
        </oj-collapsible>
        <hr/> 
    </template>
</oj-bind-for-each>
```

**Note:** To do the above, you'll need to reference 'ojs/ojcollapsible' in the 'define' block of the CCA component's ViewModel.

### (c) Creating CRUD Functionality

We're going to create a 'slot' (i.e., a placeholder) in the 'my-employee-form' CCA component and, in some of the usages of the 'my-employee-form' CCA component, we will fill it with buttons for doing CRUD functionality, as shown below:

<table><tr><td>   
<img src="Screen%20Shot%202018-06-24%20at%2022.35.42.png" alt="alt text" width="500" height="420">
</td></tr></table>

   1. In the 'component.json' file of the 'my-employee-form' CCA component, define the 'slots' section as follows:

```js #button { border: none; }
"slots": {
    "toolbar": {
        "description":"Toolbar placed below employee form."
    }
}
```

   2. In 'my-employee-form-view.html', i.e., in the 'my-employee-form' CCA component, define where the slot will be rendered, e.g., below the form paste the following:
   
```html #button { border: none; }   
<div>
   <oj-slot name="toolbar"/>
</div>
```

We now have a slot for a toolbar and, in the Dashboard module, we'll add functionality for updating, deleting, and creating items. We'll not need this functionality in the Incidents module, where we're using the 'my-employee-form' together with the 'my-employee-form-container' simply as a view on our data.  

#### Update

The syntax introduced below is based on the [Backbone 'save' construction](http://backbonejs.org/#Model-save).

 1. Add a function to 'dashboard.js' for updating items:
   
```js #button { border: none; }  
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
```

 2. In 'dashboard.html', change the 'my-employee-form' usage to add a button into the 'toolbar' slot and to enable the 'update' function to be invoked when the button is clicked:
 
 ```html #button { border: none; }   
 <my-employee-form
    first-name='[[inputFirstName]]'
    last-name='[[inputLastName]]'
    hire-date='[[inputHireDate]]'
    hire-salary='[[inputSalary]]'>
    <span slot="toolbar">
        <oj-button on-click="[[update]]">Update</oj-button>
    </span>
</my-employee-form>
```

3. We need to enable the 'my-employee-form' CCA component to push changes back to the Dashboard module. Therefore, change the 'component.json' file in the 'my-employee-form' CCA component to have writeback properties, as shown below:

```js #button { border: none; }  
"properties": {
    "firstName": {
       "type":"string",
       "writeback":"true"
    },
    "lastName": {
       "type":"string",
       "writeback":"true"
     },
     "hireDate": {
        "type":"string",
        "writeback":"true"
     },
     "hireSalary": {
         "type":"number",
         "writeback":"true"
     }
  }
```

{{}}, instead of [[]], enables us to push observable value changes from the CCA component back to the variables defined in the Dashboard module. We're going to use this construction below, because now that we have set our properties to be 'writeback', we can change our bindings from read-only, i.e., [[]], to read-write {{}}.

Change the square braces in the view of the 'my-employee-form' component to curly braces because you want to not only display values but change the underlying properties too:

 ```html #button { border: none; }   
<oj-form-layout id="form-container" label-edge="top">
    <oj-input-text id="firstNameInput" label-hint="First Name" value="{{$props.firstName}}"></oj-input-text>
    <oj-input-text id="lastNameInput" label-hint="Last Name" value="{{$props.lastName}}"></oj-input-text>
    <oj-input-text id="inputHireDate" label-hint="Date Hired" value="{{$props.hireDate}}"></oj-input-text>
    <oj-input-text id="inputSalary" label-hint="Salary" value="{{$props.hireSalary}}"></oj-input-text>
</oj-form-layout>
```

Next, change the bindings in the 'my-employee-form' custom element, from square braces to curly braces, for each of the attributes, because now we want to change the underlying properties, instead of simply displaying their current values: 
 
 ```html #button { border: none; }   
 <my-employee-form
    first-name='{{inputFirstName}}'
    last-name='{{inputLastName}}'
    hire-date='{{inputHireDate}}'
    hire-salary='{{inputSalary}}'>
    <span slot="toolbar">
        <oj-button on-click="[[update]]">Update</oj-button>
    </span>
</my-employee-form>
```

4. In the application, try out your new Update functionality.

#### Delete

The syntax introduced below is based on the [Backbone 'remove' construction](http://backbonejs.org/#Collection-remove) and the [Backbone 'destroy' construction](http://backbonejs.org/#Model-destroy).

 1. Add a function to 'dashboard.js' for removing the current item:
   
```js #button { border: none; }  
self.remove = function () {
    self.modelToUpdate = self.collection.remove(self.buildModel());
    self.modelToUpdate.destroy();
};
```

2. In 'dashboard.html', change the 'my-employee-form' usage to add a button into the 'toolbar' slot and to enable the 'remove' function to be invoked when the button is clicked:

```html #button { border: none; }   
<my-employee-form
    first-name='{{inputFirstName}}'
    last-name='{{inputLastName}}'
    hire-date='{{inputHireDate}}'
    hire-salary='{{inputSalary}}'>
    <span slot="toolbar">
        <oj-button on-click="[[update]]">Update</oj-button>
        <oj-button on-click="[[remove]]">Delete</oj-button>
    </span>
</my-employee-form>
```
3. In the application, try out your new Delete functionality.

#### Create

The syntax introduced below is based on the [Backbone 'create' construction](http://backbonejs.org/#Collection-create).

   1. Add a function to 'dashboard.js' for creating new items:
   
```js #button { border: none; }   
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
```

  2. In 'dashboard.html', change the 'my-employee-form' usage to add a button into the 'toolbar' slot and to enable the 'add' function to be invoked when the button is clicked:

```html #button { border: none; }   
<my-employee-form
    first-name='{{inputFirstName}}'
    last-name='{{inputLastName}}'
    hire-date='{{inputHireDate}}'
    hire-salary='{{inputSalary}}'>
    <span slot="toolbar">
        <oj-button on-click="[[create]]">Create</oj-button>
        <oj-button on-click="[[update]]">Update</oj-button>
        <oj-button on-click="[[remove]]">Delete</oj-button>
    </span>
</my-employee-form>
```

3. In the application, try out your new Create functionality.


