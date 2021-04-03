package com.project.cooksistant.s3;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.util.IOUtils;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import sun.nio.ch.IOUtil;

import javax.annotation.PostConstruct;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

@NoArgsConstructor
@Service
public class S3Uploader {
    public static final String CLOUD_FRONT_DOMAIN_NAME = "d19e6vx92ogal.cloudfront.net.";
    private AmazonS3 s3Client;

    @Value("${cloud.aws.credentials.accessKey}")
    private String accessKey;
    @Value("${cloud.aws.credentials.secretKey}")
    private String secretKey;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.region.static}")
    private String region;

    @PostConstruct
    public void setS3Client() {
        AWSCredentials credentials = new BasicAWSCredentials(this.accessKey, this.secretKey);

        s3Client = AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .withRegion(this.region)
                .build();
    }

    public String upload(String currentFilePath, MultipartFile file, Long recipeId) throws IOException {
        SimpleDateFormat date = new SimpleDateFormat("yyyymmddHHmmss");
        String fileName = file.getOriginalFilename() + "-" + date.format(new Date());

        if (!"".equals(currentFilePath) && currentFilePath != null) {
            boolean isExistObject = s3Client.doesObjectExist(bucket, currentFilePath);

            if (isExistObject) {
                s3Client.deleteObject(bucket, currentFilePath);
            }
        }

        System.out.println(fileName);
        byte[] bytes = IOUtils.toByteArray(file.getInputStream());
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(bytes.length);
        ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(bytes);
        s3Client.putObject(new PutObjectRequest(bucket, fileName, byteArrayInputStream, null)
                .withCannedAcl(CannedAccessControlList.PublicRead));
        return fileName;
    }

    public String uploadStep(String currentFilePath, MultipartFile file, Long stepId) throws IOException {
        SimpleDateFormat date = new SimpleDateFormat("yyyymmddHHmmss");
        String fileName = file.getOriginalFilename() + "-" + date.format(new Date());

        if (!"".equals(currentFilePath) && currentFilePath != null) {
            boolean isExistObject = s3Client.doesObjectExist(bucket + "/step", currentFilePath);

            if (isExistObject) {
                s3Client.deleteObject(bucket + "/step", currentFilePath);
            }
        }
        s3Client.putObject(new PutObjectRequest(bucket + "/step", fileName, file.getInputStream(), null)
                .withCannedAcl(CannedAccessControlList.PublicRead));
        return fileName;
    }
}
