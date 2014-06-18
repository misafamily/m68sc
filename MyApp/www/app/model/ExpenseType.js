Ext.define('MyApp.model.ExpenseType', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
        	{
            	name:'name',//Di cho, Du lich,...
            	type:'string'
            },
            {
                name:'uname', //unique name
                type:'string'
            },
            {
            	name:'thumb', 
            	type:'string'
            },
           {
            	name:'type', //thu, chi
            	type:'string'
            },
            {
            	name:'stat',
            	type:'string',
                defaultValue: '0'
            },
            {
                name:'created_by',
                type:'string',
                defaultValue: 'app'
            },
            {
                name:'selected',
                type:'string', //'yes', 'no'
                defaultValue: 'no'
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
	    		tablename:'expensetype',    			
    			dbQuery:'SELECT * from expensetype ORDER BY stat DESC, name ASC'
    		},
    		reader: {
               type: 'array'
            }
       }
    }
});
