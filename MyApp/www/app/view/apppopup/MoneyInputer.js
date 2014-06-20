Ext.define('MyApp.view.apppopup.MoneyInputer', {
	extend : 'Ext.Container',
	xtype : 'apppopup_moneyinputer',
	config : {
		layout : {
			type : 'vbox'
		},
		flex:1,
		cls : 'inputer-container',
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
				html : AppConfig.textData.NHAP_SO_TIEN,
				cls : 'apppopup-title'
			}, {
				xtype : 'spacer'
			}, {
				xtype : 'spacer',
				width : 31
			}]
		}, {
			xtype : 'container',
			cls : 'main',
			layout : {
				type : 'vbox'
			},
			style : {
				'width' : '100%',
				'min-height': '150px'
			},
			flex : 1,
			items : [{
				xtype : 'container',
				layout : {
					type : 'hbox',
					pacK : 'center',
					align : 'center'
				},
				flex : 1,
				cls : 'moneyinputer-amount-container',
				items : [{
					xtype : 'textfield',
					flex : 1,
					clearIcon : false,
					readOnly : true,
					autoComplete : false,
					autoCorrect : false,
					cls : 'b-textfield-moneyinput',
					value : '0',
					styleHtmlContent: true
				}]
			}, {
				xtype : 'container',
				layout : {
					type : 'vbox',
					pacK : 'center',
					align : 'center'
				},
				flex : 2,
				defaults:{
					cls: 'fullwidth-container',
					flex: 1
				},
				items : [{
					xtype : 'container',
					layout : {
						type : 'hbox',
						pacK : 'center',
						align : 'center'
					},
					defaults : {
						xtype : 'button',
						cls : 'moneyinputer-button',
						flex: 1
					},

					items : [{
						text : '7'
					}, {
						text : '8'
					}, {
						text : '9'
					}]
				}, {
					xtype : 'container',
					layout : {
						type : 'hbox',
						pacK : 'center',
						align : 'center'
					},
					defaults : {
						xtype : 'button',
						cls : 'moneyinputer-button',
						flex: 1
					},
					items : [{
						text : '4'
					}, {
						text : '5'
					}, {
						text : '6'
					}]
				}, {
					xtype : 'container',
					layout : {
						type : 'hbox',
						pacK : 'center',
						align : 'center'
					},
					defaults : {
						xtype : 'button',
						cls : 'moneyinputer-button',
						flex: 1
					},
					items : [{
						text : '1'
					}, {
						text : '2'
					}, {
						text : '3'
					}]
				}, {
					xtype : 'container',
					layout : {
						type : 'hbox',
						pacK : 'center',
						align : 'center'
					},
					defaults : {
						xtype : 'button',
						cls : 'moneyinputer-button',
						flex: 1
					},
					items : [{
						text : '000'
					}, {
						text : '0'
					}, {
						text : '',
						iconCls: 'moneyinputer-delete-icon'
					}]
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
				title : 'donebutton'
			}]
		}],
		control : {
			'button' : {
				tap : 'onButtonClicked'
			},

			'button[title="donebutton"]' : {
				tap : 'onDoneButtonClicked'
			},

			'button[title="backbtn"]' : {
				tap : function() {
					MyApp.app.fireEvent(AppConfig.eventData.HIDE_POPUP);
					this.hide();
				}
			}
		}
	},

	initialize : function() {
		var me = this;
		me.callParent(arguments);
		me._valueNumber = 0;
		me._valueString = '0';
		//Ext.defer(function(){me.displayValueFormat();},500);

	},

	onButtonClicked : function(btn) {
		var me = this;
		var value = btn.getText();
		if (me._valueString == '0') me._valueString = '';
		if (value == '') { //del
			if (me._valueString.length > 1) {
				me._valueString = me._valueString.substring(0, me._valueString.length - 1);
			} else
				me._valueString = '0';
			me.displayValueFormat();

		} else if (value == '000') {
			me._valueString += value.toString();
			if (me._valueString.length > 12) {
				me._valueString = me._valueString.substring(0, 12);
			}
			me.displayValueFormat();

		} else if (Ext.isNumber(parseInt(value))) {
			if (me._valueString.length < 12) {
				me._valueString += value.toString();
				
				me.displayValueFormat();
			}

		}
	},

	onDoneButtonClicked : function() {
		//AppUtil.log('onDoneButtonClicked');
		var me = this;
		me._valueNumber = AppUtil.deformatMoneyWithUnit(me._field.getValue());
		
		MyApp.app.fireEvent(AppConfig.eventData.HIDE_POPUP);
		me.hide();

		me._callback(me._valueNumber);
	},

	displayValueFormat : function() {
		var me = this;
		if (!me._field)
			me._field = me.down('textfield');
		me._valueNumber = parseInt(me._valueString);
		me._field.setValue(AppUtil.formatMoneyWithUnit(me._valueNumber));
		me._valueString = me._valueNumber.toString();
	},

	showView : function(value, callback, atitle) {
		var me = this;
		atitle = atitle || AppConfig.textData.NHAP_SO_TIEN;
		if (!me._title)
			me._title = me.down('label[cls="apppopup-title"]');
		me._title.setHtml(atitle.toUpperCase());
		//me._valueNumber = 0;
		me._valueString = value.toString();
		me.displayValueFormat();
		me._valueNumber = 0;
		me._valueString = '0';
		me._callback = callback;
		me.show();
	}
});
