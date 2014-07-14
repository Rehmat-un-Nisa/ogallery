Ext.define('MyApp.config.webserviceConstants', {
    singleton: true,

    config: {
        //base_url: 'http://localhost/product_service/index.php/api/',      // localhost - for Desktop testing
        //base_url: 'http://192.168.0.104/product_service/index.php/api/',  // Local IP Address - for Mobile testing
		//base_url: 'http://192.168.0.100/product_service/index.php/api/',    // Local IP Address2 - for Mobile testing
		base_url: 'http://ogallery.my.phpcloud.com/product_service/index.php/api/', // PHPCloud Hosting

		

        // Login
        Login: 'user/login',
		
        // Logout
		Logout: 'user/logout',
		
		// Register New User
		Register: 'user/register',
		
		// Upload Product
		Product_Upload: 'product/upload_product', 
		
		// Get All Products
		Get_Products: 'product/all_products'

    },

    constructor : function(config){
        this.initConfig(config);
    }
});
