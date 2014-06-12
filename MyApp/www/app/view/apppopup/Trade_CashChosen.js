Ext.define('MyApp.view.apppopup.Trade_CashChosen', {
	extend: 'Ext.Panel',
	xtype: 'apppopup_trade_cashchosen',
	config: {		
    	padding: 0,
    	modal: true, 
    	centered: true,
    	hideOnMaskTap: true,
    	width: '80%',
    	height: '60%',
    	layout: {
    		type: 'vbox',
    		pack: 'center',
    		align: 'center'
    	},

    	items: [{
			//xtype: 'toolbar',
			//docked: 'bottom',
			xtype : 'container',
			layout : {
				type : 'hbox',
				align : 'center'
			},
			cls : 'viewbase-toolbar-top',
			width : '100%',
			items : [{
				xtype : 'button',
				cls : 'button-icon toolbar-button-back',
				title : 'backbtn'
			}, {
				xtype : 'container',
				cls : 'apppopup-line'
			}, {
				xtype : 'spacer'
			}, {
				xtype : 'label',
				html : AppConfig.textData.KIEU_CASH_ATM,
				cls : 'apppopup-title'
			}, {
				xtype : 'spacer'
			}, {
				xtype : 'spacer',
				width : 31
			}]
		},{
    		xtype: 'container',
			cls : 'main fullwidth-container',
			layout: {
				type: 'vbox'
			},
			flex: 1,
			items: [{
				xclass: 'MyApp.view.comp.AppList',
				cls : 'recorditem-list nobg',
				itemTpl: new Ext.XTemplate(
					'<div class="info">', 
						'<img class= "thumb" src="resources/images/fields/f-xeco.png"></img>', 
						'<div class="content">', 
							'<div class="title">{name}</div>',
						'</div>', 
						'<div class= "check {selected}"></div>', 
					'</div>'
				),
				itemHeight: 40
			}]
    	},{

			xtype : 'container',
			layout : {
				type : 'hbox',
				align : 'center',
				pack : 'center'
			},
			cls : 'viewbase-toolbar-bottom',
			items : [{
				xtype : 'button',
				cls : 'button-icon toolbar-button-done',
				title : 'donebutton'
			}]
		}]
	},

	showView : function(type, value, callback) {
		var me = this;
		me._type = type;
		me._value = value;
		me._callback = callback;		
		//me.resetView();
		//me.amount = money;
		//me._amount.setValue(AppUtil.formatMoneyWithUnit(me.amount));
		me.show();
	},

	resetView : function() {
		var me = this;		
		var firstRun = false;
		if (!me._store) {
			firstRun = true;
			AppUtil.showLoading();
			me._store = Ext.create('MyApp.store.ExpenseTypes');
		}
		if (!me._list) me._list = me.down('list');
		if (!me._list.getStore()) me._list.setStore(me._store);

		me._list.getScrollable().getScroller().scrollToTop();

		if (firstRun) {
			me._store.changeQueryByType(me._type);
			me._store.load(function(records){
				Ext.defer(function(){
					if (me._value) {
						for (var i = 0; i < records.length; i++) {
							if (records[i].data.name == me._value) {
								records[i].data.selected = 'yes';
								me._selectedRec = records[i];
								break;
							}
						}
						me._list.refresh();
					}
					AppUtil.hideLoading();
				},20);
			});	
		} else {
			var needChanged = true;
			if (me._selectedRec) {
				if (me._selectedRec.data.name != me._value)
					me._selectedRec.data.selected = 'no';
				else
					needChanged = false;
			}

			if (needChanged) {				
				if (me._value) {
					var records = me._store.data.items;
					for (var i = 0; i < records.length; i++) {
						if (records[i].data.name == me._value) {
							records[i].data.selected = 'yes';
							me._selectedRec = records[i];
							break;
						}
					}					
				}
			}
			me._list.refresh();
		}
		
	}
    
});