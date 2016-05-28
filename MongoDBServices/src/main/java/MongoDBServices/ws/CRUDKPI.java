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

@Path("/kpis")
public class CRUDKPI {
    
    private MongoClient mongoClient;
    private MongoDatabase db;
    private String collection;
    private String dbName;

    public CRUDKPI() {
        dbName = "kpis";
        collection = "kpis";
        
        this.mongoClient = new MongoClient();
        this.db = mongoClient.getDatabase(dbName);
    }
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public ArrayList<Document> getKPIs() {
        ArrayList<Document> listKPIs = db.getCollection(collection).find().into(new ArrayList<Document>());
        
        for(Document d : listKPIs){
            String id = d.getObjectId("_id").toHexString();
            d.append("id", id);
            d.remove("_id");
        }
        
        return listKPIs;
    }
    
    @DELETE
    @Path("/kpi/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response removeKPI(@PathParam("id") String id){
        db.getCollection(collection).deleteOne(new Document("_id", new ObjectId(id)));
        
        return Response.noContent().build();
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response insertKPI(@Context UriInfo uriInfo, String jsonKpi){       
        Document documentKPI = Document.parse(jsonKpi);
        
        db.getCollection(collection).insertOne(documentKPI);
        
        return Response.ok().build();
    }
    
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public Response modifyKPI(@Context UriInfo uriInfo, String jsonKpi){
        Document documentKPI = Document.parse(jsonKpi);
        
        String id = documentKPI.getString("id");
        documentKPI.remove("id");
        
        db.getCollection(collection).replaceOne(new Document("_id", new ObjectId(id)), documentKPI); 
        
        return Response.ok().build();
    }
}
