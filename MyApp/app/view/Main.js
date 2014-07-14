Ext.define('MyApp.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
		'Ext.form.Panel',
		'Ext.Button',
		'Ext.field.Email',
		'Ext.field.Password'
    ],
    config: {
        tabBarPosition: 'bottom',
		
		
        items: [
            {
                title: 'Home',
                iconCls: 'home',

                styleHtmlContent: true,
                scrollable: true,
				
				xtype: 'formpanel',
				id: 'login_form',
				layout: 'vbox',
				items: [
						{
							docked: 'top',
							xtype: 'titlebar',
							title: 'Online Gallery'
						},
						{
							xtype: 'emailfield',
							id: 'login_email',
							name: 'login_email',
							label: 'Email',
							required: true
						},
						{
							xtype: 'passwordfield',
							id: 'login_password',
							name: 'login_password',
							label: 'Password',
							required: true
						},
						{
							xtype: 'button',
							text: 'Login',
							style: 'margin-top:4px; margin-left:4px; margin-right:4px;',
							handler: function() {
								var app = MyApp.app;
								app.getController('Main').login_tap();
                            }
						}
				]
            },
            {
                title: 'Register',
                iconCls: 'action',

                styleHtmlContent: true,
                scrollable: true,
				
				layout: 'vbox',
				items: [
						{
							docked: 'top',
							xtype: 'titlebar',
							title: 'Register'
						},
						{
							xtype: 'emailfield',
							id: 'reg_email',
							name: 'reg_email',
							label: 'Email',
							required: true
						},
						{
							xtype: 'passwordfield',
							id: 'reg_password',
							name: 'reg_password',
							label: 'Password',
							required: true
						},
						{
							xtype: 'button',
							text: 'Login',
							style: 'margin-top:4px; margin-left:4px; margin-right:4px;',
							handler: function() {
								var app = MyApp.app;
								app.getController('Main').register_tap();
							}
						}
				]
            }
        ]
    }
});
