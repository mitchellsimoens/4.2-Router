Ext.define('Override.util.History', {
    override : 'Ext.util.History',

    getWindow : function() {
        return this.useTopWindow ? window.top : window;
    },

    getHash : function() {
        var win = this.getWindow(),
            href = win.location.href,
            i = href.indexOf("#");

        return i >= 0 ? href.substr(i + 1) : null;
    },

    setHash : function(hash) {
        var win = this.getWindow();

        try {
            win.location.hash = hash;
            this.currentToken = hash;
        } catch ( e ) {
            // IE can give Access Denied (esp. in popup windows)
        }
    },

    updateIFrame : function(token) {
        var html = ''.concat(
                '<html><body><div id="state">',
                Ext.util.Format.htmlEncode(token),
                '</div></body></html>'
            ),
            doc;

        try {
            doc = this.iframe.contentWindow.document;
            doc.open();
            doc.write(html);
            doc.close();
            this.currentToken = token;
            return true;
        } catch ( e ) {
            return false;
        }
    },

    checkIFrame : function() {
        var me = this,
            contentWindow = me.iframe.contentWindow,
            doc, elem, oldToken, oldHash;

        if (!contentWindow || !contentWindow.document) {
            Ext.Function.defer(this.checkIFrame, 10, this);
            return;
        }

        doc = contentWindow.document;
        elem = doc.getElementById("state");
        oldToken = elem ? elem.innerText : null;
        oldHash = me.getHash();

        Ext.TaskManager.start({
            interval : 50,
            scope    : me,
            run      : function() {
                var doc = contentWindow.document,
                    elem = doc.getElementById("state"),
                    newToken = elem ? elem.innerText : null,
                    newHash = me.getHash();

                if (newToken !== oldToken) {
                    oldToken = newToken;
                    me.handleStateChange(newToken);
                    me.setHash(newToken);
                    oldHash = newToken;
                    me.doSave();
                } else if (newHash !== oldHash) {
                    oldHash = newHash;
                    me.updateIFrame(newHash);
                }
            }
        });
        me.ready = true;
        me.fireEvent('ready', me);
    },

    startUp : function() {
        var me = this,
            hash;

        me.currentToken = me.hiddenField.value || this.getHash();

        if (me.oldIEMode) {
            me.checkIFrame();
        } else {
            hash = me.getHash();
            Ext.TaskManager.start({
                interval : 50,
                scope    : me,
                run      : function() {
                    var newHash = me.getHash();
                    if (newHash !== hash) {
                        hash = newHash;
                        me.handleStateChange(hash);
                        me.doSave();
                    }
                }
            });
            me.ready = true;
            me.fireEvent('ready', me);
        }

    }
});