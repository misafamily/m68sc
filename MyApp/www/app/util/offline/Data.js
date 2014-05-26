Ext.define('MyApp.util.offline.Data',{
	extend:'Ext.util.Observable',
	alias:'data',
	constructor: function(config) {
        config = config || {};
        Ext.apply(this, config);
        var me = this;
        me.callParent([this]);
       
        return me;
  },
  filterStore:function(store,field, value){
  		//var store = Ext.getStore(name);
  		store.filter({property: field, value:value});
  },
  updateStoreQuery:function(store, name, extra){
  		//var store = Ext.getStore(name);
  		if (store.getProxy() && store.getProxy().config.dbConfig) {
  			store.getProxy().config.dbConfig.dbQuery = this.getQuery(name, extra);
  		} else if (store.getModel().getProxy().config.dbConfig)
  			store.getModel().getProxy().config.dbConfig.dbQuery = this.getQuery(name, extra);
  		else log('CAN NOT UPDATE QUERY ' + name);
		//store.load();
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
  				queryStr = 'SELECT DISTINCT dd, mm, yy, sum(sign_amount) as total FROM trade WHERE dd={0} AND mm={1} AND yy={2} GROUP BY dd,mm,yy';
  				queryStr = Ext.util.Format.format(queryStr, dd, mm, yy);
  				break;
  				
  			case 'Trades_Day': //for RecordItem
  				var dd = extra.dd;
  				var mm = extra.mm;
  				var yy = extra.yy;
  				queryStr = 'SELECT * FROM trade WHERE dd={0} AND mm={1} AND yy={2} ORDER BY time DESC';
  				queryStr = Ext.util.Format.format(queryStr, dd, mm, yy);
  				break;
  				
  			case 'Trades_Month'://for HomeChart
  				var mm = extra.mm;
  				var yy = extra.yy;
  				queryStr = 'SELECT dd, mm, yy, type, amount as total FROM trade WHERE mm={1} AND yy={2} AND (type = "thu" OR type ="chi") ORDER BY dd ASC';
  				queryStr = Ext.util.Format.format(queryStr, dd, mm, yy);
  				break;
  				
  			case 'Income_Month'://for Home
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
  				break;
  			
			
  	}
  	log(queryStr);
  	return queryStr;
  }
});