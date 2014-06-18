Ext.define('MyApp.controller.Main', {
	extend : 'Ext.app.Controller',
	requires : ['MyApp.view.apppopup.MoneyInputer', 'MyApp.view.apppopup.Trade',
				'MyApp.view.apppopup.DateChooser', 'MyApp.view.apppopup.CashTradeList',
				'MyApp.view.apppopup.AtmAdd', 'MyApp.view.apppopup.AtmTradeList',
				'MyApp.view.apppopup.IncomeAdd',
				'MyApp.view.apppopup.Trade_ExpenseChosen', 'MyApp.view.apppopup.Trade_IncomeChosen', 'MyApp.view.apppopup.Trade_CashChosen'],
	config : {
		refs : {
			main : 'main',
			mainPanel : 'main carousel',
			mainSegmentedButton : 'main segmentedbutton'
		}, //end refs
		control : {
			main : {
				initialize : function() {
					var me = this;
					MyApp.app.on(AppConfig.eventData.SHOW_INPUTER, me.onShowInputer, me);
					MyApp.app.on(AppConfig.eventData.SHOW_TRADE, me.onShowTrade, me);
					MyApp.app.on(AppConfig.eventData.SHOW_DATE_CHOOSER, me.onShowDateChooser, me);
					MyApp.app.on(AppConfig.eventData.SHOW_CASH_TRADE_LIST, me.onShowCashTradeList, me);
					MyApp.app.on(AppConfig.eventData.SHOW_ATM_TRADE_LIST, me.onShowAtmTradeList, me);
					MyApp.app.on(AppConfig.eventData.SHOW_ATM_ADD, me.onShowAtmAdd, me);
					MyApp.app.on(AppConfig.eventData.SHOW_INCOME_ADD, me.onShowIncomeAdd, me);
					MyApp.app.on(AppConfig.eventData.SHOW_EXPENSE_CHOSEN, me.onShowExpenseChosen, me);
					MyApp.app.on(AppConfig.eventData.SHOW_INCOME_CHOSEN, me.onShowIncomeChosen, me);
					MyApp.app.on(AppConfig.eventData.SHOW_CASH_CHOSEN, me.onShowCashChosen, me);

					MyApp.app.on(AppConfig.eventData.APP_MASK, me.onAppMasked, me);
					MyApp.app.on(AppConfig.eventData.APP_UNMASK, me.onAppUnMasked, me);

					MyApp.app.on('backbutton', me.onBackButtonTap, me);
				}
			},

			'main segmentedbutton' : {
				toggle : function(segmentbutton, button, pressed) {

					var me = this;
					//if (!me._lastViewIndex) me._lastViewIndex = 0;
					if (pressed == true) {
						var newIndex = button.config.viewIndex;
						var oldIndex = me.getMainPanel().activeIndex;
						if (newIndex != oldIndex)
							me.getMainPanel().setActiveItem(newIndex);
						/*if (newIndex >  oldIndex){
						 me.getMainPanel().animateActiveItem(newIndex, { type: 'slide', direction: 'left' });
						 } else if (newIndex <  oldIndex){
						 me.getMainPanel().animateActiveItem(newIndex, { type: 'slide', direction: 'right' });
						 }*/

					}

				}//end toogle
			},
			'main carousel' : {
				activeitemchange : function(carousel, value, oldValue, eOpts) {
					//log('activeitemchange');
					var me = this;
					var sb = me.getMainSegmentedButton();
					sb.setPressedButtons(carousel.activeIndex);
					MyApp.app.fireEvent(AppConfig.eventData.MAIN_VIEW_CHANGED, carousel.activeIndex);
				}
			}
		}
	},

	onToggleMenu : function() {
		Ext.Viewport.toggleMenu("left");
	},

	onBackButtonTap: function() {
		var me = this;
		if (AppUtil.popupAdded.length > 0) {
			var view = AppUtil.popupAdded.pop();
			view.hide();
		} else {
			//go back to home
			if (me.getMainPanel().activeIndex != 0) {
				me.getMainPanel().setActiveItem(0);
			} else {
				if (me.onExiting) {
					try {
						navigator.app.exitApp();
					} catch(e) {
						AppUtil.alert('no function navigator.app.exitApp()');
					}
					
				} else {
					AppUtil.autoAlert(AppConfig.textData.PRESS_BACK_TO_EXIT);
					me.onExiting = true;

					Ext.defer(function() {
						me.onExiting = false;
					},2000);
				}			
			}
		}
	},

	onAppMasked: function() {
		this.getMain().disable();
	},

	onAppUnMasked: function() {
		var me = this;
		Ext.defer(function() {
			me.getMain().enable();
		}, 500);
	},

	onShowInputer : function(defaultValue, callback, atitle) {
		var me = this;
		var value = defaultValue || '0 d';
		value = AppUtil.deformatMoneyWithUnit(value);
		var view = me.getMoneyInputerView();
		Ext.Viewport.add(view);
		view.showView(value, callback, atitle);

		AppUtil.popupAdded.push(view);
	},

	onShowTrade : function(money) {
		var me = this;
		var view = me.getTradeView();
		Ext.Viewport.add(view);
		view.showView(money);

		AppUtil.popupAdded.push(view);
	},
	
	onShowDateChooser: function(date, callback) {
		var me = this;
		var view = me.getDateChooserView();
		Ext.Viewport.add(view);
		view.showView(date, callback);

		AppUtil.popupAdded.push(view);
	},

	onShowCashTradeList: function() {
		var me = this;
		var view = me.getCashTradeListView();
		Ext.Viewport.add(view);
		view.showView();

		AppUtil.popupAdded.push(view);
	},

	onShowAtmTradeList: function(atmModel) {
		var me = this;
		var view = me.getAtmTradeListView();
		Ext.Viewport.add(view);
		view.showView(atmModel);

		AppUtil.popupAdded.push(view);
	},

	onShowAtmAdd: function() {
		var me = this;
		var view = me.getAtmAddView();
		Ext.Viewport.add(view);
		view.showView();

		AppUtil.popupAdded.push(view);
	},

	onShowIncomeAdd: function(amount, type, model) {
		var me = this;
		var view = me.getIncomeAddView();
		Ext.Viewport.add(view);
		view.showView(amount, type, model);

		AppUtil.popupAdded.push(view);
	},

	onShowExpenseChosen: function(type, value, callback) {
		var me = this;
		var view = me.getExpenseChosenView();
		Ext.Viewport.add(view);
		view.showView(type, value, callback);

		AppUtil.popupAdded.push(view);
	},

	onShowIncomeChosen: function(type, value, callback) {
		var me = this;
		var view = me.getIncomeChosenView();
		Ext.Viewport.add(view);
		view.showView(type, value, callback);

		AppUtil.popupAdded.push(view);
	},

	onShowCashChosen: function(type, value, callback) {
		var me = this;
		var view = me.getCashChosenView();
		Ext.Viewport.add(view);
		view.showView(type, value, callback);

		AppUtil.popupAdded.push(view);
	},
	//GET FUNCS
	getMoneyInputerView : function() {
		var me = this;
		if (!me._inputer)
			me._inputer = Ext.create('MyApp.view.apppopup.MoneyInputer');

		return me._inputer;
	},
	getTradeView : function() {
		var me = this;
		if (!me._trade)
			me._trade = Ext.create('MyApp.view.apppopup.Trade');

		return me._trade;
	},
	getDateChooserView : function() {
		var me = this;
		if (!me._dateChooser)
			me._dateChooser = Ext.create('MyApp.view.apppopup.DateChooser');

		return me._dateChooser;
	},

	getCashTradeListView: function() {
		var me = this;
		if (!me._cashTradeList)
			me._cashTradeList = Ext.create('MyApp.view.apppopup.CashTradeList');

		return me._cashTradeList;
	},

	getAtmTradeListView: function() {
		var me = this;
		if (!me._atmTradeList)
			me._atmTradeList = Ext.create('MyApp.view.apppopup.AtmTradeList');

		return me._atmTradeList;
	},

	getAtmAddView: function() {
		var me = this;
		if (!me._atmAdd)
			me._atmAdd = Ext.create('MyApp.view.apppopup.AtmAdd');

		return me._atmAdd;
	},

	getIncomeAddView: function() {
		var me = this;
		if (!me._incomeAdd)
			me._incomeAdd = Ext.create('MyApp.view.apppopup.IncomeAdd');

		return me._incomeAdd;
	},

	getExpenseChosenView: function() {
		var me = this;
		if (!me._expenseChosen)
			me._expenseChosen = Ext.create('MyApp.view.apppopup.Trade_ExpenseChosen');

		return me._expenseChosen;
	},

	getIncomeChosenView: function() {
		var me = this;
		if (!me._incomeChosen)
			me._incomeChosen = Ext.create('MyApp.view.apppopup.Trade_IncomeChosen');

		return me._incomeChosen;
	},

	getCashChosenView: function() {
		var me = this;
		if (!me._cashChosen)
			me._cashChosen = Ext.create('MyApp.view.apppopup.Trade_CashChosen');

		return me._cashChosen;
	}
});
