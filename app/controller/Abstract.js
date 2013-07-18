Ext.define('Router.controller.Abstract', {
    extend : 'Ext.app.Controller',

    requires : [
        'Override.Class',
        'Override.app.Controller'
    ],

    config : {
        //need to have all these here for the initConfig in the constructor
        control : null,
        listen  : null,
        refs    : null,
        routes  : null,
        before  : null   //compat with ST2 (preferred to use before in routes object)
    },

    constructor : function(config) {
        this.eventbus = Ext.app.EventBus; //need to have assigned before all the setters get called in initConfig
        this.initConfig(config);

        this.callParent([config]);
    }
});