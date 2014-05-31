Ext.define('MyApp.view.comp.AppContainer', {
    extend: 'Ext.Container',
    requires:[
    	//'Ext.Container'
    ],
    config: {    	
       emptyListOnHide: false
    },

	show: function() {
		var me = this;
		me.callParent(arguments);
		if (me._list) {
			me._list.show();
		}
	},
	hide: function() {
		var me = this;
		me.callParent(arguments);
		if (me._list) {
			me._list.hide();
			
			if (me.getEmptyListOnHide()) {
				me._list.getScrollable().getScroller().scrollToTop();
				var store = me._list.getStore();
				if (store) 
					store.removeAll();
			}
		}
	}
});
