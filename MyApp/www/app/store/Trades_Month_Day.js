Ext.define('MyApp.store.Trades_Month_Day', {
	extend : 'Ext.data.Store',
	config : {
		fields : ['mm', 'dd', 'yy', 'total'],
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