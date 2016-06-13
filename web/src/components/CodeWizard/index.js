import React, {Component} from 'react'

import FlatButton from 'material-ui/FlatButton';

import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';

import DeleteIcon from 'material-ui/svg-icons/action/delete';

import { autobind } from 'core-decorators';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';

@CSSModules(styles)
class CodeWizard extends Component {
    constructor() {
        super();
    }

    @autobind templateType(templateType){
        this.props.KPIActions.DatosKPIActions.CodeWizardActions.templateType(templateType)
    }

    @autobind selectStepSteper(step){
        this.props.KPIActions.DatosKPIActions.selectStepSteper(step)
    }

    @autobind changeTaskWorkflowState(evt, index, value){
        this.props.KPIActions.DatosKPIActions.CodeWizardActions.changeTaskWorkflowState(value)
    }

    @autobind addWorkflowToWorkflowTemplate(){
        let workflow = undefined
        let errors = this.props.kpi.datoskpi.codewizard.errors

        this.props.kpi.datoskpi.codewizard.workflows.map( item => {
            if(item.name === this.workflowTemplateInput.state.searchText){
                workflow = {
                    ...item,
                }
            }
        })

        if(workflow !== undefined){
            workflow = {
                ...workflow,
                state: this.props.kpi.datoskpi.codewizard.taskWorkflowState,
            }

            this.props.KPIActions.DatosKPIActions.CodeWizardActions.addWorkflowToWorkflowTemplate(workflow, this.props.kpi.datoskpi.codewizard.workflowTemplate)

            errors = {
                ...errors,
                workflowTemplateInput: false,
            }           

            this.workflowTemplateInput.state.searchText = "" 
        }
        else {
            errors = {
                ...errors,
                workflowTemplateInput: true,
            }
        }

        this.props.KPIActions.DatosKPIActions.CodeWizardActions.modifyErrors(errors)
    }

    @autobind addWorkFlowTasksToTasksTemplate(){

    }

    @autobind deleteWorkflowToWorkflowTemplate(index){
        this.props.KPIActions.DatosKPIActions.CodeWizardActions.deleteWorkflowToWorkflowTemplate(this.props.kpi.datoskpi.codewizard.workflowTemplate, index)
    }

    @autobind changeTimeWindow(evt){
        this.props.KPIActions.DatosKPIActions.CodeWizardActions.changeTimeWindow(parseFloat(evt.target.value))
    }

    @autobind changeTaskTemplateWorkflowTaskSugestions(evt){
        if(evt.keyCode === 13){
            let workflow = undefined
            let errors = this.props.kpi.datoskpi.codewizard.errors
            let sugestionList = []

            this.props.kpi.datoskpi.codewizard.workflows.map( item => {
                if(item.name === evt.target.value){
                    workflow = {
                        ...item,
                    }
                }
            })

            if(workflow !== undefined){
                evt.target.disabled = true

                workflow.tasks.map( task => {
                    sugestionList.push(task.name)
                })

                this.props.KPIActions.DatosKPIActions.CodeWizardActions.changeSugestionList(sugestionList)

                this.taskTemplateInputsElement.style.visibility = "visible"

                errors = {
                    ...errors,
                    workflowTemplateInput: false,
                }
            }
            else {
                errors = {
                    ...errors,
                    workflowTemplateInput: true,
                }
            }

            this.props.KPIActions.DatosKPIActions.CodeWizardActions.modifyErrors(errors)
        }
    }

    @autobind addTaskToTaskTemplate(){
        let workflow = undefined
        let task = undefined

        this.props.kpi.datoskpi.codewizard.workflows.map(item => {
            if(item.name === this.taskTemplateWorkflowInput.state.searchText) {
                workflow = {
                    ...item,
                }
            }
        })

        workflow.tasks.map( item => {
            if(item.name === this.taskTemplateTaskInput.state.searchText){
                task = {
                    ...item,
                    state: this.props.kpi.datoskpi.codewizard.taskWorkflowState,
                }
            }
        })

        if( task !== undefined ){
            this.props.KPIActions.DatosKPIActions.CodeWizardActions.addTaskToTaskTemplate(workflow, task, this.props.kpi.datoskpi.codewizard.taskTemplate)
        }
        else {

        }
    }

    @autobind deleteTaskToTaskTemplate(index){
        this.props.KPIActions.DatosKPIActions.CodeWizardActions.deleteTaskToTaskTemplate(this.props.kpi.datoskpi.codewizard.taskTemplate, index)
    }

    @autobind cleanTaskTemplate(){
        this.props.KPIActions.DatosKPIActions.CodeWizardActions.cleanTaskTemplate()

        this.taskTemplateInputsElement.style.visibility = "hidden"
        this.taskTemplateWorkflowInput.refs.searchTextField.input.disabled = false
        this.taskTemplateWorkflowInput.setValue("")
        this.taskTemplateTaskInput.setValue("")
    }

    getStateGalego(state){
        switch(state){
            case "started":
                return "Comezado"

            case "stopped":
                return "Parado"

            case "finished":
                return "Acabado"
        }
    }

    render() {
        const {codewizard} = this.props.kpi.datoskpi

        switch(codewizard.typeTemplate){
            case 0:
                return (
                    <div className={styles.selectTemplate}>
                        <h1>Seleccionar plantilla</h1>
                        <div className={styles.scroll}>
                            <div className={styles.templates}>
                                <div className={styles.template} onTouchTap={() => { this.templateType(1) }}>
                                    <div className={styles.name}>Hola</div>
                                    <Paper style={{width: '100%', height: '100%'}} zDepth={2}>
                                        <div className={styles.text}>Proba</div>
                                    </Paper>
                                </div>
                                <div className={styles.template} onTouchTap={() => { this.templateType(2) }}>
                                    <div className={styles.name}>Hola</div>
                                    <Paper style={{width: '100%', height: '100%'}} zDepth={2}>
                                        <div className={styles.text}>Proba</div>
                                    </Paper>
                                </div>
                                <div className={styles.template} onTouchTap={() => { this.templateType(3) }}>
                                    <div className={styles.name}>Hola</div>
                                    <Paper style={{width: '100%', height: '100%'}} zDepth={2}>
                                        <div className={styles.text}>Proba</div>
                                    </Paper>
                                </div>
                            </div>
                        </div>

                        <div className={styles.addCode}>
                            <FloatingActionButton onTouchTap={() => this.selectStepSteper(2)}>
                              <ContentAdd />
                            </FloatingActionButton>
                        </div>
                    </div>
                )

            case 1:
                return (
                    <div className={styles.workflowTemplate}>
                        {codewizard.workflowTemplate !== undefined && codewizard.workflowTemplate.length > 0 ? (
                            <div className={styles.table}>
                                {codewizard.workflowTemplate.map((workflow, index) => {
                                    return (
                                        <div key={index} className={styles.workflowLine}>
                                            <div className={styles.workflow}>{workflow.name}</div>
                                            <div className={styles.state}>{this.getStateGalego(workflow.state)}</div>
                                            <div className={styles.actions}>
                                                <IconButton onTouchTap={() => {this.deleteWorkflowToWorkflowTemplate(index)}}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ): (
                            null
                        )}

                        <div className={styles.inputs}>
                            <AutoComplete hintText="Workflow" ref={element => this.workflowTemplateInput = element } fullWidth={true} dataSource={codewizard.sugestionList} filter={AutoComplete.caseInsensitiveFilter} style={{flex: 2, marginRight: '10px'}} errorText={codewizard.errors.workflowTemplateInput && "O workflow non existe"} />

                            <SelectField style={{flex: 1}} value={codewizard.taskWorkflowState} onChange={this.changeTaskWorkflowState}>
                                <MenuItem value="started" primaryText="Comezado" />
                                <MenuItem value="finished" primaryText="Acabado" />
                                <MenuItem value="stopped" primaryText="Parado" />
                            </SelectField>

                            <IconButton className={styles.actions} onTouchTap={this.addWorkflowToWorkflowTemplate}>
                                <ContentAdd />
                            </IconButton>
                        </div>                        

                        <div>
                            <TextField hintText="Ventá Temporal" className={styles.textFieldwidthAll} onBlur={this.changeTimeWindow}/>
                        </div>

                        <div>
                            <FlatButton label="Xerar Código" onTouchTap={() => { this.templateType(2) }}/>
                        </div>
                    </div>
                )

            case 2:
                return (
                    <div className={styles.taskTemplate}>
                        <div>
                            <AutoComplete hintText="Workflow" ref={element => this.taskTemplateWorkflowInput = element } onKeyDown={this.changeTaskTemplateWorkflowTaskSugestions} ref={element => this.taskTemplateWorkflowInput = element } fullWidth={true} dataSource={codewizard.sugestionList} filter={AutoComplete.caseInsensitiveFilter} style={{flex: 2, marginRight: '10px'}} errorText={codewizard.errors.workflowTemplateInput && "O workflow non existe"} />
                        </div>

                        {codewizard.taskTemplate !== undefined && codewizard.taskTemplate.tasks !== undefined && codewizard.taskTemplate.tasks.length > 0 ? (
                            <div className={styles.table}>
                                {codewizard.taskTemplate.tasks.map((task, index) => {
                                    return (
                                        <div key={index} className={styles.taskLine}>
                                            <div className={styles.task}>{task.name}</div>
                                            <div className={styles.state}>{this.getStateGalego(task.state)}</div>
                                            <div className={styles.actions}>
                                                <IconButton onTouchTap={() => this.deleteTaskToTaskTemplate(index)}> 
                                                    <DeleteIcon />
                                                </IconButton>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ): (
                            null
                        )}

                        <div ref={element => this.taskTemplateInputsElement = element } className={styles.inputs}>
                            <AutoComplete hintText="Tarefa do Workflow" ref={element => this.taskTemplateTaskInput = element } fullWidth={true} dataSource={codewizard.sugestionList} filter={AutoComplete.caseInsensitiveFilter} style={{flex: 2, marginRight: '10px'}} errorText={codewizard.errors.workflowTemplateInput && "O workflow non existe"} />

                            <SelectField style={{flex: 1}} value={codewizard.taskWorkflowState} onChange={this.changeTaskWorkflowState}>
                                <MenuItem value="started" primaryText="Comezado" />
                                <MenuItem value="finished" primaryText="Acabado" />
                                <MenuItem value="stopped" primaryText="Parado" />
                            </SelectField>

                            <IconButton className={styles.actions} onTouchTap={() => this.addTaskToTaskTemplate()}>
                                <ContentAdd />
                            </IconButton>
                        </div>

                        <div>
                            <TextField hintText="Ventá Temporal" className={styles.textFieldwidthAll} onBlur={this.changeTimeWindow}/>
                        </div>

                        <div>
                            <FlatButton label="Limpar" onTouchTap={this.cleanTaskTemplate}/>
                            <FlatButton label="Xerar Código" onTouchTap={() => { this.templateType(3) }}/>
                        </div>
                    </div>
                )

            case 3:
                return (
                    <div>{codewizard.typeTemplate}</div>
                )
        }
    }
}

export default CodeWizard