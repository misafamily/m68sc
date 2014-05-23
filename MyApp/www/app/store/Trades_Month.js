Ext.define('MyApp.store.Trades_Month', {
	extend : 'Ext.data.Store',
	config : {
		fields : ['mm', 'dd', 'yy', 'type', 'total'],
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