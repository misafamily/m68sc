AppConfig = {
	
};

function log(msg) {
	AppUtil.log(msg);
}

AppConfig.pigImage = new Image();
AppConfig.pigImage.src = 'resources/images/pig.png';

AppConfig.targetArrowImage = new Image();
AppConfig.targetArrowImage.src = 'resources/images/target-arrow.png';


AppConfig.eventData = {};
AppConfig.eventData.SHOW_INPUTER = 'SHOW_INPUTER';
AppConfig.eventData.SHOW_TRADE = 'SHOW_TRADE';


AppConfig.placeholderData = {};
AppConfig.placeholderData.TYPE = 'Loại hình';
AppConfig.placeholderData.AMOUNT = 'Số tiền đ';

AppConfig.textData = {};
AppConfig.textData.THEM_GIAO_DICH = 'THÊM GIAO DỊCH';
AppConfig.textData.CHI_TIEU = 'CHI TIÊU';
AppConfig.textData.THU_NHAP = 'THU NHẬP';
AppConfig.textData.NHAP_SO_TIEN = 'NHẬP SỐ TIỀN'
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