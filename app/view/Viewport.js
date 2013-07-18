Ext.define('Router.view.Viewport', {
    extend : 'Ext.container.Viewport',
    xtype  : 'router-viewport',

    requires : [
        'Ext.layout.container.Fit',
        'Router.view.Main'
    ],

    layout : {
        type : 'fit'
    },

    items : [
        {
            xtype : 'router-main'
        }
    ]
});
