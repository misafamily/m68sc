/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.application({
    name: 'MyApp',

    requires : ['MyApp.override.picker.Date', 'MyApp.util.AppUtil', 'MyApp.util.offline.Connection', 'MyApp.util.offline.Proxy', 'MyApp.util.offline.PagingLocalStorageProxy', 'MyApp.util.offline.Data'],
    
    controllers: ['Main','Home'],

    views: [
        'Main'
    ],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        // Destroy the #appLoadingIndicator element
       
		
		if(!AppUtil.runningDevice()){
			this.onDeviceReady();
		}else{
			document.addEventListener("deviceready", this.onDeviceReady, false);
		}
        // Initialize the main view
       
    },
	
	onDeviceReady: function() {
		 Ext.fly('appLoadingIndicator').destroy();	
		 Ext.Viewport.add(Ext.create('MyApp.view.Main'));
		 
		 //return;banner height: 48px
		 if( window.plugins && window.plugins.AdMob ) {
		    var admob_ios_key = 'ca-app-pub-2676331971568981/2132554150';
		    var admob_android_key = 'ca-app-pub-2676331971568981/2132554150';
		    var adId = (navigator.userAgent.indexOf('Android') >=0) ? admob_android_key : admob_ios_key;
		    var am = window.plugins.AdMob;
		
		    am.createBannerView( 
		        {
		        'publisherId': adId,
		        'adSize': am.AD_SIZE.BANNER,
		        'bannerAtTop': false
		        }, 
		        function() {
		        	Ext.defer(function(){
		        		am.requestAd(
			                { 'isTesting':true }, 
			                function(){
			                    am.showAd( true );
			                }, 
			                function(){ alert('failed to request ad'); }
			            );
		        	},2000);
		            
		        }, 
		        function(){ alert('failed to create banner view'); }
		    );
		} else {
		  //alert('AdMob plugin not available/ready.');
		}
	}/*,
	
    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }*/
});
