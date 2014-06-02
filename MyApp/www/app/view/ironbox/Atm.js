Ext.define('MyApp.view.ironbox.Atm', {
	extend : 'Ext.Container',
	xtype : 'ironbox_atm',
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
	
	onTradeAdded: function(date) { //if already showed, update the list
		var me = this;
		var list = me.getList();
		
		if (me._selectedDate.sameDateWith(date)) {
			//list.setHeight(0);
			//me._itemStore.removeAll();
			me._itemStore.load(function(records) {
				if (records.length) {
					list.setHeight(43 * records.length);
					var total = 0;
					Ext.Array.each(records, function(record, i){
						if (record.data.type == AppConfig.type.THU) {
							total += parseInt(record.data.amount);
						} else if (record.data.type == AppConfig.type.CHI) {
							total -= parseInt(record.data.amount);
						}
					});
					me.getModel().data.total = total.toString();
					me._lblAmount.setHtml(AppUtil.formatMoney2(total));
				} else {
					me.parent.parent.parent.removeItem(me);
				}
				//call Record to update balance value
				me.parent.parent.parent.updateBalance();
				
			});
		}
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
