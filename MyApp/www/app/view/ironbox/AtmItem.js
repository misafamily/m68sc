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
					var me = this;
					if (record.data.type == AppConfig.type.ATM) {
						switch(record.data.action) {				
							case AppConfig.action.THEM:
								MyApp.app.fireEvent(AppConfig.eventData.SHOW_ATM_ADD);
								break;
							case AppConfig.action.DIEU_CHINH:
								MyApp.app.fireEvent(AppConfig.eventData.SHOW_INPUTER, me._amount, function(money) {
									if (me._amount != money) {
										var dif = money - me._amount;
										me._amount = money;
										//me._lblAmount.setHtml(AppUtil.formatMoney2WithUnit(me._amount));
										me._atmModel.data.amount = money.toString();
										me._atmModel.save(function() {
											if (dif > 0) {
												AppUtil.doTrade(AppConfig.textData.DIEU_CHINH_SO_DU + ' ' + AppConfig.textData.ATM.toLowerCase(), AppConfig.type.THU, dif, AppConfig.type.ATM, '', new Date(), me._atmModel.data.id, false);
											} else if (dif < 0) {
												AppUtil.doTrade(AppConfig.textData.DIEU_CHINH_SO_DU + ' ' + AppConfig.textData.ATM.toLowerCase(), AppConfig.type.CHI, -dif, AppConfig.type.ATM, '', new Date(), me._atmModel.data.id, false);
											}
											MyApp.app.fireEvent(AppConfig.eventData.ATM_CHANGED, me._atmModel.data.id);
											AppUtil.autoAlert(AppConfig.textData.DIEU_CHINH_OK);
										});
									}
										
								}, AppConfig.textData.DIEU_CHINH_SO_DU + ' ' + AppConfig.textData.ATM_ONLY);
								break;
							case AppConfig.action.CHI_TIET_GIAO_DICH:
								MyApp.app.fireEvent(AppConfig.eventData.SHOW_ATM_TRADE_LIST, me._atmModel);
								break;
							case AppConfig.action.RUT:
								MyApp.app.fireEvent(AppConfig.eventData.SHOW_INPUTER, 0, function(money) {
									var dif = me._amount - money;
									if (dif < 0) {
										AppUtil.alert(Ext.util.Format.format(AppConfig.textData.ATM_RUT_ERROR, AppUtil.formatMoney2WithUnit(me._amount)), AppConfig.textData.ERROR_TITLE + ' ' + AppConfig.textData.RUT_TIEN);
									} else {
										me._amount -= money;
										//me._lblAmount.setHtml(AppUtil.formatMoney2WithUnit(me._amount));
										me._atmModel.data.amount = me._amount.toString();
										me._atmModel.save(function() {
											AppUtil.cashPlus(dif, false);
											AppUtil.doTrade(AppConfig.textData.RUT_TIEN + ' ' + AppConfig.textData.ATM.toLowerCase(), AppConfig.type.RUT, dif, AppConfig.type.ATM, '', new Date(), me._atmModel.data.id);
											MyApp.app.fireEvent(AppConfig.eventData.ATM_CHANGED, me._atmModel.data.id);
											AppUtil.autoAlert(AppConfig.textData.GIAO_DICH_OK);
										});
									}
								}, AppConfig.textData.RUT_TIEN + ' ' + AppConfig.textData.ATM_ONLY);
								break;
							case AppConfig.action.TIEN_THU_NHAP:
								MyApp.app.fireEvent(AppConfig.eventData.SHOW_INPUTER, 0, function(money) {
									MyApp.app.fireEvent(AppConfig.eventData.SHOW_INCOME_ADD, money, AppConfig.type.ATM, me._atmModel);
								}, AppConfig.textData.TIEN_THU_NHAP + ' ' + AppConfig.textData.ATM_ONLY);
								break;
						}
					}
				}
			}
		}
	},

	initialize: function() {
		var me = this;
		MyApp.app.on(AppConfig.eventData.ATM_CHANGED, me.onAtmChanged, me);
	},

	onAtmChanged: function(atmid) {
		var me = this;
		if (me._atmModel.data.id == atmid) {
			//me._amount = me._atmModel.data;
			me._amount = parseInt(me._atmModel.data.amount);
			me._lblAmount.setHtml(AppUtil.formatMoney2WithUnit(me._amount));
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
		me._atmModel = atmData;

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
		me._amount = parseInt(data.total);
		me._lblAmount.setHtml(AppUtil.formatMoney2WithUnit(me._amount));

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
