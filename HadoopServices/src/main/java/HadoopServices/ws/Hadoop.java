package HadoopServices.ws;

import com.sun.security.sasl.ClientFactoryImpl;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ws.rs.*;
import javax.ws.rs.client.Client;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

@Path("/sendjob")
public class Hadoop {
    
    private Properties props;

    public Hadoop() throws IOException {
        props = new Properties();
        InputStream input = getClass().getClassLoader().getResourceAsStream("properties.config");
        props.load(input);
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response sendJob(String code) throws IOException {
        //Quitar partes innecesarias do codigo
        StringBuilder codeBuild = new StringBuilder(code);
        
        int start = codeBuild.indexOf("class");
        int finish = start;
        
        while( codeBuild.charAt(finish) != '{'){ finish++; };
        codeBuild.delete(start, finish + 1);
        codeBuild.deleteCharAt(codeBuild.length() - 1);
        
        code = codeBuild.toString();
        
        //Ruta do script eval-tool e arquivo codigo
        //String path = "/home/xurxo/Documentos/TFG/probas/";
        String path = props.getProperty("eval-tool");
        String command = path + "eval-tool " + path + "code.scala --local";
        File codeFile = new File(path + "code.scala");
        
        //Escribese o codigo en arquivo
        FileWriter writer = new FileWriter(codeFile);
        writer.write(code);
        writer.close();
        
        //Executase
        Process p= Runtime.getRuntime().exec(command);

        return Response.ok().build();
    }
}
