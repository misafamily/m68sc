Ext.define('MyApp.store.Hunters', {
    extend: 'Ext.data.Store',
    config: {
        model: 'MyApp.model.Hunter',
        autoLoad:false,
        autoSync:false
    }
});