Ext.define('MyApp.view.comp.MoneyInputer', {
	extend : 'Ext.Container',
	xtype : 'comp_moneyinputer',
	config : {
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
				pack : 'center',
				align: 'center'
			},
			cls : 'viewbase-toolbar-bottom',
			width : '100%',
			items : [{
				xtype : 'button',
				cls : 'button-icon toolbar-button-back',
				title : 'backbtn'
			},{
				xtype : 'spacer'
			},{
				xtype : 'button',
				cls : 'button-icon toolbar-button-add',
				title : 'doneaddexpensebutton'

			}]
		}, {
			xtype : 'label',
			html : 'SO TIEN',
			cls : 'label-income',
			style : {
				'margin' : '15px',
				'margin-bottom' : '5px',
				'width' : '100%'
			}
		}, {
			xtype : 'container',
			layout : {
				type : 'hbox',
				pacK : 'center',
				align : 'center'
			},
			style : {
				'margin-bottom' : '10px'
			},
			items : [{
				xtype : 'textfield',
				flex : 1,
				clearIcon : false,
				readOnly : true,
				autoComplete : false,
				autoCorrect : false,
				cls : 'b-textfield-moneyinput',
				value : '0'
			}, {
				xtype : 'label',
				html : 'd',
				style : {
					'margin-left' : '10px'
				}
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
				width : 90,
				height : 80
			},
			style : {
				'margin-bottom' : '10px'
			},
			items : [{
				text : '1',
				style : {
					'margin-right' : '10px'
				}
			}, {
				text : '2',
				style : {
					'margin-right' : '10px'
				}
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
				width : 90,
				height : 80
			},
			style : {
				'margin-bottom' : '10px'
			},
			items : [{
				text : '4',
				style : {
					'margin-right' : '10px'
				}
			}, {
				text : '5',
				style : {
					'margin-right' : '10px'
				}
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
				width : 90,
				height : 80
			},
			style : {
				'margin-bottom' : '10px'
			},
			items : [{
				text : '7',
				style : {
					'margin-right' : '10px'
				}
			}, {
				text : '8',
				style : {
					'margin-right' : '10px'
				}
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
				width : 90,
				height : 80
			},
			items : [{
				text : '000',
				style : {
					'margin-right' : '10px',
					'font-size' : '44px'
				}
			}, {
				text : '0',
				style : {
					'margin-right' : '10px'
				}
			}, {
				text : 'del',
				style : {
					'font-size' : '44px'
				}
			}]
		}, {
			xtype : 'spacer'

		}],
		control : {
			'button' : {
				tap : 'onButtonClicked'
			},

			'button[title="doneaddexpensebutton"]' : {
				tap : 'onDoneButtonClicked'
			},
			
			'button[title="backbtn"]': {
				tap: function() {
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
		if (value == 'del') {
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

	showInputer : function(callback) {
		var me = this;
		//me._valueNumber = 0;
		me._valueString = '0';
		me.displayValueFormat();
		me._callback = callback;
		me.show();
	}
});
