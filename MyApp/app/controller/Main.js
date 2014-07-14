Ext.define('MyApp.controller.Main', {
    extend: 'Ext.app.Controller',
	
	requires: [
		'Ext.device.Connection',
		'MyApp.view.Member'
	],

    config: {
        refs: {
			member: {
                selector: 'member',
                xtype: 'member',
                autoCreate: true
            },
			login: {
                selector: 'main',
                xtype: 'main',
                autoCreate: true
            }
        }
    },
	
    // Shows member area screen after user login
	view_MemberArea: function() {
		var memberView = this.getMember();
		var mainView = Ext.ComponentQuery.query('main')[0];
		
		Ext.Viewport.remove(mainView);
		Ext.Viewport.add(memberView);
    },
	
	// Shows login screen after user logout
	view_Login: function() {
		var loginView = this.getLogin();
		var memberView = Ext.ComponentQuery.query('member')[0];
		
		Ext.Viewport.add(loginView);
		Ext.Viewport.remove(memberView);
    },
	
	// When a user taps on login button
	login_tap: function(){
		var login_email = Ext.getCmp('login_email').getValue();
		var login_password = Ext.getCmp('login_password').getValue();
		
		var login_url = MyApp.config.webserviceConstants.config.base_url+
						MyApp.config.webserviceConstants.config.Login;
		
		Ext.Ajax.request({
			url: login_url,
			method: 'POST',
			disableCaching: false,
			useDefaultXhrHeader: false,
			params: {
				email: login_email,
				password: login_password
			},
			success: function(response){
				var final_response = Ext.decode(response.responseText);
			
				if (final_response.success)
				{
					// Store user info to local storage
					var user_store = Ext.getStore('theUsers');
					user_store.add({
						email: login_email,
						token: final_response.token
					});
					user_store.sync();
					
					// Navigate to member-area
					var app = MyApp.app;
					app.getController('Main').view_MemberArea();
				}
				else
				{
					// Display error message
					Ext.Msg.alert('Error', final_response.error);
				}
			},
			failure: function(response, opts) {
				Ext.Msg.alert('Error', 'Server-side failure. Is your internet working?');
			}
		});
	},
	
	// When a user taps on register button
	register_tap: function() {
		var reg_email = Ext.getCmp('reg_email').getValue();
		var reg_password = Ext.getCmp('reg_password').getValue();
		
		var reg_url = MyApp.config.webserviceConstants.config.base_url+
					  MyApp.config.webserviceConstants.config.Register;
		
		Ext.Ajax.request({
			url: reg_url,
			method: 'POST',
			disableCaching: false,
			useDefaultXhrHeader: false,
			params: {
				email: reg_email,
				password: reg_password
			},
			success: function(response, opts){
				var final_response = Ext.decode(response.responseText);
				
				if (final_response.success)
				{
					Ext.Msg.alert('Success', 'Your account is registered. Now proceed to login.');
				}
				else
				{
					// Display error message
					Ext.Msg.alert('Error', final_response.error);
				}
			},
			failure: function(response, opts) {
				Ext.Msg.alert('Error', 'Server-side failure. Is your internet working?');
			}
		});
	},
	
	// When a user taps on logout button
	logout_tap: function() {
		// Get token from local storage
		var user_store = Ext.getStore('theUsers');
		var user_record = user_store.getAt(0);
		
		var logout_url =MyApp.config.webserviceConstants.config.base_url+
						MyApp.config.webserviceConstants.config.Logout;
		
		Ext.Ajax.request({
			url: logout_url,
			method: 'POST',
			disableCaching: false,
			useDefaultXhrHeader: false,
			params: {
				token: user_record.data.token
			},
			success: function(response){
				// Delete user info from local storage
				user_store.getProxy().clear();
				user_store.data.clear();
				user_store.sync();
				
				// Navigate to login screen
				var app = MyApp.app;
				app.getController('Main').view_Login();
			},
			failure: function(response, opts) {
				Ext.Msg.alert('Error', 'Server-side failure. Is your internet working?');
			}
		});
	},
	
	// When a user taps on product photo capture button
	product_photo_tap: function() {
		Ext.device.Camera.capture({
			source: 'camera',
			destination: 'file',
			
			success: function(url) {
				//Ext.Msg.alert('Success', url);
				
				// Store image path to local storage
				var image_store = Ext.getStore('theImageQueue');
				image_store.add({
					src: url,
					timestamp: new Date().getTime()
				});
				image_store.sync();
				
				// Enable Scan barcode button
				var scan_barcode = Ext.getCmp('scan_barcode');
				scan_barcode.enable();
				// Disable Product Photo button
				var product_photo = Ext.getCmp('product_photo');
				product_photo.disable();
			},
			failure: function() {
				Ext.Msg.alert('Error', 'There was an error acquiring product photo.');
			}
		});
	},
	
	// When a user taps on barcode scan button
	scan_barcode_tap: function() {
		// Scan barcode of product using BarcodeScanner plugin of Phonegap
		cordova.plugins.barcodeScanner.scan(
			function (result) {
				//Ext.Msg.alert('Success', 'We got a barcode. Result:'+result.text+' Format:'+result.format+' Cancelled:'+result.cancelled);
				
				if(!result.cancelled){
					// Save barcode in local storage
					var image_store = Ext.getStore('theImageQueue');
					var image_record = image_store.getAt(0);
					image_record.set('barcode', result.text);
					image_store.sync();
					
					// Enable Scan barcode button
					var scan_barcode = Ext.getCmp('scan_barcode');
					scan_barcode.disable();
					// Enable Scan barcode button
					var upload_product = Ext.getCmp('upload_product');
					upload_product.enable();
				}
				else
				{
					// Barcode is cancelled by user so we can't proceed to next step
				}
			}, 
			function (error) {
				Ext.Msg.alert('Error', 'Barcode Scanning failed:'+error);
			}
		);
	},
	
	// When a user taps on upload product button
	upload_product_tap: function() {
		// Get token from local storage
		var user_store = Ext.getStore('theUsers');
		var user_record = user_store.getAt(0);
		
		// Get image details from local storage
		var image_store = Ext.getStore('theImageQueue');
		var image_record = image_store.getAt(0);
		
		//Ext.Msg.alert('Success', 'Path:'+image_record.data.src+" Name:"+image_record.data.barcode+".jpg");
		
		var upload_url =MyApp.config.webserviceConstants.config.base_url+
						MyApp.config.webserviceConstants.config.Product_Upload;
		
		// Upload product photo using FileTransfer plugin of Cordova
		var options = new FileUploadOptions();
		options.fileKey="uploaded_file";
		options.fileName=image_record.data.barcode+".jpg";
		options.mimeType="image/jpeg";
		
		var params = {};
		params.token = user_record.data.token;
		options.params = params;

		var ft = new FileTransfer();
		ft.upload(
					image_record.data.src, 
					upload_url, 
					function (r) {
						Ext.Msg.alert('Success', "Product is uploaded.");
						
						// Reset buttons
						var upload_product = Ext.getCmp('upload_product');
						upload_product.disable();
						var product_photo = Ext.getCmp('product_photo');
						product_photo.enable();
						
						// Delete values from local storage
						image_store.remove(image_record);
						image_store.sync();
					}, 
					function (error) {
						Ext.Msg.alert('Error', "Couldn't upload product! Error Code:"+error.code);
					}, 
					options
				);
	}
	
});