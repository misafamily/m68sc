Ext.define('MyApp.view.apppopup.CashTradeList', {
	extend : 'MyApp.view.comp.AppContainer',
	xtype : 'apppopup_cashtradelist',
	requires:['MyApp.view.comp.AppListPull', 'MyApp.store.Trades_Page'],
	config : {
		emptyListOnHide: true,
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
				html : AppConfig.textData.GIAO_DICH_TIEN_MAT,
				cls : 'apppopup-title'
			}, {
				xtype : 'spacer'
			}, {
				xtype : 'spacer',
				width : 31
			}]
		}, {
			xtype: 'container',
			cls : 'main fullwidth-container fullheight-container record-list-container',
			items: [{
						xclass : 'MyApp.view.comp.AppListPull',
						store: Ext.create('MyApp.store.Trades_Page'),
						cls : 'recorditem-list nobg',
						height: window.innerHeight - 46,
						itemTpl: new Ext.XTemplate(
							'<div class="info">', 
								'<div class= "date">{dd}</div>', 
								'<div class="content">', 
									'<div class="monthyear">{mm:this.showMonth} {yy}</div>', 
									'<div class="title">{title}</div>', 
								'</div>', 
								'<tpl if="this.isChi(type)">',
									'<div class= "total">-{amount:this.showAmount}</div>', 
								'<tpl else>',
									'<div class= "total">+{amount:this.showAmount}</div>', 
								'</tpl>',
							'</div>', {
							isChi: function(type) {
							return type == AppConfig.type.CHI;
							},
							showAmount: function(amount) {
								return AppUtil.formatMoneyWithUnit(amount);
							},
							showMonth: function(mm) {
								return dateFormat.i18n.monthNames[12 + mm];
							}
						}),
						itemHeight: 49
					}
			]
		}],
		control : {
			'button[title="backbtn"]' : {
				tap : function() {
					this.hide();
				}
			}
		}
	},

	showView : function() {
		var me = this;
		me.loadData();
		me.show();
	},

	loadData: function() {
		var me = this;
		if (!me._list) me._list = me.down('list');		
		var store = me._list.getStore();
		store.loadPage(1/*, function(records, operation, success) {
		    //console.log(records);
		    Ext.defer(function(){
		    	me._list.refresh();
		    },100);
		    
		}*/);
	}
});
