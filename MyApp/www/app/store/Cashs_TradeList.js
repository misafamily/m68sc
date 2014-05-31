Ext.define('MyApp.store.Cashs_TradeList', {
    extend: 'Ext.data.Store',
    config: {
        model: 'MyApp.model.Trade',
        autoLoad:false,
        autoSync:false,
        pageSize: 15,
        
        proxy:{
    		type:'localstoragepaging',//sqlitestorage
    		dbConfig: {
	    		tablename:'trade',    			
    			dbQuery:'SELECT * FROM trade WHERE hunter_id="cash" ORDER BY time DESC'
    		},
    		reader: {
               type: 'array'
            }
       }
    }
});