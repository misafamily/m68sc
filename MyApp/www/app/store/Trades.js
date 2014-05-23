Ext.define('MyApp.store.Trades', {
    extend: 'Ext.data.Store',
    config: {
        model: 'MyApp.model.Trade',
        autoLoad:false,
        autoSync:false
    }
});