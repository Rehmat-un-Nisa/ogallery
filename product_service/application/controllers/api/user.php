<?php defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class User extends REST_Controller
{
	function register_post()
    {
		$this->load->model("user_model");		
		$data  = $this->user_model->check_email();
		if(count($data))
		{	// Email address found in database
			$response['success'] = 0;
			$response['error'] 	= 'This email is already registered.';
			$this->response($response, 200);
		}
		else
		{	// Register the new user
			$user_id = $this->user_model->register_entry();
			$response['success'] = 1;
			$response['user_id']= $user_id;
			$this->response($response, 200);
		}
	}
	
	function check_login_status_post()	// Implement Token
	{
		if($this->post('token'))
		{
			$this->load->model('session_model');
			$count = $this->session_model->is_session($this->post('token'));
			if($count)	// Checking if it is a valid session
			{	// Valid User
				$response['success'] = 1;
				$this->response($response, 200);
			}
			else
			{	// Invalid User
				$response['success'] = 0;
				$response['error'] 	= 'Invalid user.';
				$this->response($response, 200);
			}
		}
		else
		{
			// Invalid User
			$response['success'] = 0;
			$response['error'] 	= 'Token is missing.';
			$this->response($response, 200);
		}
	}
		
	function login_post()
    {
		$this->load->model("user_model");
		$data  = $this->user_model->login();
		
		// Set session
		$newdata = array(
                   'email'     => $_POST['email'],
                   'logged_in' => TRUE
               );
		$this->session->set_userdata($newdata);
		$session_id = $this->session->userdata('session_id');
	
		if(count($data))
		{
			// Valid User
			$response['success'] = 1;
			$response['token'] = $session_id;
			$this->response($response, 200);
		}
		else
		{
			// Invalid User
			$response['success'] = 0;
			$response['error'] 	= 'Invalid user.';
			$this->response($response, 200);
		}
	}
	
	function logout_post()	// Implement Token
	{
		if($this->post('token'))
		{
			$this->load->model('session_model');
			$count = $this->session_model->is_session($this->post('token'));
			if($count)	// Checking if it is a valid session
			{
				$this->session_model->delete_entry_by_session_id($this->post('token'));
				
				// Signout Success
				$response['success'] = 1;
				$this->response($response, 200);
			}
			else {
				// Invalid User
				$response['success'] = 0;
				$response['error'] 	= 'Invalid user.';
				$this->response($response, 200);
			}
		}
		else
		{
			// Invalid User
			$response['success'] = 0;
			$response['error'] 	= 'Token is missing.';
			$this->response($response, 200);
		}
	}
}