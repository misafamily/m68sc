Ext.define('MyApp.view.Main', {
	extend : 'Ext.Container',
	xtype : 'main',
	requires : [
		'Ext.carousel.Carousel',
		'MyApp.view.home.Home'
	],
	config : {
		layout : {
			type : 'vbox'
		},
		items : [{
			xtype : 'toolbar',
			ui : 'light',
			docked : 'top',
			scrollable : {
				direction : 'horizontal',
				indicators : false
			},
			items : [{
				//text: 'Back',
				// ui: 'back',
				iconCls : 'toolbar-icon-menu',
				//hidden: (Ext.theme.name == "Blackberry") ? true : false
			}, {
				xtype : 'segmentedbutton',
				flex:1,
				items : [{
					//text: 'Option 1',
					pressed : true,
					iconCls : 'toolbar-icon-home',
					viewIndex: 0,
					flex:1
				}, {
					iconCls : 'toolbar-icon-list',
					viewIndex: 1,
					flex:1
				}, {
					iconCls : 'toolbar-icon-ketsat',
					viewIndex: 2,
					flex:1
				}]
			},  {
				iconCls : 'toolbar-icon-more'
			}]
		},{
			xtype: 'carousel',
			indicator: false, //hide indicator
			layout: {
				type: 'card'
			},
			flex: 1,
			items:[
				{
					xtype: 'home'
				},
				{
					xtype: 'container',
					html: 'View 2'
				},
				{
					xtype: 'container',
					html: 'View 3'
				}
			]
		}]
	}
});
