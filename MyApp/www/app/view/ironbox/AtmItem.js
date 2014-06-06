Ext.define('MyApp.view.ironbox.AtmItem', {
	extend : 'Ext.Container',
	xtype : 'ironbox_atmitem',
	config : {
		cls : 'recorditem-container atmitem',
		layout : {
			type : 'vbox'
		},
		control: {	
			'list': {
				itemtap: function( list, index, target, record, e, eOpts ) {
					//log(record.data.action);
					if (record.data.type == AppConfig.type.ATM) {
						switch(record.data.action) {				
							case AppConfig.action.THEM:
								MyApp.app.fireEvent(AppConfig.eventData.SHOW_ATM_ADD);
								break;
						}
					}
				}
			}
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
		list.show();
		
	},

	showHeader : function(atmData) {
		var me = this;
		me.removeAll(false);

		var data = {title: atmData.data.owner, description: atmData.data.bank, total: atmData.data.amount};
		//log(data);
		var header = me.getHeader();
		
		//if (!me._lblDate) me._lblDate = header.down('label[cls = "recorditem-header-date"]');
		//me._lblDate.setHtml(data.title);
		
		if (!me._lblDayname) me._lblDayname = header.down('label[cls = "recorditem-header-day"]');
		me._lblDayname.setHtml(data.title);
		
		if (!me._lblMonth) me._lblMonth = header.down('label[cls = "recorditem-header-month"]');
		me._lblMonth.setHtml(data.description);
		
		if (!me._lblAmount) me._lblAmount = header.down('label[cls = "recorditem-header-amount"]');
		me._lblAmount.setHtml(AppUtil.formatMoney2WithUnit(parseFloat(data.total)));

		var list = me.getList();
		list.setHeight(0);
		list.hide();
		if (!me._itemStore) {
			me._itemStore = new Ext.data.Store({
				fields: ['title', 'type', 'action']
			});
		} 

		//me.setItemStoreList(list);

		if (list.getStore())
			list.getStore().removeAll();
		else 
			list.setStore(me._itemStore);

		me.add(header);
		me.add(list);

		var listData = AppConfig.ironboxdata.ATM_SUB;
		me._itemStore.setData(listData);

		list.setHeight(43 * listData.length);
		//me._selectedDate = new Date(data.yy, data.mm, data.dd);
		//MyApp.app.on(AppConfig.eventData.TRADE_ADDED, me.onTradeAdded, me);
	
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

	getRealHeight: function() {
		var me = this;
		if (me._list.getHidden() == true) {
			return 40;
		} else return (40 + me._list.getHeight());
	},
	

	getHeader : function() {
		var me = this;
		if (!me._header) {
			var header = Ext.create('Ext.Container', {
				cls : 'recorditem-header atmitem',
				layout : {
					type : 'hbox'
				},
				items : [{
					xtype : 'container',
					cls : 'tienmat-header-thumb'
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
						cls : 'recorditem-header-day'
					}, {
						xtype : 'label',
						html : '..',
						cls : 'recorditem-header-month'
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
				cls : 'recorditem-header-container atmitem',
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
				cls : 'recorditem-list atmitem',
				itemTpl : new Ext.XTemplate(
					'<div class="info">', 
						'<img class= "thumb" src="resources/images/fields/f-xeco.png"></img>', 
						'<div class="content">', 
							'<div class="title">{title}</div>', 
							//'<div class="description">{trade_note}</div>', 
						'</div>',
					'</div>'
				),
				scrollable: false
			});
		}
		return this._list;
	}
});
