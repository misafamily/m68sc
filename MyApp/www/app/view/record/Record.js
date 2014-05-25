Ext.define('MyApp.view.record.Record', {
	extend : 'Ext.Container',
	xtype : 'record',
<<<<<<< HEAD
	requires : ['MyApp.view.record.RecordItem', 'MyApp.store.Trades_Month_Day'],
	config : {
		
=======
	requires : [],
	config : {
>>>>>>> dedf1303aa292f1354485393448f18fa79e75fbd
		layout : {
			type : 'vbox'
		},
		items : [{
			xtype : 'container',
			flex : 1,
<<<<<<< HEAD
			scrollable : {
				directionLock : true,
				direction : 'vertical',
				indicators: false
			},
=======
>>>>>>> dedf1303aa292f1354485393448f18fa79e75fbd
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
<<<<<<< HEAD
				cls : 'record-date-container',
				items : [{
					xtype : 'label',
					html : '01.05.2014 - 31.05.2014',
					cls : 'record-date'
				}]
			}, {
				xtype : 'container',
				layout : {
					type : 'vbox'
				},
				/*flex : 1,*/
				height: 'auto',
				cls : 'record-list-container'
=======
				cls: 'record-date-container',
				items : [{
					xtype : 'label',
					html : 'THANG 5.2014',
					cls : 'record-date'
				}]
>>>>>>> dedf1303aa292f1354485393448f18fa79e75fbd
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
<<<<<<< HEAD
		me._expandItem = null;
		me._pool = [];
		me.showMonth(new Date());
		MyApp.app.on(AppConfig.eventData.MAIN_VIEW_CHANGED, me.onMainViewChanged, me);
	},
	
	onMainViewChanged: function(carouselActiveIndex) {
		//log('onMainViewChanged: ' + carouselActiveIndex);
		var me = this;
		if (carouselActiveIndex == 1) {
			if (!me._initView) {
				me._initView = true;
				me.createView();
			}
		}
	},
	
	showMonth: function(date) {
		var me = this;
		date = Ext.Date.clone(date);
		date.setDate(1);
		var s = date.format('dd.mm.yyyy');
		s += ' - ';
		date.setDate(Ext.Date.getDaysInMonth(date));
		s += date.format('dd.mm.yyyy');
		
		if (!me._dateLbl) me._dateLbl = me.down('label[cls="record-date"]');
		me._dateLbl.setHtml(s);
	},

	createView : function() {
		var me = this;
		me._recordItems = [];
		if (!me._scroller)
			me._scroller = me.down('container[cls = "app-container"]');
		if (!me._container)
			me._container = me.down('container[cls = "record-list-container"]');
		if (!me._store)
			me._store = Ext.create('MyApp.store.Trades_Month_Day');
		var now = new Date();
		AppUtil.offline.updateStoreQuery(me._store, 'Trades_Month_Day', {
			mm : now.getMonth(),
			yy : now.getFullYear()
		});

		me._store.load(function(records) {
			Ext.Array.each(records, function(record, i) {
				Ext.defer(function(){
					me.addRecord(record);
				},100);
			});
		});
	},
	
	addRecord: function(record) {
		var me = this;
		var recordItem = me.getRecordItemFromPool();
		recordItem.setModel(record);
		me._container.add(recordItem);
		recordItem.showHeader();
		recordItem.on('headertap', me.onItemTap, me);
		me._recordItems.push(recordItem);			
	},
	
	removeRecord: function(recordItem) {
		var me = this;
		recordItem.un('headertap', me.onItemTap, me);
		recordItem.resetView();
		me._container.remove(recordItem);
		Ext.Array.remove(me._recordItems, recordItem);
		me._pool.push(recordItem);//store to pool
	},
	
	getRecordItemFromPool: function() {
		var me = this;
		if (me._pool.length > 1) {
			return me._pool.pop();
		} 
		return new MyApp.view.record.RecordItem();
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
			}, 200);
		} else 
			me._expandItem.expand();

=======

		//MyApp.app.on('expense_changed', me.onExpenseChanged, me);
		//MyApp.app.on('thuchi_changed', me.onThuChiChanged, me);
>>>>>>> dedf1303aa292f1354485393448f18fa79e75fbd
	}
});
