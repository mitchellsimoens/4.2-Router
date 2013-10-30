Ext.Loader.setPath({
    'Ext.app.route' : 'Ux/app/route',
    'Override'      : 'overrides'
});

Ext.application({
    name : 'Router',

    requires : [
        'Ext.tab.Panel',
        'Ext.window.MessageBox',

        'Override.app.Application',
        'Override.util.History'
    ],

    controllers : [
        'Navigation'
    ],

    defaultToken : 'main-tabs',

    launch : function() {

        Ext.create('Ext.tab.Panel', {
            renderTo  : Ext.getBody(),
            id        : 'main-tabs',
            height    : 300,
            width     : 600,
            activeTab : 0,
            defaults  : {
                padding : 10
            },
            items     : [
                {
                    title  : 'Tab 1',
                    id     : 'tab1',
                    layout : 'fit',
                    items  : [
                        {
                            xtype : 'tabpanel',
                            id    : 'tab6',
                            items : [
                                {
                                    title : 'Sub-tab 1',
                                    id    : 'subtab1'
                                },
                                {
                                    title : 'Sub-tab 2',
                                    id    : 'subtab2'
                                },
                                {
                                    title : 'Sub-tab 3',
                                    id    : 'subtab3'
                                }
                            ]
                        }
                    ]
                },
                {
                    title : 'Tab 2',
                    id    : 'tab2',
                    html  : 'Tab 2 content'
                },
                {
                    title : 'Tab 3',
                    id    : 'tab3',
                    html  : 'Tab 3 content'
                },
                {
                    title : 'Tab 4',
                    id    : 'tab4',
                    html  : 'Tab 4 content'
                },
                {
                    title : 'Tab 5',
                    id    : 'tab5',
                    html  : 'Tab 5 content'
                }
            ]
        });

    }
});
