Ext.define('MyApp.view.comp.AppList', {
    extend: 'Ext.List',
    config: {    	
        variableHeights: true,
        infinite: true,
        disableSelection: true,
        allowDeselect: false,  
		flex: 1,
		//height: '100%',
		emptyText: AppConfig.textData.NO_DATA//Chưa có dữ liệu
		/*localize:true,
		locales : {
	         //weekTitle: 'WEEK_TEXT',
			 emptyText: 'NO_DATA_TEXT'
	   	},*/
    }
});
