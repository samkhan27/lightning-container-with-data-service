({
    reactInit: function (component, event, helper) {
        console.log(window);

        const dataServiceAction = actionName => params => {
            const action = component.get(`c.${actionName}`);
            if(!$A.util.isEmpty(params)) {
                action.setParams(params);
            }
            return helper.executeAction(action);
        }

        const createDataService = () => helper.dataServiceActionNamesList.reduce(
            (dataService, actionName) => {
                const action = dataServiceAction(actionName)
                dataService[actionName] = action;
                return dataService
            }, {}
        );

        const navService = {
            navigateToSObjectRecord: function(recordId, sObjectName) {
                console.log('should navigate');
                helper.navigateToSObjectRecord(component, recordId, sObjectName);
            }
        }

        const service = Object.assign(navService, createDataService());

        const container = component.find("container").getElement();
		const api = ReactSalesforce.search.initApi(service);
        ReactSalesforce.search.init(container, api);
    }
})