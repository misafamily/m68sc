Ext.define('MyApp.view.record.RecordItem', {
	extend : 'Ext.Container',
	xtype : 'record_recorditem',
	requires : ['MyApp.store.Trades_Day'],
	config : {
		cls : 'recorditem-container',
		model : null,
		itemStoreList : null,
		layout : {
			type : 'vbox'
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
		//list.setHeight(0);
		//me._itemStore.removeAll();
		list.hide();
	},
	
	showContent : function() {
		var me = this;
		var list = me.getList();
		
		if (!me._itemStore.isLoaded()) {
			list.setHeight(0);
			me._itemStore.removeAll();
			log(me._itemStore.getModel().getProxy().config.dbConfig.dbQuery);
			me._itemStore.load(function(records) {
				if (records.length) list.setHeight((42 * records.length) + 2.5);
			});
		} else 
			list.show();
		
	},

	showHeader : function() {
		var me = this;
		me.removeAll(false);
		var model = me.getModel();
		if (model) {
			var data = model.data;
			log(data);
			var header = me.getHeader();
			
			var now = new Date(data.yy, data.mm, data.dd);
			
			if (!me._lblDate) me._lblDate = header.down('label[cls = "recorditem-header-date"]');
			me._lblDate.setHtml(data.dd);
			
			if (!me._lblDayname) me._lblDayname = header.down('label[cls = "recorditem-header-day"]');
			me._lblDayname.setHtml(now.getShortDayName());
			
			if (!me._lblMonth) me._lblMonth = header.down('label[cls = "recorditem-header-month"]');
			me._lblMonth.setHtml(now.getMonthName() + ' ' + now.getFullYear().toString());
			
			if (!me._lblAmount) me._lblAmount = header.down('label[cls = "recorditem-header-amount"]');
			me._lblAmount.setHtml(AppUtil.formatMoney(parseFloat(data.total)));
			
			
			/*var title = header.down('container[cls= "food-grocery-item-title"]');
			 title.setHtml((this.getData()['name'] ? this.getData()['name'] : this.getData()['title']).toUpperCase());

			 var itemstext = header.down('container[cls= "food-grocery-item-items"]');
			 itemstext.setHtml(this.getData()['total_item'] + ' items');
			 */
			var list = me.getList();
			list.setHeight(0);
			if (!me._itemStore) {
				me._itemStore = new MyApp.store.Trades_Day();
			} 
			//data.items;
			

			AppUtil.offline.updateStoreQuery(me._itemStore, 'Trades_Day', {
				dd : now.getDate(),
				mm : now.getMonth(),
				yy : now.getFullYear()
			});
			
			me.setItemStoreList(list);

			if (list.getStore())
				list.getStore().removeAll();
			else 
				list.setStore(me._itemStore);

			me.add(header);
			me.add(list);
			//this.add(buttons);
			
			me._selectedDate = new Date(data.yy, data.mm, data.dd);
			MyApp.app.on(AppConfig.eventData.TRADE_ADDED, me.onTradeAdded, me);
		}
	},
	
	resetView: function() {
		var me = this;
		me.collapse();
		var list = me.getList();
		if (list.getStore())
				list.getStore().removeAll();
		list.setHeight(0);
	},
	
	onTradeAdded: function(date) { //if already showed, update the list
		var me = this;
		var list = me.getList();
		
		if (me._itemStore.isLoaded() && me._selectedDate.sameDateWith(date)) {
			list.setHeight(0);
			me._itemStore.removeAll();
			me._itemStore.load(function(records) {
				if (records.length) {
					list.setHeight((42 * records.length) + 2.5);
					var total = 0;
					Ext.Array.each(records, function(record, i){
						if (record.data.type == AppConfig.type.THU) {
							total += parseInt(record.data.amount);
						} else if (record.data.type == AppConfig.type.CHI) {
							total -= parseInt(record.data.amount);
						}
					});
					me.getModel().data.total = total.toString();
					me._lblAmount.setHtml(AppUtil.formatMoney(total));
				} else {
					me.parent.parent.parent.removeItem(me);
				}
				
				
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
					xtype : 'label',
					html : '10',
					cls : 'recorditem-header-date'
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
						html : 'Thu 2',
						cls : 'recorditem-header-day'
					}, {
						xtype : 'label',
						html : 'Thang 5 2014',
						cls : 'recorditem-header-month'
					}]
				}, //end shape img
				{
					xtype : 'spacer'
				}, //end shape img
				{
					xtype : 'label',
					html : '+900.000',
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
							'<div class="description">{trade_note}</div>', 
						'</div>', 
						'<tpl if="this.isChi(type)">',
							'<div class= "total">-{amount:this.showAmount}</div>', 
						'<tpl else>',
							'<div class= "total">+{amount:this.showAmount}</div>', 
						'</tpl>',
					'</div>', {
						isChi: function(type) {
							return type == 'chi';
						},
						showAmount: function(amount) {
							return AppUtil.formatMoney(amount);
						}
				}),
				scrollable: false
			});
		}
		return this._list;
	}
});
