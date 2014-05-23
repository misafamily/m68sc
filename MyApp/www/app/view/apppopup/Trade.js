Ext.define('MyApp.view.apppopup.Trade', {
	extend : 'Ext.Container',
	xtype : 'apppopup_trade',
	requires:['MyApp.view.comp.PathMenu'],
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
				width : 45
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
			xtype : 'container',
			layout : {
				type : 'hbox',
				pacK : 'center',
				align : 'center'
			},
			cls : 'trade-amount-container',
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
							//placeHolder : AppConfig.type.DI_CHO,
							autoCapitalize : false,
							value : AppConfig.type.DI_CHO
						}, /*{
							xtype: 'comp_pathmenu',
							zIndex: 2
						},*/{
							xtype : 'textfield',
							name : 'outnote',
							placeHolder : 'Mua gi ?',
							cls : 'form-textfield expensetype',
							value : 'Thit ca'
						}, {
							xtype : 'textfield',
							name : 'outpaidby',
							placeHolder : 'Tien mat hoac ATM',
							cls : 'form-textfield expensetype'
							//label: 'Số tiền hiện có  '
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
						cls : 'button-icon toolbar-button-done',
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
			AppUtil.doTrade(me._outtype.getValue(), AppConfig.type.CHI, me.amount, AppConfig.type.TIEN_MAT, me._outtype.getValue(), new Date(), 'CASH');

			me.hide();
		}
	},
	
	onIncomeButtonClicked: function() {
		var me = this;
		if (AppUtil.checkAmount(me.amount)) {
			AppUtil.doTrade(me._intype.getValue(), AppConfig.type.THU, me.amount, AppConfig.type.TIEN_MAT, me._intype.getValue(), new Date(), 'CASH');

			me.hide();
		}
	},

	displayValueFormat : function() {
		var me = this;
		if (!me._field)
			me._field = me.down('textfield');
		me._valueNumber = parseInt(me._valueString);
		me._field.setValue(AppUtil.formatMoney(me._valueNumber));
		me._valueString = me._valueNumber.toString();
	},

	showView : function() {
		var me = this;
		me.resetView();
		me.show();
	},

	resetView : function() {
		var me = this;
		if (!me._amount)
			me._amount = me.down('textfield[name = "amount"]');
		me._amount.reset();
		
		if (!me._outtype)
			me._outtype = me.down('textfield[name = "outtype"]');
		if (!me._outnote)
			me._outnote = me.down('textfield[name = "outnote"]');
		
		if (!me._intype)
			me._intype = me.down('textfield[name = "intype"]');
		if (!me._innote)
			me._innote = me.down('textfield[name = "innote"]');
	}
});
