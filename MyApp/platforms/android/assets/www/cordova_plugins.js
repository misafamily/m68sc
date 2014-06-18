cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.rjfun.cordova.plugin.admob/www/AdMob.js",
        "id": "com.rjfun.cordova.plugin.admob.AdMob",
        "clobbers": [
            "window.plugins.AdMob"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.google.playservices": "16.0.0",
    "com.rjfun.cordova.plugin.admob": "1.1"
}
// BOTTOM OF METADATA
});