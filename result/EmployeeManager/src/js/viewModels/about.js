define(['ojs/ojcore', 'knockout', 'jquery', 'my-fullcalendar/loader'],
        function (oj, ko, $) {

            function AboutViewModel() {
                var self = this;

                self.selectedDate = ko.observable();

                self.clickListener = function (event) {
                    if (event.type == 'dayClick') {
                        self.selectedDate(event.detail.value);
                    }
                };

                self.connected = function () {

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
            return new AboutViewModel();
        }
);
