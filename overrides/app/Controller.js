Ext.define('Override.app.Controller', {
    override : 'Ext.app.Controller',

    requires : [
        'Ext.app.route.Router'
    ],

    //need to do in extension not overide
    /*config : {
        control : null,
        listen  : null,
        refs    : null,
        routes  : null,
        before  : null
    },*/

    constructor : function(config) {
        var me   = this,
            refs = me.refs;

        //me.initConfig(config); //need to do in extension not override

        me.eventbus = Ext.app.EventBus;

        me.callParent([config]);

        //<debug>
        var routes = me.routes;
        if (routes && !me.getRoutes()) {
            Ext.log.warn('The routes property should be placed within the config object only.');
            me.setRoutes(routes);
        }
        //</debug>

        if (refs && !me.getRefs()) {
            me.refs = null;
            me.setRefs(refs);
        }
    },

    normalizeRefs : function(refs) {
        var me = this,
            newRefs = [];

        if (refs) {
            if (Ext.isObject(refs)) {
                Ext.Object.each(refs, function(key, value) {
                    if (Ext.isString(value)) {
                        value = {
                            selector : value
                        }
                    }

                    value.ref = key;

                    newRefs.push(value);
                });
            } else if (Ext.isArray(refs)) {
                newRefs = Ext.Array.merge(newRefs, refs);
            }
        }

        refs = me.refs;

        if (refs) {
            me.refs = null;

            refs = me.normalizeRefs(refs);

            if (refs) {
                newRefs = Ext.Array.merge(newRefs, refs);
            }
        }

        return newRefs;
    },

    applyRefs : function(refs) {
        return this.normalizeRefs(Ext.clone(refs));
    },

    applyListen : function(listen) {
        if (Ext.isObject(listen)) {
            listen = Ext.clone(listen);
        }

        return listen;
    },

    applyControl : function(control) {
        if (Ext.isObject(control)) {
            control = Ext.clone(control);
        }

        return control;
    },

    updateRefs : function(refs) {
        if (refs) {
            this.ref(refs);
        }
    },

    applyRoutes : function(routes) {
        return Ext.clone(routes);
    },

    updateRoutes : function(routes) {
        if (routes) {
            var me = this,
                befores = me.getBefore() || {},
                Router = Ext.app.route.Router,
                url, config, method;

            for (url in routes) {
                if (routes.hasOwnProperty(url)) {
                    config = routes[url];

                    if (Ext.isString(config)) {
                        config = {
                            action : config
                        };
                    }

                    method = config.action;

                    if (!config.before) {
                        config.before = befores[method];
                    }
                    //<debug>
                    else if (befores[method]) {
                        Ext.log.warn('You have a before method configured on a route ("' + url + '") and in the before object property also in the "' +
                            me.self.getName() + '" controller. Will use the before method in the route and disregard the one in the before property.');
                    }
                    //</debug>

                    //connect the route config to the Router
                    Router.connect(url, config, me);
                }
            }
        }
    },

    updateControl : function(control) {
        if (control) {
            this.control(control);
        }
    },

    updateListen : function(listen) {
        if (listen) {
            this.listen(listen);
        }
    },

    redirectTo : function(token, force) {
        if (!force) {
            var currentToken = Ext.util.History.getToken();

            if (currentToken === token) {
                return false;
            }
        } else {
            Ext.app.route.Router.onStateChange(token);
        }

        Ext.util.History.add(token);

        return true;
    }
});