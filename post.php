<?php
	// test data
		if ($data = file_get_contents("php://input")) {
			$obj = json_decode($data);
			header('Content-type: application/json');
			if ($obj->list == true) {
				// testing ticket list
				$response = array(  "requestid" => $obj->requestid,
									"success" => true,
									"data" => array(
										"tickets" => array(
											"B123",
											"K544",
											"X987"
										)
									)
								 );
			} else if ($obj->subscribe == true) {
				// testing error messages
				$response = array(  "requestid" => $obj->requestid,
									"success" => false,
									"message" => "Database error!"
								 );
			} else {
				// everything else works fine
				$response = array(  "requestid" => $obj->requestid,
									"success" => true);
			}
			echo json_encode($response, JSON_NUMERIC_CHECK);
		} else {
			echo "No POST data received";
		}
?>
