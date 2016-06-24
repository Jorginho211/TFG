
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