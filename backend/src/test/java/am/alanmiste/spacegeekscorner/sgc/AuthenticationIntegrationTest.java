package am.alanmiste.spacegeekscorner.sgc;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.request.RequestPostProcessor;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class AuthenticationIntegrationTest {
    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @Test
    void unauthorized() throws Exception {
        mockMvc.perform(get("/api/users"))
                .andExpect(status().is4xxClientError());
    }

    @Test
    @WithMockUser(username = "username")
    void loinTestWithUsername() throws Exception {
        mockMvc.perform(get("/api/users/login"))
                .andExpect(content().string("username"));
    }

    @Test
    @WithMockUser(username = "username")
    void meTestWithUsername() throws Exception {
        mockMvc.perform(get("/api/users/me"))
                .andExpect(status().isOk())
                .andExpect(content().string("username"));
    }

    @Test
    void logoutTest() throws Exception {
        mockMvc.perform(get("/api/users/logout"))
                .andExpect(status().isOk());
    }

    protected RequestPostProcessor testUser() {
        return user("user").password("userPass").roles("USER");
    }

    @Test
    void listusers() throws Exception {
        mockMvc.perform(get("/api/users/listusers"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                        """));
    }

    @DirtiesContext
    @Test
    void register() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                { "username": "testuser",
                                "password": "password"}
                                """).with(testUser()).with(csrf())

                ).andExpect(status().is(201))
                .andExpect(content().string("testuser"));
    }

    @DirtiesContext
    @Test
    void deleteUserTestExistedUser() throws Exception {
        String savedResult = mockMvc.perform(MockMvcRequestBuilders.post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                { "username": "testuser",
                                "password": "password"}
                                """).with(testUser()).with(csrf())
                ).andReturn()
                .getResponse()
                .getContentAsString();


        mockMvc.perform(MockMvcRequestBuilders.delete("http://localhost:8080/api/users/" + savedResult)
                        .with(testUser()).with(csrf()))
                .andExpect(status().isNoContent());

        mockMvc.perform(MockMvcRequestBuilders.get("http://localhost:8080/api/users/listusers"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                        """));

    }
}
