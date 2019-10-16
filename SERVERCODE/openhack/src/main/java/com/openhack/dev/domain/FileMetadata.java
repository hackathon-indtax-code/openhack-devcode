package com.openhack.dev.domain;

import java.util.Date;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "fileMetadata")
@Getter
@Setter
@NoArgsConstructor
public class FileMetadata {

	@Id
	private long id;
	private String jsonData;
	private String fileName;

	@CreatedDate
	private Date createdDate;

	@LastModifiedDate
	private Date updatedDate;

	private String validateStatus;

}
