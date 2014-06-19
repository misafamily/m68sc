Ext.define('MyApp.util.AppUtil', {
	alternateClassName : 'AppUtil',
	requires : ['MyApp.model.SavedVar','MyApp.view.apppopup.AutoHideAlert'],
	singleton : true,
	dbConnection : null,
	moneyUnit : 'đ',
	CASH : 0,
	CASH_MODEL : null,
	RELEASE: true,

	popupAdded: [],
	
	constructor : function() {
		var me = this;
		me.RELEASE = false;
		me.log('RELEASE MODE: '+ me.RELEASE);
		
		
		me.getDbConnection();
		me.initLocalStorage();
		//me.initAppData();
		
	},

	initAppData: function(callback) {
		var me = this;
		var datastore = Ext.create('MyApp.store.InitExpenseData');
		var localstore = Ext.create('MyApp.store.ExpenseTypes');
		datastore.getProxy().setUrl('resources/data/InitData.json');
		datastore.load(function(records) {
			//console.log('records', records);
			localstore.load(function(localRecords){
				//console.log('localRecords', localRecords);
				if (localRecords.length < 1) {
					localstore.setData(records);
					localstore.sync({
						callback: function() {
							if (typeof callback == 'function') callback();
						}
					});
				} else {
					//check for new item
					Ext.each(records, function(dataitem, i) {
						var check = me.checkExist(dataitem, localRecords);						
						if (check) {
							if (check.data.name != dataitem.data.name) {
								check.data.name = dataitem.data.name;
								check.save();
							}
						} else {
							dataitem.save();
						}
					});

					if (typeof callback == 'function') callback();
				}
			});			
		});
	},

	checkExist: function(model, localModels) {
		for (var j = 0; j < localModels.length; j++) {
			var item = localModels[j];
			if (item.data.uname == model.data.uname) {
				return item;
			}
		}
		return null;
	},

	initLocalStorage : function() {
		//this.log('initLocalStorage');
		var me = this;
		if (!me.localStore) {
			me.localStore = Ext.create('Ext.data.Store', {
				model : 'MyApp.model.SavedVar'
			});
		}

		me.localStore.load(function(records) {
			/*me.log('Local Vars: ');
			me.log(records);

			me.log(me.getLocalVar('hello'));*/
			//me.saveLocalVar('autologin', 'true');
			//me.saveLocalVar('autosync', 'true');
			me.initSettings();
		});

	},

	initSettings : function() {
		var me = this;
		if (!me.getLocalVar('auto_add_tiendu_to_nextmonth')) {
			me.saveLocalVar('auto_add_tiendu_to_nextmonth', true);
		}
		if (!me.getLocalVar('CASH')) {
			me.saveLocalVar('CASH', 0);
		}
		if (!me.getLocalVar('installed_date')) {
			me.saveLocalVar('installed_date', Ext.Date.now());
		}
		
		me.CASH = me.getLocalVar('CASH');
	},

	getLocalVar : function(name) {
		var me = this;
		var m = me.localStore.findRecord('name', name);
		if (m)
			return m.data.value;
		return null;
	},

	saveLocalVar : function(name, value) {
		var me = this;
		var m = me.localStore.findRecord('name', name);
		if (m) {
			m.data.value = value;
			m.save();
		} else {
			m = new MyApp.model.SavedVar({
				name : name,
				value : value
			});
			me.localStore.add(m);

			m.save();
		}
	},

	getDbConnection : function() {
		var me = this;
		if (!me.dbConnection) {
			var dbconnval = {
				dbName : "money68productionteam-m68app",
				dbDescription : "money68productionteam m68app database"
			};
			me.dbConnection = Ext.create('MyApp.util.offline.Connection', dbconnval);
			//me.offline = Ext.create('MyApp.util.offline.Data', {});
		}
		return me.dbConnection;
	},

	checkAutoDataForMonth : function() {
		var me = this;

		var now = new Date();
		now.setDate(1);
		var nowDate = now.format('yyyymmdd');
		var prevMonth = new Date();
		prevMonth.setMonth(now.getMonth() - 1);
		var prevMonthDate = 'Tiền dư ' + prevMonth.getMonthName() + ', ' + prevMonth.getFullYear();
		if (!me.getLocalVar(nowDate)) {
			me.saveLocalVar(nowDate, me.CASH.toString());
			if (me.CASH == 0)
				return;
			var autoAddTienDu = (me.getLocalVar('auto_add_tiendu_to_nextmonth') == 'true');
			if (autoAddTienDu) {
				me.saveExpenseModel('tien_du', me.CASH, '', prevMonthDate, 'tien_mat', 'Ví tiền', now, prevMonthDate);
			}
		}

	},

	doTrade : function(title, type, amount, trade_with, trade_note, time, hunter_id, showalert) {
		//log('doTrade');
		//log(arguments);
		var now = time || new Date();
		if (showalert == null) showalert = true;
		trade_note = trade_note || '';
		hunter_id = hunter_id || 'trade';
		trade_with = trade_with || AppConfig.type.TIEN_MAT;
		var sign_amount = 0;
		switch (type) {
			case AppConfig.type.THU:
				sign_amount = amount;
				break;
			case AppConfig.type.CHI:
				sign_amount = -amount;
				break;
		}
		var id = 'trade_' + now.getTime();
		var data = {
			trade_id : id,
			title: title,
			amount : amount.toString(),
			sign_amount: sign_amount.toString(),
			type : type,
			//trade_what : trade_what,
			trade_with : trade_with,
			trade_note : trade_note,
			time : now.getTime(),
			hunter_id : hunter_id,
			dd : now.getDate(),
			mm : now.getMonth(),
			yy : now.getFullYear()
		};
		//log(data);
		var model = Ext.create('MyApp.model.Trade', data);
		var me = this;
		model.save(function() {
			MyApp.app.fireEvent(AppConfig.eventData.TRADE_ADDED, now);
			if (showalert) me.autoAlert(AppConfig.textData.GIAO_DICH_OK);
		});
	},

	saveCashModel : function() {
		var me = this;
		me.saveLocalVar('CASH', me.CASH);
	},

	getCashFormat : function() {
		var me = this;
		return me.formatMoneyWithUnit(me.CASH);
	},

	canGetCash : function(amount) {
		return this.CASH >= amount;
	},

	cashPlus : function(amount, fire) {
		var me = this;
		fire = fire || true;
		me.CASH += amount;
		me.saveCashModel();
		if (fire) MyApp.app.fireEvent('cash_changed', me.CASH, amount);
	},

	cashMinus : function(amount, fire) {
		var me = this;
		me.CASH -= amount;
		me.saveCashModel();
		fire = fire || true;
		if (fire) MyApp.app.fireEvent('cash_changed', me.CASH, -amount);
	},

	cashEdit : function(amount) {
		var me = this;
		var dif = amount - me.CASH;
		me.CASH = amount;
		me.saveCashModel();
		if (dif > 0) {
			me.doTrade(AppConfig.textData.DIEU_CHINH_SO_DU + ' ' + AppConfig.textData.TIEN_MAT.toLowerCase(), AppConfig.type.THU, dif, AppConfig.type.TIEN_MAT, '', new Date(), 'cash', false);
		} else if (dif < 0) {
			me.doTrade(AppConfig.textData.DIEU_CHINH_SO_DU + ' ' + AppConfig.textData.TIEN_MAT.toLowerCase(), AppConfig.type.CHI, -dif, AppConfig.type.TIEN_MAT, '', new Date(), 'cash', false);
		}
		
		MyApp.app.fireEvent(AppConfig.eventData.CASH_CHANGED, me.CASH, amount);
		me.autoAlert(AppConfig.textData.DIEU_CHINH_OK);
	},
	
	checkAmount: function(amount) {
		var me = this;
		if (!amount) {
			me.alert('Nhap tien di ku');
			return false;
		}
		return true;
	},

	formatDateTime : function(date) {
		return date.dateFormat();
	},

	formatShortMoney : function(amount) {
		amount = amount || 0;
		amount = parseInt(amount);
		if (amount >= 1000000000) {
			amount = Math.round(amount / 1000000000);

			amount = this.formatMoney(amount).toString() + ' tỷ';
		} else if (amount >= 1000000) {
			amount = Math.round(amount / 1000000);

			amount = this.formatMoney(amount).toString() + ' triệu';
		} else if (amount >= 100000) {
			amount = Math.round(amount / 100000);
			amount = amount.toString() + ' trăm';
		} else if (amount >= 10000) {
			amount = Math.round(amount / 10000);
			amount = amount.toString() + ' chục';
		} else if (amount >= 1000) {
			amount = Math.round(amount / 1000);
			amount = amount.toString() + ' ngàn';
		} else {
			return this.formatMoneyWithUnit(amount);
		}
		return amount;
	},

	formatMoney : function(amount) {
		amount = amount || 0;
		return parseInt(amount).format(0, 3, '.');
	},
	
	formatMoney2 : function(amount) {
		var displayTotal = AppUtil.formatMoney(amount);
		if (amount > 0) displayTotal = '+' + displayTotal;
		//else if (amount < 0) displayTotal = '-' + displayTotal;
		
		return displayTotal;
	},
	
	formatMoney2WithUnit : function(amount) {
		var me = this;
		return me.formatMoney2(amount) + ' ' + me.moneyUnit;
	},

	formatMoneyWithUnit : function(amount) {
		var me = this;
		return me.formatMoney(amount) + ' ' + me.moneyUnit;
	},

	formatRateWithUnit : function(amount) {
		return amount + ' %/năm';
	},
	
	deformatMoneyWithUnit: function(amountformat) {
		if(Ext.isNumber(amountformat)) return amountformat;

		amountformat = amountformat.split(' ')[0];
		amountformat = amountformat.split('.').join('');
		return parseInt(amountformat);
	},

	onDevice : function() {
		//if (this.RELEASE) return true;
		return this.RELEASE;
	},

	log : function(msg) {
		console.log(msg);
		//Ext.log.Logger.log(msg);
	},
	
	alert: function(msg, title) {
		var me = this;
		
		
		title = title || '';
		var alert = Ext.Msg.alert(title, msg, function() {
			me.popupAdded.shift();
			MyApp.app.fireEvent(AppConfig.eventData.APP_UNMASK);
		});
		this.popupAdded.unshift(alert);
		MyApp.app.fireEvent(AppConfig.eventData.APP_MASK);
	},

	autoAlert: function (msg) {
       var me = this;
       if (!me._autoHideAlert) me._autoHideAlert = Ext.create('MyApp.view.apppopup.AutoHideAlert');
       Ext.Viewport.add(me._autoHideAlert);
       me._autoHideAlert.setMessage(msg);
       me._autoHideAlert.showMe();
    },

	confirm: function(msg, title, callback) {
		var me = this;
    	

    	var alert = Ext.Msg.confirm(title, msg, function(code){
    		me.popupAdded.shift();
    		MyApp.app.fireEvent(AppConfig.eventData.APP_UNMASK);
    		if (code == 'yes') 
    			if (typeof callback === 'function') callback();
    	});

    	this.popupAdded.unshift(alert);
    	MyApp.app.fireEvent(AppConfig.eventData.APP_MASK);
    },

    showLoading: function (msg) {
    	msg = msg || 'Tải dữ liệu..';
        Ext.Viewport.mask({ xtype: 'loadmask', message: msg });
        Ext.Viewport.setMasked(true);
    },

    hideLoading: function () {
        Ext.Viewport.unmask();
    }
}); 