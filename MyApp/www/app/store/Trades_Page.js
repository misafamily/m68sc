Ext.define('MyApp.store.Trades_Page', {
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
    },

    changeQueryCashTradeList: function() { //default, for Ketsat > Tienmat > Chitietgiaodich
        var me = this;
        me.getProxy().config.dbConfig.dbQuery = 'SELECT * FROM trade WHERE hunter_id="cash" ORDER BY time DESC';
    },

    changeQueryAtmTradeList: function(atmId) { //for Ketsat > ATM > Chitietgiaodich
        var me = this;
        me.getProxy().config.dbConfig.dbQuery = Ext.util.Format.format('SELECT * FROM trade WHERE hunter_id={0} ORDER BY time DESC', atmId);
    }
});