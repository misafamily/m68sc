Ext.define('MyApp.store.Atms', {
    extend: 'Ext.data.Store',
    config: {
        model: 'MyApp.model.Hunter',
        autoLoad:false,
        autoSync:false,

        proxy : {
			type : 'sqlitestorage',
			dbConfig : {
				tablename : 'hunter',
				dbQuery : 'SELECT * from hunter  WHERE status = "active" AND type = "atm"' //+ '" ORDER BY time DESC
			},
			reader : {
				type : 'array'
			}
		}
    },

    changeQueryTotalAmount: function() { //for ketsat > ATm
    	var me = this;
    	me.getProxy().config.dbConfig.dbQuery = 'SELECT IFNULL(SUM(h.amount), 0) as total FROM hunter h WHERE h.status = "active"';
    }
});