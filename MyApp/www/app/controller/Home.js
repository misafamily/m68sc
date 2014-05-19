Ext.define('MyApp.controller.Home', {
    extend: 'Ext.app.Controller',
	requires:[		
		'MyApp.view.comp.MoneyInputer'
	],
    config: {
        refs: {		
			home: 'home'
        },//end refs
        control: {
			'home button[title="addexpensebutton"]': {
				tap: function() {
					var me = this;
					var view = me.getMoneyInputerView();
					Ext.Viewport.add(view);
					view.showInputer(function(amount){
						Ext.Msg.alert('THONG BAO', 'DA NHAP ' + AppUtil.formatMoneyWithUnit(amount));
					});
				}
			}
		}
    },
    
    getMoneyInputerView: function() {
    	var me = this;
    	if (!me._inputer) me._inputer = Ext.create('MyApp.view.comp.MoneyInputer');
    	
    	return me._inputer;
    }
});