# Workshop: Web Component Development with Oracle JET

The purpose of this script is to show how to put together a CRUD scenario in an Oracle JET application by means of Web Components. You'll start by setting up [JSON Server, which is a fake REST server](https://scotch.io/tutorials/json-server-as-a-fake-rest-api-in-frontend-development), next you'll set up an Oracle JET application that connects to it and displays its payload, and finally you'll use the Composite Component Architecture (CCA) to create a reusable Web Component for displaying the payload in different modules, interacting with CRUD functionality defined in the application.

**Tip:** Go here to follow a free three week MOOC about Oracle JET: [oracle.com/goto/jet](https://www.oracle.com/goto/jet).

**Troubleshooting:** If you run into problems, go here for the completed source files: [bit.ly/learn-jet-result](http://bit.ly/learn-jet-result)

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
   * Creating a Web Component
   * Creating a Nested Web Component
   * Creating CRUD Functionality
   
Part 4: Advanced Usage of Oracle JET   
   * Centralized Data Management
   * Filtering
   * Internationalization

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
   
https://raw.githubusercontent.com/geertjanw/ojet-training/master/employeeData.json

**Tip:** Do not put the above file in an Oracle JET application, instead, put it somewhere completely separate, e.g., on your Desktop, and run the command below in the Terminal window from the location of the employeeData.json file.

   3. Run in the Terminal window: 
```js #button { border: none; }
json-server --watch employeeData.json
```
   4. Go to http://localhost:3000/employees and see your data via your fake REST endpoint:
   
<table><tr><td>   
<img src="Screen%20Shot%202018-06-21%20at%2015.15.15.png" alt="alt text" width="400" height="250">
</td></tr></table>

**Tip:** Optionally, follow the steps at http://bit.ly/jet-api to use Oracle Apiary, which is a part of Oracle API Platform Cloud Service, to design an API. Name your new API Project *employees*, copy the content from https://github.com/geertjanw/ojet-training/blob/master/employeeData.json, and following the instructions, your *get* API should be something like http://private-cdb8cc-employees3.apiary-mock.com/questions. The JavaScript code to be integrated in the instructions that follow, is also provided, as explained at http://bit.ly/jet-api. Make sure to use the Mock Server, as explained at http://bit.ly/jet-api, which will give you the same functionality as provided by the [JSON Server](https://scotch.io/tutorials/json-server-as-a-fake-rest-api-in-frontend-development).

### (c) Getting Oracle JET

In this part, you install the Oracle JET 6.0.0 command-line interface.

1. Install the Oracle JET command-line interface:

```js #button { border: none; }
npm install -g @oracle/ojet-cli
```

2. Run the following to check installation succeeded and to see the available commands:

```js #button { border: none; }
ojet help
```

You should see this:

<table><tr><td>   
<img src="Screen%20Shot%202018-06-22%20at%2022.47.54.png" alt="alt text" width="400" height="250">
</td></tr></table>

3. Run the following to check that you have the correct version of Oracle JET:

```js #button { border: none; }
ojet --version
```

You should see this:

```html #button { border: none; }
Oracle JET Command Line Interface, version: 6.0.0
```

**Tip:** If you have a different version of the Oracle JET command-line interface, please reinstall, using the command in step 1 above to do so.

You are now ready to get started with Oracle JET!
            
## Part 2: Simple Usage of Oracle JET

In this part, you set up a new Oracle JET application, explore the Oracle JET Cookbook, and set up a grid and form that display the data published in the previous part.
   
### (a) Creating an Oracle JET Application

1. Run the following in the terminal:

```js #button { border: none; }
ojet create EmployeeManager --template=navdrawer
```
**Note:** This process may take some time.

2. CD into 'EmployeeManager' and run the following in the terminal and look in the browser:

```js #button { border: none; }
ojet serve
```

After a few moments, you should see this:

<table><tr><td>   
<img src="Screen%20Shot%202018-06-21%20at%2015.37.46.png" alt="alt text" width="400" height="250">
</td></tr></table>

3. In your editor, open the sources, explore the structure, and learn about what everything does.

4. Make a change in the 'src/js/views/dashboard.html' file and notice what happens in the browser, without needing to refresh.

### (b) Showing Data in an Oracle JET Grid

1. Explore the Oracle JET Cookbook: go to oraclejet.org, click 'Use Cookbook', and look around.

Especially, for purposes of these instructions, take a look at the ojDataGrid and CRUD scenarios:

http://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=crud&demo=CRUDGrid

http://www.oracle.com/webfolder/technetwork/jet/jsdocs/oj.ojDataGrid.html

In the above, look at the JS documentation, the description, variations, etc.

2. Here is a simple ojDataGrid, a simplified version of the above references. Copy it below and paste it into the 'dashboard.html' file in your application (make sure you are editing only files under /src directory):

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

3. Above, notice that 'dataSource' is referenced, which you need to define in 'src/js/viewmodels/dashboard.js'. Copy/paste the following code for that purpose into 'src/js/viewmodels/dashboard.js' (paste it directly below the 'var self = this' statement):

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

4. To use the 'ojDataGrid', reference the following at the end of the dependency list passed into the define() call of the 'dashboard.js' file:

```js #button { border: none; }
'ojs/ojdatagrid', 'ojs/ojcollectiondatagriddatasource'
```

5. Save your changes. In your application, you should now see this:

<table><tr><td>   
<img src="Screen%20Shot%202018-06-21%20at%2015.50.55.png" alt="alt text" width="400" height="250">
</td></tr></table>

**Tip:** Optionally, for centralized management of your endpoints, create an 'endpoints.json' file in your 'src/js' folder, load it in the dependency list passed into the define() call as 'text!../endpoints.json', reference it as 'endpoints' in the callback function, and then replace hardcoded references to http://localhost:3000/employees with 'JSON.parse(endpoints).employees', assuming the file's content is as follows:

```js #button { border: none; }
{
    "employees": "http://localhost:3000/employees"
}
```

**Note:** Be aware that the order in which the parameters are listed in the dependency list passed into the define() call must match the order in which they are referenced in the callback function, i.e., 'text!../endpoints.json' is 4th in the list in the dependency list passed into the define() call and therefore its reference 'endpoints' must be 4th in the list in the callback function, as shown below:

```js #button { border: none; }
define(['ojs/ojcore', 'knockout', 'jquery', 'text!../endpoints.json', 
    'ojs/ojdatagrid', 'ojs/ojcollectiondatagriddatasource'],
        function (oj, ko, $, endpoints) {
```

What does 'text!' mean? That's the protocol defined by https://github.com/requirejs/text, which is part of Oracle JET, used for loading text resources, such as 'endpoints.json'.

After adding new files, first kill the 'ojet' process in the Terminal window, using Ctrl-C, and then restart it. The 'watch' process, provided by 'ojet', will only look for changes to existing files; it will not build and re-serve new files.

### (c) Displaying the Selected Data in an Oracle JET Form

In this section, you'll add a form that will display the values of the currently selected row, as shown here:

<table><tr><td>   
<img src="Screen%20Shot%202018-06-21%20at%2016.02.46.png" alt="alt text" width="400" height="250">
</td></tr></table>

1. Add properties, using [Knockout observables](http://knockoutjs.com/documentation/observables.html), to the 'dashboard.js' file:

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

6. To use the 'ojInputText' and 'ojDialog', reference the following at the end of the dependency list passed into the define() call of the 'dashboard.js' file:

```js #button { border: none; }
'ojs/ojinputtext', 'ojs/ojformlayout'
```

7. In your application, you should now see this, i.e., when a row is selected its values should be visible in the form:

<table><tr><td>   
<img src="Screen%20Shot%202018-06-21%20at%2016.02.46.png" alt="alt text" width="400" height="250">
</td></tr></table>
   
## Part 3: Smart Usage of Oracle JET

In this part, you create a reusable Web Component that follows the W3C Web Component specification. 

### (a) Creating a Web Component

We'll start by creating a new Web Component, add properties, and express them as attributes in the view of a module, by means of a new custom element. Wouldn't it be great if you could express the form that you defined in step 5 above, as below instead? That's what you're going to learn about in this section.

```html #button { border: none; }
<my-employee-form first-name='[[inputFirstName]]' last-name='[[inputLastName]]'></my-employee-form>
```

1. In the Terminal window, first kill the 'ojet' process, using Ctrl-C. This is because you will be adding new files in this section. Whenever you add new files, first kill the 'ojet' process in the Terminal window, using Ctrl-C, and then, after creating new files as in step 2 below, restart the 'ojet' process via 'ojet serve'. The 'watch' process, provided by 'ojet', will only look for changes to existing files; it will not build and re-serve new files.

2. In the root of your project, run the following:

```js #button { border: none; }
ojet create component my-employee-form
```

Take a look at your source structure, find the new 'my-employee-form' Web Component, and explore its structure.

3. Load the loader, i.e., 'my-employee-form/loader', at the end of the dependency list passed into the define() call of the 'dashboard.js', as shown below:

```js #button { border: none; }
define(['ojs/ojcore', 'knockout', 'jquery', 
    'text!../endpoints.json',
    'ojs/ojdatagrid', 
    'ojs/ojcollectiondatagriddatasource',
    'ojs/ojinputtext', 
    'ojs/ojformlayout', 
    'my-employee-form/loader']
```

4. Move the form-container (from step 5 in the previous section) into the 'my-employee-form-view.html' file of the 'my-employee-form' Web Component:

```html #button { border: none; }
<oj-form-layout id="form-container" label-edge="top"> 
    <oj-input-text id="firstNameInput" label-hint="First Name" value="[[inputFirstName]]"></oj-input-text> 
    <oj-input-text id="lastNameInput" label-hint="Last Name" value="[[inputLastName]]"></oj-input-text> 
    <oj-input-text id="inputHireDate" label-hint="Date Hired" value="[[inputHireDate]]"></oj-input-text> 
    <oj-input-text id="inputSalary" label-hint="Salary" value="[[inputSalary]]"></oj-input-text> 
</oj-form-layout> 
```

5. Move the references to 'ojs/ojinputtext' and 'ojs/ojformlayout' from the end of the dependency list passed into the define() call of the 'dashboard.js' file to the end of the dependency list passed into the define() call of the 'my-employee-form-viewModel.js' file.

6. In 'component.json', within your 'my-employee-form' Web Component, add content to the 'properties' section, like this:

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

7. Back in the 'my-employee-form-view.html', reference the properties above via the '$props' construction:

```html #button { border: none; }
<oj-input-text id="firstNameInput" label-hint="First Name" value="[[$props.firstName]]"></oj-input-text> 
<oj-input-text id="lastNameInput" label-hint="Last Name" value="[[$props.lastName]]"></oj-input-text> 
<oj-input-text id="inputHireDate" label-hint="Date Hired" value="[[$props.hireDate]]"></oj-input-text> 
<oj-input-text id="inputSalary" label-hint="Salary" value="[[$props.salary]]"></oj-input-text> 
```

**Tip:** What is "$props"? Use ''$props'' to reference properties that need to be visualized in the view of Web Components.

8. Use the 'my-employee-form' custom element a few times in 'dashboard.html', as shown below, instead of the form-container that you currently have there, then run 'ojet serve' in the Terminal again, and notice that you now see multiple forms.

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

**Note:** Remember to run 'ojet serve' to serve the application, since you killed the 'ojet' process in step 1 of this section.

### (b) Creating a Nested Web Component

In this part, we're going to reuse our Web Component inside a new Web Component, to provide a new view for the same type of data, i.e., employee data.

<table><tr><td>   
<img src="Screen%20Shot%202018-06-25%20at%2014.25.16.png" alt="alt text" width="500" height="420">
</td></tr></table>

1. Let's start by reusing the 'my-employee-form' Web Component in a different module, e.g., in the Incidents module, which consists of the 'incidents.html' and 'incidents.js' file. In the 'incidents.js' file, reference the Web Component at the end of the dependency list passed into the define() call:

```js #button { border: none; }
'my-employee-form/loader'
```
Next, create a [Knockout observable array](http://knockoutjs.com/documentation/observableArrays.html) providing the data, in 'incidents.js':

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
Next, display the Web Component for each of the 'employees', in 'incidents.html':
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

2. The HTML above is quite verbose, it could be expressed more compactly like this, assuming we had a Web Component named 'my-employee-container', which would automatically do the above for us:

```html #button { border: none; }
<my-employee-form-container data="[[employees]]"/>
```

3. In the Terminal window, first kill the 'ojet' process, using Ctrl-C, and then, in the root of your project, run the following:

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

Start the 'ojet serve' process again and note that you are now using a nested Web Component.

6. We can make the container Web Component more interesting by including an [ojCollapsible](http://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=collapsible&demo=basicCollapsible):

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

**Note:** To do the above, you'll need to reference 'ojs/ojcollapsible' in the dependency list passed into the define() call of the Web Component's ViewModel.

### (c) Creating CRUD Functionality

We're going to create a 'slot' (i.e., a placeholder) in the 'my-employee-form' Web Component and, in some of the usages of the 'my-employee-form' Web Component, we will fill it with buttons for doing CRUD functionality, as shown below:

<table><tr><td>   
<img src="Screen%20Shot%202018-06-24%20at%2022.35.42.png" alt="alt text" width="500" height="420">
</td></tr></table>

   1. In the 'component.json' file of the 'my-employee-form' Web Component, define the 'slots' section as follows:

```js #button { border: none; }
"slots": {
    "toolbar": {
        "description":"Toolbar placed below employee form."
    }
}
```

   2. In 'my-employee-form-view.html', i.e., in the 'my-employee-form' Web Component, define where the slot will be rendered, e.g., below the form paste the following:
   
```html #button { border: none; }   
<div>
   <oj-slot name="toolbar"/>
</div>
```
   3. In 'my-employee-form-view.js', add a reference to the ojs/ojbutton module to the end of the dependency list passed into a define() call:
   
```js #button { border: none; }   
define(['ojs/ojcore', 'knockout', 'jquery', 
    'text!../endpoints.json',
    'ojs/ojdatagrid', 
    'ojs/ojcollectiondatagriddatasource',
    'ojs/ojinputtext', 
    'ojs/ojformlayout', 
    'my-employee-form/loader',
    'ojs/ojbutton']
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
        <oj-button on-oj-action="[[update]]">Update</oj-button>
    </span>
</my-employee-form>
```

**Note:** You could use on-click instead of on-oj-action, though note that on-oj-action has built-in accessibility across devices.

3. We need to enable the 'my-employee-form' Web Component to push changes back to the Dashboard module. Therefore, change the 'component.json' file in the 'my-employee-form' Web Component to have writeback properties, as shown below:

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

{{}}, instead of [[]], enables us to push observable value changes from the Web Component back to the variables defined in the Dashboard module. We're going to use this construction below, because now that we have set our properties to be 'writeback', we can change our bindings from read-only, i.e., [[]], to read-write {{}}.

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
        <oj-button on-oj-action="[[update]]">Update</oj-button>
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
        <oj-button on-oj-action="[[update]]">Update</oj-button>
        <oj-button on-oj-action="[[remove]]">Delete</oj-button>
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
        <oj-button on-oj-action="[[create]]">Create</oj-button>
        <oj-button on-oj-action="[[update]]">Update</oj-button>
        <oj-button on-oj-action="[[remove]]">Delete</oj-button>
    </span>
</my-employee-form>
```

3. In the application, try out your new Create functionality.

## Part 4: Advanced Usage of Oracle JET

The sections below are more challenging than the earlier parts, focusing on features that may become more relevant to an Oracle JET project in the later stages of development.

### Centralized Data Management

Rather than accessing common data separately in different modules, you can create a factory that can be shared between modules, as outlined below.

1. Create a new folder named 'src/js/factories' and create in it 'EmployeeFactory.js', as shown below:

```js #button { border: none; }   
define(['ojs/ojcore', 'text!../endpoints.json'], function (oj, endpoints) {
    var EmployeeFactory = {
        resourceUrl: JSON.parse(endpoints).employees,
        // Create a single employee instance:
        createEmployeeModel: function () {
            var Employee = oj.Model.extend({
                urlRoot: this.resourceUrl, 
                idAttribute: "id"
            });
            return new Employee();
        },
        // Create a employee collection:
        createEmployeeCollection: function () {
            var Employees = oj.Collection.extend({
                url: this.resourceUrl, 
                model: this.createEmployeeModel()
            });
            return new Employees();
        }
    };
    return EmployeeFactory;
});
```

2. In 'dashboard.js' and/or 'incidents.js', you can load the above in the dependency list passed into the define() call as '../factories/EmployeeFactory' and reference it in the callback function in the corresponding position as, for example, 'EmployeeFactory'.

3. Now you can reuse the 'EmployeeFactory' as follows, when defining the data source of the DataGrid discussed earlier, in 'dashboard.js':

```js #button { border: none; }   
self.collection = EmployeeFactory.createEmployeeCollection();
self.dataSource = new oj.CollectionDataGridDataSource(
        self.collection, {
            rowHeader: 'id',
            columns: ['FIRST_NAME', 'LAST_NAME', 'HIRE_DATE', 'SALARY']
        });
```        

Alternatively, you can convert the collection to an observable array, as follows, as in the case of 'incidents.js':

```js #button { border: none; }   
self.collection = EmployeeFactory.createEmployeeCollection();
self.collection.fetch();
self.employees = oj.KnockoutUtils.map(self.collection, null, true);
```

**Note:** Add 'ojs/ojknockout-model' to the dependency list passed into the define() call of modules that use [oj.KnockoutUtils.map](http://www.oracle.com/webfolder/technetwork/jet/jsdocs/oj.KnockoutUtils.html).

Once you have an observable array, such as 'employees' above, you can use it as follows, as shown earlier. Paste the below into 'incidents.html', i.e., here you're not using the 'my-employee-form-container' Web Component anymore, though a next step could be to integrate the filter into that Web Component.

```html #button { border: none; }   
<oj-bind-for-each data='[[employees]]'>
    <template> 
        <oj-collapsible>
            <span slot="header">
                <span>
                    <oj-bind-text value="[[$current.data.id]]"></oj-bind-text>
                </span>
            </span>
            <span>
                <h2><oj-bind-text value="[[$current.data.FIRST_NAME]]"></oj-bind-text></h2>
                <h3><oj-bind-text value="[[$current.data.LAST_NAME]]"></oj-bind-text></h3>
                <h3><oj-bind-text value="[[$current.data.HIRE_DATE]]"></oj-bind-text></h3>
            </span>
        </oj-collapsible>
        <hr/> 
    </template>
</oj-bind-for-each>
```
### Filtering

In this part, we set up a client-side filter, based on the FIRST_NAME field from our endpoint, as shown below:

<table><tr><td>   
<img src="Screen%20Shot%202018-07-01%20at%2010.41.37.png" alt="alt text" width="500" height="420">
</td></tr></table>

Details on the below are [here in the Cookbook](http://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=filter&demo=full).

In the view, e.g., 'incidents.html', add an input field that visualizes the filter:

```html #button { border: none; }   
<oj-input-text  
       maxlength="30" 
       placeholder="Type to filter first name" 
       on-raw-value-changed="[[filterChanged]]" 
       value="{{filter}}">
</oj-input-text>
```

In the ViewModel, e.g., 'incidents.js', add the logic below:

```js #button { border: none; }   
self.collection = EmployeeFactory.createEmployeeCollection();
self.collection.fetch();

self.filter = ko.observableArray('');

self.filterChanged = function (event) {
    var filter = event.target.rawValue;
    var filteredCollection = self.collection;
    if (self.originalCollection == undefined && filter !== undefined) {
        self.originalCollection = filteredCollection.clone();
    }
    var ret = 
        self.originalCollection !== undefined ? 
        self.originalCollection.where({FIRST_NAME: {value: filter, comparator: self.nameFilter}}) : [];
    if (ret.length == 0) {
        while (!filteredCollection.isEmpty()) {
            filteredCollection.pop();
        }
    } else {
        filteredCollection.reset(ret);
        self.datasource(oj.KnockoutUtils.map(self.collection, null, true)());
    }
};

self.nameFilter = function (model, attr, value) {
    var deptName = model.get("FIRST_NAME");
    return (deptName.toLowerCase().indexOf(value.toLowerCase()) > -1);
};

self.datasource = oj.KnockoutUtils.map(self.collection, null, true);
```

### Internationalization

In this part, we're going to add a language switcher and related resources for switching from English to Arabic and back.

#### (a) Adding a Language Switcher with RTL Support

1. In 'index.html', find the responsive toolbar, oj-toolbar, and add new items to it for switching languages. Above the 'Preferences' oj-option, add the following:

```html #button { border: none; }
<oj-option id="languages">
    <span>Languages</span>
    <oj-menu id="languages_menu">
        <oj-option on-oj-action="[[setLangAction]]" id="english" value="english">
            <span class="oj-fwk-icon oj-fwk-icon-arrow-n" slot="startIcon"></span>English
        </oj-option>
        <oj-option on-oj-action="[[setLangAction]]" id="arabic" value="ar-EG">
            <span class="demo-icon-font demo-bookmark-icon-16" slot="startIcon"></span>Arabic
        </oj-option>
    </oj-menu>
</oj-option>
```

2. In 'appController.js', right below 'var self-this', add the 'setLangAction' method that is referred to above:

```js #button { border: none; }
self.setLangAction = function (event) {
    var newLang = event.target.value;
    oj.Config.setLocale(newLang,
        function () {
            $('html').attr('lang', newLang);
            if (newLang === 'ar-EG') {
                $('html').attr('dir', 'rtl');
            } else {
                $('html').attr('dir', 'ltr');
            }
            document.dispatchEvent(new CustomEvent('localeListener'));
        });
};
```
Notice that we're dispatching an event, which can be finetuned further, so the modules can listen to it and react appropriately.

4. In the application, find the new 'Arabic' menu item, select it, and notice that the user interface switches from right to left.

#### (b) Adding Translation Bundles

1. In 'src/js', add a new folder named 'resources'. 

2. In the 'resources' folder, create a folder named 'nls', containing 'l10.js', which is a file with this content:

```js #button { border: none; }
define({
  "root": {
    "dashboardLabel": "Dashboard",
},
  "ar": true,
});
```

3. In the 'nls' folder, create a folder named 'ar', containing 'l10.js', which is a file with this content:

```js #button { border: none; }
define({
  "dashboardLabel":"عدادات",
});
```

4. In 'main.js', under the 'shim' section, add the following so that the translation bundles are found:

```js #button { border: none; }
config: {
    ojL10n: {
      merge: {
        'ojtranslations/nls/ojtranslations': 'resources/nls/l10'
      }
    }
  }
```

#### (c) Internationalizing the Module Tabs

Let's now internationalize the 'Dashboard', 'Incidents', 'Customers', and 'About' items in the tabs of the application, which are defined in the 'appController.js' file.

1. In 'appController.js', add the following, under 'var self=this', to initialize the 'self.dashboardLabel':

```js #button { border: none; }
self.dashboardLabel = ko.observable(oj.Translations.getTranslatedString('dashboardLabel'));
```

2. In 'appController.js', in the 'setLangAction' method, below the if/else statement, refresh the 'self.dashboardLabel':

```js #button { border: none; }
self.dashboardLabel(oj.Translations.getTranslatedString('dashboardLabel'));
```

3. In 'appController.js', in the Navigation setup, in 'var navData', change 'name: 'Dashboard'' to 'name: self.dashboardLabel', so that the first item in the 'navData' array now looks like this:

```js #button { border: none; }
{name: self.dashboardLabel, id: 'dashboard',
     iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'},
```

4. When you switch to 'Arabic' in the application, notice that the Dashboard label is now Arabic and it is English when you switch to 'English'.

#### (d) Internationalizing the Module Texts

1. Add a new string to your translation bundles, named 'dashboardHeader'.

2. In 'dashboard.js', define a new variable for the dashboard header label, to initialize the variable with the current state of the translation bundle:

```js #button { border: none; }
self.dashboardHeaderLabel = ko.observable(oj.Translations.getTranslatedString('dashboardHeader'));
```

3. In 'dashboard.js', listen for the 'localelistener' event and update the dashboard header label with the current state of the translation bundle:

```js #button { border: none; }
document.addEventListener("localeListener", function () {
     self.dashboardHeaderLabel(oj.Translations.getTranslatedString('dashboardHeader'));
});
```

4. In 'dashboard.html', replace the H1 with the following:

```html #button { border: none; }
<h1><oj-bind-text value="[[dashboardHeaderLabel]]"></oj-bind-text></h1>
```

5. In the application, switch to Arabic and notice the H1 is now Arabic.

6. Do the same for other texts, in the other modules in the application.

#### (e) Experiment with the Event Based Programming

1. Replace the EventListener in 'appController.js', to include a 'params' variable with a 'detail' object for the second argument, as shown here:

```js #button { border: none; }
var params = {
    'bubbles': true,
    'detail': {'message': self.dashboardLabel()}
};
document.dispatchEvent(new CustomEvent('localeListener', params));
```

2. Next, rewrite how how the listener is used, with the callback having an event payload that contains the 'detail' object that you can pull your values from.

```js #button { border: none; }
document.addEventListener("localeListener", function (event) {
    console.log('EventValue: ' + event.detail.message);
}); 
```

This is a very powerful way of using event based programming.

More details relating to this: https://javascript.info/bubbling-and-capturing

#### (f) Internationalizing the Oracle JET Components

1. In 'dashboard.html', add the following:

```html #button { border: none; }
<oj-input-date id="date"></oj-input-date>
```

2. In 'dashboard.js', include the following in the dependency list passed into the define() call:

```js #button { border: none; }
'ojs/ojdatetimepicker'
```

3. In the application, switch from English to Arabic, and notice the calendar automatically displays Arabic months.

4. Experiment with other components in the Oracle JET Cookbook and see what they look like in Arabic:

http://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html



