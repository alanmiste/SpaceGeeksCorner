package am.alanmiste.spacegeekscorner.sgc;

import am.alanmiste.spacegeekscorner.sgc.model.ImageObject;
import am.alanmiste.spacegeekscorner.sgc.model.NasaResponse;
import am.alanmiste.spacegeekscorner.sgc.model.PrintfulResponse;
import am.alanmiste.spacegeekscorner.sgc.model.UserItem;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
public class SgcService {
    private final SgcRepository sgcRepository;

    public SgcService(SgcRepository sgcRepository) {
        this.sgcRepository = sgcRepository;
    }

    @Value("${nasaApiUrl}")
    private String nasaApiUrl;
    private final WebClient webClient = WebClient.create();

    public List<NasaResponse> getDataFromNasaApi() {
        ResponseEntity<List<NasaResponse>> getDataFromApiResult = webClient.get().uri(nasaApiUrl)
                .retrieve()
                .toEntity(new ParameterizedTypeReference<List<NasaResponse>>() {
                })
                .block();
        if (getDataFromApiResult == null)
            return Collections.emptyList();
        return getDataFromApiResult
                .getBody();
    }

    public UserItem addItem(UserItem userItem) {
        return sgcRepository.save(new UserItem(
                UUID.randomUUID().toString(),
                userItem.username(),
                userItem.explanation(),
                userItem.title(),
                userItem.url()));
    }

    public List<UserItem> listUserItems() {
        return sgcRepository.findAll();
    }

    public boolean deleteItem(String id) {
        if (sgcRepository.existsById(id)) {
            sgcRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Value("${printfulAccessToken}")
    private String printfulAccessToken;

    public PrintfulResponse makeMockups(ImageObject photoUrl) {
        String body = """
                {
                  "variant_ids": [
                    4012,
                    4013,
                    4014,
                    4017,
                    4018,
                    4019
                  ],
                  "format": "jpg",
                  "files": [
                    {
                      "placement": "front",
                      "image_url": "<PHOTOURL>",
                      "position": {
                        "area_width": 1800,
                        "area_height": 2400,
                        "width": 1800,
                        "height": 1800,
                        "top": 300,
                        "left": 0
                      }
                    },
                    {
                      "placement": "back",
                      "image_url": "<PHOTOURL>",
                      "position": {
                        "area_width": 1800,
                        "area_height": 2400,
                        "width": 1800,
                        "height": 1800,
                        "top": 300,
                        "left": 0
                      }
                    }
                  ]
                }
                """.replace("<PHOTOURL>", photoUrl.image_url());

        String printfulMockupGeneratorUrl = "https://api.printful.com/mockup-generator/create-task/71";
        ResponseEntity<PrintfulResponse> getOAuth = webClient.post()
                .uri(printfulMockupGeneratorUrl)
                .header("Authorization", "Bearer " + printfulAccessToken)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .body(BodyInserters.fromValue(body))
                .retrieve()
                .toEntity(PrintfulResponse.class)
                .block();
        if (getOAuth == null)
            return null;
        return getOAuth
                .getBody();
    }


}
