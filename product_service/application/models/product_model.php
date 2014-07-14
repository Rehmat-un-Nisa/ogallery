<?php

class product_model extends CI_Model {

	 var $product_id	   	= ''; //	int(11)
	 var $product_image   	= ''; //	varchar(255)
	 var $user_id   		= ''; //	int(11)
	 
    function __construct()
    {
        // Call the Model constructor
        parent::__construct();
    }
      
    function insert_entry($user_id)
    {
        $this->product_id   = ''; // please read the below note
        $this->product_image= $_POST['product_image'];
		$this->user_id   	= $user_id;		
        $this->db->insert('products', $this);
		
		return $this->db->insert_id();
    }
	
	function get_all_products($user_id)
	{ 
		$this->db->select('product_id, product_image');
		$this->db->where('user_id', $user_id);
		$query = $this->db->get('products');
		
		return $query->result_array();
	}
	
}