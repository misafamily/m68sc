Ext.define('MyApp.store.Trades_Day', {
	extend : 'Ext.data.Store',
	config : {
		model : 'MyApp.model.Trade',

		autoLoad : false,
		autoSync : false,
		proxy : {
			type : 'sqlitestorage',
			dbConfig : {
				tablename : 'trade',
				dbQuery : 'SELECT * from trade ORDER BY time DESC'
			},
			reader : {
				type : 'array'
			}
		}
	}
}); 