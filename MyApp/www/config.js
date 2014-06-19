AppConfig = {
	
};

function log() {
	console.log(arguments);
}

//AppConfig.pigImage = new Image();
//AppConfig.pigImage.src = 'resources/images/pig.png';

AppConfig.targetArrowImage = new Image();
AppConfig.targetArrowImage.src = 'resources/images/target-arrow.png';


AppConfig.eventData = {};
AppConfig.eventData.SHOW_INPUTER = 'SHOW_INPUTER';
AppConfig.eventData.SHOW_TRADE = 'SHOW_TRADE';
AppConfig.eventData.MAIN_VIEW_CHANGED = 'MAIN_VIEW_CHANGED';
AppConfig.eventData.TRADE_ADDED = 'TRADE_ADDED';
AppConfig.eventData.EXPENSE_CHANGED = 'EXPENSE_CHANGED';
AppConfig.eventData.SHOW_DATE_CHOOSER = 'SHOW_DATE_CHOOSER';
AppConfig.eventData.CASH_CHANGED = 'cash_changed';
AppConfig.eventData.ATM_CHANGED = 'atm_changed';
AppConfig.eventData.SHOW_CASH_TRADE_LIST = 'show_cash_trade_list';
AppConfig.eventData.SHOW_ATM_TRADE_LIST = 'show_atm_trade_list';
AppConfig.eventData.SHOW_ATM_ADD = 'show_atm_add';
AppConfig.eventData.SHOW_INCOME_ADD = 'show_income_add';
AppConfig.eventData.SHOW_EXPENSE_CHOSEN = 'show_expense_chosen';
AppConfig.eventData.SHOW_INCOME_CHOSEN = 'show_income_chosen';
AppConfig.eventData.SHOW_CASH_CHOSEN = 'show_cash_chosen';
AppConfig.eventData.HIDE_POPUP = 'hide_popup';

AppConfig.eventData.ATM_ADDED = 'atm_added';
AppConfig.eventData.APP_MASK = 'app_mask';
AppConfig.eventData.APP_UNMASK = 'app_unmask';




AppConfig.placeholderData = {};
AppConfig.placeholderData.TYPE = 'Loại hình';
AppConfig.placeholderData.AMOUNT = 'Số tiền đ';
AppConfig.placeholderData.TEN_CHU_THE = 'Tên chủ thẻ';
AppConfig.placeholderData.NGAN_HANG = 'Ngân hàng';
AppConfig.placeholderData.TIEN_HIEN_CO = 'Tền hiện có trong thẻ';
AppConfig.placeholderData.GHI_CHU = 'Ghi chú';
AppConfig.placeholderData.GHI_CHU_CHI = 'Chi cho việc gì?';
AppConfig.placeholderData.GHI_CHU_THU = 'Thu từ đâu?';

AppConfig.textData = {};
AppConfig.textData.TAI_DATA = 'Tải dữ liệu ..';
AppConfig.textData.NO_DATA = 'Không có dữ liệu';
AppConfig.textData.THEM_GIAO_DICH = 'THÊM GIAO DỊCH';
AppConfig.textData.CHON_CHI_TIEU = 'CHỌN CHI TIÊU';
AppConfig.textData.CHON_THU_NHAP = 'CHỌN THU NHẬP';
AppConfig.textData.CHI_TIEU = 'CHI TIÊU';
AppConfig.textData.THU_NHAP = 'THU NHẬP';
AppConfig.textData.NHAP_SO_TIEN = 'NHẬP SỐ TIỀN';
AppConfig.textData.SO_DU = 'Số dư';
AppConfig.textData.GIAO_DICH = 'Giao dịch';
AppConfig.textData.QUAN_LY_KET_SAT = 'Quản lý két sắt';
AppConfig.textData.TIEN_MAT = 'Tiền mặt';
AppConfig.textData.TIEN_MAT_HIEN_CO = 'Tiền mặt hiện có';
AppConfig.textData.ATM = 'Tài khoản ATM';
AppConfig.textData.ATM_ONLY = 'ATM';
AppConfig.textData.TIEN_TRONG_TAI_KHOAN = 'Tiền trong tài khoản';
AppConfig.textData.DIEU_CHINH_SO_DU = 'Điều chỉnh';// tiền mặt hiện có';
AppConfig.textData.CHI_TIET_GIAO_DICH = 'Chi tiết giao dịch';
AppConfig.textData.GIAO_DICH_TIEN_MAT = 'Giao dịch tiền mặt';
AppConfig.textData.GIAO_DICH_ATM = 'Giao dịch ATM';
AppConfig.textData.THEM_TAI_KHOAN = 'Thêm tài khoản';
AppConfig.textData.RUT_TIEN = 'Rút tiền';
AppConfig.textData.CHUYEN_TIEN = 'Chuyển vào tài khoản ATM';
AppConfig.textData.TIEN_THU_NHAP = 'Thu nhập';
AppConfig.textData.CHUYEN_KHOAN = 'Chuyển khoản';
AppConfig.textData.SUA_THONG_TIN = 'Sửa thông tin';
AppConfig.textData.THEM_TAI_KHOAN_ATM = 'Thêm tài khoản';
AppConfig.textData.DIEN_THONG_TIN_ATM = 'Điền thông tin tài khỏan ATM';
AppConfig.textData.TONG_CONG = 'Tổng cộng';
AppConfig.textData.NHAP_DATA_ERROR = 'Chưa nhập đầy đủ thông tin';
AppConfig.textData.ATM_RUT_ERROR = 'Chỉ được rút tối đa {0}';
AppConfig.textData.NHAP_ERROR_TITLE = 'Lỗi nhập liệu';
AppConfig.textData.ERROR_TITLE = 'Lỗi';
AppConfig.textData.GIAO_DICH_OK = 'Giao dịch xong';
AppConfig.textData.TAO_ATM_OK = 'Thêm ATM xong';
AppConfig.textData.DIEU_CHINH_OK = 'Điều chỉnh xong';
AppConfig.textData.KIEU_CHI_TIEU = 'Chọn chi tiêu *';
AppConfig.textData.KIEU_THU_NHAP = 'Chọn thu nhập *';
AppConfig.textData.KIEU_CASH_ATM = 'Chọn tiền mặt hay ATM';
AppConfig.textData.PRESS_BACK_TO_EXIT = "Nhấn thêm lần nữa để thoát";

AppConfig.type = {};
AppConfig.type.THU = 'thu';
AppConfig.type.CHI = 'chi';
AppConfig.type.RUT = 'rut';

AppConfig.type.TIEN_MAT = 'tien_mat';
AppConfig.type.ATM = 'atm';

//thu
AppConfig.type.LUONG = 'Lương';


AppConfig.action = {};
AppConfig.action.DIEU_CHINH = 'dieu_chinh';
AppConfig.action.CHI_TIET_GIAO_DICH = 'chi_tiet_giao_dich';
AppConfig.action.THEM = 'them';
AppConfig.action.RUT = 'rut';
AppConfig.action.CHUYEN_TIEN = 'chuyen_tien';
AppConfig.action.CHUYEN_KHOAN = 'chuyen_khoan';
AppConfig.action.THU_NHAP = 'thu_nhap';

//ketsat list-item
AppConfig.ironboxdata = {};
AppConfig.ironboxdata.TIEN_MAT = [{
	title: AppConfig.textData.DIEU_CHINH_SO_DU,
	type: AppConfig.type.TIEN_MAT,
	action: AppConfig.action.DIEU_CHINH
}, {
	title: AppConfig.textData.TIEN_THU_NHAP,
	type: AppConfig.type.TIEN_MAT,
	action: AppConfig.action.THU_NHAP
}, {
	title: AppConfig.textData.CHUYEN_TIEN,
	type: AppConfig.type.TIEN_MAT,
	action: AppConfig.action.CHUYEN_TIEN
}, {
	title: AppConfig.textData.CHI_TIET_GIAO_DICH,
	type: AppConfig.type.TIEN_MAT,
	action: AppConfig.action.CHI_TIET_GIAO_DICH 
}];

AppConfig.ironboxdata.ATM = [{
	title: AppConfig.textData.THEM_TAI_KHOAN,
	type: AppConfig.type.ATM,
	action: AppConfig.action.THEM
}];

AppConfig.ironboxdata.ATM_SUB = [{
	title: AppConfig.textData.RUT_TIEN,
	type: AppConfig.type.ATM,
	action: AppConfig.action.RUT
},{
	title: AppConfig.textData.TIEN_THU_NHAP,
	type: AppConfig.type.ATM,
	action: AppConfig.action.TIEN_THU_NHAP
},{
	title: AppConfig.textData.CHUYEN_KHOAN,
	type: AppConfig.type.ATM,
	action: AppConfig.action.CHUYEN_KHOAN
},{
	title: AppConfig.textData.DIEU_CHINH_SO_DU,
	type: AppConfig.type.ATM,
	action: AppConfig.action.DIEU_CHINH
},{
	title: AppConfig.textData.CHI_TIET_GIAO_DICH,
	type: AppConfig.type.ATM,
	action: AppConfig.action.CHI_TIET_GIAO_DICH
}];

/*
AppConfig.expenseType = [													
							{text: 'Đi chợ hàng ngày',  value: 'di_cho'},
	                        {text: 'Thực phẩm sữa, bánh kẹo, rượu beer',  value: 'thuc_pham_sua'},
							{text: 'Y tế, chăm sóc sức khỏe',  value: 'y_te'},
							{text: 'Điện, nước, gas',  value: 'dien_nuoc_ga'},
							{text: 'Giao dịch ngân hàng, cước phí',  value: 'giao_dich'},
							{text: 'Xe cộ, di chuyển, xăng',  value: 'xe_xang'},
							{text: 'Phí nhà ở, thuê người',  value: 'thue_nha'},
							{text: 'Đồ dùng  sinh hoạt gia đình, điện gia dụng',  value: 'sinh_hoat'},
							{text: 'Đồ nội - ngoại thất',  value: 'noi_ngoai_that'},
							{text: 'Quần áo, giày dép, mỹ phẩm',  value: 'quanao_giaydep'},	//minute
							{text: 'Ăn uống, giải trí, tiêu vặt',  value: 'an_uong'},	//minute
							//{text: 'Cá nhân: thể thao, làm tóc, cước đt',  value: 'ca_nhan'},	//minute
							{text: 'Du lịch, dã ngoại',  value: 'du_lich'},	//minute
							{text: 'Học hành, sách vở, báo chí',  value: 'hoc_hanh'},	//minute
							{text: 'Đám, tiệc, biếu xén, thăm nom',  value: 'tiec_tung'},	//minute
							{text: 'Đồ em bé: tã, khăn, đồ chơi',  value: 'do_em_be'},	//minute
							{text: 'Khác',  value: 'khac'}
						];
AppConfig.incomeType = [			
	                    	{text: 'Lương',  value: 'nhan_luong'},									
							{text: 'Bảo hiểm',  value: 'bao_hiem'},
							{text: 'Cho thuê nhà, mặt bằng',  value: 'cho_thue_nha'},
	                    	{text: 'Khác',  value: 'khac'}
						];
*/

/*
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

*/