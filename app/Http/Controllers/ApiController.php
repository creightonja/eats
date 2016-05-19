<?php

namespace App\Http\Controllers;

class ApiController extends Controller {

	protected $statusCode;
	
	public function getStatusCode()
	{
		return $this->statusCode;
	}

	public function setStatusCode($statusCode)
	{
		$this->statusCode = $statusCode;
		return $this;
	}

	public function respondOk($message = 'Ok')
	{
		return $this->setStatusCode(200)->respondWithData($data);
	}

	public function respondNotFound($message = 'Not Found!')
	{
		return $this->setStatusCode(404)->respondWithError($message);

	}

	public function respondNotAuthorized($message = 'Not Authorized!')
	{
		return $this->setStatusCode(403)->respondWithError($message);

	}

	public function respondInternalError($message = 'Internal Error!')
	{
		return $this->setStatusCode(500)->respondWithError($message);

	}

	public function respond($data, $headers = [])
	{
		return response()->json($data, $this->getStatusCode(), $headers);
	}

	public function respondWithError($message, $headers = [])
	{
		return $this->respond([
			'error' => [
				'message' => $message,
				'status_code' => $this->getStatusCode(),
			]
		]);
	}

	public function respondWithData($data, $headers = [])
	{
		return $this->respond([
			'data' => $data
		]);
	}

}