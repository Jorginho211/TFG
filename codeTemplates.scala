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