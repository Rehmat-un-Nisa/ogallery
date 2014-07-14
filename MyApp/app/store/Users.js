Ext.define("MyApp.store.Users", {
    extend: "Ext.data.Store",
	xtype:'users',
	requires:['Ext.data.proxy.LocalStorage'],
	
	config: {
		fields:['email', 'token'],
		storeId:'theUsers',
		autoLoad:true,
		proxy:{
			type:'localstorage',
			id:'idUsers',
			reader: {
				type: 'json'
			}
		}
	}
	
});