package com.parkinglotsystem.config;

import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.responses.ApiResponse;
import io.swagger.v3.oas.models.responses.ApiResponses;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme.In;
import io.swagger.v3.oas.models.security.SecurityScheme.Type;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@SecurityScheme(
        name = "bearerAuth",
        type = SecuritySchemeType.HTTP,
        scheme = "bearer",
        bearerFormat = "JWT"
)
public class OpenApiConfig {

    @Value("${openapi.title:Microservice API}")
    private String title;

    @Value("${openapi.description:API documentation}")
    private String description;

    @Value("${openapi.version:1.0.0}")
    private String version;

    @Value("${openapi.group:public-api}")
    private String group;

    @Value("${openapi.security.enabled:true}")
    private boolean securityEnabled;

    @Bean
    public OpenAPI customOpenAPI() {
        OpenAPI openAPI = new OpenAPI()
                .info(new Info()
                        .title(title)
                        .description(description)
                        .version(version)
                        .contact(new Contact()
                                .name("Support Team")
                                .email("support@company.com"))
                        .license(new License()
                                .name("Company License")
                                .url("https://company.com")))
                .components(new Components()
                        .addResponses("400", new ApiResponse().description("Bad Request"))
                        .addResponses("401", new ApiResponse().description("Unauthorized"))
                        .addResponses("403", new ApiResponse().description("Forbidden"))
                        .addResponses("404", new ApiResponse().description("Not Found"))
                        .addResponses("500", new ApiResponse().description("Internal Server Error"))
                );

        if (securityEnabled) {
            openAPI.addSecurityItem(new SecurityRequirement().addList("bearerAuth"));
        }

        return openAPI;
    }

    @Bean
    public GroupedOpenApi groupedOpenApi() {
        return GroupedOpenApi.builder()
                .group(group)
                .pathsToMatch("/api/**")
                .build();
    }
}
