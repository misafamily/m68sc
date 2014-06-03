Ext.define('MyApp.view.record.Record', {
	extend : 'Ext.Container',
	xtype : 'record',
	requires : ['MyApp.view.record.RecordItem', 'MyApp.store.Trades_Month_Day'],
	config : {
		layout : {
			type : 'vbox'
		},
		items : [{
			xtype : 'container',
			flex : 1,
			scrollable : {
				directionLock : true,
				direction : 'vertical',
				indicators: false
			},
			layout : {
				type : 'vbox'
			},
			cls : 'app-container',
			items : [{
				xtype : 'container',
				layout : {
					type : 'vbox',
					pack : 'center',
					align : 'start'
				},
				cls : 'record-date-container',
				items : [{
					xtype : 'label',
					html : '..',
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
			}]
		}, {
			//xtype: 'toolbar',
			//docked: 'bottom',
			xtype : 'container',
			layout : {
				type : 'hbox',
				align : 'center'
			},
			cls : 'viewbase-balance-box',
			items : [{
				xtype : 'label',
				html: AppConfig.textData.SO_DU
			}, {
				xtype : 'spacer'
			}, {
				xtype : 'label',
				html: '..',
				cls: 'balance-lbl'
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
		me._expandItem = null;
		me._pool = [];
		me._currentDate = new Date();	
		MyApp.app.on(AppConfig.eventData.MAIN_VIEW_CHANGED, me.onMainViewChanged, me);
	},
	
	onMainViewChanged: function(carouselActiveIndex) {
		//log('onMainViewChanged: ' + carouselActiveIndex);
		var me = this;
		if (carouselActiveIndex == 1) {
			if (!me._initView) {
				me._initView = true;
				me.showMonth(me._currentDate);
				me.createView();
				MyApp.app.on(AppConfig.eventData.TRADE_ADDED, me.onTradeAdded, me);//from Trade, check to add RecordItem
			}
		}
	},
	
	onTradeAdded: function(date) {
		var me = this;
		if (!me._currentDate.sameMonthWith(date)) return;
		//search to check if it is existed
		AppUtil.offline.updateStoreQuery(me._store, 'Trades_Month_Day_FilterWithDate', {
				dd: date.getDate(),
				mm : date.getMonth(),
				yy : date.getFullYear()
			});

		var pos = me.getPositionItemInList(me._monthRecords, date);
		if (pos == -2) {
			//do nothhing
		} else if (pos == -1) { //add to bottom
			me._store.load(function(records) {
				if (records.length == 1) {
					me._monthRecords.push(records[0]);
					//Ext.Array.each(records, function(record, i) {
						Ext.defer(function(){
							me.addRecord(records[0]);
						},100);
					//});
					
					me.updateBalance();	
				}
			});
		} else { //insert at pos
			//AppUtil.log('insert at pos: ' + pos);
			me._store.load(function(records) {
				if (records.length == 1) {
					Ext.Array.insert(me._monthRecords, pos, records);
					//Ext.Array.each(records, function(record, i) {
						Ext.defer(function(){
							me.insertRecord(records[0], pos);
						},100);
					//});
					
					me.updateBalance();
				}
			});
		}
		
	},
	
	getPositionItemInList: function(list, date) {
		var me = this;
		var pos = -1;
		for (var i = 0; i < list.length; i++) {
			var record = list[i];
			var d = new Date(record.data.yy, record.data.mm, record.data.dd);
			if (d.sameDateWith(date)) return -2;//do nothing, it already is on Record home screen
			else if (d.sameMonthWith(date) && d.getDate() < date.getDate()) return i;
		}
		return pos;// -1 dont have, insert it at bottom
	},
	
	showMonth: function(date) {
		var me = this;
		date = Ext.Date.clone(date);
		date.setDate(1);
		/*var s = date.format('dd.mm.yyyy');
		s += ' - ';
		date.setDate(Ext.Date.getDaysInMonth(date));
		s += date.format('dd.mm.yyyy');*/
		var s = 'Giao dịch ' + date.getMonthName() + ' ' + date.getFullYear();
		
		if (!me._dateLbl) me._dateLbl = me.down('label[cls="record-date"]');
		me._dateLbl.setHtml(s);
	},

	createView : function() {
		var me = this;
		me._recordItems = [];
		me._monthRecords = [];
		if (!me._scroller)
			me._scroller = me.down('container[cls = "app-container"]');
		if (!me._container)
			me._container = me.down('container[cls = "record-list-container"]');
		if (!me._store)
			me._store = Ext.create('MyApp.store.Trades_Month_Day');
		var now = me._currentDate;
		AppUtil.offline.updateStoreQuery(me._store, 'Trades_Month_Day', {
			mm : now.getMonth(),
			yy : now.getFullYear()
		});

		me._store.load(function(records) {
			me._monthRecords = records;
			Ext.Array.each(records, function(record, i) {
				Ext.defer(function(){
					me.addRecord(record);
				},100);
			});
			
			me.updateBalance();
		});
	},
	
	updateBalance: function() {//also call from RecordItem
		var me = this;
		if (!me._balanceLbl) me._balanceLbl = me.down('label[cls="balance-lbl"]');
		var balanceTotal = 0;
		Ext.Array.each(me._monthRecords, function(record, i) {
			balanceTotal += parseInt(record.data.total);
		});
		
		me._balanceLbl.setHtml(AppUtil.formatMoney2WithUnit(balanceTotal));
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
	
	insertRecord: function(record, pos) {
		var me = this;
		var recordItem = me.getRecordItemFromPool();
		recordItem.setModel(record);
		me._container.insert(pos, recordItem);
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
			}, 30);
		} else 
			me._expandItem.expand();
	}
});
