Ext.define('MyApp.view.apppopup.Trade_ExpenseChosen', {
	extend : 'Ext.Container',
	xtype : 'apppopup_trade_expensechosen',
	requires:[],
	config : {
		cls : 'popup6-container',
		layout : {
			type : 'vbox',
			pacK : 'center',
			align : 'center'
		},
		items : [{
			//xtype: 'toolbar',
			//docked: 'bottom',
			xtype : 'container',
			layout : {
				type : 'hbox',
				align : 'center'
			},
			cls : 'viewbase-toolbar-top',
			width : '100%',
			items : [{
				xtype : 'button',
				cls : 'button-icon toolbar-button-back',
				title : 'backbtn'
			}, {
				xtype : 'container',
				cls : 'apppopup-line'
			}, {
				xtype : 'spacer'
			}, {
				xtype : 'label',
				html : AppConfig.textData.CHON_CHI_TIEU,
				cls : 'apppopup-title'
			}, {
				xtype : 'spacer'
			}, {
				xtype : 'spacer',
				width : 31
			}]
		}, {
			xtype: 'container',
			cls : 'main fullwidth-container',
			flex: 1,
			items: [{
				xclass: 'MyApp.view.comp.AppList'
			}]
		}, {

			xtype : 'container',
			layout : {
				type : 'hbox',
				align : 'center',
				pack : 'center'
			},
			cls : 'viewbase-toolbar-bottom',
			items : [{
				xtype : 'button',
				cls : 'button-icon toolbar-button-done2',
				title : 'addincomebutton'
			}]
		}],
			
		control : {

			'button[title="backbtn"]' : {
				tap : function() {
					this.hide();
				}
			},
			'textfield[name="amount"]' : {
				focus : function(tf) {
					var me = this;
					MyApp.app.fireEvent(AppConfig.eventData.SHOW_INPUTER, tf.getValue(), function(money) {
						me.amount = money;
						tf.setValue(AppUtil.formatMoneyWithUnit(money));
					}, null);
				}
			},
			'textfield[name="outtradedate"]' : {
				focus : function(tf) {
					var me = this;
					MyApp.app.fireEvent(AppConfig.eventData.SHOW_DATE_CHOOSER, me._selectedDate, function(date) {
						me._selectedDate = date;
						//tf.setValue(me._selectedDate.tradeDateFormat());
						var todayDateFormat = me._selectedDate.tradeDateFormat();
		
						me._outtrade.setValue(todayDateFormat);	
						me._intrade.setValue(todayDateFormat);
					});
				}
			},
			'textfield[name="intradedate"]' : {
				focus : function(tf) {
					var me = this;
					MyApp.app.fireEvent(AppConfig.eventData.SHOW_DATE_CHOOSER, me._selectedDate, function(date) {
						me._selectedDate = date;
						//tf.setValue(me._selectedDate.tradeDateFormat());
						var todayDateFormat = me._selectedDate.tradeDateFormat();
		
						me._outtrade.setValue(todayDateFormat);	
						me._intrade.setValue(todayDateFormat);
					});
				}
			},
			'button[title = "addoutcomebutton"]' : {
				tap : 'onOutcomeButtonClicked'
			},
			'button[title = "addincomebutton"]' : {
				tap : 'onIncomeButtonClicked'
			},
			'carousel': {
				activeitemchange : function(carousel, value, oldValue, eOpts) {
					//log('activeitemchange');
					var me = this;
					var sb = me.getSegmentedButton();
					sb.setPressedButtons(carousel.activeIndex);
				}
			},
			'segmentedbutton': {
				toggle : function(segmentbutton, button, pressed) {

					var me = this;
					if (pressed == true) {
						var newIndex = button.config.viewIndex;
						var oldIndex = me.getCarousel().activeIndex;
						if (newIndex != oldIndex)
							me.getCarousel().setActiveItem(newIndex);
					}

				}//end toogle
			}
		}
	},
	
	getSegmentedButton: function() {
		var me = this;
		if (!me._sb) me._sb = me.down('segmentedbutton');
		return me._sb;
	},
	
	getCarousel: function() {
		var me = this;
		if (!me._cs) me._cs = me.down('carousel');
		return me._cs;
	},

	initialize : function() {
		var me = this;
		me.callParent(arguments);

	},

	onOutcomeButtonClicked : function() {
		var me = this;
		if (AppUtil.checkAmount(me.amount)) {
			AppUtil.doTrade(me._outtype.getValue(), AppConfig.type.CHI, me.amount, AppConfig.type.TIEN_MAT, me._outnote.getValue(), me._selectedDate, 'CASH');

			me.hide();
		}
	},
	
	onIncomeButtonClicked: function() {
		var me = this;
		if (AppUtil.checkAmount(me.amount)) {
			AppUtil.doTrade(me._intype.getValue(), AppConfig.type.THU, me.amount, AppConfig.type.TIEN_MAT, me._innote.getValue(), me._selectedDate, 'CASH');

			me.hide();
		}
	},

	showView : function(value, callback) {
		var me = this;
		//me.resetView();
		//me.amount = money;
		//me._amount.setValue(AppUtil.formatMoneyWithUnit(me.amount));
		me.show();
	},

	resetView : function() {
		var me = this;
		if (!me._amount)
			me._amount = me.down('textfield[name = "amount"]');
		me._amount.reset();
		me.amount = 0;
		me._amount.setValue(AppUtil.formatMoneyWithUnit(me.amount));
		me._selectedDate = new Date();
		var todayDateFormat = me._selectedDate.tradeDateFormat();
		
		if (!me._outtype)
			me._outtype = me.down('textfield[name = "outtype"]');
		if (!me._outnote)
			me._outnote = me.down('textfield[name = "outnote"]');
		if (!me._outtrade)
			me._outtrade = me.down('textfield[name = "outtradedate"]');
		
		if (!me._intype)
			me._intype = me.down('textfield[name = "intype"]');
		if (!me._innote)
			me._innote = me.down('textfield[name = "innote"]');
		if (!me._intrade)
			me._intrade = me.down('textfield[name = "intradedate"]');
		
		me._outtrade.setValue(todayDateFormat);	
		me._intrade.setValue(todayDateFormat);
		me.getCarousel().setActiveItem(0);
	}
});
