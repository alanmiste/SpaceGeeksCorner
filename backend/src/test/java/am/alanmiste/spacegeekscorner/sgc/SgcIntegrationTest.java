package am.alanmiste.spacegeekscorner.sgc;

import am.alanmiste.spacegeekscorner.sgc.model.UserItem;
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
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

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

    @DirtiesContext
    @Test
    void makeMockupsTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/sgc/make-mockups")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"image_url":"https://apod.nasa.gov/apod/image/1812/ana03BennuVantuyne1024c.jpg"}
                                """)
                        .with(testUser()).with(csrf())
                        .with((RequestPostProcessor) header())
                ).andExpect(status().is(200))
                .andExpect(content().json("""
                        {
                             "code": 200,
                             "result": {
                                 "task_key": "gt-405891729",
                                 "status": "completed",
                                 "mockups": [
                                     {
                                         "placement": "front",
                                         "variant_ids": [
                                             4017,
                                             4018,
                                             4019
                                         ],
                                         "mockup_url": "https://printful-upload.s3-accelerate.amazonaws.com/tmp/7053e843ed5446a6b9e35dfef1f494f9/unisex-staple-t-shirt-black-front-631e194ce52ef.jpg",
                                         "extra": [
                                             {
                                                 "title": "Front",
                                                 "option": "Front",
                                                 "option_group": "Flat",
                                                 "url": "https://printful-upload.s3-accelerate.amazonaws.com/tmp/f0b67cbc73fc232d35294a5b99a78a27/unisex-staple-t-shirt-black-front-631e194ce727e.jpg"
                                             }
                                         ]
                                     },
                                     {
                                         "placement": "back",
                                         "variant_ids": [
                                             4017,
                                             4018,
                                             4019
                                         ],
                                         "mockup_url": "https://printful-upload.s3-accelerate.amazonaws.com/tmp/28fe897cb588441ddca5c168efd8e285/unisex-staple-t-shirt-black-back-631e194ce7688.jpg",
                                         "extra": [
                                             {
                                                 "title": "Back",
                                                 "option": "Back",
                                                 "option_group": "Flat",
                                                 "url": "https://printful-upload.s3-accelerate.amazonaws.com/tmp/312e3d0e6a0332a091bcd38f261a890d/unisex-staple-t-shirt-black-back-631e194ce7992.jpg"
                                             }
                                         ]
                                     },
                                     {
                                         "placement": "front",
                                         "variant_ids": [
                                             4012,
                                             4013,
                                             4014
                                         ],
                                         "mockup_url": "https://printful-upload.s3-accelerate.amazonaws.com/tmp/de8af8b327c7eba4b20cfb392c8e878e/unisex-staple-t-shirt-white-front-631e194ce7cbc.jpg",
                                         "extra": [
                                             {
                                                 "title": "Front",
                                                 "option": "Front",
                                                 "option_group": "Flat",
                                                 "url": "https://printful-upload.s3-accelerate.amazonaws.com/tmp/6b3d04d73e03217976337ffe8bf06b0a/unisex-staple-t-shirt-white-front-631e194ce83da.jpg"
                                             }
                                         ]
                                     },
                                     {
                                         "placement": "back",
                                         "variant_ids": [
                                             4012,
                                             4013,
                                             4014
                                         ],
                                         "mockup_url": "https://printful-upload.s3-accelerate.amazonaws.com/tmp/597bcbd2ac9510d7f923dd16c11a6223/unisex-staple-t-shirt-white-back-631e194ce8b7f.jpg",
                                         "extra": [
                                             {
                                                 "title": "Back",
                                                 "option": "Back",
                                                 "option_group": "Flat",
                                                 "url": "https://printful-upload.s3-accelerate.amazonaws.com/tmp/9f08d59672d5365dbd98ae4bf6937b33/unisex-staple-t-shirt-white-back-631e194ce927c.jpg"
                                             }
                                         ]
                                     }
                                 ],
                                 "printfiles": [
                                     {
                                         "variant_ids": [
                                             4012,
                                             4013,
                                             4014
                                         ],
                                         "placement": "front",
                                         "url": "https://printful-upload.s3-accelerate.amazonaws.com/tmp/3342a78877351f5a8ee8bcf8ee5018a1/printfile_front.png"
                                     },
                                     {
                                         "variant_ids": [
                                             4012,
                                             4013,
                                             4014
                                         ],
                                         "placement": "back",
                                         "url": "https://printful-upload.s3-accelerate.amazonaws.com/tmp/79eacde0964fad0e1624170c33dc17b6/printfile_back.png"
                                     }
                                 ]
                             },
                             "extra": []
                         }
                        """));
    }
}
