package am.alanmiste.spacegeekscorner.sgc;

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

    @DirtiesContext
    @Test
    void getDataFromNasaApiTest() throws Exception {
        stubFor(get("/")
                .willReturn(aResponse()
                        .withStatus(200)
                        .withBody("""
                                [
                                { "copyright": null,
                                "date": "2000-02-13",
                                "explanation": "The planet Mercury resembles a moon. Mercury's old surface is heavily cratered like many moons.  Mercury is larger than most moons but smaller than Jupiter's moon Ganymede and Saturn's moon Titan.  Mercury is much denser and more massive than any moon, though, because it is made mostly of iron. In fact, the Earth is the only planet more dense.  A visitor to Mercury's surface would see some strange sights.  Because Mercury rotates exactly three times every two orbits around the Sun, and because Mercury's orbit is so elliptical, a visitor to Mercury might see the Sun rise, stop in the sky, go back toward the rising horizon, stop again, and then set quickly over the other horizon.   From Earth, Mercury's proximity to the Sun cause it to be visible only for a short time just after sunset or just before sunrise.",
                                "hdurl": "https://apod.nasa.gov/apod/image/0002/merc4_m10_big.gif",
                                "media_type": "image",
                                "service_version": "v1",
                                "title": "Southwest Mercury",
                                "url": "https://apod.nasa.gov/apod/image/0002/merc4_m10.gif"}
                                ]
                                """)
                        .withHeader("Content-Type", MediaType.APPLICATION_JSON_VALUE)));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/sgc/nasaapi"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [
                                { "copyright": null,
                                "date": "2000-02-13",
                                "explanation": "The planet Mercury resembles a moon. Mercury's old surface is heavily cratered like many moons.  Mercury is larger than most moons but smaller than Jupiter's moon Ganymede and Saturn's moon Titan.  Mercury is much denser and more massive than any moon, though, because it is made mostly of iron. In fact, the Earth is the only planet more dense.  A visitor to Mercury's surface would see some strange sights.  Because Mercury rotates exactly three times every two orbits around the Sun, and because Mercury's orbit is so elliptical, a visitor to Mercury might see the Sun rise, stop in the sky, go back toward the rising horizon, stop again, and then set quickly over the other horizon.   From Earth, Mercury's proximity to the Sun cause it to be visible only for a short time just after sunset or just before sunrise.",
                                "hdurl": "https://apod.nasa.gov/apod/image/0002/merc4_m10_big.gif",
                                "media_type": "image",
                                "service_version": "v1",
                                "title": "Southwest Mercury",
                                "url": "https://apod.nasa.gov/apod/image/0002/merc4_m10.gif"}
                                ]
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
                                { "explanation": "The planet Mercury resembles a moon. Mercury's old surface is heavily cratered like many moons.  Mercury is larger than most moons but smaller than Jupiter's moon Ganymede and Saturn's moon Titan.  Mercury is much denser and more massive than any moon, though, because it is made mostly of iron. In fact, the Earth is the only planet more dense.  A visitor to Mercury's surface would see some strange sights.  Because Mercury rotates exactly three times every two orbits around the Sun, and because Mercury's orbit is so elliptical, a visitor to Mercury might see the Sun rise, stop in the sky, go back toward the rising horizon, stop again, and then set quickly over the other horizon.   From Earth, Mercury's proximity to the Sun cause it to be visible only for a short time just after sunset or just before sunrise.",                                        
                                  "title": "Southwest Mercury",
                                  "url": "https://apod.nasa.gov/apod/image/0002/merc4_m10.gif"}
                                """)
                        .with(testUser()).with(csrf())
                ).andExpect(status().is(201))
                .andExpect(content().json("""
                        { "explanation": "The planet Mercury resembles a moon. Mercury's old surface is heavily cratered like many moons.  Mercury is larger than most moons but smaller than Jupiter's moon Ganymede and Saturn's moon Titan.  Mercury is much denser and more massive than any moon, though, because it is made mostly of iron. In fact, the Earth is the only planet more dense.  A visitor to Mercury's surface would see some strange sights.  Because Mercury rotates exactly three times every two orbits around the Sun, and because Mercury's orbit is so elliptical, a visitor to Mercury might see the Sun rise, stop in the sky, go back toward the rising horizon, stop again, and then set quickly over the other horizon.   From Earth, Mercury's proximity to the Sun cause it to be visible only for a short time just after sunset or just before sunrise.",                                        
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

}
