Ext.define('MyApp.view.apppopup.Trade_IncomeChosen', {
	extend : 'Ext.Container',
	xtype : 'apppopup_trade_incomechosen',
	requires:[],
	config : {
		cls : 'popup6-container',
		layout : {
			type : 'vbox',
			pacK : 'center',
			align : 'center'
		},
		items : [{
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
				html : AppConfig.textData.CHON_THU_NHAP,
				cls : 'apppopup-title'
			}, {
				xtype : 'spacer'
			}, {
				xtype : 'spacer',
				width : 31
			}]
		}, {
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
		}, {

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
		}],
			
		control : {

			'button[title="backbtn"]' : {
				tap : function() {
					this.hide();
				}
			},
			'button[title = "donebutton"]' : {
				tap : function() {
					var me = this;
					if (typeof me._callback === 'function') {
						me._callback(me._value);
						me.hide();
					}
				}
			},
			'list': {
				itemtap: function(list, target, index, record) {
					var me = this;
					if (me._selectedRec) me._selectedRec.data.selected = 'no';

					me._selectedRec = record;
					me._selectedRec.data.selected = 'yes';

					me._value = me._selectedRec.data.name;

					me._list.refresh();
					//console.log('itemtap', record);
				}
			}
		}
	},

	initialize : function() {
		var me = this;
		me.callParent(arguments);
	},

	onDoneButtonClicked : function() {
		var me = this;
		if (AppUtil.checkAmount(me.amount)) {
			AppUtil.doTrade(me._outtype.getValue(), AppConfig.type.CHI, me.amount, AppConfig.type.TIEN_MAT, me._outnote.getValue(), me._selectedDate, 'CASH');

			me.hide();
		}
	},

	showView : function(type, value, callback) {
		var me = this;
		me._type = type;
		me._value = value;
		me._callback = callback;		
		me.resetView();
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
			var pos = me._store.data.items.indexOf(me._selectedRec);
			var newpos = pos - 3 >=0 ? pos - 3 : (pos - 2 >=0 ? pos - 2 : (pos - 1 >=0 ? pos - 1 : pos));
			//me._list.scrollToRecord(me._selectedRec);
			me._list.scrollToRecord(me._store.data.items[newpos]);
			Ext.defer(function(){
				me._list.refresh();
			},30);
		}
		
	}
});
