Ext.define('MyApp.view.apppopup.Trade', {
	extend : 'Ext.Container',
	xtype : 'apppopup_trade',
	config : {
		cls:'popup-container',
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
				xtype : 'label',
				html : AppConfig.textData.THEM_GIAO_DICH,
				cls : 'apppopup-title'
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
			//xtype: 'toolbar',
			//docked: 'bottom',
			xtype : 'container',
			layout : {
				type : 'card'
			},
			flex: 1,
			scrollable: true,
			cls : 'form-container',
			items : [{
				xtype : 'container',
				style: {
					'background': 'transparent'
				},
				//title: 'Thông tin tài khoản:',
				//instructions: '(Vui lòng điền đầy đủ thông tin phía trên)',
				defaults : {
					required : true,
					autoComplete : false,
					autoCorrect : false,
					clearIcon: false
				},
				items : [{
					xtype : 'textfield',
					name : 'type',
					//label: 'Tên tài khoản ',
					cls : 'form-textfield verhical',
					placeHolder : AppConfig.placeholderData.TYPE,
					autoCapitalize : false
				}, {
					xtype : 'textfield',
					name : 'amount',
					//label: 'Ngân hàng ',
					cls : 'form-textfield amount',
					placeHolder : AppConfig.placeholderData.AMOUNT,
					autoCapitalize : false,
					readOnly: true
				}, {
					xtype : 'textfield',
					name : 'note1',
					placeHolder : 'Mua gi ?',
					cls : 'form-textfield expensetype'
					//label: 'Số tiền hiện có  '
				}, {
					xtype : 'textfield',
					name : 'note2',
					placeHolder : 'O dau ?',
					cls : 'form-textfield expensetype'
					//label: 'Số tiền hiện có  '
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
				xtype : 'button',
				cls : 'button-icon toolbar-button-done',
				title : 'addtradebutton'
			}]
		}],
		control : {
			'button[title="donebutton"]' : {
				tap : 'onDoneButtonClicked'
			},

			'button[title="backbtn"]' : {
				tap : function() {
					this.hide();
				}
			},
			'textfield[name="amount"]' : {
				focus: function(tf) {
					//var me = this;
					MyApp.app.fireEvent(AppConfig.eventData.SHOW_INPUTER, tf.getValue(), function(money){
						tf.setValue(AppUtil.formatMoneyWithUnit(money));
					});
				}
			}
		}
	},

	initialize : function() {
		var me = this;
		me.callParent(arguments);

	},

	onDoneButtonClicked : function() {
		AppUtil.log('onDoneButtonClicked');
		var me = this;
		me._callback(me._valueNumber);
		me.hide();
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
		me.show();
	}
});
