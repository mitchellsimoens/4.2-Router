Ext.define('Override.Class', {
    requires : 'Ext.Class'
}, function() {
    Ext.Class.getConfigNameMap = function(name) {
        var cache = this.configNameCache,
            map = cache[name],
            capitalizedName;

        if (!map) {
            capitalizedName = name.charAt(0).toUpperCase() + name.substr(1);

            map = cache[name] = {
                internal    : '_' + name,  //OVERRIDE HERE TO ADD A PREFIXED _ or else will overwrite the control method
                initialized : '_is' + capitalizedName + 'Initialized',
                apply       : 'apply' + capitalizedName,
                update      : 'update' + capitalizedName,
                'set'       : 'set' + capitalizedName,
                'get'       : 'get' + capitalizedName,
                doSet       : 'doSet' + capitalizedName,
                changeEvent : name.toLowerCase() + 'change'
            };
        }

        return map;
    };
});