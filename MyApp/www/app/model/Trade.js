Ext.define('MyApp.model.Trade', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
        	{
            	name:'trade_id',
            	type:'string'
           },
            {
            	name:'title', //Di cho, Du lich,...
            	type:'string'
            },
           {
            	name:'type', //thu,chi,rut,nap,linh_lai,cho_muon, tra_no
            	type:'string'
            },
            {
            	name:'amount',
            	type:'string'
            },
            {
            	name:'sign_amount',
            	type:'string' //+800 -800
            },
             /*{
            	name:'trade_what',//di_cho, du_lich, an_uong, hoc_hanh...
            	type:'string'
            },*/
             {
            	name:'trade_with',//object type: tien_mat, atm
            	type:'string',
            	defaultValue:'tien_mat'
            },
             {
            	name:'trade_note',
            	type:'string'
            },   
            {
            	name:'time',//date.getTime()
            	type:'number'
	       	},
	       	 {
            	name:'hunter_id',
            	type:'string'
            },
            {
            	name:'bookmark',
            	type:'string',
            	defaultValue:'false'
            },
	       	 {
            	name:'dd',//date.getTime()
            	type:'number'
	       	},
	       	{
            	name:'mm',//date.getTime()
            	type:'number'
	       	},
	       	{
            	name:'yy',//date.getTime()
            	type:'number'
	       	},
            {
            	name:'id',
            	type:'int',
            	fieldOption:' PRIMARY KEY AUTOINCREMENT'
            }
        ],
        proxy:{
    		type:'sqlitestorage',
    		dbConfig: {
	    		tablename:'trade',    			
    			dbQuery:'SELECT * from trade ORDER BY time DESC'
    		},
    		reader: {
               type: 'array'
            }
       }
    }
});
