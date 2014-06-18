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

    requires : ['MyApp.override.picker.Date', 'MyApp.util.AppUtil', 'MyApp.util.offline.Connection', 'MyApp.util.offline.Proxy', 'MyApp.util.offline.PagingLocalStorageProxy'],
    
    controllers: ['Main'],
    
    models:['Hunter', 'Trade'],
    
    stores:['Hunters', 'Trades', 'InitExpenseData', 'ExpenseTypes'],

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
       
		
		if(!AppUtil.onDevice()){
			this.onDeviceReady();
		}else{
			document.addEventListener("deviceready", this.onDeviceReady, false);
		}
        // Initialize the main view
       
    },
	
	onDeviceReady: function() {

		

		Ext.Date.monthNames = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];
		Ext.Date.dayNames = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
		
		AppUtil.initAppData(function(){
			Ext.fly('appLoadingIndicator').destroy();	
		 	Ext.Viewport.add(Ext.create('MyApp.view.Main'));	
		});



		var onBackKeyDown = function() {
			//alert('onBackKeyDown');
			MyApp.app.fireEvent('backbutton');
		}

		var onResume = function() {
		   setTimeout(function() {
	          // TODO: do your thing!
	          //alert('onResume');
	          MyApp.app.fireEvent('resume');
	        }, 100);
		}

		var onPause = function() {
			//MyApp.app.fireEvent('pause');
    	}

		document.addEventListener("backbutton", onBackKeyDown, false);
		document.addEventListener("resume", onResume, false);
		document.addEventListener("pause", onPause, false);
		 
		 
		 //return;banner height: 48px
		 if( window.plugins && window.plugins.AdMob ) {
		    var admob_ios_key = 'ca-app-pub-2676331971568981/2132554150';
		    var admob_android_key = 'ca-app-pub-2676331971568981/2132554150';
		    var adId = (navigator.userAgent.indexOf('Android') >=0) ? admob_android_key : admob_ios_key;
		    var am = window.plugins.AdMob;
		
		    am.createBannerView( 
		        {
		        'publisherId': adId,
		        'adSize': am.AD_SIZE.SMART_BANNER,//SMART_BANNER,//BANNER
		        'bannerAtTop': false
		        }, 
		        function() {
		        	Ext.defer(function(){
		        		am.requestAd(
			                { 'isTesting':false }, 
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
	adjustResize
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
