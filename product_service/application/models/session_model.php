<?php

class session_model extends CI_Model 
{   	
	var $session_id		= '';	//varchar(40)
	var $ip_address		= '';	//varchar(16)
	var $user_agent		= '';	//varchar(120)
	var $last_activity	= '';	//int(10)
	var $user_data		= '';	//text

    function __construct()
    {
        // Call the Model constructor
        parent::__construct();
    }
    
    function get_last_ten_entries()	// Get last 10 sessions from db
    {
        $query = $this->db->get('ci_sessions', 100);
        return $query->result_array();
    }    

    function insert_entry()	// Insert a session in db
    {        
		$this->session_id	 	= $_POST['session_id'];
		$this->ip_address	 	= $_POST['ip_address'];
		$this->user_agent		= $_POST['user_agent'];
		$this->last_activity	= $_POST['last_activity'];
		$this->user_data		= $_POST['user_data'];

        $this->db->insert('ci_sessions', $this);
        
        if ($this->db->affected_rows()) {return true;}
        else 							{return false;}
    }
    
    function delete_entry($session_id)	// Delete a session from db
    {
		$this->db->delete('ci_sessions', array('session_id' => $session_id)); 
	}	

    function update_entry()	// Update a session in db
    {        
		$this->session_id	 		= $_POST['session_id'];
		$this->ip_address	 		= $_POST['ip_address'];
		$this->user_agent			= $_POST['user_agent'];
		$this->last_activity		= $_POST['last_activity'];
		$this->user_data			= $_POST['user_data'];

        $this->db->update('ci_sessions', $this, array('session_id' => $_POST['session_id']));
    }
    
    function delete_entry_by_session_id($session_id)	// Delete a session from db w.r.t. session_id
    {	
		$this->db->delete('ci_sessions', array('session_id' => $session_id)); 
	}
	
	function is_session($session_id='NULL')	// Check session_id when it is matched from db
    {
		$this->db->select('user_data');
		$this->db->where('session_id', $session_id); 
		$this->db->from('ci_sessions');		
		$count = $this->db->count_all_results();
		
		return $count;
	}
	
	function get_user_data($session_id='NULL')	// Get user_data
    {
		$this->db->select('user_data');
		$this->db->where('session_id', $session_id); 
		$this->db->from('ci_sessions');
		$query = $this->db->get();
		
		return $query->result_array();
	}	

}
