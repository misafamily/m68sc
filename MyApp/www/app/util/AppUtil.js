Ext.define('MyApp.util.AppUtil', {
	alternateClassName : 'AppUtil',
	requires : ['MyApp.model.SavedVar'],
	singleton : true,
	dbConnection : null,
	_lang : 'en',
	moneyUnit : 'đ',
	CASH : 0,
	CASH_MODEL : null,
	RELEASE: false,
	//TYPE
	//chuyen_tien, rut_tien, nap_tien, tao_moi, nhan_luong, sua_thong_tin
	//TYPE_ATM_CHUYEN_TIEN: 'chuyen_tien',
	TYPE_INSURANCE : 'insurance',
	TYPE_SAVING : 'saving',
	TYPE_ATM : 'atm',
	TYPE_ATM_CHI : 'chi',
	TYPE_ATM_THU : 'thu',
	TYPE_ATM_RUT_TIEN : 'rut_tien',
	TYPE_ATM_CHUYEN_KHOAN : 'chuyen_khoan',
	TYPE_ATM_TAO_MOI : 'tao_moi',
	TYPE_ATM_NHAN_LUONG : 'nhan_luong',
	TYPE_ATM_SUA_THONG_TIN : 'sua_thong_tin',
	TYPE_ATM_DONG : 'tam_dong',
	TYPE_ATM_KHOI_PHUC : 'khoi_phuc',
	TYPE_ATM_NAP_TIEN : 'nap_tien',
	TYPE_ATM_LINH_LAI : 'linh_lai',

	//STATUS
	STATUS_IN_USE : 'in_use',
	STATUS_CLOSED : 'closed',
	STATUS_DELETED : 'deleted',
	//CONFIRM
	CONFIRM_ATM_DELETE : 'Tài khoản ATM sẽ được đóng ?<br/>(Có thể khôi phục lại sau)',
	CONFIRM_SAVING_DELETE : 'Sổ sẽ được đóng ?<br/>(Có thể khôi phục lại sau)',
	CONFIRM_CASH_DETAIL_DELETE_THU : 'Tiền mặt sẽ tự động trừ đi tương ứng với số tiền đã nhận nếu xóa mục này',
	CONFIRM_CASH_DETAIL_DELETE_CHI : 'Tiền mặt sẽ tự động cộng lại tương ứng với số tiền đã chi nếu xóa mục này',
	CONFIRM_CASH_DETAIL_DELETE_RUT : 'Tiền mặt sẽ tự động trừ đi và tài khoản sẽ tự động cộng lại tiền nếu xóa mục này',
	CONFIRM_CASH_DETAIL_DELETE_NAP : 'Tiền mặt sẽ tự động cộng lại và tài khoản sẽ tự động trừ đi tiền nếu xóa mục này',
	CONFIRM_CASH_DETAIL_DELETE_ATM_NHAN_LUONG : 'Tiền trong tài khoản sẽ tự động trừ đi tương ứng với số tiền đã nhận nếu xóa mục này',
	CONFIRM_CASH_DETAIL_DELETE_ATM_CHUYEN_KHOAN : 'Tiền trong tài khoản sẽ tự động cộng lại tương ứng với số tiền đã chuyển nếu xóa mục này',
	//TITLE
	TITLE_DELETE_DENY : 'Từ chối',
	TITLE_ERROR : 'Lỗi',
	TITLE_ERROR_INPUT : 'Lỗi nhập',
	TITLE_EDIT : 'Thay đổi thông tin',
	TITLE_PUSHIN : 'Nạp tiền',
	TITLE_EXPENSE : 'Chi tiêu trong ngày',
	TITLE_PUSHOUT : 'Rút tiền',
	TITLE_CHECKIN : 'Nhận lương, tiền chuyển khoản',
	TITLE_CHECKOUT : 'Chuyển khoản,<br/> mua sắm bằng thẻ',
	TITLE_ATM_DELETE : 'Đóng tài khoản ATM',
	TITLE_SAVING_DELETE : 'Đóng sổ tiết kiệm',
	TITLE_UOCTINH_LAI : 'Ước tình tiền lãi',
	TITLE_LINHLAI : 'Lĩnh tiền lãi',
	TITLE_THEMTIEN : 'Thêm tiền mặt',
	//MESSAGE
	MESSAGE_CAN_NOT_DELETE : 'Vì lý do liệt kê thông tin nên mục này không thể xóa',
	MESSAGE_NOT_FILLED_INPUT : 'Chưa điền đầy đủ thông tin',
	MESSAGE_WRONG_NUMBER_INPUT : 'Số tiền không hợp lệ',
	MESSAGE_WRONG_DATE : 'Ngày lĩnh lãi phải sau ngày gởi hoặc ngày lĩnh lãi trước đó',
	MESSAGE_SUCCESS_EDIT : 'Đã cập nhật',
	MESSAGE_SUCCESS_PUSHIN : 'Đã nạp. Số tiền<br/><span>{0}</span><br/>Tiền mặt hiện còn <br/><span>{1}</span>',
	MESSAGE_SUCCESS_PUSHOUT : 'Đã rút. Số tiền<br/><span>{0}</span><br/>Tiền mặt hiện có <br/><span>{1}</span>',
	MESSAGE_SUCCESS_CHECKIN : 'Đã nhận tiền. Số tiền<br/><span>{0}</span>',
	MESSAGE_SUCCESS_CHECKOUT : 'Đã chuyển khoản. Số tiền<br/><span>{0}</span>',
	MESSAGE_SUCCESS_DELETE : 'Đã đóng xong',
	MESSAGE_SUCCESS_LINHLAI : 'Đã lĩnh. Số tiền<br/><span>{0}</span><br/>Tiền mặt hiện có <br/><span>{1}</span>',
	MESSAGE_SUCCESS_THEMTIEN : 'Đã thêm. Số tiền<br/><span>{0}</span><br/>Tiền mặt hiện có <br/><span>{1}</span>',
	MESSAGE_SUCCESS_UOCTINH_LAI : '*** Tiền lãi ước tính từ ngày {0}, {1}', //<br/>là <span>{2}</span>',

	MESSAGE_FAILED_EDIT_CASH : 'Tiền mặt không đủ để bù vào, hiện có <span>{0}</span>. Cần tối thiểu <span>{1}</span> để thực hiện',
	MESSAGE_FAILED_EDIT_CASH_ATM : 'Tiền trong ATM không đủ để giao dịch, hiện có <span>{0}</span>. Cần tối thiểu <span>{1}</span> để thực hiện',
	MESSAGE_FAILED_EDIT_CASH_SAVING : 'Tiền trong sổ không đủ để giao dịch, hiện có <span>{0}</span>. Cần tối thiểu <span>{1}</span> để thực hiện',
	MESSAGE_FAILED_EDIT : 'Chưa điền thông tin mới',
	MESSAGE_FAILED_PUSHIN : 'Tiền mặt không đủ để nạp, hiện có <span>{0}</span>',
	MESSAGE_FAILED_EXPENSE : 'Tiền mặt không đủ để chi, hiện có <span>{0}</span>',
	MESSAGE_FAILED_PUSHOUT : 'Tiền trong tài khoản không đủ. Có thể rút tối đa <span>{0}</span>',
	MESSAGE_FAILED_CHECKOUT : 'Tiền trong tài khoản không đủ. Có thể chuyển tối đa <span>{0}</span>',
	MESSAGE_FAILED_DELETE : 'Lỗi xóa không xác định do sự cố về dữ liệu',
	MESSAGE_FAILED_ATM_NOT_FOUND : 'Thẻ ATM này đã bị đóng. Hãy khôi phục lại trước khi thao tác',
	MESSAGE_FAILED_SAVING_NOT_FOUND : 'Sổ tiết kiệm này đã bị đóng. Hãy khôi phục lại trước khi thao tác',
	MESSAGE_FAILED_SAVING_PAID_DELETE : 'Phải xóa những lần lĩnh lãi tiếp theo trước của sổ tiết kiệm này',

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
			me.saveLocalVar('CASH', 100000000000);
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
		hunter_id = hunter_id || 'CASH';
		trade_with = trade_with || AppConfig.type.TIEN_MAT;
		var sign_amount = (type == AppConfig.type.THU) ? amount : -amount;
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
		me.CASH = amount;
		me.saveCashModel();
		MyApp.app.fireEvent('cash_changed', me.CASH, amount);
	},
	
	checkAmount: function(amount) {
		if (!amount) {
			log('Nhap tien di ku');
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
		if (amount >= 1000000) {
			amount = Math.round(amount / 1000000);

			amount = amount.toString() + ' triệu';
		} else if (amount >= 100000) {
			amount = Math.round(amount / 100000);
			amount = amount.toString() + ' trăm ngàn';
		} else if (amount >= 10000) {
			amount = Math.round(amount / 10000);
			amount = amount.toString() + ' chục ngàn';
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

	formatMoneyWithUnit : function(amount) {
		var me = this;
		return me.formatMoney(amount) + ' ' + me.moneyUnit;
	},

	formatRateWithUnit : function(amount) {
		return amount + ' %/năm';
	},
	
	deformatMoneyWithUnit: function(amountformat) {
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
	}
}); 