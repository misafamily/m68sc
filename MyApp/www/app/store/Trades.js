Ext.define('MyApp.store.Trades', {
    extend: 'Ext.data.Store',
    config: {
        model: 'MyApp.model.Trade',
        autoLoad:false,
        autoSync:false,
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
    },

    changeQuery: function(name, extra) {
    	var me = this;
    	me.getProxy().config.dbConfig.dbQuery = me.getQuery(name, extra);
    },

    doFilter:function(field, value){
  		//var store = Ext.getStore(name);
  		me.filter({property: field, value:value});
  	},

    getQuery:function(name, extra){
	  	var queryStr = "";
	  	switch(name){
	  		
	  			case 'Trades_Month_Day'://for Record
	  				var mm = extra.mm;
	  				var yy = extra.yy;
	  				queryStr = 'SELECT DISTINCT dd, mm, yy, sum(sign_amount) as total FROM trade WHERE mm={0} AND yy={1} GROUP BY dd,mm,yy ORDER BY dd DESC';
	  				queryStr = Ext.util.Format.format(queryStr, mm, yy);
	  				break;
	  				
	  			case 'Trades_Month_Day_FilterWithDate'://for Record
	  				var dd = extra.dd;
	  				var mm = extra.mm;
	  				var yy = extra.yy;
	  				queryStr = 'SELECT DISTINCT dd, mm, yy, sum(sign_amount) as total FROM trade WHERE dd={0} AND mm={1} AND yy={2} AND (type = "thu" OR type ="chi") GROUP BY dd,mm,yy';
	  				queryStr = Ext.util.Format.format(queryStr, dd, mm, yy);
	  				break;
	  				
	  			case 'Trades_Day': //for RecordItem
	  				var dd = extra.dd;
	  				var mm = extra.mm;
	  				var yy = extra.yy;
	  				queryStr = 'SELECT * FROM trade WHERE dd={0} AND mm={1} AND yy={2} AND (type = "thu" OR type ="chi" OR type ="rut") ORDER BY time DESC';
	  				queryStr = Ext.util.Format.format(queryStr, dd, mm, yy);
	  				break;
	  				
	  			case 'Trades_Month'://for HomeChart
	  				var mm = extra.mm;
	  				var yy = extra.yy;
	  				queryStr = 'SELECT dd, mm, yy, type, amount as total FROM trade WHERE mm={1} AND yy={2} AND (type = "thu" OR type ="chi") ORDER BY dd ASC';
	  				queryStr = Ext.util.Format.format(queryStr, dd, mm, yy);
	  				break;
	  				
	  			/*case 'Income_Month'://for Home
	  				var mm = extra.mm;
	  				var yy = extra.yy;
	  				queryStr = 'SELECT sum(amount) as total FROM trade WHERE mm={1} AND yy={2} AND type = "thu"';
	  				queryStr = Ext.util.Format.format(queryStr, dd, mm, yy);
	  				break;
	  				
	  			case 'Outcome_Month'://for Home
	  				var mm = extra.mm;
	  				var yy = extra.yy;
	  				queryStr = 'SELECT sum(amount) as total FROM trade WHERE mm={1} AND yy={2} AND type = "chi"';
	  				queryStr = Ext.util.Format.format(queryStr, dd, mm, yy);
	  				break;*/
	  			
				
	  	}
	  	//log(queryStr);
	  	return queryStr;
	  }
});