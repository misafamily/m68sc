Ext.define('MyApp.view.ironbox.IronBox', {
	extend : 'Ext.Container',
	xtype : 'ironbox',
	requires : ['MyApp.view.ironbox.Cash', 'MyApp.view.ironbox.Atm'],
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
		}/*, {
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
		}*/]
	},

	initialize : function() {
		var me = this;
		me.callParent(arguments);
		me._expandItem = null;
		me._currentDate = new Date();	
		MyApp.app.on(AppConfig.eventData.MAIN_VIEW_CHANGED, me.onMainViewChanged, me);
	},
	
	onMainViewChanged: function(carouselActiveIndex) {
		//log('onMainViewChanged: ' + carouselActiveIndex);
		var me = this;
		if (carouselActiveIndex == 2) {
			if (!me._initView) {
				me._initView = true;
				me.showMonth(me._currentDate);
				me.createView();
				//MyApp.app.on(AppConfig.eventData.TRADE_ADDED, me.onTradeAdded, me);//from Trade, check to add RecordItem
			}
		}
	},
	
	showMonth: function(date) {
		var me = this;
		date = Ext.Date.clone(date);
		date.setDate(1);
		var s = AppConfig.textData.QUAN_LY_KET_SAT;
		
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

		//add tien mat
		if (!me._tienmat) me._tienmat = new MyApp.view.ironbox.Cash();
		me._container.add(me._tienmat);
		me._tienmat.showHeader();
		me._tienmat.on('headertap', me.onItemTap, me);

		//add atm
		if (!me._atm) me._atm = new MyApp.view.ironbox.Atm();
		me._container.add(me._atm);
		me._atm.showHeader();
		me._atm.on('headertap', me.onItemTap, me);

		//me._scroller.setHeight(window.innerHeight - 46 - 40);
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
