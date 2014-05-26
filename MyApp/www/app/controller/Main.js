Ext.define('MyApp.controller.Main', {
	extend : 'Ext.app.Controller',
	requires : ['MyApp.view.apppopup.MoneyInputer', 'MyApp.view.apppopup.Trade'],
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

	onShowInputer : function(defaultValue, callback) {
		var me = this;
		var value = defaultValue || '0 d';
		value = AppUtil.deformatMoneyWithUnit(value);
		var view = me.getMoneyInputerView();
		Ext.Viewport.add(view);
		view.showView(value, callback);
	},

	onShowTrade : function(money) {
		var me = this;
		var view = me.getTradeView();
		Ext.Viewport.add(view);
		view.showView(money);
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
	}
});
