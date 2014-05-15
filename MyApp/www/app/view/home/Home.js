Ext.define('MyApp.view.home.Home', {
	extend : 'MyApp.view.comp.ViewBase',
	xtype : 'home',
	requires : [
	//'MyApp.view.tab.home.HomeChart'
	],
	config : {
		navigationBar : {

			items : [{
				iconCls : 'toolbar-icon-previous',
				align : 'left',
				hideAnimation : null,
				showAnimation : null,
				title : 'previousbtn'
			}, {
				iconCls : 'toolbar-icon-next',
				align : 'right',
				hideAnimation : null,
				showAnimation : null,
				title : 'nextbtn'
			}]
		},
		items : [{
			xtype : 'container',
			title : 'MAY 2014',
			flex : 1,
			layout : {
				type : 'vbox'
			},
			cls: 'viewbase-container',
			items : [
				{xtype:'spacer'},
				{
	                //xtype: 'toolbar',
	                //docked: 'bottom',  
	                xtype: 'container', 
	                layout: {
	                	type:'hbox',
	                	align: 'center'	
	                },      
	                cls:'viewbase-toolbar-bottom',    
	                items: [
	                	{
	       					xtype: 'spacer',
	       					width: 30
	       				},
	                	{xtype:'spacer'},
	       				{
	       					xtype: 'button',
	       					cls: 'button-icon toolbar-button-add' 
	       				},
	       				{xtype:'spacer'},
	       				{
	       					xtype: 'button',
	       					cls: 'button-icon toolbar-button-viewtype' 
	       				}
	                ]
	            }
			]
		}]
	},

	initialize : function() {
		var me = this;
		me.callParent(arguments);

		//MyApp.app.on('expense_changed', me.onExpenseChanged, me);
		//MyApp.app.on('thuchi_changed', me.onThuChiChanged, me);
	}/*,
	 onThuChiChanged: function(thu, chi) {
	 var me = this;
	 if (!me._thuLbl) me._thuLbl = me.down('label[title="thulbl"]');
	 if (!me._chiLbl) me._chiLbl = me.down('label[title="chilbl"]');
	 if (!me._soduLbl) me._soduLbl = me.down('label[title="sodulbl"]');
	 if (!me._chiDiv) me._chiDiv = Ext.get('home_tongchi');

	 me._thuLbl.setHtml('(+) ' + AppUtil.formatShortMoney(thu));
	 me._chiLbl.setHtml('(-) ' +AppUtil.formatShortMoney(chi));
	 me._soduLbl.setHtml('(=) ' + AppUtil.formatShortMoney(thu - chi));

	 if (thu == 0) thu = 1;
	 var percent = Math.round(chi*100/thu);
	 me._chiDiv.setWidth(percent + '%');

	 },
	 onExpenseChanged: function(date) {
	 var me = this;
	 if (date.sameMonthWith(new Date()))
	 me.showHomeChart();
	 },

	 showHomeChart: function() {
	 var me = this;
	 if (!me._homeChart) me._homeChart = me.down('tab_home_homechart');
	 me._homeChart.showChart();
	 }*/
});
