Ext.define('MyApp.store.InitData', {
    extend: 'Ext.data.Store',
    requires: ['MyApp.model.ExpenseType'],
    config: {	
		model:'MyApp.model.ExpenseType',
        proxy: {
	        type: "ajax",
	        url : "",
	        reader: {
	            type: "json",
	            rootProperty: "expenses"
	        }
	    },
	    autoLoad: false
    }
});
