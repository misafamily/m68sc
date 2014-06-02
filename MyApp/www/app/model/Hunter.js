Ext.define('MyApp.model.Hunter', {
	extend : 'Ext.data.Model',
	config : {
		fields : [{
			name : 'owener',
			type : 'string'
		}, {
			name : 'bank', //hsbc
			type : 'string'
		}, {
			name : 'partner', //nguoi muon tien
			type : 'string'
		}, {
			name : 'type', //atm, saving, insurance, lend, paid, tien_mat
			type : 'string'
		}, {
			name : 'amount', //money
			type : 'string'
		}, {
			name : 'status', //active, deactive
			type : 'string',
			defaultValue : 'active'
		}, {
			name : 'hunter_id',
			type : 'string'
		}, {
			name : 'note', 
			type : 'string',
			defaultValue : ''
		}, {
			name : 'group', 
			type : 'int'
		}, {
			name : 'time', //date.getTime()
			type : 'number'
		}, {
			name : 'id',
			type : 'int',
			fieldOption : ' PRIMARY KEY AUTOINCREMENT'
		}],
		proxy : {
			type : 'sqlitestorage',
			dbConfig : {
				tablename : 'hunter',
				dbQuery : 'SELECT * from hunter  WHERE status = "active"' //+ '" ORDER BY time DESC
			},
			reader : {
				type : 'array'
			}
		}
	}
});
