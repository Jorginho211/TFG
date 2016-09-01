package MongoDBServices.ws;

import MongoDBServices.ws.Helpers.TasksHelper;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoDatabase;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

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
    public ArrayList<Document> getKPIData(@PathParam("id") String id) throws IOException, MalformedURLException, JSONException {
        TasksHelper tasksHelper = new TasksHelper();
        ArrayList<Document> listHadoopResults = db.getCollection(collection).find(new Document("idKPI", id)).into(new ArrayList<Document>());
        ArrayList<Document> finalListHadoopData = new ArrayList<>();
        
        for(Document d : listHadoopResults){
            
            d.remove("_id");
            d.remove("idKPI");
            
            tasksHelper.getTaskName(d);
        }
        
        return listHadoopResults;
    }
}
