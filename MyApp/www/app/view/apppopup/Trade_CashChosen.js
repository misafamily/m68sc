Ext.define('MyApp.view.apppopup.Trade_CashChosen', {
	extend: 'Ext.Panel',
	xtype: 'apppopup_trade_cashchosen',
	config: {		
    	left: 0,
    	top: 0,
    	padding: 10,
    	modal: true, 
    	hideOnMaskTap: true,
    	width: '80%',
    	height: '60%',
    	layout: {
    		type: 'vbox',
    		pack: 'center',
    		align: 'center'
    	},

    	items: [{
    		xtype: 'container',
			cls : 'main fullwidth-container',
			layout: {
				type: 'vbox'
			},
			flex: 1,
			items: [{
				xclass: 'MyApp.view.comp.AppList',
				cls : 'recorditem-list nobg',
				itemTpl: new Ext.XTemplate(
					'<div class="info">', 
						'<img class= "thumb" src="resources/images/fields/f-xeco.png"></img>', 
						'<div class="content">', 
							'<div class="title">{name}</div>',
						'</div>', 
						'<div class= "check {selected}"></div>', 
					'</div>'
				),
				itemHeight: 40
			}]
    	}]
	},

	initialize: function() {
		var me = this;
		me.callParent(arguments);
	}
    
});