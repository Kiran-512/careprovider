package com.careprovider.utils;

import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface StorageService {
	String store(MultipartFile file);

	Resource load(String fileName);
}
