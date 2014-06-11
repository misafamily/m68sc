Ext.define('MyApp.store.ExpenseTypes', {
    extend: 'Ext.data.Store',
    requires: ['MyApp.model.ExpenseType'],
    config: {	
		model:'MyApp.model.ExpenseType',
	    autoLoad: false
    }
});
