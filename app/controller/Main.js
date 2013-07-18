Ext.define('Router.controller.Main', {
    extend : 'Router.controller.Abstract',

    config : {
        refs   : {
            viewport     : 'router-viewport',
            mainTabPanel : 'router-main > tabpanel'
        },
        routes : {
            'user/:id' : {
                action     : 'showUser',
                before     : 'beforeShowUser',
                conditions : {
                    ':id' : '([0-9]+)'
                }
            }
        }
    },

    beforeShowUser : function(id, action) {
        var me       = this,
            tabpanel = me.getMainTabPanel(),
            tab      = tabpanel.child('router-user[userid=' + id + ']');

        if (tab) {
            //if a tab exists, allow action to execute right away
            action.resume();
        } else {
            //if no tab, simulate ajax call to return data then execute action
            setTimeout(function() {
                action.resume();
            }, 500);
        }
    },

    showUser : function(id) {
        var me       = this,
            tabpanel = me.getMainTabPanel(),
            tab      = tabpanel.child('router-user[userid=' + id + ']');

        if (!tab) {
            tab = tabpanel.add({
                xtype  : 'router-user',
                userid : id,
                title  : 'User Details: ' + id
            });
        }

        tabpanel.setActiveTab(tab);
    }
});
