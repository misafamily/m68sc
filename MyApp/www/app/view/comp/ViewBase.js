Ext.define('MyApp.view.comp.ViewBase', {
    extend: 'Ext.navigation.View',
    requires: [
	],
    config: {
		defaultBackButtonText:'',
        autoDestroy: false,
        layout:{
			 animation: null//{duration: 150, type: 'slide'}
		},
		cls: 'viewbase',
		navigationBar:{
			 backButton: {
	            iconCls: 'back',
	            //ui: 'plain',
	            style: {
	            	'margin-left': '10px'
	            }
	        },
        	defaults:{
				xtype:'button',
				ui:'plain'
			},
        	items:[
        		/*{
					iconCls:'toolbar-icon-menu',
					align: 'left',
					hideAnimation:null,
                    showAnimation:null,
                    title: 'menubtn'
				},
				{
					iconCls:'toolbar-icon-trade',
					align: 'right',
					style: {
						'padding-right': '0px',
						'padding-left': '0px'
					},
					hideAnimation:null,
                    showAnimation:null,
                    title: 'trade',
                    hidden: true
				},
				{
					iconCls:'toolbar-icon-edit',
					align: 'right',
					style: {
						'padding-right': '0px',
						'padding-left': '0px'
					},
					hideAnimation:null,
                    showAnimation:null,
                    title: 'edit',
                    hidden: true
				},
				{
					iconCls:'toolbar-icon-delete',
					style: {
						'padding-right': '8px',
						'padding-left': '0px'
					},
					align: 'right',
					hideAnimation:null,
                    showAnimation:null,
                    title: 'delete',
                    hidden: true
				},
				{
					iconCls:'toolbar-icon-done',
					style: {
						'padding-right': '8px',
						'padding-left': '0px'
					},
					align: 'right',
					hideAnimation:null,
                    showAnimation:null,
                    title: 'done',
                    hidden: true
				}*/
			]
       }
   },
   
    showRightButtons: function() {
   		var me = this;
   		if (!me._tradeBtn) me._tradeBtn = me.down('button[title="trade"]');
   		if (!me._editBtn) me._editBtn = me.down('button[title="edit"]');
   		if (!me._delBtn) me._delBtn = me.down('button[title="delete"]');
   		me._tradeBtn.show();
   		me._editBtn.show();
   		me._delBtn.show();
   },
   
   hideRightButtons: function() {
   		var me = this;
   		if (!me._tradeBtn) me._tradeBtn = me.down('button[title="trade"]');
   		if (!me._editBtn) me._editBtn = me.down('button[title="edit"]');
   		if (!me._delBtn) me._delBtn = me.down('button[title="delete"]');
   		me._tradeBtn.hide();
   		me._editBtn.hide();
   		me._delBtn.hide();
   		me.hideDoneButton();
   		me._editBtn.setStyle({'padding-right': '0px'});
   },
   
    showTradeEditDeleteButtons: function() {
   		var me = this;
   		if (!me._tradeBtn) me._tradeBtn = me.down('button[title="trade"]');
   		if (!me._editBtn) me._editBtn = me.down('button[title="edit"]');
   		if (!me._delBtn) me._delBtn = me.down('button[title="delete"]');
   		me._tradeBtn.show();
   		me._editBtn.show();
   		me._delBtn.show();
   },
   
   showDoneButton: function() {
   		var me = this;
   		if (!me._doneBtn) me._doneBtn = me.down('button[title="done"]');
   		me._doneBtn.show();
   },
   
    showEditButton: function() {
   		var me = this;
   		if (!me._editBtn) me._editBtn = me.down('button[title="edit"]');
   		me._editBtn.setStyle({'padding-right': '8px'});
   		me._editBtn.show();
   },
   
   hideDoneButton: function() {
   		var me = this;
   		if (!me._doneBtn) me._doneBtn = me.down('button[title="done"]');
   		me._doneBtn.hide();
   },

   showEditDeleteButtons: function() {
   		var me = this;
   		if (!me._editBtn) me._editBtn = me.down('button[title="edit"]');
   		if (!me._delBtn) me._delBtn = me.down('button[title="delete"]');
   		me._editBtn.show();
   		me._delBtn.show();
   }
});
