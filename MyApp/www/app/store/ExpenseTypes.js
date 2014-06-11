Ext.define('MyApp.store.ExpenseTypes', {
    extend: 'Ext.data.Store',
    requires: ['MyApp.model.ExpenseType'],
    config: {	
		model:'MyApp.model.ExpenseType',
	    autoLoad: false,
	    proxy:{
    		type:'sqlitestorage',
    		dbConfig: {
	    		tablename:'expensetype',    			
    			dbQuery:'SELECT * from expensetype ORDER BY stat DESC, name ASC'
    		},
    		reader: {
               type: 'array'
            }
       }
    },

    changeQueryByType: function(type) {
        var me = this;
        me.getProxy().config.dbConfig.dbQuery = Ext.util.Format.format('SELECT * FROM expensetype WHERE type = "{0}" ORDER BY stat DESC, id ASC', type);
    }
});
