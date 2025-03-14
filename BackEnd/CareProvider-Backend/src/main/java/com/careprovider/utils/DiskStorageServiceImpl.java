package com.careprovider.utils;

import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import javax.annotation.PostConstruct;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

@Component
public class DiskStorageServiceImpl implements StorageService {

	private String BASEPATH;

	public DiskStorageServiceImpl(FileUploadProperties fileUploadProperties) {

		this.BASEPATH = Paths.get(fileUploadProperties.getLocation()).toAbsolutePath().normalize().toString();

	}

	@PostConstruct
	public void init() {
		// TODO Auto-generated method stub
		try {
			File file = new File(BASEPATH);
			System.err.println(BASEPATH);
			if (file.mkdirs()) {
				System.out.println("Directory created");
			}
		} catch (Exception ex) {
			System.err.println("Could not create upload dir! " + ex.getMessage());
		}
	}

	@Override
	public String store(MultipartFile file) {

		try {

			String ext = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
			String fileName = UUID.randomUUID().toString().replaceAll("-", "") + ext;
			File filePath = new File(BASEPATH, fileName);
			FileOutputStream out = new FileOutputStream(filePath); 
				FileCopyUtils.copy(file.getInputStream(), out);
				return fileName;
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public Resource load(String fileName) {
		File filePath = new File(BASEPATH, fileName);
		if (filePath.exists())
			return new FileSystemResource(filePath);
		return null;
	}

}
