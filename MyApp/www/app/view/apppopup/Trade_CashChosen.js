Ext.define('MyApp.view.apppopup.Trade_CashChosen', {
	extend: 'Ext.Panel',
	xtype: 'apppopup_trade_cashchosen',
	config: {		
    	padding: 0,
    	modal: true, 
    	centered: true,
    	hideOnMaskTap: false,
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
			cls : 'viewbase-toolbar-top no-padding',
			width : '100%',
			items : [/*{
				xtype : 'button',
				cls : 'button-icon toolbar-button-back',
				title : 'backbtn'
			}, {
				xtype : 'container',
				cls : 'apppopup-line'
			}, */{
				xtype : 'spacer'
			}, {
				xtype : 'label',
				html : AppConfig.textData.KIEU_CASH_ATM,
				cls : 'apppopup-title'
			}, {
				xtype : 'spacer'
			}/*, {
				xtype : 'spacer',
				width : 31
			}*/]
		},{
    		xtype: 'container',
			cls : 'main fullwidth-container',
			layout: {
				type: 'vbox'
			},
			flex: 1,
			items: [{
				xclass: 'MyApp.view.comp.AppList',
				cls : 'recorditem-list nobg cash-chosen',
				itemTpl: new Ext.XTemplate(
					'<div class="info">', 
						'<img class= "thumb" src="resources/images/fields/f-xeco.png"></img>', 
						'<div class="content">', 
							'<div class="title">{name}</div>',
							'<div class="description">{typename}</div>',
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
				cls : 'toolbar-bottom-button ok',
				title : 'donebutton',
				text: AppConfig.textData.BUTTON_OK,
				flex: 1
			}, {
				xtype : 'button',
				cls : 'toolbar-bottom-button cancel',
				title : 'backbtn',
				text: AppConfig.textData.BUTTON_CANCEL,
				flex: 1
			}]
		}],

		control : {

			'button[title="backbtn"]' : {
				tap : function() {
					MyApp.app.fireEvent(AppConfig.eventData.HIDE_POPUP);
					this.hide();
				}
			},

			'button[title = "donebutton"]' : {
				tap : function() {
					var me = this;
					if (typeof me._callback === 'function') {
						//me._callback(me._value);
						me._callback(Ext.clone(me._selectedRec));

						MyApp.app.fireEvent(AppConfig.eventData.HIDE_POPUP);
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

					//me._value = me._selectedRec.data.name;
					//

					me._list.refresh();
					//console.log('itemtap', record);
					//console.log('_selectedRec', me._selectedRec);
				}
			}
		}
	},

	showView : function(type, value, callback) {
		var me = this;
		me._type = type;
		me._value = value;
		if (!me._value) me._value = {data: {name: AppConfig.textData.TIEN_MAT}};
		me._callback = callback;		
		me.resetView();
		me.show();
	},

	resetView : function() {
		var me = this;		
		var firstRun = false;
		if (!me._store) {
			firstRun = true;
			AppUtil.showLoading();
			me._store = Ext.create('Ext.data.Store', {
				fields: ['id', 'name', 'type', 'selected', 'typename']
			});

			me._atmStore = Ext.create('Ext.data.Store', {
				fields: ['id', 'name'],
				proxy : {
					type : 'sqlitestorage',
					dbConfig : {
						tablename : 'hunter',
						dbQuery : 'SELECT id, owner as name from hunter  WHERE status = "active"' //+ '" ORDER BY time DESC
					},
					reader : {
						type : 'array'
					}
				}
			});
		}
		if (!me._list) me._list = me.down('list');
		if (!me._list.getStore()) me._list.setStore(me._store);

		//me._list.getScrollable().getScroller().scrollToTop();

		if (firstRun) {
			//me._store.changeQueryByType(me._type);
			var datas = [];
			datas.push({id: 0, type: AppConfig.type.TIEN_MAT, name: AppConfig.textData.TIEN_MAT, selected: 'yes', typename: ''});
			

			me._atmStore.load(function(records){
				Ext.defer(function(){
					//if (me._value) {
						for (var i = 0; i < records.length; i++) {
							/*if (records[i].data.name == me._value) {
								records[i].data.selected = 'yes';
								me._selectedRec = records[i];
								break;
							}*/
							datas.push({id: records[i].data.id, type: AppConfig.type.ATM, name: records[i].data.name, selected: 'no', typename: AppConfig.textData.ATM_ONLY});
						}
						me._store.setData(datas);

						me._selectedRec = me._store.data.items[0];

						me._list.refresh();
					//}
					AppUtil.hideLoading();
				},20);
			});	
		} else {
			var needChanged = true;
			//console.log(me._selectedRec, me._value);
			if (me._selectedRec) {
				if (me._selectedRec.data.name != me._value.data.name) {
					me._selectedRec.data.selected = 'no';
					me._list.getScrollable().getScroller().scrollToTop();
					
				}
					
				else
					needChanged = false;
			}

			if (needChanged) {				
				if (me._value) {
					var records = me._store.data.items;
					for (var i = 0; i < records.length; i++) {
						if (records[i].data.name == me._value.data.name) {
							records[i].data.selected = 'yes';
							me._selectedRec = records[i];


							break;
						}
					}				
					var pos = me._store.data.items.indexOf(me._selectedRec);
					var newpos = pos - 3 >=0 ? pos - 3 : (pos - 2 >=0 ? pos - 2 : (pos - 1 >=0 ? pos - 1 : pos));
					//me._list.scrollToRecord(me._selectedRec);
					me._list.scrollToRecord(me._store.data.items[newpos]);				
				}
				me._list.refresh();
					
			} else if (me._selectedRec) {
				if (me._selectedRec.data.selected == 'yes') {
					var pos = me._store.data.items.indexOf(me._selectedRec);
					var newpos = pos - 3 >=0 ? pos - 3 : (pos - 2 >=0 ? pos - 2 : (pos - 1 >=0 ? pos - 1 : pos));
					//me._list.scrollToRecord(me._selectedRec);
					me._list.scrollToRecord(me._store.data.items[newpos]);	
				}
			}			
			
		}
		
	}
    
});