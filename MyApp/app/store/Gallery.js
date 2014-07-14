Ext.define("MyApp.store.Gallery", {
    extend: "Ext.data.Store",
	xtype:'gallery',
	requires:['Ext.data.proxy.JsonP'],
	
	config: {
		fields:['products'],
		storeId:'theGallery',
		autoLoad:false,
		
		proxy:{
			type:'jsonp',
			id:'idUsers',
			
			// Dummy URL, it will be overwritten during run-time
			url : 'http://localhost/product_service/index.php/api/product/all_products',
			callbackKey: 'callback',
			
			extraParams: {
				format: 'json',
				token: '123'	// Dummy token, it will be overwritten during run-time
			},
			
			reader: {
				type: 'json'
			}
		}
	}
	
});