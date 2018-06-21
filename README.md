# Oracle JET Training Materials

## Part 1: Set Up the Environment

   1. Set up the Fake REST Server: https://www.npmjs.com/package/fake-rest-server
   2. Download and put anywhere on disk: https://github.com/geertjanw/ojet-training/blob/master/employeeData.json
   3. Run in the terminal: 
```js #button { border: none; }
json-server --watch employeeData.json
```
   4. Go to http://localhost:3000/employees and see your data via your fake REST endpoint.
   
## Part 2: Basic Usage of Oracle JET
   
### (a) Getting Started

Follow the instructions on the Getting Started page to install the ojet-cli:

http://www.oracle.com/webfolder/technetwork/jet/globalGetStarted.html

The above can be summarized to the following:

1. Download and install the latest LTS version of Node from http://nodejs.org.

2. Install the Oracle JET command line tool:

```js #button { border: none; }
npm install -g @oracle/ojet-cli
```
3. Run the following in the terminal:

```js #button { border: none; }
ojet create EmployeeManager --template=navdrawer
```
4. Run the following in the terminal and look in the browser:

```js #button { border: none; }
ojet serve
```

5. Open your editor and eplore the source structure and learn about what everything does.

6. Make a change in the 'Dashboard.html' file and notice what happens in the browser, without needing to refresh.

### (b) Working with Oracle JET Components

1. Explore the Oracle JET Cookbook.

2. Especially explore the data visualization use cases:

http://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=dataVisualizations&demo=gallery

3. Take a look at the Bar Chart:

http://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=barChart&demo=default

4. Look at the JS documentation, the description, variations, and tweak the code.

5. Copy the HTML into the Dashboard View, the JavaScript into the Dashboard ViewModel, and reference the 'ojs/ojchart' in the define block of the Dashboard ViewModel. Look in the browser and see the Bar Chart is displayed.

```html #button { border: none; }
<oj-data-grid 
     id="datagrid" 
     style="height:400px; max-width:477px" 
     data="[[dataSource]]" 
     selection-mode.row="single" 
     dnd.reorder.row="enable" 
     header.column.style="width:100px" > 
</oj-data-grid>
```

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

6. Change the 'bar' type to 'pie' by hand and then let the user do it by combining with a Combobox One:

http://www.oracle.com/webfolder/technetwork/jet/jetCookbook.html?component=comboboxOne&demo=single
   
## Day 3: Smart Usage of Oracle JET

### (a) Getting Started

1. In the Terminal, in the root of your project, run the following:

```js #button { border: none; }
ojet create component my-chart
```

2. Take a look at your source structure and find the new 'my-chart' CCA component.

3. Load the loader into the ViewModel, declare the new custom element in the View, then look in the browser and notice the message from the CCA component.

4. Move the chart and the combobox into the 'my-chart' CCA component.

5. Declare the 'my-chart' custom element a few more times and notice that you now see multiple charts.

```html #button { border: none; }
<my-chart></my-chart>
<my-chart></my-chart>
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

