Ext.define('MyApp.view.Member', {
    extend: 'Ext.tab.Panel',
    xtype: 'member',
    requires: [
        'Ext.TitleBar',
		'Ext.form.Panel',
		'Ext.Button',
		'Ext.field.Email',
		'Ext.field.Password',
		'Ext.Label',
		'Ext.Img',
		'MyApp.view.Gallery'
    ],
    config: {
        tabBarPosition: 'bottom',
		
        items: [
            {
                title: 'Upload',
                iconCls: 'home',

                styleHtmlContent: true,
                scrollable: true,
				
				xtype: 'formpanel',
				id: 'product_upload_form',
				layout: {
					type: 'vbox',
					align: 'center'
				},
				items: [
						{
							docked: 'top',
							xtype: 'titlebar',
							title: 'Product Upload',
							items : [{
										text : 'Logout',
										align : 'right',
										handler: function() {
											var app = MyApp.app;
											app.getController('Main').logout_tap();
										}
									}]
						},
						{
							xtype: 'label',
							html: 'First Step'
						},
						{
							xtype: 'button',
							id: 'product_photo',
							text: 'Take Product Photo',
							handler: function(button, event) {
								var app = MyApp.app;
								app.getController('Main').product_photo_tap();
                            }
						},
						{
							xtype: 'label',
							html: '<br/>Second Step'
						},
						{
							xtype: 'button',
							id: 'scan_barcode',
							text: 'Scan barcode',
							disabled: true,
							handler: function(button, event) {
								var app = MyApp.app;
								app.getController('Main').scan_barcode_tap();
                            }
						},
						{
							xtype: 'label',
							html: '<br/>Third Step'
						},
						{
							xtype: 'button',
							disabled: true,
							id: 'upload_product',
							text: 'Upload Product',
							handler: function(button, event) {
								var app = MyApp.app;
								app.getController('Main').upload_product_tap();
							}
						}
				]
            },
            {
                title: 'View',
                iconCls: 'action',

                styleHtmlContent: true,
                scrollable: true,
				
				layout: 'fit',
				items: [
						{
							docked: 'top',
							xtype: 'titlebar',
							title: 'View Product(s)',
							items : [{
										text : 'Logout',
										align : 'right',
										handler: function() {
											var app = MyApp.app;
											app.getController('Main').logout_tap();
										}
									}]
						},
						{
							xtype : 'gallery'
						}
				]
            }
        ]
    }
});
