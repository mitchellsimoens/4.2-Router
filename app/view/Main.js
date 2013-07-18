Ext.define('Router.view.Main', {
    extend : 'Ext.container.Container',
    xtype  : 'router-main',

    requires : [
        'Ext.tab.Panel',
        'Ext.layout.container.Border',

        'Router.view.User'
    ],

    layout : {
        type : 'border'
    },

    items : [
        {
            region : 'west',
            xtype  : 'panel',
            title  : 'west',
            width  : 150
        },
        {
            region : 'center',
            xtype  : 'tabpanel',
            items  : [
                {
                    title : 'Center Tab 1'
                }
            ]
        }
    ]
});