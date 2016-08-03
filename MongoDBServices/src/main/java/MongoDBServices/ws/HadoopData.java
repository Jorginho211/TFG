package MongoDBServices.ws;

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
    
    public String data(HttpURLConnection conn) throws IOException, JSONException{
        if (conn.getResponseCode() != 200) {
          throw new IOException(conn.getResponseMessage());
        }

        // Buffer the result into a string
        BufferedReader rd = new BufferedReader(
            new InputStreamReader(conn.getInputStream()));
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
          sb.append(line);
        }
        rd.close();

        conn.disconnect();
        
        return sb.toString();
    }
    
    public String GetTaskName(String uri) throws MalformedURLException, IOException, JSONException {        
        URL url = new URL("https://tec.citius.usc.es/cuestionarios/backend/HMBAuthenticationRESTAPI/auth/login?username=root&password=rootcuestionarios");
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        
        JSONObject data = new JSONObject(data(conn));
        
        String token = data.getString("content");
        
        url = new URL("https://tec.citius.usc.es/cuestionarios/backend/HMBOntologyRESTAPI/api/admin/v3/workflows/page/0/size/1000000000?provider=es.usc.citius.hmb.questionnaires");
        conn = (HttpURLConnection) url.openConnection();
        conn.setRequestProperty("X-Auth-Token", token);
        
        data = new JSONObject(data(conn));
        data = new JSONObject(data.getString("content"));
        
        JSONArray jArray = new JSONArray(data.getString("result"));
        
        JSONArray jArrayWf = null;
        
        for(int i=0; i<jArray.length(); i++){
            data = jArray.getJSONObject(i);
            
            url = new URL("https://tec.citius.usc.es/cuestionarios/backend/HMBOntologyRESTAPI/api/admin/v3/workflow/" + data.getString("URI"));
            conn = (HttpURLConnection) url.openConnection();
            conn.setRequestProperty("X-Auth-Token", token);
            
            data = new JSONObject(data(conn));
            data = new JSONObject(data.getString("content"));
            jArrayWf = new JSONArray(data.getString("element"));
            
            for(int j=0; j < jArrayWf.length(); j++){
                data = jArrayWf.getJSONObject(j);
                
                if(data.getString("uri").equals(uri)){
                    return data.getString("wfontology_Name");
                }
            }
        }
        
        return null;
    }
    
    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public ArrayList<Document> getKPIData(@PathParam("id") String id) throws IOException, MalformedURLException, JSONException {
        ArrayList<Document> listHadoopResults = db.getCollection(collection).find(new Document("idKPI", id)).into(new ArrayList<Document>());
        
        for(Document d : listHadoopResults){
            d.remove("_id");
            d.remove("idKPI");
            
            /*for(String key : d.keySet()){
                if(d.getString(key).matches("[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}")){
                    String taskName = GetTaskName(d.getString(key));
                    
                    if(taskName != null){
                        d.append(key, taskName);
                    }
                }
            }*/
        }
        
        return listHadoopResults;
    }
}
