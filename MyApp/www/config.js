AppConfig = {
	
};

function log(msg) {
	AppUtil.log(msg);
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


AppConfig.placeholderData = {};
AppConfig.placeholderData.TYPE = 'Loại hình';
AppConfig.placeholderData.AMOUNT = 'Số tiền đ';

AppConfig.textData = {};
AppConfig.textData.THEM_GIAO_DICH = 'CHỌN GIAO DỊCH';
AppConfig.textData.CHI_TIEU = 'CHI TIÊU';
AppConfig.textData.THU_NHAP = 'THU NHẬP';
AppConfig.textData.NHAP_SO_TIEN = 'NHẬP SỐ TIỀN';
AppConfig.textData.SO_DU = 'Số dư';
AppConfig.textData.GIAO_DICH = 'Giao dịch';
AppConfig.textData.QUAN_LY_KET_SAT = 'Quản lý két sắt';
AppConfig.textData.TIEN_MAT = 'Tiền mặt';
AppConfig.textData.TIEN_MAT_HIEN_CO = 'Tiền mặt hiện có';
AppConfig.textData.ATM = 'Tài khoản ATM';
AppConfig.textData.TIEN_TRONG_TAI_KHOAN = 'Tiền trong tài khoản';


AppConfig.type = {};
AppConfig.type.THU = 'thu';
AppConfig.type.CHI = 'chi';

AppConfig.type.TIEN_MAT = 'tien_mat';
AppConfig.type.ATM = 'atm';

//chi
AppConfig.type.DI_CHO = 'Đi chợ';
AppConfig.type.CHO_VAY = 'Cho vay';

//thu
AppConfig.type.LUONG = 'Lương';


AppConfig.action = {};
AppConfig.action.DIEU_CHINH = 'DIEU_CHINH';
AppConfig.action.CHI_TIET_GIAO_DICH = 'CHI_TIET_GIAO_DICH';
AppConfig.action.THEM = 'THEM';
AppConfig.action.RUT = 'RUT';
AppConfig.action.NAP = 'NAP';
AppConfig.action.CHUYEN_KHOAN = 'CHUYEN_KHOAN';
AppConfig.action.TIEN_VAO = 'TIEN_VAO';
AppConfig.action.SUA_THONG_TIN = 'SUA_THONG_TIN';

//ketsat list-item
AppConfig.ironboxdata = {};
AppConfig.ironboxdata.TIEN_MAT = [{
	title: 'Điều chỉnh số dư',
	type: AppConfig.type.TIEN_MAT,
	action: AppConfig.action.DIEU_CHINH
}, {
	title: 'Chi tiết giao dịch',
	type: AppConfig.type.TIEN_MAT,
	action: AppConfig.action.CHI_TIET_GIAO_DICH 
}];

AppConfig.ironboxdata.ATM = [{
	title: 'Thêm tài khoản',
	type: AppConfig.type.ATM,
	action: AppConfig.action.THEM
}];

AppConfig.ironboxdata.ATM_SUB = [{
	title: 'Rút tiền',
	type: AppConfig.type.ATM,
	action: AppConfig.action.RUT
},{
	title: 'Nạp tiền',
	type: AppConfig.type.ATM,
	action: AppConfig.action.NAP
},{
	title: 'Tiền vào',
	type: AppConfig.type.ATM,
	action: AppConfig.action.TIEN_VAO
},{
	title: 'Chuyển khoản',
	type: AppConfig.type.ATM,
	action: AppConfig.action.CHUYEN_KHOAN
},{
	title: 'Chi tiết giao dịch',
	type: AppConfig.type.ATM,
	action: AppConfig.action.CHI_TIET_GIAO_DICH
},{
	title: 'Sủa thông tin',
	type: AppConfig.type.ATM,
	action: AppConfig.action.SUA_THONG_TIN
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