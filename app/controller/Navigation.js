Ext.define('Router.controller.Navigation', {
    extend : 'Router.controller.Abstract',

    config : {
        control : {
            '#main-tabs' : {
                tabchange : 'onTabChange'
            },
            '#tab6'      : {
                tabchange : 'onChildTabChange'
            }
        },
        refs    : {
            tabPanel : '#main-tabs'
        },
        routes  : {
            'main-tabs:id:subid' : {
                action     : 'showTab',
                before     : 'beforeShowTab',
                conditions : {
                    //take control of the :id & :subid parameters, make them optional but delimited by colon
                    ':id'    : '(?:(?::){1}([%a-zA-Z0-9\-\_\s,]+))?',
                    ':subid' : '(?:(?::){1}([%a-zA-Z0-9\-\_\s,]+))?'
                }
            }
        }
    },

    onTabChange : function(tabPanel, newItem) {
        var id    = newItem.getId(),
            child = newItem.child('tabpanel'),
            subid = '',
            hash  = 'main-tabs:' + id;

        if (child) {
            newItem = child.getActiveTab();
            subid   = ':' + newItem.getId();

            hash += subid;
        }

        this.redirectTo(hash);
    },

    onChildTabChange : function(tabPanel, newItem) {
        var parentTab = tabPanel.up(),
            parentId  = parentTab.getId(),
            hash      = 'main-tabs:' + parentId + ':' + newItem.getId();

        this.redirectTo(hash);
    },

    beforeShowTab : function(id, subid, action) {
        var tabPanel = this.getTabPanel(),
            child, bool;

        if (!id) {
            //no id was specified, use 0 index to resolve child
            id = 0;
        }

        child = tabPanel.getComponent(id);

        if (!child) {
            bool = false;

            Ext.Msg.alert('Tab Not Found', 'Tab with id or index "<b>' + id + '</b>" was not found!');
        }

        //continue action execution if child was found, stop if not
        action.resume(bool);
    },

    showTab : function(id, subid) {
        var tabPanel = this.getTabPanel(),
            child, childTabPanel;

        if (!id) {
            //no id was specified, use 0 index to resolve child
            id = 0;
        }

        child         = tabPanel.getComponent(id);
        childTabPanel = child.child('tabpanel');

        tabPanel.setActiveTab(child);

        if (childTabPanel) {
            if (!subid) {
                subid = 0;
            }

            childTabPanel.setActiveTab(subid);
        }
    }
});
