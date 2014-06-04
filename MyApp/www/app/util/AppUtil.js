Ext.define('MyApp.util.AppUtil', {
	alternateClassName : 'AppUtil',
	requires : ['MyApp.model.SavedVar'],
	singleton : true,
	dbConnection : null,
	moneyUnit : 'đ',
	CASH : 0,
	CASH_MODEL : null,
	RELEASE: true,
	
	constructor : function() {
		var me = this;
		me.RELEASE = false;
		me.log('RELEASE MODE: '+ me.RELEASE);
		
		
		me.getDbConnection();
		me.initLocalStorage();
		
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
			me.offline = Ext.create('MyApp.util.offline.Data', {});
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

	doTrade : function(title, type, amount, trade_with, trade_note, time, hunter_id) {
		//log('doTrade');
		//log(arguments);
		var now = time || new Date();
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
		model.save(function() {
			MyApp.app.fireEvent(AppConfig.eventData.TRADE_ADDED, now);
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

	cashPlus : function(amount) {
		var me = this;
		me.CASH += amount;
		me.saveCashModel();
		MyApp.app.fireEvent('cash_changed', me.CASH, amount);
	},

	cashMinus : function(amount) {
		var me = this;
		me.CASH -= amount;
		me.saveCashModel();
		MyApp.app.fireEvent('cash_changed', me.CASH, -amount);
	},

	cashEdit : function(amount) {
		var me = this;
		var dif = amount - me.CASH;
		me.CASH = amount;
		me.saveCashModel();
		if (dif > 0) {
			me.doTrade(AppConfig.textData.DIEU_CHINH_SO_DU + ' ' + AppConfig.textData.TIEN_MAT.toLowerCase(), AppConfig.type.THU, dif, AppConfig.type.TIEN_MAT, '', new Date(), 'cash');
		} else if (dif < 0) {
			me.doTrade(AppConfig.textData.DIEU_CHINH_SO_DU + ' ' + AppConfig.textData.TIEN_MAT.toLowerCase(), AppConfig.type.CHI, -dif, AppConfig.type.TIEN_MAT, '', new Date(), 'cash');
		}
		
		MyApp.app.fireEvent(AppConfig.eventData.CASH_CHANGED, me.CASH, amount);
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
		} /*else if (amount >= 100000) {
			amount = Math.round(amount / 100000);
			amount = amount.toString() + ' trăm ngàn';
		} else if (amount >= 10000) {
			amount = Math.round(amount / 10000);
			amount = amount.toString() + ' chục ngàn';
		} else if (amount >= 1000) {
			amount = Math.round(amount / 1000);
			amount = amount.toString() + ' ngàn';
		}*/ else {
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
		if (this.RELEASE) return true;
		//alert('Ext.os.deviceType: ' + Ext.os.deviceType);
		if (Ext.os.deviceType == "Desktop" || Ext.os.deviceType == "Phone") {
			return false;
		}
		return true;
	},

	log : function(msg) {
		console.log(msg);
		//Ext.log.Logger.log(msg);
	},
	
	alert: function(msg, title) {
		MyApp.app.fireEvent(AppConfig.eventData.APP_MASK);
		title = title || '';
		Ext.Msg.alert(title, msg, function() {
			MyApp.app.fireEvent(AppConfig.eventData.APP_UNMASK);
		});
	},

	confirm: function(msg, title, callback) {
    	MyApp.app.fireEvent(AppConfig.eventData.APP_MASK);
    	Ext.Msg.confirm(title, msg, function(code){
    		MyApp.app.fireEvent(AppConfig.eventData.APP_UNMASK);
    		if (code == 'yes') 
    			if (callback) callback();
    	});
    },

    showLoading: function (msg) {
    	msg = msg || 'Loading ..';
        Ext.Viewport.mask({ xtype: 'loadmask', message: msg });
        Ext.Viewport.setMasked(true);
    },

    hideLoading: function () {
        Ext.Viewport.unmask();
    }
}); 