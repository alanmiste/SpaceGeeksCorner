package am.alanmiste.spacegeekscorner.sgc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.tomakehurst.wiremock.junit5.WireMockTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.request.RequestPostProcessor;

import static com.github.tomakehurst.wiremock.client.WireMock.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WireMockTest(httpPort = 1234)
@SpringBootTest
@AutoConfigureMockMvc
class SgcIntegrationTest {
    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @DirtiesContext
    @Test
    void getDataFromNasaApiTest() throws Exception {
        stubFor(get("/")
                .willReturn(aResponse()
                        .withStatus(200)
                        .withBody("""
                                [{ "copyright": null,
                                "date": "2000-02-13",
                                "explanation": "The planet Mercury resembles a moon. Mercury's old surface is heavily cratered like many moons.",
                                "hdurl": "https://apod.nasa.gov/apod/image/0002/merc4_m10_big.gif",
                                "media_type": "image",
                                "service_version": "v1",
                                "title": "Southwest Mercury",
                                "url": "https://apod.nasa.gov/apod/image/0002/merc4_m10.gif"}]
                                """)
                        .withHeader("Content-Type", MediaType.APPLICATION_JSON_VALUE)));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/sgc/nasaapi"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [{ "copyright": null,
                        "date": "2000-02-13",
                        "explanation": "The planet Mercury resembles a moon. Mercury's old surface is heavily cratered like many moons.",
                        "hdurl": "https://apod.nasa.gov/apod/image/0002/merc4_m10_big.gif",
                        "media_type": "image",
                        "service_version": "v1",
                        "title": "Southwest Mercury",
                        "url": "https://apod.nasa.gov/apod/image/0002/merc4_m10.gif"}]
                        """));
    }

    protected RequestPostProcessor testUser() {
        return user("user").password("userPass").roles("USER");
    }

    @DirtiesContext
    @Test
    void addItemTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/sgc")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                { "explanation": "The planet Mercury resembles a moon. Mercury's old surface is heavily cratered like many moons.",
                                "title": "Southwest Mercury",
                                "url": "https://apod.nasa.gov/apod/image/0002/merc4_m10.gif"}
                                """)
                        .with(testUser()).with(csrf())
                ).andExpect(status().is(201))
                .andExpect(content().json("""
                        { "explanation": "The planet Mercury resembles a moon. Mercury's old surface is heavily cratered like many moons.",
                        "title": "Southwest Mercury",
                        "url": "https://apod.nasa.gov/apod/image/0002/merc4_m10.gif"}
                        """));
    }

    @DirtiesContext
    @Test
    void listUserItemsTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/sgc"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                        """));
    }

    @DirtiesContext
    @Test
    void deleteItemDoesNotExist() throws Exception {

        String id = "123";
        mockMvc.perform(MockMvcRequestBuilders.delete("http://localhost:8080/api/sgc/" + id)
                        .with(testUser()).with(csrf()))
                .andExpect(status().is(404))
        ;
    }

    @DirtiesContext
    @Test
    void deleteItem() throws Exception {
        String saveResult = mockMvc.perform(MockMvcRequestBuilders.post(
                                "/api/sgc")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                { "explanation": "The planet Mercury resembles a moon. Mercury's old surface is heavily cratered like many moons.",
                                "title": "Southwest Mercury",
                                "url": "https://apod.nasa.gov/apod/image/0002/merc4_m10.gif"}
                                """).with(testUser()).with(csrf())
                ).andReturn()
                .getResponse()
                .getContentAsString();

        UserItem userItemResult = objectMapper.readValue(saveResult, UserItem.class);
        String id = userItemResult.id();

        mockMvc.perform(MockMvcRequestBuilders.delete("http://localhost:8080/api/sgc/" + id)
                        .with(testUser()).with(csrf()))
                .andExpect(status().is(204));

        mockMvc.perform(MockMvcRequestBuilders.get("http://localhost:8080/api/sgc"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                        """));
    }
}
