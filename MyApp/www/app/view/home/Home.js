Ext.define('MyApp.view.home.Home', {
	extend : 'Ext.Container',
	xtype : 'home',
	requires : ['MyApp.view.home.HomeChart'],
	config : {
		layout : {
			type : 'vbox'
		},
		cls : 'home-container',
		items : [{
			xtype : 'container',
			flex : 2.75,
			layout : {
				type : 'vbox'
			},
			

			items : [{
				xtype : 'container',
				layout : {
					type : 'vbox',
					pack : 'center',
					align : 'center'
				},
				height: 22,
				style: {
					'background-color': '#ebecec',
				},
				items : [{
					xtype : 'container',
					layout : {
						type : 'vbox',
						pack : 'center',
						align : 'center'
					},
					style: {
						//'line-height': '26px',
						//'margin-top': '3px'
					},
					items : [{
						xtype : 'label',
						html : '..',
						cls: 'expenseinfo-balance-date'
					}]
				}]
			}, {
				xtype : 'home_homechart',
				flex : 1,
				style: {
					'background-color': '#fff'
				}
			}]
		}, {
			xtype : 'container',
			layout : {
				type : 'vbox',
				pack : 'center',
				align : 'center'
			},
			style: {
				'background-color': '#01d660',
				'margin': '10px',
				'margin-bottom': '0px'
			},
			flex : .75,
			items : [{
				xtype : 'label',
				html : 'SỐ DƯ',
				cls : 'expenseinfo-text',
				style: {
					'color': '#fff',
					'margin-top': '0px'
				}
			}, {
				xtype : 'label',
				html : '..',
				cls: 'expenseinfo-balance'
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
			flex : .75,
			//cls : 'expenseinfo-container',
			items : [{
				xtype : 'container',
				layout : {
					type : 'vbox',
					pack : 'center',
					align : 'center'
				},
				flex : 1,
				height : '100%',
				cls : 'expenseinfo-income',
				items : [{
					xtype : 'label',
					html : 'THU NHẬP',
					cls : 'expenseinfo-text'
				}, {
					xtype : 'label',
					html : '..',
					cls: 'expenseinfo-income-lbl'
				}]
			}, {
				xtype: 'spacer',
				width: 1,
				height : '80%',
				style: {
					'background-color': '#a4a4a4'
				}
			}, {
				xtype : 'container',
				layout : {
					type : 'vbox',
					pack : 'center',
					align : 'center'
				},
				flex : 1,
				height : '100%',
				cls : 'expenseinfo-outcome',
				items : [{
					xtype : 'label',
					html : 'CHI TIÊU',
					cls : 'expenseinfo-text'
				}, {
					xtype : 'label',
					html : '..',
					cls: 'expenseinfo-outcome-lbl'
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
			'button[title="addtradebutton"]': {
				tap: function() {
					
					MyApp.app.fireEvent(AppConfig.eventData.SHOW_INPUTER, null, function(money){
						MyApp.app.fireEvent(AppConfig.eventData.SHOW_TRADE, money);
					},null);
					
				}
			}
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
