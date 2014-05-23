Ext.define('MyApp.controller.Home', {
    extend: 'Ext.app.Controller',
	requires:[		
		
	],
    config: {
        refs: {		
			home: 'home'
        },//end refs
        control: {
			'home button[title="addtradebutton"]': {
				tap: function() {
					MyApp.app.fireEvent(AppConfig.eventData.SHOW_TRADE, function() {
						log('trade done');
					});
				}
			},
			'record button[title="addtradebutton"]': {
				tap: function() {
					MyApp.app.fireEvent(AppConfig.eventData.SHOW_TRADE, function() {
						log('trade done');
					});
				}
			}
		}
    }
});