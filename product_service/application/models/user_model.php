<?php

class user_model extends CI_Model {

	 var $user_id	= ''; //	int(11)
	 var $email   	= ''; //	varchar(255)
	 var $password  = ''; //	varchar(255)	
	 
    function __construct()
    {
        // Call the Model constructor
        parent::__construct();
    }
    
    function get_last_ten_entries()
    {
        $query = $this->db->get('users', 10);
        return $query->result_array();
    }
	
	function get_all_entries()
    {
        $query = $this->db->get('users');
        return $query->result_array();
    }
		
	function login()
    {
		$this->db->where('email',$_POST['email']);
		$this->db->where('password', md5($_POST['password']));
		$query = $this->db->get('users');
		
		return $query->result_array();
    }
    function register_entry()
    {
        $this->user_id   	= '';
		$this->email 		= $_POST['email'];
		$this->password 	= md5($_POST['password']);		
		$this->db->insert('users', $this);
		
		return $this->db->insert_id();
    }
	
	function check_email()
	{
		$email 	= $_POST['email'];
		$radio_q= "SELECT * FROM users WHERE email='$email'";
		$query 	= $this->db->query($radio_q);
		
		return $query->result_array();
	}
	
	function get_user_id($email)
	{
		$this->db->select('user_id');
		$this->db->where('email', $email);
		$query = $this->db->get('users');
		
		if ($query->num_rows() > 0)
		{
			$row = $query->row(); 
			return $row->user_id;
		}
		else
		{
			return 0;
		}
	}
	
    function update_entry()
    { 
		$this->email 	= $_POST['email'];
		$this->password = $_POST['password'];

        $this->db->update('users', $this, array('user_id' => $_POST['id']));
    }
}