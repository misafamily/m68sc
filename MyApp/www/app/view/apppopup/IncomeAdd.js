Ext.define('MyApp.view.apppopup.IncomeAdd', {
	extend : 'Ext.Container',
	xtype : 'apppopup_incomeadd',
	requires:[],
	config : {
		cls : 'popup-container',
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
				html : AppConfig.textData.THU_NHAP + ' ' + AppConfig.textData.ATM_ONLY,
				cls : 'apppopup-title'
			}, {
				xtype : 'spacer'
			}, {
				xtype : 'spacer',
				width : 31
			}]
		}, {
			xtype: 'container',
			cls: 'main',
			flex: 1,
			layout: 'vbox',
			items:[{
				xtype: 'container',
				cls : 'trade-amount-container',
				items: [{
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
				}]
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
							//placeHolder : AppConfig.type.LUONG,
							autoCapitalize : false,
							value : AppConfig.type.LUONG
						}, {
							xtype : 'textfield',
							name : 'innote',
							placeHolder : 'Mua gi ?',
							cls : 'form-textfield expensetype',
							value : 'Luong thang'
						}, {
							xtype : 'textfield',
							name : 'inpaidby',
							placeHolder : 'Tien mat hoac ATM',
							cls : 'form-textfield expensetype'
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
			'button[title = "addincomebutton"]' : {
				tap : 'onIncomeButtonClicked'
			}
		}
	},

	initialize : function() {
		var me = this;
		me.callParent(arguments);

	},

	onIncomeButtonClicked: function() {
		var me = this;
		if (AppUtil.checkAmount(me.amount)) {
			if (me.type == AppConfig.type.TIEN_MAT)
				AppUtil.doTrade(me._intype.getValue(), AppConfig.type.THU, me.amount, AppConfig.type.TIEN_MAT, me._innote.getValue(), me._selectedDate, 'CASH');
			else if (me.type == AppConfig.type.ATM) {
				AppUtil.doTrade(me._intype.getValue(), AppConfig.type.THU, me.amount, AppConfig.type.ATM, me._innote.getValue(), me._selectedDate, me._model.data.id);
				me._model.data.amount = (parseInt(me._model.data.amount) + me.amount).toString();
				me._model.save(function() {
					MyApp.app.fireEvent(AppConfig.eventData.ATM_CHANGED, me._model.data.id);
					AppUtil.autoAlert(AppConfig.textData.GIAO_DICH_OK);
				});	
			}
				
			me.hide();
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

		me._inpaidby.setReadOnly(false);
		if (me._model) {
			me._inpaidby.setReadOnly(true);
			me._inpaidby.setValue('ATM ' + me._model.data.owner);
		}
		
		me._intrade.setValue(todayDateFormat);
	}
});
