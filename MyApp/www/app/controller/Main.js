Ext.define('MyApp.controller.Main', {
    extend: 'Ext.app.Controller',
	requires:[		
		
	],
    config: {
        refs: {		
			main: 'main',
			mainPanel: 'main carousel',
			mainSegmentedButton: 'main segmentedbutton'
        },//end refs
        control: {
			main: {
				initialize: function() {			
					var me = this;		
					
				}
			},
			
			'main segmentedbutton': {
				toggle: function(segmentbutton, button, pressed){
					
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
			'main carousel': {
				activeitemchange: function(carousel, value, oldValue, eOpts ) {
					//console.log(arguments);
					var me = this;
					var sb = me.getMainSegmentedButton();
					sb.setPressedButtons(carousel.activeIndex);
				}
			}
		}
    },
	
	onToggleMenu:function(){
		Ext.Viewport.toggleMenu("left");		
	}
});