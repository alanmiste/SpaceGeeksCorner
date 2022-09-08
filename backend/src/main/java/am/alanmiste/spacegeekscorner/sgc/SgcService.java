package am.alanmiste.spacegeekscorner.sgc;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
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

    private String printfulOauth = "https://api.printful.com/mockup-generator/create-task/71";
    @Value("${printfulAccessToken}")
    private String printfulAccessToken;
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
                  "image_url": "https://apod.nasa.gov/apod/image/0611/m51_hst_90x.jpg",
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
                  "image_url": "https://apod.nasa.gov/apod/image/0611/m51_hst_90x.jpg",
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
            """;

    public PrintfulResponse makeMockups() {
        ResponseEntity<PrintfulResponse> getOAuth = webClient.post()
                .uri(printfulOauth)
                .header("Authorization", "Bearer " + printfulAccessToken)
                .body(BodyInserters.fromValue(body))
                .retrieve()
                .toEntity(new ParameterizedTypeReference<PrintfulResponse>() {
                })
                .block();
        if (getOAuth == null)
            return null;
        return getOAuth
                .getBody();
    }

}
