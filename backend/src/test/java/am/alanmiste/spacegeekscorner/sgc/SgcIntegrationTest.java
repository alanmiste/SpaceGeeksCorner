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

    @DirtiesContext
    @Test
    void makeMockupsTest() throws Exception {
        stubFor(post("/mockup-generator/create-task/71")
                .willReturn(aResponse()
                        .withStatus(200)
                        .withHeader("Content-Type", "application/json")
                        .withBody("""
                                {
                                    "code": 200,
                                    "result": {
                                        "task_key": "gt-406203453",
                                        "status": "pending"
                                    },
                                    "extra": []
                                }
                                """)));

        stubFor(get("/mockup-generator/task?task_key=gt-406203453")
                .willReturn(aResponse()
                        .withStatus(200)
                        .withHeader("Content-Type", "application/json")
                        .withBody("""
                                        {
                                    "code": 200,
                                    "result": {
                                        "task_key": "gt-406202711",
                                        "status": "completed",
                                        "mockups": [
                                            {
                                                "placement": "front",
                                                "variant_ids": [
                                                    4017,
                                                    4018,
                                                    4019
                                                ],
                                                "mockup_url": "https://printful-upload.s3-accelerate.amazonaws.com/tmp/9e8ca9db6676ee8c22a981df64fb699e/unisex-staple-t-shirt-black-front-631f189742aef.jpg",
                                                "extra": [
                                                    {
                                                        "title": "Front",
                                                        "option": "Front",
                                                        "option_group": "Flat",
                                                        "url": "https://printful-upload.s3-accelerate.amazonaws.com/tmp/f3bd1904de17ec5eb5004553b1bb2df2/unisex-staple-t-shirt-black-front-631f189744290.jpg"
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
                                                "mockup_url": "https://printful-upload.s3-accelerate.amazonaws.com/tmp/8949df2d5855b904bbd237523b3ad723/unisex-staple-t-shirt-black-back-631f189744752.jpg",
                                                "extra": [
                                                    {
                                                        "title": "Back",
                                                        "option": "Back",
                                                        "option_group": "Flat",
                                                        "url": "https://printful-upload.s3-accelerate.amazonaws.com/tmp/3edcbb324fe839f0f05036208b090eed/unisex-staple-t-shirt-black-back-631f189744a81.jpg"
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
                                                "mockup_url": "https://printful-upload.s3-accelerate.amazonaws.com/tmp/ae7f71f6e80b6914e98d2692dcc9265d/unisex-staple-t-shirt-white-front-631f189744da6.jpg",
                                                "extra": [
                                                    {
                                                        "title": "Front",
                                                        "option": "Front",
                                                        "option_group": "Flat",
                                                        "url": "https://printful-upload.s3-accelerate.amazonaws.com/tmp/cd9b12e890f6e6f57a251d2220cf4749/unisex-staple-t-shirt-white-front-631f189745404.jpg"
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
                                                "mockup_url": "https://printful-upload.s3-accelerate.amazonaws.com/tmp/a709f5eb907903ee43349313d4de463a/unisex-staple-t-shirt-white-back-631f189745b4a.jpg",
                                                "extra": [
                                                    {
                                                        "title": "Back",
                                                        "option": "Back",
                                                        "option_group": "Flat",
                                                        "url": "https://printful-upload.s3-accelerate.amazonaws.com/tmp/1c5f5cced38486f9a6a5f7334523d072/unisex-staple-t-shirt-white-back-631f189747731.jpg"
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
                                                "url": "https://printful-upload.s3-accelerate.amazonaws.com/tmp/c2df9dc03de596d5db21ea306ac5b654/printfile_front.png"
                                            },
                                            {
                                                "variant_ids": [
                                                    4012,
                                                    4013,
                                                    4014
                                                ],
                                                "placement": "back",
                                                "url": "https://printful-upload.s3-accelerate.amazonaws.com/tmp/70e93e662e28eb934ae450c0e8d13942/printfile_back.png"
                                            }
                                        ]
                                    },
                                    "extra": []
                                }
                                        """)));

        mockMvc.perform(MockMvcRequestBuilders.post("/api/sgc/make-mockups")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"image_url":"https://apod.nasa.gov/apod/image/1812/ana03BennuVantuyne1024c.jpg"}
                                """)
                        .with(testUser()).with(csrf())
                ).andExpect(status().is(200))
                .andExpect(content().json("""
                        {
                            "code": 200,
                            "result": {
                                "task_key": "gt-406202711",
                                "status": "completed",
                                "mockups": [
                                    {
                                        "placement": "front",
                                        "variant_ids": [
                                            4017,
                                            4018,
                                            4019
                                        ],
                                        "mockup_url": "https://printful-upload.s3-accelerate.amazonaws.com/tmp/9e8ca9db6676ee8c22a981df64fb699e/unisex-staple-t-shirt-black-front-631f189742aef.jpg",
                                        "extra": [
                                            {
                                                "title": "Front",
                                                "option": "Front",
                                                "option_group": "Flat",
                                                "url": "https://printful-upload.s3-accelerate.amazonaws.com/tmp/f3bd1904de17ec5eb5004553b1bb2df2/unisex-staple-t-shirt-black-front-631f189744290.jpg"
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
                                        "mockup_url": "https://printful-upload.s3-accelerate.amazonaws.com/tmp/8949df2d5855b904bbd237523b3ad723/unisex-staple-t-shirt-black-back-631f189744752.jpg",
                                        "extra": [
                                            {
                                                "title": "Back",
                                                "option": "Back",
                                                "option_group": "Flat",
                                                "url": "https://printful-upload.s3-accelerate.amazonaws.com/tmp/3edcbb324fe839f0f05036208b090eed/unisex-staple-t-shirt-black-back-631f189744a81.jpg"
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
                                        "mockup_url": "https://printful-upload.s3-accelerate.amazonaws.com/tmp/ae7f71f6e80b6914e98d2692dcc9265d/unisex-staple-t-shirt-white-front-631f189744da6.jpg",
                                        "extra": [
                                            {
                                                "title": "Front",
                                                "option": "Front",
                                                "option_group": "Flat",
                                                "url": "https://printful-upload.s3-accelerate.amazonaws.com/tmp/cd9b12e890f6e6f57a251d2220cf4749/unisex-staple-t-shirt-white-front-631f189745404.jpg"
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
                                        "mockup_url": "https://printful-upload.s3-accelerate.amazonaws.com/tmp/a709f5eb907903ee43349313d4de463a/unisex-staple-t-shirt-white-back-631f189745b4a.jpg",
                                        "extra": [
                                            {
                                                "title": "Back",
                                                "option": "Back",
                                                "option_group": "Flat",
                                                "url": "https://printful-upload.s3-accelerate.amazonaws.com/tmp/1c5f5cced38486f9a6a5f7334523d072/unisex-staple-t-shirt-white-back-631f189747731.jpg"
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
                                        "url": "https://printful-upload.s3-accelerate.amazonaws.com/tmp/c2df9dc03de596d5db21ea306ac5b654/printfile_front.png"
                                    },
                                    {
                                        "variant_ids": [
                                            4012,
                                            4013,
                                            4014
                                        ],
                                        "placement": "back",
                                        "url": "https://printful-upload.s3-accelerate.amazonaws.com/tmp/70e93e662e28eb934ae450c0e8d13942/printfile_back.png"
                                    }
                                ]
                            },
                            "extra": []
                        }
                        """));
    }

    @DirtiesContext
    @Test
    void saveMockupNotExistedUserTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/sgc/save-mockup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "username": "testUser",
                                    "tshirtToSave":{
                                        "color": "White",
                                        "size": "M",
                                        "mockupUrl": "https://www.example.com",
                                        "placement": "front"
                                    }
                                }
                                """)
                        .with(testUser()).with(csrf())
                ).andExpect(status().is(201))
                .andExpect(content().json("""
                        {
                            "username": "testUser",
                            "tshirtList": [
                                {
                                    "color": "White",
                                    "size": "M",
                                    "mockupUrl": "https://www.example.com",
                                    "placement": "front"
                                }
                            ]
                        }
                        """));
    }

    @DirtiesContext
    @Test
    void saveMockupExistedUserTest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/sgc/save-mockup")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                            "username": "testUser",
                            "tshirtToSave":{
                                "color": "White",
                                "size": "M",
                                "mockupUrl": "https://www.example.com",
                                "placement": "front"
                            }
                        }
                        """)
                .with(testUser()).with(csrf())
        );

        mockMvc.perform(MockMvcRequestBuilders.post("/api/sgc/save-mockup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "username": "testUser",
                                    "tshirtToSave":{
                                        "color": "Black",
                                        "size": "L",
                                        "mockupUrl": "https://www.example2.com",
                                        "placement": "front"
                                    }
                                }
                                """)
                        .with(testUser()).with(csrf())
                ).andExpect(status().is(201))
                .andExpect(content().json("""
                        {
                            "username": "testUser",
                            "tshirtList": [
                                {
                                    "color": "White",
                                    "size": "M",
                                    "mockupUrl": "https://www.example.com",
                                    "placement": "front"
                                },
                                {
                                    "color": "Black",
                                    "size": "L",
                                    "mockupUrl": "https://www.example2.com",
                                    "placement": "front"
                                 }
                            ]
                        }
                        """));
    }
}
