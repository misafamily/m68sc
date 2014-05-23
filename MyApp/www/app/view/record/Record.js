Ext.define('MyApp.view.record.Record', {
	extend : 'Ext.Container',
	xtype : 'record',
	requires : [],
	config : {
		layout : {
			type : 'vbox'
		},
		items : [{
			xtype : 'container',
			flex : 1,
			layout : {
				type : 'vbox'
			},
			cls : 'app-container',
			items : [{
				xtype : 'container',
				layout : {
					type : 'vbox',
					pack : 'center',
					align : 'center'
				},
				cls: 'record-date-container',
				items : [{
					xtype : 'label',
					html : 'THANG 5.2014',
					cls : 'record-date'
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
				cls : 'button-icon toolbar-button-search'
			}, {
				xtype : 'spacer'
			}, {
				xtype : 'button',
				cls : 'button-icon toolbar-button-add',
				title : 'addtradebutton'
			}, {
				xtype : 'spacer'
			}, {
				xtype : 'button',
				cls : 'button-icon toolbar-button-tag'
			}]
		}]
	},

	initialize : function() {
		var me = this;
		me.callParent(arguments);

		//MyApp.app.on('expense_changed', me.onExpenseChanged, me);
		//MyApp.app.on('thuchi_changed', me.onThuChiChanged, me);
	}
});
