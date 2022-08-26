package am.alanmiste.spacegeekscorner.sgc;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class AuthenticationIntegrationTest {
    @Autowired
    MockMvc mockMvc;

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
}
