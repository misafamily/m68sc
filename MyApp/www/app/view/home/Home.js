Ext.define('MyApp.view.home.Home', {
	extend : 'MyApp.view.comp.ViewBase',
	xtype : 'home',
	requires : [
		'MyApp.view.home.HomeChart'
	],
	config : {
		navigationBar : {

			items : [{
				iconCls : 'toolbar-icon-previous',
				align : 'left',
				hideAnimation : null,
				showAnimation : null,
				title : 'previousbtn'
			}, {
				iconCls : 'toolbar-icon-next',
				align : 'right',
				hideAnimation : null,
				showAnimation : null,
				title : 'nextbtn'
			}]
		},
		items : [{
			xtype : 'container',
			title : 'MAY 2014',
			flex : 1,
			layout : {
				type : 'vbox'
			},
			cls: 'viewbase-container',
			items : [
				{
					xtype: 'container',
					layout: {
						type: 'hbox',
						pack: 'end',
						align: 'center'
					},
					height: 50,
					style: {
						'background-color': '#f1f3f2'
					},
					items: [
						{
							xtype: 'container',
		                	layout: {
		                		type: 'vbox',
		                		pack: 'center',
		                		align: 'center'
		                	},
		                	cls: 'label-income',
		                	style: {            				
                				'margin-left': '10px'
                			},
							items: [
								{
	                				xtype: 'label',
	                				html: '12 trieu'
	                			},
	                			{
	                				xtype: 'label',
	                				html: 'Tien mat',
	                				cls: 'label-expense-title'
	                			}
							]
						},
						{
							xtype: 'spacer'
						},
						{
							xtype: 'label',
                			html: '01.05.2014 - 31.05.2014',
                			style: {
                				'color': '#898e92',
                				'margin-right': '10px'
                			}
						}
					]
				},
				{
					xtype:'home_homechart',
					flex: 1,
					style: {
						'background-color': '#f1f3f2'
					}
				},
				{
	                //xtype: 'toolbar',
	                //docked: 'bottom',  
	                xtype: 'container', 
	                layout: {
	                	type:'hbox',
	                	align: 'center'	
	                },      
	                height: 105,
	                defaults: {
	                	xtype: 'container',
	                	layout: {
	                		type: 'vbox',
	                		pack: 'center',
	                		align: 'center'
	                	},
	                	flex: 1,
	                	height: '100%',
	                	style: {
	                		'border-top': '1px solid #e5e5e5',
	                		'border-right': '1px solid #e5e5e5'
	                	}
	                },
	                items:[
	                	{
	                		cls: 'label-income',
	                		items:[
	                			{
	                				xtype: 'label',
	                				html: '20 trieu'
	                			},
	                			{
	                				xtype: 'label',
	                				html: 'Tong thu',
	                				cls: 'label-expense-title'
	                			},
	                			{
	                				xtype: 'image',
	                				src: 'resources/images/income-legend.png',
	                				width: 71,
	                				height: 14,
	                				cls: 'img-expense-legend'
	                			}
	                		]
	                	},
	                	{
	                		cls: 'label-income',
	                		items:[
	                			{
	                				xtype: 'label',
	                				html: '15 trieu'
	                			},
	                			{
	                				xtype: 'label',
	                				html: 'Con lai',
	                				cls: 'label-expense-title'
	                			}
	                			
	                		]
	                	},
	                	{
	                		cls: 'label-outcome',
	                		style: {
		                		'border-top': '1px solid #e5e5e5',
		                		'border-right': '0px solid #e5e5e5'
		                	},
	                		items:[
	                			{
	                				xtype: 'label',
	                				html: '5 trieu'
	                			},
	                			{
	                				xtype: 'label',
	                				html: 'Tong chi',
	                				cls: 'label-expense-title'
	                			},
	                			{
	                				xtype: 'image',
	                				src: 'resources/images/outcome-legend.png',
	                				width: 71,
	                				height: 14,
	                				cls: 'img-expense-legend'
	                			}
	                		]
	                	}
	                ]
	            },
				{
	                //xtype: 'toolbar',
	                //docked: 'bottom',  
	                xtype: 'container', 
	                layout: {
	                	type:'hbox',
	                	align: 'center'	
	                },      
	                cls:'viewbase-toolbar-bottom',    
	                items: [
	                	{
	       					xtype: 'spacer',
	       					width: 30
	       				},
	                	{xtype:'spacer'},
	       				{
	       					xtype: 'button',
	       					cls: 'button-icon toolbar-button-add',
	       					title: 'addexpensebutton' 
	       				},
	       				{xtype:'spacer'},
	       				{
	       					xtype: 'button',
	       					cls: 'button-icon toolbar-button-viewtype' 
	       				}
	                ]
	            }
			]
		}]
	},

	initialize : function() {
		var me = this;
		me.callParent(arguments);

		//MyApp.app.on('expense_changed', me.onExpenseChanged, me);
		//MyApp.app.on('thuchi_changed', me.onThuChiChanged, me);
	}/*,
	 onThuChiChanged: function(thu, chi) {
	 var me = this;
	 if (!me._thuLbl) me._thuLbl = me.down('label[title="thulbl"]');
	 if (!me._chiLbl) me._chiLbl = me.down('label[title="chilbl"]');
	 if (!me._soduLbl) me._soduLbl = me.down('label[title="sodulbl"]');
	 if (!me._chiDiv) me._chiDiv = Ext.get('home_tongchi');

	 me._thuLbl.setHtml('(+) ' + AppUtil.formatShortMoney(thu));
	 me._chiLbl.setHtml('(-) ' +AppUtil.formatShortMoney(chi));
	 me._soduLbl.setHtml('(=) ' + AppUtil.formatShortMoney(thu - chi));

	 if (thu == 0) thu = 1;
	 var percent = Math.round(chi*100/thu);
	 me._chiDiv.setWidth(percent + '%');

	 },
	 onExpenseChanged: function(date) {
	 var me = this;
	 if (date.sameMonthWith(new Date()))
	 me.showHomeChart();
	 },

	 showHomeChart: function() {
	 var me = this;
	 if (!me._homeChart) me._homeChart = me.down('tab_home_homechart');
	 me._homeChart.showChart();
	 }*/
});
