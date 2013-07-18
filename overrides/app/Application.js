Ext.define('Override.app.Application', {
    override : 'Ext.app.Application',

    //Override to redirect to the hash if one is present at app startup
    onBeforeLaunch : function() {
        this.callParent();

        var History = Ext.util.History,
            token = History.getToken(),
            defaultToken = this.defaultToken;

        if (token) {
            this.redirectTo(token, true);
        } else if (defaultToken) {
            History.add(defaultToken);
        }

        if (!History.ready) {
            History.init();
        }
    }
});