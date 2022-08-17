package am.alanmiste.spacegeekscorner.sgc;

import org.springframework.stereotype.Service;

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
}
