Ext.define('MyApp.view.ironbox.Atm', {
	extend : 'Ext.Container',
	xtype : 'ironbox_atm',
	requires:['MyApp.store.Atms', 'MyApp.view.ironbox.AtmItem'],
	config : {
		cls : 'recorditem-container',
		layout : {
			type : 'vbox'
		},

		control: {
			'list': {
				itemtap: function( list, index, target, record, e, eOpts ) {
					//log(record.data.action);
					if (record.data.type == AppConfig.type.ATM) {
						switch(record.data.action) {				
							case AppConfig.action.THEM:
								MyApp.app.fireEvent(AppConfig.eventData.SHOW_ATM_ADD);
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

		MyApp.app.on(AppConfig.eventData.ATM_ADDED, me.onAtmAdded, me);
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
		var atmlist = me.getAtmList();
		list.hide();
		atmlist.hide();
	},
	
	showContent : function() {
		var me = this;
		var atmlist = me.getAtmList();

		var list = me.getList();
		
		if (!me._itemStore.isLoaded()) {
			//log(me._itemStore.getModel().getProxy().config.dbConfig.dbQuery);
			me._itemStore.load(function(records) {
				if (records.length) list.setHeight(43 * records.length);
			});
		} 
		
		list.show();
		atmlist.show();
		
	},

	showHeader : function() {
		var me = this;
		me.removeAll(false);

		var data = {title: AppConfig.textData.ATM, description: AppConfig.textData.TIEN_TRONG_TAI_KHOAN, total: 0};
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

		var atmlist = me.getAtmList();
		atmlist.setHeight(0);
		atmlist.hide();

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
		me.add(atmlist);

		var listData = AppConfig.ironboxdata.ATM;
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

	onAtmAdded: function(atmModel) {
		var me = this;
		var atmItem = Ext.create('MyApp.view.ironbox.AtmItem');
		atmItem.showHeader(atmModel);
		atmItem.on('headertap', me.onItemTap, me);
		me._atmContainer.add(atmItem);
		me._atmContainer.setHeight(me._atmContainer.getHeight() + 40);
	},
	
	onItemTap: function(item) {
		var me = this;
		var needDelay = false;
		if (me._expandItem) {
			needDelay = true;
			me._expandItem.collapse();
			if (me._expandItem == item) {		
				me._expandItem = null;
				return;
			} 
				
		} 
		me._expandItem = item;	
		if (needDelay) {
			Ext.defer(function(){
				me._expandItem.expand();
			}, 30);
		} else 
			me._expandItem.expand();
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
	},

	getAtmList: function() {
		var me = this;
		if (!me._atmStore) me._atmStore = Ext.create('MyApp.store.Atms');
		if (!me._atmContainer) {
			me._atmContainer = Ext.create('Ext.Container', {
				cls : 'recorditem-container',
				layout : {
					type : 'vbox'
				}
			});

			me._atmStore.load(function(records){
				Ext.each(records, function(record, i) {
					var atmItem = Ext.create('MyApp.view.ironbox.AtmItem');
					atmItem.showHeader(record);
					atmItem.on('headertap', me.onItemTap, me);
					me._atmContainer.add(atmItem);
				});

				me._atmContainer.setHeight(40*records.length);
			});
		}
		//me.add(me._atmContainer);
		return me._atmContainer;
	}
});
