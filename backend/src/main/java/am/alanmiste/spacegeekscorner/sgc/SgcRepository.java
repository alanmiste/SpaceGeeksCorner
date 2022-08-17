package am.alanmiste.spacegeekscorner.sgc;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface SgcRepository extends MongoRepository<Photo, String> {
}
