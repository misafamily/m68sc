Ext.define('MyApp.view.Main', {
	extend : 'Ext.Container',
	xtype : 'main',
<<<<<<< HEAD
	requires : ['Ext.carousel.Carousel', 'MyApp.view.home.Home', 'MyApp.view.record.Record'],
=======
	requires : [
		'Ext.carousel.Carousel',
		'MyApp.view.home.Home',
		'MyApp.view.record.Record'
	],
>>>>>>> dedf1303aa292f1354485393448f18fa79e75fbd
	config : {
		layout : {
			type : 'vbox'
		},
		
		items : [{
			xtype : 'toolbar',
			//ui : 'light',
			//docked : 'top',
			items : [{
				iconCls : 'toolbar-icon-menu',
				cls : 'toolbar-button'
			}, {
				xtype : 'segmentedbutton',
				flex : 1,

				cls : 'segmentedbutton tabbar',
				items : [{
					//text: 'Option 1',
					pressed : true,
					iconCls : 'toolbar-icon-home',
					viewIndex : 0,
					flex : 1
				}, {
					iconCls : 'toolbar-icon-list',
					viewIndex : 1,
					flex : 1
				}, {
					iconCls : 'toolbar-icon-ketsat',
					viewIndex : 2,
					flex : 1
				}]
			}, {
				iconCls : 'toolbar-icon-more'
			}]
		}, {
			xtype : 'carousel',
			indicator : false, //hide indicator
			layout : {
				type : 'card'
			},
<<<<<<< HEAD
			cls: 'main',
			directionLock: true,
			flex : 1,
			items : [{
				xtype : 'home'
			}, {
				xtype : 'record'
			}, {
				xtype : 'container',
				html : 'View 3'
			}]
=======
			flex: 1,
			items:[
				{
					xtype: 'home'
				},
				{
					xtype: 'record'
				},
				{
					xtype: 'container',
					html: 'View 3'
				}
			]
>>>>>>> dedf1303aa292f1354485393448f18fa79e75fbd
		}]
	}
});
