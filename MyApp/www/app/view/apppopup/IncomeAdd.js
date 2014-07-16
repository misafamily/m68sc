Ext.define('MyApp.view.apppopup.IncomeAdd', {
	extend : 'Ext.Container',
	xtype : 'apppopup_incomeadd',
	requires:[],
	config : {
		cls : 'popup-container',
		layout : {
			type : 'vbox',
			pack : 'center',
			align : 'center'
		},
		items : [{
			//xtype: 'toolbar',
			//docked: 'bottom',
			xtype : 'container',
			layout : {
				type : 'hbox',
				align : 'center',
				pack: 'center'
			},
			cls : 'viewbase-toolbar-top',
			width : '100%',
			items : [{
				xtype : 'label',
				html : AppConfig.textData.THU_NHAP + ' ' + AppConfig.textData.ATM_ONLY,
				cls : 'apppopup-title'
			}]
		}, {
			xtype: 'container',
			cls: 'main',
			flex: 1,
			layout: 'vbox',
			items:[{
				xtype: 'container',
				cls : 'trade-amount-container',
				items: [
					{
						xtype : 'container',
						layout : {
							type : 'vbox',
							pack : 'center',
							align : 'center'
						},					
						flex: 1,
						cls: 'trade-amount',
						items : [{
							xtype : 'textfield',
							//flex : 1,
							clearIcon : false,
							readOnly : true,
							autoComplete : false,
							autoCorrect : false,
							cls : 'b-textfield-moneyinput trade',
							value : '0',
							name : 'amount',
							styleHtmlContent: true,
							inputCls: 'income'
						}, {
							xtype: 'container',
							cls: 'b-textfield-moneyinput-bottomline trade'
						}]
					}
				]
			}, { //THU
				xtype : 'container',
				layout : {
					type : 'vbox'
				},
				flex : 1,
				width: '100%',
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
						scrollable : {
							directionLock : true,
							direction : 'vertical',
							indicators: false
						},
						
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
							readOnly: true,
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
						cls : 'toolbar-bottom-button ok',
						title : 'donebutton',
						text: AppConfig.textData.BUTTON_OK,
						flex: 1
					}, {
						xtype : 'button',
						cls : 'toolbar-bottom-button cancel',
						title : 'backbtn',
						text: AppConfig.textData.BUTTON_CANCEL,
						flex: 1
					}]
				}]
			}]
		}],
		control : {

			'button[title="backbtn"]' : {
				tap : function() {
					MyApp.app.fireEvent(AppConfig.eventData.HIDE_POPUP);
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
			'textfield[name="intradedate"]' : {
				focus : function(tf) {
					var me = this;
					MyApp.app.fireEvent(AppConfig.eventData.SHOW_DATE_CHOOSER, me._selectedDate, function(date) {
						me._selectedDate = date;
						//tf.setValue(me._selectedDate.tradeDateFormat());
						var todayDateFormat = me._selectedDate.tradeDateFormat();
		
						me._intrade.setValue(todayDateFormat);
					});
				}
			},
			'button[title = "donebutton"]' : {
				tap : 'onIncomeButtonClicked'
			},

			'textfield[name="intype"]' : {
				focus : function(tf) {
					var me = this;
					
					MyApp.app.fireEvent(AppConfig.eventData.SHOW_INCOME_CHOSEN, AppConfig.type.THU, tf.getValue(), function(value) {
						//me.amount = money;
						tf.setValue(value);
					}, null);
				}
			}
		}
	},

	initialize : function() {
		var me = this;
		me.callParent(arguments);

	},

	onIncomeButtonClicked: function() {
		var me = this;
		var typename = me._intype.getValue();
		if (typename == '') {
			AppUtil.alert('Chon thu nhap di ku');
			return;
		}

		if (AppUtil.checkAmount(me.amount)) {
			if (me.type == AppConfig.type.TIEN_MAT)
				AppUtil.doTrade(me._intype.getValue(), AppConfig.type.THU, me.amount, AppConfig.type.TIEN_MAT, me._innote.getValue(), me._selectedDate, 'CASH');
			else if (me.type == AppConfig.type.ATM) {
				AppUtil.doTrade(me._intype.getValue(), AppConfig.type.THU, me.amount, AppConfig.type.ATM, me._innote.getValue(), me._selectedDate, me._model.data.id);
				me._model.data.amount = (parseInt(me._model.data.amount) + me.amount).toString();
				me._model.save(function() {
					MyApp.app.fireEvent(AppConfig.eventData.ATM_CHANGED, me._model.data.id);
					AppUtil.autoAlert(AppConfig.textData.GIAO_DICH_OK);
					MyApp.app.fireEvent(AppConfig.eventData.HIDE_POPUP);	
					me.hide();
				});	
			} else {
				MyApp.app.fireEvent(AppConfig.eventData.HIDE_POPUP);	
				me.hide();
			}
			
		}
	},

	showView : function(money, type, model) { //type= tien_mat or atm
		var me = this;		
		me.type = type;
		if (type == AppConfig.type.ATM) me._model = model;
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
		
		if (!me._intype)
			me._intype = me.down('textfield[name = "intype"]');
		if (!me._innote)
			me._innote = me.down('textfield[name = "innote"]');
		if (!me._intrade)
			me._intrade = me.down('textfield[name = "intradedate"]');
		if (!me._inpaidby)
			me._inpaidby = me.down('textfield[name = "inpaidby"]');

		me._intype.reset();
		me._innote.reset();
		me._inpaidby.setReadOnly(false);
		if (me._model) {
			me._inpaidby.setReadOnly(true);
			me._inpaidby.setValue('ATM ' + me._model.data.owner);
		}
		
		me._intrade.setValue(todayDateFormat);
	}
});
