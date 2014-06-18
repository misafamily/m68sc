Ext.define('MyApp.view.ironbox.Cash', {
	extend : 'Ext.Container',
	xtype : 'ironbox_cash',
	config : {
		cls : 'recorditem-container',
		layout : {
			type : 'vbox'
		},

		control: {
			'list': {
				itemtap: function( list, index, target, record, e, eOpts ) {
					//log(record.data.action);
					if (record.data.type == AppConfig.type.TIEN_MAT) {
						switch(record.data.action) {
							case AppConfig.action.DIEU_CHINH:
								MyApp.app.fireEvent(AppConfig.eventData.SHOW_INPUTER, AppUtil.CASH, function(money) {
									if (AppUtil.CASH != money)
										AppUtil.cashEdit(money);
								}, AppConfig.textData.DIEU_CHINH_SO_DU);
								break;
							case AppConfig.action.CHI_TIET_GIAO_DICH:
								MyApp.app.fireEvent(AppConfig.eventData.SHOW_CASH_TRADE_LIST);
								break;
						}
					}
				}
			}
		}
	},

	initialize: function() {
		var me = this;
		me.callParent(arguments);
		MyApp.app.on(AppConfig.eventData.CASH_CHANGED, me.onCashChanged, me);
	},

	onCashChanged: function(amount) {
		var me = this;
		me._lblAmount.setHtml(AppUtil.formatMoney2WithUnit(amount));
	},

	onHeaderTap: function() {
		var me = this;
		me.fireEvent('headertap', me);
	},
	
	collapse: function() {
		var me = this;
		me.hideContent();
		var header = me.getHeader();
		header.removeCls('active');
	},
	
	expand: function() {
		var me = this;
		var header = me.getHeader();
		header.addCls('active');
		me.showContent();
	},
	
	hideContent : function() {
		var me = this;
		var list = me.getList();
		list.hide();
	},
	
	showContent : function() {
		var me = this;
		var list = me.getList();
		
		if (!me._itemStore.isLoaded()) {
			//log(me._itemStore.getModel().getProxy().config.dbConfig.dbQuery);
			me._itemStore.load(function(records) {
				if (records.length) list.setHeight(43 * records.length);
			});
		} 
		
		list.show();
		
	},

	showHeader : function() {
		var me = this;
		me.removeAll(false);

		var data = {title: AppConfig.textData.TIEN_MAT, description: AppConfig.textData.TIEN_MAT_HIEN_CO, total: AppUtil.CASH};
		//log(data);
		var header = me.getHeader();
		
		//if (!me._lblDate) me._lblDate = header.down('label[cls = "recorditem-header-date"]');
		//me._lblDate.setHtml(data.title);
		
		if (!me._lblDayname) me._lblDayname = header.down('label[cls = "recorditem-header-day"]');
		me._lblDayname.setHtml(data.title);
		
		if (!me._lblMonth) me._lblMonth = header.down('label[cls = "recorditem-header-month"]');
		me._lblMonth.setHtml(data.description);
		
		if (!me._lblAmount) me._lblAmount = header.down('label[cls = "recorditem-header-amount"]');
		me._lblAmount.setHtml(AppUtil.formatMoney2WithUnit(parseFloat(data.total)));

		var list = me.getList();
		list.setHeight(0);
		list.hide();
		if (!me._itemStore) {
			me._itemStore = new Ext.data.Store({
				fields: ['title', 'type', 'action']
			});
		} 

		//me.setItemStoreList(list);

		if (list.getStore())
			list.getStore().removeAll();
		else 
			list.setStore(me._itemStore);

		me.add(header);
		me.add(list);

		var listData = AppConfig.ironboxdata.TIEN_MAT;
		me._itemStore.setData(listData);

		list.setHeight(43 * listData.length);
		//me._selectedDate = new Date(data.yy, data.mm, data.dd);
		//MyApp.app.on(AppConfig.eventData.TRADE_ADDED, me.onTradeAdded, me);
	
	},
	
	resetView: function() {
		var me = this;
		me.collapse();
		var list = me.getList();
		if (list.getStore())
				list.getStore().removeAll();
		list.setHeight(0);
		list.hide();
	},

	getHeader : function() {
		var me = this;
		if (!me._header) {
			var header = Ext.create('Ext.Container', {
				cls : 'recorditem-header',
				layout : {
					type : 'hbox'
				},
				items : [{
					xtype : 'container',
					cls : 'tienmat-header-thumb'
				}, {
					xtype : 'container',
					layout : {
						type : 'vbox',
						pack : 'center',
						align : 'start'
					},
					cls : 'recorditem-header-date-info',
					items : [{
						xtype : 'label',
						html : '..',
						cls : 'recorditem-header-day'
					}, {
						xtype : 'label',
						html : '..',
						cls : 'recorditem-header-month'
					}]
				}, //end shape img
				{
					xtype : 'spacer'
				}, //end shape img
				{
					xtype : 'label',
					html : '..',
					cls : 'recorditem-header-amount'
				}]
			});
			
			me._header = Ext.create('Ext.Container', {
				cls : 'recorditem-header-container',
				layout : {
					type : 'hbox'
				},
				items : [header],
				listeners: {
			        element: 'element',
			        tap: function() {
			            me.onHeaderTap();
			        }
				}
			});
		}
		return this._header;
	},
	getList : function() {
		//console.log('getIngredientList');
		if (!this._list) {
			this._list = Ext.create('MyApp.view.comp.AppList', {
				cls : 'recorditem-list',
				itemTpl : new Ext.XTemplate(
					'<div class="info">', 
						'<img class= "thumb" src="resources/images/fields/f-xeco.png"></img>', 
						'<div class="content">', 
							'<div class="title">{title}</div>', 
							//'<div class="description">{trade_note}</div>', 
						'</div>',
					'</div>'
				),
				scrollable: false
			});
		}
		return this._list;
	}
});
