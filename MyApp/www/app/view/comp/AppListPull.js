Ext.define('MyApp.view.comp.AppListPull', {
    extend: 'MyApp.view.comp.AppList',
    requires:[
    	'Ext.plugin.ListPaging'
        //'Ext.plugin.PullRefresh'
    ],
    config: {    	
     	scrollToTopOnRefresh: false,
		plugins: [
            { 
            	xclass: 'Ext.plugin.ListPaging',
            	loadMoreText: 'Xem tiếp ...',//Xem tiếp ...
            	noMoreRecordsText : '',//Hết dữ liệu
            	autoPaging: false 
            }/*,
            { 
            	xclass: 'Ext.plugin.PullRefresh', 
            	pullRefreshText: 'Kéo xuống để lấy dữ liệu mới',
            	releaseRefreshText: 'Thả ra để lấy dữ liệu mới'  
            }*/
        ]		
    }
});
