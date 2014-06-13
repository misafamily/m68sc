Ext.define('MyApp.view.apppopup.Trade', {
	extend : 'Ext.Container',
	xtype : 'apppopup_trade',
	requires:[],
	config : {
		cls : 'main popup-container',
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
				html : AppConfig.textData.THEM_GIAO_DICH,
				cls : 'apppopup-title'
			}, {
				xtype : 'spacer'
			}, {
				xtype : 'spacer',
				width : 31
			}]
		}, {
			xtype : 'segmentedbutton',
			cls : 'segmentedbutton expensetype',
			width : '100%',
			items : [{
				text : AppConfig.textData.CHI_TIEU,
				pressed : true,
				//iconCls : 'toolbar-icon-home',
				viewIndex : 0,
				flex : 1
			}, {
				text : AppConfig.textData.THU_NHAP,
				//iconCls : 'toolbar-icon-list',
				viewIndex : 1,
				flex : 1
			}]
		}, {
			xtype: 'container',
			cls : 'trade-amount-container',
			items: [
				{
					xtype : 'container',
					layout : {
						type : 'hbox',
						pacK : 'center',
						align : 'center'
					},					
					cls: 'trade-amount',
					items : [{
						xtype : 'textfield',
						flex : 1,
						clearIcon : false,
						readOnly : true,
						autoComplete : false,
						autoCorrect : false,
						cls : 'b-textfield-moneyinput',
						value : '0',
						name : 'amount'
					}]
				}
			]
		}, {
			xtype : 'carousel',
			indicator : false, //hide indicator
			layout : {
				type : 'card'
			},
			directionLock : true,
			cls : 'fullwidth-container',
			flex : 1,
			items : [{//CHI
				xtype : 'container',
				layout : {
					type : 'vbox'
				},
				flex : 1,
				items : [{
					xtype : 'container',
					layout : {
						type : 'vbox'
					},
					flex : 1,
					cls : 'form-container',
					items : [{
						xtype : 'container',
						layout : {
							type : 'vbox'
						},
						flex : 1,
						/*scrollable : {
							directionLock : true,
							direction : 'vertical',
							indicators : false
						},*/
						
						defaults : {
							required : true,
							autoComplete : false,
							autoCorrect : false,
							clearIcon : false
						},
						items : [{
							xtype : 'textfield',
							name : 'outtype',
							//label: 'Tên tài khoản ',
							cls : 'form-textfield verhical',
							placeHolder : AppConfig.textData.KIEU_CHI_TIEU,
							autoCapitalize : false,
							//value : AppConfig.type.DI_CHO,
							readOnly: true
						}, /*{
							xtype: 'comp_pathmenu',
							zIndex: 2
						},*/{
							xtype : 'textfield',
							name : 'outnote',
							placeHolder : AppConfig.placeholderData.GHI_CHU_CHI,
							cls : 'form-textfield expensetype',
							maxLength: 50
						}, {
							xtype : 'textfield',
							name : 'outpaidby',
							//placeHolder : 'Tien mat hoac ATM',
							cls : 'form-textfield expensetype',
							readOnly: true,
							value: AppConfig.textData.TIEN_MAT
							//label: 'Số tiền hiện có  '
						}, {
							xtype : 'textfield',
							name : 'outtradedate',
							placeHolder : 'Ngay giao dich',
							cls : 'form-textfield expensetype',
							readOnly : true
						}]
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
						cls : 'button-icon toolbar-button-done3',
						title : 'addoutcomebutton'
					}]
				}]
			}, { //THU
				xtype : 'container',
				layout : {
					type : 'vbox'
				},
				flex : 1,
				items : [{
					xtype : 'container',
					layout : {
						type : 'vbox'
					},
					flex : 1,
					cls : 'form-container',
					items : [{
						xtype : 'container',
						layout : {
							type : 'vbox'
						},
						flex : 1,
						/*scrollable : {
							directionLock : true,
							direction : 'vertical',
							indicators : false
						},*/
						
						defaults : {
							required : true,
							autoComplete : false,
							autoCorrect : false,
							clearIcon : false
						},
						items : [{
							xtype : 'textfield',
							name : 'intype',
							//label: 'Tên tài khoản ',
							cls : 'form-textfield verhical',
							placeHolder : AppConfig.textData.KIEU_THU_NHAP,
							autoCapitalize : false,
							//value : AppConfig.type.LUONG
						}, {
							xtype : 'textfield',
							name : 'innote',
							placeHolder : AppConfig.placeholderData.GHI_CHU_THU,
							cls : 'form-textfield expensetype',
							maxLength: 50
						}, {
							xtype : 'textfield',
							name : 'inpaidby',
							//placeHolder : 'Tien mat hoac ATM',
							cls : 'form-textfield expensetype',
							readOnly: true,
							value: AppConfig.textData.TIEN_MAT
							//label: 'Số tiền hiện có  '
						},{
							xtype : 'textfield',
							name : 'intradedate',
							placeHolder : 'Ngay giao dich',
							cls : 'form-textfield expensetype',
							readOnly : true
						}]
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
				}]
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
			'textfield[name="outtype"]' : {
				focus : function(tf) {
					var me = this;
					MyApp.app.fireEvent(AppConfig.eventData.SHOW_EXPENSE_CHOSEN, AppConfig.type.CHI, tf.getValue(), function(value) {
						//me.amount = money;
						tf.setValue(value);
					}, null);
				}
			},			
			'textfield[name="intype"]' : {
				focus : function(tf) {
					var me = this;
					
					MyApp.app.fireEvent(AppConfig.eventData.SHOW_INCOME_CHOSEN, AppConfig.type.THU, tf.getValue(), function(value) {
						//me.amount = money;
						tf.setValue(value);
					}, null);
				}
			},
			'textfield[name="outpaidby"]' : {
				focus : function(tf) {
					var me = this;
					if (!me._selectedPaid) me._selectedPaid = null;

					MyApp.app.fireEvent(AppConfig.eventData.SHOW_CASH_CHOSEN, AppConfig.type.CHI, me._selectedPaid, function(data) {
						//me.amount = money;
						//tf.setValue(value);
						me._selectedPaid = data;
						var displayname = data.data.name;
						if (data.data.typename != '') displayname = data.data.typename + ' ' + displayname;
						me._outpaidtrade.setValue(displayname);
						me._inpaidtrade.setValue(displayname);
					}, null);
				}
			},
			'textfield[name="inpaidby"]' : {
				focus : function(tf) {
					var me = this;
					if (!me._selectedPaid) me._selectedPaid = null;

					MyApp.app.fireEvent(AppConfig.eventData.SHOW_CASH_CHOSEN, AppConfig.type.THU, me._selectedPaid, function(data) {
						//me.amount = money;
						//tf.setValue(value);
						me._selectedPaid = data;
						var displayname = data.data.name;
						if (data.data.typename != '') displayname = data.data.typename + ' ' + displayname;
						me._outpaidtrade.setValue(displayname);
						me._inpaidtrade.setValue(displayname);
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
		var typename = me._outtype.getValue();
		if (typename == '') {
			AppUtil.alert('Chon chi tieu di ku');
			return;
		}
		if (AppUtil.checkAmount(me.amount)) {
			AppUtil.doTrade(me._outtype.getValue(), AppConfig.type.CHI, me.amount, AppConfig.type.TIEN_MAT, me._outnote.getValue(), me._selectedDate, 'CASH');

			me.hide();
		}
	},
	
	onIncomeButtonClicked: function() {
		var me = this;
		var typename = me._intype.getValue();
		if (typename == '') {
			AppUtil.alert('Chon thu nhap di ku');
			return;
		}
		if (AppUtil.checkAmount(me.amount)) {
			AppUtil.doTrade(me._intype.getValue(), AppConfig.type.THU, me.amount, AppConfig.type.TIEN_MAT, me._innote.getValue(), me._selectedDate, 'CASH');

			me.hide();
		}
	},

	showView : function(money) {
		var me = this;
		me.resetView();
		me.amount = money;
		me._amount.setValue(AppUtil.formatMoneyWithUnit(me.amount));
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
		if (!me._outpaidtrade)
			me._outpaidtrade = me.down('textfield[name = "outpaidby"]');
		
		if (!me._intype)
			me._intype = me.down('textfield[name = "intype"]');
		if (!me._innote)
			me._innote = me.down('textfield[name = "innote"]');
		if (!me._intrade)
			me._intrade = me.down('textfield[name = "intradedate"]');
		if (!me._inpaidtrade)
			me._inpaidtrade = me.down('textfield[name = "inpaidby"]');
		
		me._outtype.setValue('');
		me._intype.setValue('');
		me._outnote.setValue('');
		me._innote.setValue('');
		me._outpaidtrade.setValue(AppConfig.textData.TIEN_MAT);
		me._inpaidtrade.setValue(AppConfig.textData.TIEN_MAT);
		me._outtrade.setValue(todayDateFormat);	
		me._intrade.setValue(todayDateFormat);
		me.getCarousel().setActiveItem(0);
	}
});
