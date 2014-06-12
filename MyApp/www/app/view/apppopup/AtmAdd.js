Ext.define('MyApp.view.apppopup.AtmAdd', {
	extend : 'Ext.Container',
	xtype : 'apppopup_atmadd',
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
			cls : 'fullwidth-container viewbase-toolbar-top',
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
				html : AppConfig.textData.THEM_TAI_KHOAN_ATM,
				cls : 'apppopup-title'
			}, {
				xtype : 'spacer'
			}, {
				xtype : 'spacer',
				width : 31
			}]
		}, {
			xtype : 'container',
			layout : {
				type : 'vbox'
			},
			flex : 1,
			cls : 'main fullwidth-container',
			items : [{
				xtype : 'container',
				layout : {
					type : 'vbox',
					pack : 'center',
					align : 'start'
				},
				cls : 'record-date-container',
				items : [{
					xtype : 'label',
					html : AppConfig.textData.DIEN_THONG_TIN_ATM,
					cls : 'record-date'
				}]
			},{
				xtype : 'container',
				style: {
					'margin-top':'10px'
				},
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
					autoCapitalize : false,
					clearIcon : false,
					readOnly : false	
				},
				items : [{
					xtype : 'textfield',
					name : 'owner',
					//label: 'Tên tài khoản ',
					cls : 'form-textfield verhical',
					placeHolder : AppConfig.placeholderData.TEN_CHU_THE,					
					value : '',
					maxLength: 25
				}, /*{
					xtype: 'comp_pathmenu',
					zIndex: 2
				},*/{
					xtype : 'textfield',
					name : 'bank',
					placeHolder : AppConfig.placeholderData.NGAN_HANG,	
					cls : 'form-textfield expensetype',
					value : '',
					maxLength: 25
				}, {
					xtype : 'textfield',
					name : 'amount',
					placeHolder : AppConfig.placeholderData.TIEN_HIEN_CO,
					cls : 'form-textfield expensetype',
					readOnly : true				
					//label: 'Số tiền hiện có  '
				}, {
					xtype : 'textfield',
					name : 'note',
					placeHolder : AppConfig.placeholderData.GHI_CHU,
					cls : 'form-textfield expensetype',
					maxLength: 100
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
				title : 'addbutton'
			}]		
		}],
		control : {
			'textfield[name="amount"]' : {
				focus : function(tf) {
					var me = this;
					MyApp.app.fireEvent(AppConfig.eventData.SHOW_INPUTER, tf.getValue(), function(money) {
						me.amount = money;
						tf.setValue(AppUtil.formatMoneyWithUnit(money));
					}, null);
				}
			},

			'button[title="backbtn"]' : {
				tap : function() {
					this.hide();
				}
			},

			'button[title="addbutton"]' : {
				tap : function() {
					this.addAtm();
				}
			},

		}
	},

	showView : function() {
		var me = this;
		me.disable();
		me.amount = 0;
		if (!me._owner) me._owner = me.down('textfield[name="owner"]');
		if (!me._bank) me._bank = me.down('textfield[name="bank"]');
		if (!me._amount) me._amount = me.down('textfield[name="amount"]');
		if (!me._note) me._note = me.down('textfield[name="note"]');
		me._owner.reset();
		me._bank.reset();
		me._amount.reset();
		me._note.reset();
		
		me.show();
		Ext.defer(function() {
			me.enable();
		},300);
	},



	addAtm: function() {
		var me = this;
		

		var owner = me._owner.getValue();
		var bank = me._bank.getValue();
		var amount = me._amount.getValue();
		var note = me._note.getValue() || '';

		if (!owner || !bank || !amount) {
			AppUtil.alert(AppConfig.textData.NHAP_DATA_ERROR, AppConfig.textData.NHAP_DATA_TITLE);
		} else {
			var data = {
				owner: owner,
				bank: bank,
				amount: me.amount,
				note: me.note,
				type: AppConfig.type.ATM
			};
			//AppUtil.log(data);
			var hunter = Ext.create('MyApp.model.Hunter', data);
			hunter.save(function() {
				me.hide();
				MyApp.app.fireEvent(AppConfig.eventData.ATM_ADDED, hunter);
				AppUtil.autoAlert(AppConfig.textData.TAO_ATM_OK);
			});
		}
	}
});
