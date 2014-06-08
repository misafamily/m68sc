Ext.define('MyApp.view.record.RecordItem', {
	extend : 'Ext.Container',
	xtype : 'record_recorditem',
	requires : ['MyApp.store.Trades'],
	config : {
		cls : 'recorditem-container',
		isToday: false,
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
		var model = me.getModel();
		if (model) {
			var data = model.data;
			var header = me.getHeader();
			
			var now = new Date(data.yy, data.mm, data.dd);
			
			if (!me._lblDate) me._lblDate = header.down('label[title = "headerdate"]');
			me._lblDate.setHtml(data.dd);
			
			if (!me._lblDayname) me._lblDayname = header.down('label[title = "headerday"]');
			me._lblDayname.setHtml(now.dateFormatWithoutTime());
			
			if (!me._lblMonth) me._lblMonth = header.down('label[title = "headermonth"]');
			me._lblMonth.setHtml(now.getMonthName() + ' ' + now.getFullYear().toString());
			
			if (!me._lblAmount) me._lblAmount = header.down('label[cls = "recorditem-header-amount"]');
			me._lblAmount.setHtml(AppUtil.formatMoney2WithUnit(parseFloat(data.total)));

			if (now.sameDateWith(new Date())) {
				me.setIsToday(true);
				//me._lblDayname.setHtml(now.dateFormatWithoutTime().toUpperCase());
				me._lblDate.addCls('today');
				me._lblDayname.addCls('today');
				me._lblMonth.addCls('today');
			} else {
				me.setIsToday(false);
				
				me._lblDate.removeCls('today');
				me._lblDayname.removeCls('today');
				me._lblMonth.removeCls('today');
			}

			var list = me.getList();
			list.setHeight(0);
			list.hide();
			if (!me._itemStore) {
				me._itemStore = Ext.create('MyApp.store.Trades');
			} 

			me._itemStore.changeQuery('Trades_Day', {
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
					xtype : 'label',
					html : '10',
					cls : 'recorditem-header-date',
					title: 'headerdate'
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
						cls : 'recorditem-header-day',
						title: 'headerday'
					}, {
						xtype : 'label',
						html : '..',
						cls : 'recorditem-header-month',
						title: 'headermonth'
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
							'<div class="description">{trade_note}</div>', 
						'</div>', 
						'<tpl if="this.isChi(type)">',
							'<div class= "total">-{amount:this.showAmount}</div>', 
						'<tpl elseif="this.isThu(type)">',
							'<div class= "total">+{amount:this.showAmount}</div>', 
						'<tpl else>',
							'<div class= "total">{amount:this.showAmount}</div>', 
						'</tpl>',
					'</div>', {
						isChi: function(type) {
							return type == AppConfig.type.CHI;
						},
						isThu: function(type) {
							return type == AppConfig.type.THU;
						},
						showAmount: function(amount) {
							return AppUtil.formatMoneyWithUnit(amount);
						}
				}),
				scrollable: false
			});
		}
		return this._list;
	}
});
