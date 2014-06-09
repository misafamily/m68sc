Ext.define('MyApp.view.apppopup.AutoHideAlert', {
    extend: 'Ext.Container',
    xtype: 'apppopup_autohidealert',
    requires: [
    ],
    config: {
    	message: 'Your message here',
       	showAnimation: { type: 'fadeIn', duration: 200, easing: 'ease-out' },
	    hideAnimation: { type: 'fadeOut', duration: 100, easing: 'ease-out' },
	    cls: 'autohidealert-container',
	    hidden: true,
	    layout: {
	    	type: 'hbox',
	    	pack: 'center',
	    	align: 'center'
	    },
	    items:[{
	    	xtype: 'label',
	    	cls: 'message',
	    	html: ''
	    }]
    },

    initialize: function() {
    	var me = this;
    	me.callParent(arguments);
    	me.setTop(window.innerHeight - 49 - 50 - 10);// - botton tab - alertHeight - 10 (margin)
    },

    updateMessage: function() {
    	var me = this;
    	if (!me._msgLabel) me._msgLabel = me.down('label');
    	me._msgLabel.setHtml(me.getMessage());
    },

    show: function() {
    	var me = this;
    	me.callParent(arguments);    	
    	if (me._interval) clearTimeout(me._interval);
    	me._interval = Ext.defer(function() {
    		me.hide();
    		me._interval = null;
    	}, 2000);
    }
});
