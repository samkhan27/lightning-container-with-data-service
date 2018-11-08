({
    dataServiceActionNamesList: [
        'getRecord',
        'getRecords',
        'getFieldSetData',
        'createRecord',
        'updateRecord',
        'deleteRecord',
        'getRecordTypes',
        'getPicklistValues',
        'executeQuery',
    ],
    executeAction: function (action) {
        return new Promise(function (resolve, reject) {
            action.setCallback(this, function (response) {
                const state = response.getState();
                if (state === "SUCCESS") {
                    const retVal = response.getReturnValue();
                    try {
                        resolve(JSON.parse(retVal));
                    } catch (ex) {
                        resolve(retVal);
                    }
                } else if (state === "ERROR") {
                    const errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            reject(Error("Error message: " + errors[0].message));
                        }
                    }
                    else {
                        reject(Error("Unknown error"));
                    }
                }
            });
            $A.enqueueAction(action);
        });
    },

    getURL: function (component) {
        let navService = component.find("navService");
        return navService.generateUrl;
    },

    navigate: function (component, pageReference) {
        let navService = component.find("navService");
        navService.navigate(pageReference);
    },


    navigateToSObjectHome: function (component, sObjectName) {
        let pageReference = {
            type: 'standard__objectPage',
            attributes: {
                objectApiName: sObjectName,
                actionName: 'home'
            }
        };

        this.navigate(component, pageReference);
    },

    openCreateSObjectRecordModal: function (component, sObjectName) {
        let pageReference = {
            type: 'standard__objectPage',
            attributes: {
                objectApiName: sObjectName,
                actionName: 'home'
            }
        };

        this.navigate(component, pageReference);
    },

    openEditSObjectRecordModal: function (component, sObjectId, sObjectName) {
        let pageReference = {
            type: 'standard__recordPage',
            attributes: {
                recordId: sObjectId,
                objectApiName: sObjectName,
                actionName: 'edit'
            }
        };

        this.navigate(component, pageReference);
    },

    navigateToSObjectRecord: function (component, sObjectId, sObjectName) {
        let pageReference = {
            type: 'standard__recordPage',
            attributes: {
                recordId: sObjectId,
                objectApiName: sObjectName,
                actionName: 'view'
            }
        };

        this.navigate(component, pageReference);
    },

    navigateToComponent: function (component, componentName, params) {
        let navService = component.find("navService");

        var pageReference = {
            type: 'standard__component ',
            attributes: {
                objectApiName: `c__${componentName}`,
            },
            state: params
        };

        this.navigate(component, pageReference);
    },

    navigateBack: function () {
        window.history.back();
        return false;
    },

})