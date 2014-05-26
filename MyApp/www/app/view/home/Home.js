Ext.define('MyApp.view.home.Home', {
	extend : 'Ext.Container',
	xtype : 'home',
	requires : ['MyApp.store.Trades_Month', 'MyApp.view.home.HomeChart'],
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
			cls : 'app-container',
			items : [{
				xtype : 'container',
				layout : {
					type : 'vbox',
					pack : 'center',
					align : 'center'
				},
				flex : 2,

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
						html : '..',
						cls: 'expenseinfo-balance-date'
					}, {
						xtype : 'label',
						html : '..',
						cls: 'expenseinfo-balance'
					}]
				}]
			}, {
				xtype : 'home_homechart',
				flex : 1.25
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
					html : '..',
					cls: 'expenseinfo-income-lbl'
				}, {
					xtype : 'label',
					html : 'Tong thu',
					cls : 'expenseinfo-text'
				}]
			}, {
				cls : 'expenseinfo-outcome',
				items : [{
					xtype : 'label',
					html : '..',
					cls: 'expenseinfo-outcome-lbl'
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
		}],
		
		control: {
			/*'home': {
				
			}*/
		}
	},
	
	initialize : function() {
		var me = this;
		me.callParent(arguments);
		me._currentDate = new Date();
		Ext.defer(function(){
			me.showDate();
			//me.updateExpenseInfo();
		},500);
		//MyApp.app.on(AppConfig.eventData.TRADE_ADDED, me.onTradeAdded, me);//from Trade
		MyApp.app.on(AppConfig.eventData.EXPENSE_CHANGED, me.onExpenseChanged, me);//from HomeChart
		//MyApp.app.on('thuchi_changed', me.onThuChiChanged, me);
	},

	showDate: function() {
		var me = this;
		if (!me._todayLbl) me._todayLbl = me.down('label[cls = "expenseinfo-balance-date"]');
		me._todayLbl.setHtml(me._currentDate.homeDateFormat());
	},
	
	/*updateExpenseInfo: function() {
		var me = this;
		if (!me._balanceLbl) me._balanceLbl = me.down('label[cls = "expenseinfo-balance"]');
		if (!me._incomeLbl) me._incomeLbl = me.down('label[cls = "expenseinfo-income-lbl"]');
		if (!me._outcomeLbl) me._outcomeLbl = me.down('label[cls = "expenseinfo-outcome-lbl"]');
		
		if (!me._expenseStore) me._expenseStore = Ext.create('MyApp.store.Trades_Month');
		AppUtil.offline.updateStoreQuery(me._expenseStore, 'Income_Month', {
				mm : me._currentDate.getMonth(),
				yy : me._currentDate.getFullYear()
		});
		
		var incomeTotal = 0;
		var outcomeTotal = 0;
		
		me._expenseStore.load(function(records) {
			if (records.length > 0) {
				incomeTotal = parseInt(records[0].data.total);
			}
			
			AppUtil.offline.updateStoreQuery(me._expenseStore, 'Outcome_Month', {
					mm : me._currentDate.getMonth(),
					yy : me._currentDate.getFullYear()
			});
			me._expenseStore.load(function(records2) {
				if (records2.length > 0) {
					outcomeTotal = parseInt(records2[0].data.total);
				}
				
				var balanceTotal = incomeTotal - outcomeTotal;
				
				me._balanceLbl.setHtml(AppUtil.formatMoneyWithUnit(balanceTotal));
				if (incomeTotal > 0) me._incomeLbl.setHtml('+' + AppUtil.formatMoneyWithUnit(incomeTotal));
				else me._incomeLbl.setHtml(AppUtil.formatMoneyWithUnit(incomeTotal));
				if (outcomeTotal > 0) me._outcomeLbl.setHtml('-' +AppUtil.formatMoneyWithUnit(outcomeTotal));
				else me._outcomeLbl.setHtml(AppUtil.formatMoneyWithUnit(outcomeTotal));
			});
		});
	},
	
	onTradeAdded: function(date) {
		var me = this;
		if (me._currentDate.sameMonthWith(date)) {
			me.updateExpenseInfo();
		}
	}*/
	
	onExpenseChanged: function(incomeTotal, outcomeTotal, date) {
		var me = this;
		var balanceTotal = incomeTotal - outcomeTotal;
		
		if (!me._balanceLbl) me._balanceLbl = me.down('label[cls = "expenseinfo-balance"]');
		if (!me._incomeLbl) me._incomeLbl = me.down('label[cls = "expenseinfo-income-lbl"]');
		if (!me._outcomeLbl) me._outcomeLbl = me.down('label[cls = "expenseinfo-outcome-lbl"]');
		
		if (incomeTotal > 0) me._incomeLbl.setHtml('+' + AppUtil.formatMoneyWithUnit(incomeTotal));
		else me._incomeLbl.setHtml(AppUtil.formatMoneyWithUnit(incomeTotal));
		if (outcomeTotal > 0) me._outcomeLbl.setHtml('-' +AppUtil.formatMoneyWithUnit(outcomeTotal));
		else me._outcomeLbl.setHtml(AppUtil.formatMoneyWithUnit(outcomeTotal));
		
		me._balanceLbl.setHtml(AppUtil.formatMoneyWithUnit(balanceTotal));
	}

});
