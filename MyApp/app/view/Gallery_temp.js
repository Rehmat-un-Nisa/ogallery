Ext.define('MyApp.view.Gallery', {
	extend: 'Ext.Container',
	xtype: 'gallery',
	requires : [
		'Ext.data.JsonP'
	],
	
	config: {
		cls : 'gallery',
		scrollable : true,
		showNavigation : true,
		floatingCloseBtn : true,
		
		// Template to show the thumbnail images
		tpl : Ext.create('Ext.XTemplate', 
						'<tpl if="this.isEmpty(products)">',
							'<div class="empty-text empty-gallery">No image available</div>',
						'</tpl>',
						'<div class="gallery" id="photos">',
						'<tpl for="products">',
							'<img src="{product_image}" class="thumbnail" data-fullimage="{product_image}"/>',
						'</tpl>',
						'</div>', 
						{
							isEmpty : function(products){
								if(products.length === 0){
									return true;
								}
								
								return false;
							}
						})
	},
	
	initialize : function(){
		var me = this;
		
		// Add tap event on the images to open the carousel
		/*me.element.on('tap', function(e, el){
			me.showGalleryCarousel(el);												
		}, me, {
			delegate : 'img.thumbnail'
		});*/
		
		me.loadImages();
		me.callParent(arguments);
	},
	
	/**
		* Load the images and add them to the gallery container
		* Here is the point where you have to change the fetching mechanism 
		* say to get data with proxy and save in a Store.
		* Also, you may have to change the   
		*/
	loadImages : function(){
		var me = this;
		
		// Get token from local storage
		var user_store = Ext.getStore('theUsers');
		var user_record = user_store.getAt(0);
		
		var get_photo_url =	MyApp.config.webserviceConstants.config.base_url+
							MyApp.config.webserviceConstants.config.Get_Products;
		
		Ext.data.JsonP.request({
			url: get_photo_url,
			callbackKey: 'callback',
			params: {
				format: 'json',
				token: user_record.data.token
			},
			success: function(response) {
				if (response.products != 'undefined')
				{
					me.add(response.products);
					me.setData(response);
				}
				else
				{
					
				}
			}
		});
	}
	
	/**
	 * Show the gallery carousel with all the images
	 */
	/*showGalleryCarousel : function(clickedImage){
		var me = this,
		clickedImgIndex = 0,
		
		// Create the Gallery Carousel
		galleryCarousel = Ext.Viewport.add({
			xtype : 'gallerycarousel',
			totalCount : me.items.length
		});
		
		// Query all the images and save in an array
		me.images = me.images || me.element.query('img.thumbnail');
		
		// On clicking close icon, hide the carousel 
		// and destroy it after a certain perdiod
		galleryCarousel.element.on('tap', function(e, el){
			galleryCarousel.hide(true);
			
			Ext.defer(function(){
				Ext.Viewport.remove(galleryCarousel);
			}, 300);
		}, this, {
				delegate : 'div[data-action="close_carousel"]'
		});
		
		// Get the image index which is clicked
		while( (clickedImage = clickedImage.previousSibling) != null ) {
						clickedImgIndex++;
		}								
		
		// Add the images as separate containers in the carousel
		for(var i=0; i<me.images.length; i++){
			galleryCarousel.add({
				xtype : 'container',
				html : '<img class="gallery-item" src="' + Ext.get(me.images[i]).getAttribute('data-fullimage') + '" />',
				index : i + 1
			});
		}							
		
		// Set the clicked image container as the active item of the carousel
		galleryCarousel.setActiveItem(clickedImgIndex);
		
		// Show the carousel
		galleryCarousel.show();
	}*/
});
