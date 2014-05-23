Ext.define('MyApp.view.comp.PathMenu',{
    extend: 'Ext.Container',
    xtype: 'comp_pathmenu',
    config: {
        cls: 'x-pathmenu',
        layout: {
            type: 'vbox',
            align: 'start',
            pack: 'start'
        },
        items: [{
            xtype: 'container',
            cls: 'x-pathmenu-body',
            defaults: {
            	xtype: 'button'	
            },
            items: [{
                ui: 'path',
                itemId: 'main-button',
                text: '+'
            },{
				iconCls: 'button-icon toolbar-button-done3'
			},{
				iconCls: 'button-icon toolbar-button-done3'
			},{
				iconCls: 'button-icon toolbar-button-done3'
			},{
				iconCls: 'button-icon toolbar-button-done3'
			},{
				iconCls: 'button-icon toolbar-button-done3'
			},{
				iconCls: 'button-icon toolbar-button-done3'
			}]
        }]
    },
    
    initialize: function() {
        var me = this,
            btnPath = me.down('button[ui=path]');
        
        btnPath.on('tap', me.onPathBtnTap, me);
        me.callParent(arguments);
    },
    
    onPathBtnTap: function(btn) {
        var pressedCls = Ext.baseCSSPrefix + 'button-pressed';
        
        btn.pressed = !btn.pressed;
        
        if (btn.pressed) {
            btn.addCls(pressedCls);
            this.fanOut();
        }
        else {
            btn.removeCls(pressedCls);
            this.fanIn();
        }
    },
    
    fanOut:  function() {
        this.getComponent(0).items.each(this.fanOutItem, this);
    },
    
    fanIn:  function() {
        this.getComponent(0).items.each(this.fanInItem, this);
    },
    
    //@private
    fanOutItem: function(item, index, len) {
        var angle, rad, sin, cos, x, y, style, difCenter,
            arc     = 90,
            distance= 150;
        
        //ignore main button
        if (index === 0) {
            return;
        }
        index--;
        len--;
        
        //calculate angle using items count
        if (len === 1) {
            angle = 0;
        }
        else {
            angle = (arc/(len-1)) * index;
        }
        
        //transform angle to rad
        rad = angle * Math.PI/180;
        
        //calculate cos and sin
        cos = Math.cos(rad);
        sin = Math.sin(rad);
        
        //find x,y using distance
        x = Math.ceil(distance * cos);
        y = Math.ceil(distance * sin * -1);
        
        style = {
            '-webkit-transition-delay': (30 * index) + 'ms',
            '-webkit-transform': 'translate3d('+x+'px, '+y+'px, 0)'
        };
        
        if (!item.rendered) {
            item.style = style;
        }
        else {
            item.element.applyStyles(style);
        }
    },
    
    //@private
    fanInItem: function(item, index, len) {
        //ignore main button
        if (index === 0) {
            return;
        }
        
        var style = {
            '-webkit-transition-delay': (30 * index) + 'ms',
            '-webkit-transform': 'translate3d(0px, 0px, 0)'
        };
        
        if (!item.rendered) {
            item.style = style;
        }
        else {
            item.element.applyStyles(style);
        }
    }
});