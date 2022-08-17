package am.alanmiste.spacegeekscorner.sgc;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Collections;
import java.util.List;

@Service
public class SgcService {
    private final SgcRepository repo;

    public SgcService(SgcRepository repo) {
        this.repo = repo;
    }

    public List<Photo> getPhoto() {
        return repo.findAll();
    }

    @Value("https://api.nasa.gov/planetary/apod?api_key=bMfdUJ0SzfYuFaMYYfTdOiFYhyVhgrNS50mbM0A2&count=25")
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
}
