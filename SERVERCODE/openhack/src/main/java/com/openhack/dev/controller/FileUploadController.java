package com.openhack.dev.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class FileUploadController {

	private static final Logger logger = LoggerFactory.getLogger(FileUploadController.class);

	@PostMapping("/uploadFile")
	public void uploadFile(@RequestParam("file") MultipartFile file) {
	}

	@PostMapping("/uploadMultipleFiles")
	public void uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {
	}

}
