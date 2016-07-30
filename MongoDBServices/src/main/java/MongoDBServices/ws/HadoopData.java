package MongoDBServices.ws;

import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoDatabase;
import java.util.ArrayList;
import org.bson.Document;
import org.bson.types.ObjectId;

@Path("/kpi/hadoopdata/")
public class HadoopData {
    
    private MongoClient mongoClient;
    private MongoDatabase db;
    private String collection;
    private String dbName;

    public HadoopData() {
        dbName = "kpis";
        collection = "hadoop";
        
        this.mongoClient = new MongoClient();
        this.db = mongoClient.getDatabase(dbName);
    }
    
    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public ArrayList<Document> getKPIData(@PathParam("id") String id) {
        ArrayList<Document> listHadoopResults = db.getCollection(collection).find(new Document("idKPI", id)).into(new ArrayList<Document>());
        
        for(Document d : listHadoopResults){
            d.remove("_id");
            d.remove("idKPI");
        }
        
        return listHadoopResults;
    }
}
