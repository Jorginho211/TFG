//Scala principal
import com.twitter.scalding._
import java.io.File
import com.github.nscala_time.time.Imports._
import com.mongodb.{BasicDBObject}
import cascading.tuple.{Fields, TupleEntry}
import scala.collection.JavaConversions._

class KPI {
  def getLogFiles(dir: String): List[File] = {
    val files = new File(dir)
    files.listFiles.toList
  }

  def getFilesTypeFilesTimeWindow(timestamp: Long, typeFile: String):List[String] = {
    getLogFiles("/home/xurxo/logs").filter( (file: File) => {
      (file.getName.split("\\.")(1).toLong >= DateTime.now.getMillis - timestamp && file.getName.split("\\.")(1).toLong <= DateTime.now.getMillis && file.getName.split("\\.")(0).contains(typeFile))
    })
    .map((file: File) => file.getCanonicalPath)
  }
  
  (args: Args) => {
    new Job(args) {
      val files = getFilesTypeFilesTimeWindow(%%TIMEWINDOW%%L, %%TYPEFILE%%)

      %%CODEBASE%%
    }
  }
}

//Workflow templates
  MultipleTsvFiles( files, ('ExecutionID, 'CaseID, 'TaskID, 'NuevoEstado, 'Timestamp))
    .filter( 'TaskID ) {
      fields : (String) => {
        val (taskID) = fields
        %%REPEAT%%
      }
    }
    .groupBy( 'TaskID ){ _.size }
    .write(Tsv("output.tsv"))

  //REPEAT
  taskID == %%TASKID%% && %%ADDOTHER%%





//ALTERNATIVA CON MONGO
import com.twitter.scalding._
import java.io.File
import com.github.nscala_time.time.Imports._
import com.mongodb.{BasicDBObject}
import cascading.tuple.{Fields, TupleEntry}
import scala.collection.JavaConversions._
import es.usc.citius.scalding2mongo._

class KPI {
  def getLogFiles(dir: String): List[File] = {
    val files = new File(dir)
    files.listFiles.toList
  }

  def getFilesTypeFilesTimeWindow(timestamp: Long, typeFile: String):List[String] = {
    getLogFiles("/home/xurxo/logs").filter( (file: File) => {
      (file.getName.split("\\.")(1).toLong >= DateTime.now.getMillis - timestamp && file.getName.split("\\.")(1).toLong <= DateTime.now.getMillis && file.getName.split("\\.")(0).contains(typeFile))
    })
    .map((file: File) => file.getCanonicalPath)
  }
  
  class MyMongoHandler(mongoServer: List[MongoServerAddress], databaseName: String, collectionName: String) extends DefaultMongoHandler(mongoServer, databaseName,collectionName) {
    override def handle(tupleEntry: TupleEntry) = {
      val fields: Fields = tupleEntry.getFields();
      val dbo = new BasicDBObject();
      
      //Introduce o id da KPI para asociar os datos devoltos cunha KPI
      dbo.put("idKPI", "%%IDKPI%%");
      
      fields.toList.map(f => (f.toString, tupleEntry.getObject(f).toString)).foreach(f => dbo.put(f._1, f._2))
      this.mCollection.insert(dbo);
    }
  }

  val sas = List(new MongoServerAddress("localhost", 27017))
  val h = new MyMongoHandler(sas, "kpis", "hadoop")
  val output = MongoSink(h)

  //Elimina os resultados anteriores desa KPI
  val dbo = new BasicDBObject()
  dbo.put("idKPI", "%%IDKPI%%")
  h.mCollection.remove(dbo)    

  (args: Args) => {
    new Job(args) {
      val files = getFilesTypeFilesTimeWindow(%%TIMEWINDOW%%L, %%TYPEFILE%%)  
      
      %%CODEBASE%%
    }
  }
}

//WorkflowTemplate
MultipleTsvFiles( files, ('ExecutionID, 'CaseID, 'TaskID, 'NuevoEstado, 'Timestamp))
      .filter( 'TaskID ) {
        fields : (String) => {
          val (taskID) = fields
          
          %%REPEAT%%
        }
      }
      .groupBy( 'TaskID ){ _.size('Count)}
      .rename(('TaskID, 'Count) -> (('TaskID, 'Count)))
      .write(output)

  //REPEAT WFTemplate
  taskID == %%TASKID%% && %%ADDOTHER%%


//TaskTemplate
MultipleTsvFiles( files, ('ExecutionID, 'CaseID, 'TaskID, 'NuevoEstado, 'Timestamp))
      .filter( 'TaskID, 'NuevoEstado ) {
        fields : (String, String) => {
          val (taskID, nuevoEstado) = fields
          
          %%REPEAT%%
        }
      }
      .groupBy( 'TaskID ){ _.size('Count)}
      .rename(('TaskID, 'Count) -> (('TaskID, 'Count)))
      .write(output)

  //REPEAT TKTEMPLATE
  taskID == %%TASKID%% && nuevoEstado == %%STATE%% || %%ADDOTHER%%


//PropertyTemplate
%%PROPFILTER%%

var result:cascading.pipe.Pipe = null
result = %%PROPNAME%%

%%OTHERREPEAT%%

result = result.groupBy('%%PROPNAME%%PropertyName) { _.size%%OPREDUX%%('%%PROPNAME%%Value) }.rename(('%%PROPNAME%%PropertyName, '%%PROPNAME%%Value) -> (('Property, '%%NAMEOPREDUX%%)))
result.write(output)


//PROPFILTER
val %%PROPNAME%% = MultipleTsvFiles( files, ('%%PROPNAME%%ExecutionID, '%%PROPNAME%%PropertyName, '%%PROPNAME%%PropertyContext, '%%PROPNAME%%Agent, '%%PROPNAME%%CaseID, '%%PROPNAME%%IsCommited, '%%PROPNAME%%Timestamp, '%%PROPNAME%%Value))
      .filter( '%%PROPNAME%%PropertyName, '%%PROPNAME%%Value ) {
        fields : (String, %%VALUETYPE%%) => {
          val (propertyName, value) = fields
          propertyName == "%%PROPNAME%%" && value %%OP%% %%VALUE%%
        }
      }

      %%OTHERPROPFILTER%%

//AND
result = result.joinWithSmaller(('%%PROPNAME%%ExecutionID, '%%PROPNAME%%CaseID) -> ('%%PROPITER%%ExecutionID, '%%PROPITER%%CaseID), %%PROPITER%%)
%%OTHERREPEAT%%





