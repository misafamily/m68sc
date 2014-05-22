Ext.define('MyApp.view.home.Home', {
	extend : 'Ext.Container',
	xtype : 'home',
	requires : ['MyApp.view.home.HomeChart'],
	config : {
		layout : {
			type : 'vbox'
		},
		items : [{
			xtype : 'container',
			flex : 3.25,
			layout : {
				type : 'vbox'
			},
			cls : 'chart-container',
			items : [{
				xtype : 'container',
				layout : {
					type : 'vbox',
					pack : 'center',
					align : 'center'
				},
				flex : 1,

				items : [{
					xtype : 'container',
					layout : {
						type : 'vbox',
						pack : 'center',
						align : 'center'
					},
					style: {
						'line-height': '26px',
						'margin-top': '5px'
					},
					items : [{
						xtype : 'label',
						html : '25.THANG 5.2014',
						cls: 'expenseinfo-balance-date'
					}, {
						xtype : 'label',
						html : '3.500.000 d',
						cls: 'expenseinfo-balance'
					}]
				}]
			}, {
				xtype : 'home_homechart',
				flex : 2
			}]
		}, {
			//xtype: 'toolbar',
			//docked: 'bottom',
			xtype : 'container',
			layout : {
				type : 'hbox',
				align : 'center'
			},
			flex : .75,
			cls : 'expenseinfo-container',
			defaults : {
				xtype : 'container',
				layout : {
					type : 'vbox',
					pack : 'center',
					align : 'center'
				},
				flex : 1,
				height : '100%'
			},
			items : [{
				cls : 'expenseinfo-income',
				items : [{
					xtype : 'label',
					html : '+120.000.000'
				}, {
					xtype : 'label',
					html : 'Tong thu',
					cls : 'expenseinfo-text'
				}]
			}, {
				cls : 'expenseinfo-outcome',
				items : [{
					xtype : 'label',
					html : '-15.000.000'
				}, {
					xtype : 'label',
					html : 'Tong chi',
					cls : 'expenseinfo-text'
				}]
			}]
		}, {
			//xtype: 'toolbar',
			//docked: 'bottom',
			xtype : 'container',
			layout : {
				type : 'hbox',
				align : 'center',
				pack : 'center'
			},
			cls : 'viewbase-toolbar-bottom',
			items : [{
				xtype : 'spacer',
				width : 36
			}, {
				xtype : 'spacer'
			}, {
				xtype : 'button',
				cls : 'button-icon toolbar-button-add',
				title : 'addtradebutton'
			}, {
				xtype : 'spacer'
			}, {
				xtype : 'button',
				cls : 'button-icon toolbar-button-viewtype'
			}]
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
