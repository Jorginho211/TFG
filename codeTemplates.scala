
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
	Tsv( %%FILENAME%% ,(_, 'IdWorkflow , 'IdTask, 'State, _))
	.filter('IdWorkflow == %%IDWORKFLOW%%)
	.filter('IdTask == %%IDTASK%%)
	.filter('State == %%STATE%%)
}


//SCALA PRINCIPAL
import com.scalakata._
import com.twitter._
import java.io.File
import com.github.nscala_time.time.Imports._

@instrument class KPI { 
  def getLogFiles(dir: String): List[File] = {
    val files = new File(dir)
    
    files.listFiles.toList
  }
  
  def getFilesTimeWindow(timestamp: Long):List[File] = {
    getLogFiles("/home/xurxo/logs").filter( (file: File) => {
      (file.getName.split("\\.")(1).toLong >= DateTime.now.getMillis - timestamp && file.getName.split("\\.")(1).toLong <= DateTime.now.getMillis)
    })
  }
  
  getFilesTimeWindow(800000000000L)
}