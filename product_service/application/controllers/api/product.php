<?php defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class Product extends REST_Controller
{
	function upload_product_post()	// Implement Token
	{
		if($this->post('token'))
		{
			$this->load->model('session_model');
			$count = $this->session_model->is_session($this->post('token'));
			if($count)	// Checking if it is a valid session
			{
				// Upload file to appropriate server location
				$file_path = "uploads/";
				$file_path = $file_path.basename($_FILES['uploaded_file']['name']);
				
				if(move_uploaded_file($_FILES['uploaded_file']['tmp_name'], $file_path)) 
				{
					$_POST['product_image'] = $_FILES['uploaded_file']['name'];
					
					// Get email from session
					$sess_data = $this->session_model->get_user_data($this->post('token'));
					$sess_data = @unserialize(strip_slashes($sess_data[0]['user_data']));
					$email = $sess_data['email'];
				
					// Get userID from database
					$this->load->model("user_model");
					$user_id = $this->user_model->get_user_id($email);
					
					// Insert product to database for specific user ID
					$this->load->model("product_model");
					$product_id  = $this->product_model->insert_entry($user_id);
					
					$response['success'] = 1;
					$response['product_id']= $product_id;
					$this->response($response, 200);
				} 
				else
				{
					$response['success'] = 0;
					$response['error']  = 'Product image could not be uploaded!';
					$this->response($response, 200);
				}
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
	
	
	function all_products_get()	// Implement Token
	{
		if($this->get('token'))
		{
			$this->load->model('session_model');
			$count = $this->session_model->is_session($this->get('token'));
			if($count)	// Checking if it is a valid session
			{
				// Get email from session
				$sess_data = $this->session_model->get_user_data($this->get('token'));
				$sess_data = @unserialize(strip_slashes($sess_data[0]['user_data']));
				$email = $sess_data['email'];
					
				$this->load->model("user_model");
				$user_id = $this->user_model->get_user_id($email);
				
				$this->load->model("product_model");
				$products = $this->product_model->get_all_products($user_id);
				
				// Loop through products to correct image URL
				$new_products = array();
				$count = 0;
				foreach($products as $product)
				{
					$new_products[$count]['product_id']		= $product['product_id'];
					$new_products[$count]['product_image']  = base_url().'/uploads/'.$product['product_image'];
					$count++;
				}
				
				//$response['success'] = 1;
				$response['products']= $new_products;
				$this->response($response, 200);
			}
			else
			{	// Invalid User
				//$response['success'] = 0;
				$response['error'] 	= 'Invalid user.';
				$this->response($response, 200);
			}
		}
		else
		{
			// Invalid User
			//$response['success'] = 0;
			$response['error'] 	= 'Token is missing.';
			$this->response($response, 200);
		}
	}
	
	
}