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

@Path("/properties")
public class Properties {
    
    private MongoClient mongoClient;
    private MongoDatabase db;
    private String collection;
    private String dbName;

    public Properties() {
        dbName = "kpis";
        collection = "properties";
        
        this.mongoClient = new MongoClient();
        this.db = mongoClient.getDatabase(dbName);
    }
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Document getProperties() {
        ArrayList<Document> properties = db.getCollection(collection).find().into(new ArrayList<Document>());
        
        for(Document document : properties){
            document.remove("_id");
        }
        
        return properties.get(0);
    }
}
