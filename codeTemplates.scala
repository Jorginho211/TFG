
import com.twitter.scalding._
import com.scalakata._


//Plantilla estado de workflow
class WorkflowTemplate {
	Tsv( %%FILENAME%% ,(_, 'IdWorkflow , 'IdTaskState, _, _))
	.filter('IdWorkflow == %%IDWORKFLOW%%)
	.filter('IdTaskState == %%IDTASKWORKFLOWSTATE%%)
}

//Plantilla tarefas
import com.twitter.scalding._
import com.scalakata._

class WorkflowTemplate {
	val tsvs =  ,(_, _, 'IdTask, 'State, _))


}


//SCALA PRINCIPAL
import com.scalakata._
import com.twitter.scalding._
import java.io.File
import com.github.nscala_time.time.Imports._
import org.mongodb.scala._

@instrument class %%KPINAME%% { 
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
  
  getFilesTypeFilesTimeWindow(800000000000L, "tscev")

  %%KPICODE%%
}