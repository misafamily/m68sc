Ext.define('MyApp.view.record.RecordItem', {
	extend : 'Ext.Container',
	xtype : 'record_recorditem',
<<<<<<< HEAD
	requires : ['MyApp.store.Trades_Day'],
	config : {
		cls : 'recorditem-container',
		model : null,
=======
	requires : [],
	config : {
		cls : 'recorditem-container',
		data : null,
>>>>>>> dedf1303aa292f1354485393448f18fa79e75fbd
		itemStoreList : null,
		layout : {
			type : 'vbox'
		}
	},

<<<<<<< HEAD
=======
	initialize : function() {
		this.callParent(arguments);
	},

	updateData : function() {
		this.removeAll(false);
		this.createView();
	},

	getItemCount : function() {
		var listview = this.getList();
		var store = listview.getStore();
		var items = store.data.items;
		return items.length;
	},

	removeAllData : function() {
		var list = this.getList();
		var store = list.getStore();
		//var items = store.data.items;
		store.removeAll();
		list.setHeight(42);
	},

>>>>>>> dedf1303aa292f1354485393448f18fa79e75fbd
	onUpdateStore : function() {
		var list = this.getList();
		var itemStore = list.getStore();
		//get new
		itemStore.load(function() {
			list.setHeight(42 * itemStore.data.items.length);
			if (itemStore.data.items.length == 0) {
				list.setHeight(42);
			}
		});

	},

<<<<<<< HEAD
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
=======
	createView : function() {
		var data = this.getData();
		if (data) {
			var header = this.getHeader();
			header.setStyle({
				'background-image' : this.getImage(),//'url(resources/images/grocery/fruit.png)',
			});

			var title = header.down('container[cls= "food-grocery-item-title"]');
			title.setHtml((this.getData()['name'] ? this.getData()['name'] : this.getData()['title']).toUpperCase());

			var itemstext = header.down('container[cls= "food-grocery-item-items"]');
			itemstext.setHtml(this.getData()['total_item'] + ' items');

			var list = this.getList();
			var itemStore = new PatientConcierge.store.Category_Items();
			//data.items;
			itemStore.getProxy().config.dbConfig.dbQuery = PatientConcierge.util.CommonUtil.offline.getDbQueryString("Category_Items", PatientConcierge.util.CommonUtil.getLang(), {
				category_id : data.category_id
			});
			itemStore.load(function() {
				list.setHeight(42 * itemStore.data.items.length);
				if (itemStore.data.items.length == 0) {
					list.setHeight(42);
				}
			});
			this.setItemStoreList(list);

			if (list.getStore())
				list.getStore().removeAll();

			//list.getScrollable().getScroller().scrollToTop();
			list.setScrollable(false);
			list.setStore(itemStore);

			//var buttons = this.getButtons();

			this.add(header);
			this.add(list);
			//this.add(buttons);
>>>>>>> dedf1303aa292f1354485393448f18fa79e75fbd
		}
	},
	getHeader : function() {
		//console.log('getHeader');
<<<<<<< HEAD
		var me = this;
		if (!me._header) {
			var header = Ext.create('Ext.Container', {
=======
		if (!this._header) {
			this._header = Ext.create('Ext.Container', {
>>>>>>> dedf1303aa292f1354485393448f18fa79e75fbd
				cls : 'recorditem-header',
				layout : {
					type : 'hbox'
				},
				items : [{
					xtype : 'label',
<<<<<<< HEAD
					html : '10',
					cls : 'recorditem-header-date'
=======
					html : '10'
>>>>>>> dedf1303aa292f1354485393448f18fa79e75fbd
				}, {
					xtype : 'container',
					layout : {
						type : 'vbox',
						pack : 'center',
<<<<<<< HEAD
						align : 'start'
=======
						align : 'center'
>>>>>>> dedf1303aa292f1354485393448f18fa79e75fbd
					},
					cls : 'recorditem-header-date-info',
					items : [{
						xtype : 'label',
<<<<<<< HEAD
						html : 'Thu 2',
						cls : 'recorditem-header-day'
					}, {
						xtype : 'label',
						html : 'Thang 5 2014',
						cls : 'recorditem-header-month'
=======
						html : 'Thu 2'
					}, {
						xtype : 'label',
						html : 'Thang 5 2014'
>>>>>>> dedf1303aa292f1354485393448f18fa79e75fbd
					}]
				}, //end shape img
				{
					xtype : 'spacer'
				}, //end shape img
				{
					xtype : 'label',
<<<<<<< HEAD
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
=======
					html : '+900.000'
				}]
			});
>>>>>>> dedf1303aa292f1354485393448f18fa79e75fbd
		}
		return this._header;
	},
	getList : function() {
		//console.log('getIngredientList');
		if (!this._list) {
			this._list = Ext.create('MyApp.view.comp.AppList', {
				cls : 'recorditem-list',
				//store: 'Category_Items',
<<<<<<< HEAD
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
=======
				maxHeight: 400,
				itemTpl : new Ext.XTemplate([
					'<div class="info">'
						'<div class= "thumb"></div>', 
						'<div class="content">',
							'<div class="title">Luong</div>',
							'<div class="description">Luong thang 5</div>',
						'</div>', 
						'<div class= "total">+10.000.000</div>',
					'</div>',
				{
					
				})
			});

			//this._list.on('refresh', this.onListPainted, this);
		}
		//console.log(Ext.getStore('Category_Items'));
>>>>>>> dedf1303aa292f1354485393448f18fa79e75fbd
		return this._list;
	}
});
