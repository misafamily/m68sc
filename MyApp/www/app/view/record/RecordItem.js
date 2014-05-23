Ext.define('MyApp.view.record.RecordItem', {
	extend : 'Ext.Container',
	xtype : 'record_recorditem',
	requires : [],
	config : {
		cls : 'recorditem-container',
		data : null,
		itemStoreList : null,
		layout : {
			type : 'vbox'
		}
	},

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
		}
	},
	getHeader : function() {
		//console.log('getHeader');
		if (!this._header) {
			this._header = Ext.create('Ext.Container', {
				cls : 'recorditem-header',
				layout : {
					type : 'hbox'
				},
				items : [{
					xtype : 'label',
					html : '10'
				}, {
					xtype : 'container',
					layout : {
						type : 'vbox',
						pack : 'center',
						align : 'center'
					},
					cls : 'recorditem-header-date-info',
					items : [{
						xtype : 'label',
						html : 'Thu 2'
					}, {
						xtype : 'label',
						html : 'Thang 5 2014'
					}]
				}, //end shape img
				{
					xtype : 'spacer'
				}, //end shape img
				{
					xtype : 'label',
					html : '+900.000'
				}]
			});
		}
		return this._header;
	},
	getList : function() {
		//console.log('getIngredientList');
		if (!this._list) {
			this._list = Ext.create('MyApp.view.comp.AppList', {
				cls : 'recorditem-list',
				//store: 'Category_Items',
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
		return this._list;
	}
});
