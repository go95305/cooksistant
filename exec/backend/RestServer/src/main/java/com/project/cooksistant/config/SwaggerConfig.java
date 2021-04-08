package com.project.cooksistant.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
    public Docket api(){
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(swaggerInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.project.cooksistant.controller"))
                .paths(PathSelectors.any()).build();
    }

    private ApiInfo swaggerInfo() {
        return new ApiInfoBuilder()
                .title("Recipe API Documnentation")
                .description(
                        "Recipe Resource API 문서입니다!")
                .version("0.2")
                .build();

    }

}
