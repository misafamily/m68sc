Ext.define('MyApp.view.apppopup.DateChooser', {
	extend : 'Ext.Container',
	xtype : 'apppopup_datechooser',
	requires:['MyApp.view.comp.DateChooserView'],
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
				html : '',
				cls : 'apppopup-title'
			}, {
				xtype : 'spacer'
			}, {
				xtype : 'spacer',
				width : 45
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
					type : 'vbox',
					pacK : 'center',
					align : 'center'
				},
				flex : 1,
				cls : 'moneyinputer-amount-container',
				items : [{
					xtype : 'label',
					html : '',
					cls : 'datechooser-date-choosen',
					flex : 2
				},{
					xtype : 'label',
					html : '',
					cls : 'datechooser-month-choosen',
					flex : 1
				}]
			}, {
				xtype : 'container',
				layout : {
					type : 'vbox',
					pacK : 'center',
					align : 'center'
				},
				flex : 2,
				cls: 'fullwidth-container',
				items : [{
					xtype : 'comp_datechooser',
					viewMode: 'month',
					flex: 1,
					width: '100%',
					value: new Date()
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
				cls : 'button-icon toolbar-button-done2',
				title : 'donebutton'
			}]
		}],
		control : {
			/*'button' : {
				tap : 'onButtonClicked'
			},*/
			'comp_datechooser': {
				'selectionchange': function(view, date, prevDate) {
					
					var me = this;
					me.onCalendarSelectionChanged(date);
				}
			},

			'button[title="donebutton"]' : {
				tap : 'onDoneButtonClicked'
			},

			'button[title="backbtn"]' : {
				tap : function() {
					this.hide();
				}
			}
		}
	},

	initialize : function() {
		var me = this;
		me.callParent(arguments);
		me._selectedDate = new Date();

	},
	
	onCalendarSelectionChanged: function(date) {
		var me = this;
		me._selectedDate = date;
		//AppUtil.log('change date: ' + date.tradeDateFormat());
		if (!me._titleLbl) me._titleLbl = me.down('label[cls="apppopup-title"]');
		if (!me._dateLbl) me._dateLbl = me.down('label[cls="datechooser-date-choosen"]');
		if (!me._monthLbl) me._monthLbl = me.down('label[cls="datechooser-month-choosen"]');
		
		me._titleLbl.setHtml(me._selectedDate.getDayName().toUpperCase());
		me._dateLbl.setHtml(me._selectedDate.getDate().toString());
		me._monthLbl.setHtml(me._selectedDate.getMonthName().toUpperCase());
	},


	onDoneButtonClicked : function() {
		//AppUtil.log('onDoneButtonClicked');
		var me = this;
		me._callback(Ext.Date.clone(me._selectedDate));
		me.hide();
	},

	displayValueFormat : function() {
		var me = this;
		if (!me._field)
			me._field = me.down('textfield');
		me._valueNumber = parseInt(me._valueString);
		me._field.setValue(AppUtil.formatMoneyWithUnit(me._valueNumber));
		me._valueString = me._valueNumber.toString();
	},

	showView : function(date, callback) {
		var me = this;
		me.onCalendarSelectionChanged(date);
		me._callback = callback;
		me.show();
	}
});
