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
import RefreshIndicator from 'material-ui/RefreshIndicator';

import DeleteIcon from 'material-ui/svg-icons/action/delete';

import Divider from 'material-ui/Divider';

import { autobind } from 'core-decorators';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';

@CSSModules(styles)
class CodeWizard extends Component {
    constructor() {
        super();
    }

    @autobind templateType(codeTemplate){
        let type = 0

        switch(codeTemplate.type){
            case "workflowTemplate":
                this.setWorkflowSuggestionList()
                type = 1
                break

            case "taskTemplate":
                this.setWorkflowSuggestionList()
                type = 2
                break

            case "propertyTemplate":
                this.setPropertiesSuggestionList()
                type = 3
                break
        }
        
        this.props.KPIActions.DatosKPIActions.CodeWizardActions.templateType(type, codeTemplate)
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

    @autobind deleteWorkflowToWorkflowTemplate(index){
        this.props.KPIActions.DatosKPIActions.CodeWizardActions.deleteWorkflowToWorkflowTemplate(this.props.kpi.datoskpi.codewizard.workflowTemplate, index)
    }

    @autobind workflowTemplateCodeGenerate() {
        let errors = {
            ...this.props.kpi.datoskpi.codewizard.errors,
            workflowTemplateInput: false,
            timeWindowInput: false,
        }

        let timeWindow = this.props.kpi.datoskpi.codewizard.timeWindow

        if(this.props.kpi.datoskpi.codewizard.workflowTemplate === undefined || this.props.kpi.datoskpi.codewizard.workflowTemplate.length === 0) { errors.workflowTemplateInput = true }
        if(timeWindow === undefined || isNaN(parseInt(timeWindow))) { errors.timeWindowInput = true}
            
        if(!errors.workflowTemplateInput && !errors.timeWindowInput){
            let code = this.props.kpi.datoskpi.codewizard.code
            let codeBaseTemplate = this.props.kpi.datoskpi.codewizard.codeTemplate.codeBase
            let codeRepeatTemplate = this.props.kpi.datoskpi.codewizard.codeTemplate.codeRepeat

            code = code.replace("%%TIMEWINDOW%%", timeWindow * 3600000)
            code = code.replace("%%TYPEFILE%%", "\"tscev\"")
            code = code.replace("%%CODEBASE%%", codeBaseTemplate)
            code = code.replace(/%%IDKPI%%/g, this.props.kpi.datoskpi.kpi.id)

            let codeRepeat = codeRepeatTemplate
            this.props.kpi.datoskpi.codewizard.workflowTemplate.map( (workflow, index) => {
                if(index > 0){
                    codeRepeat = codeRepeat.replace("%%ADDOTHER%%", codeRepeatTemplate)
                }

                workflow.tasks.map((task) => {
                    if(task.dummyTaskType === "start" && workflow.state === "active"){
                        codeRepeat = codeRepeat.replace("%%TASKID%%", "\"" + task.URI + "\"")
                    }
                    
                    if(task.dummyTaskType === "finish" && workflow.state === "finished"){
                        codeRepeat = codeRepeat.replace("%%TASKID%%", "\"" + task.URI + "\"")
                    }
                })                
            })

            if(codeRepeatTemplate.indexOf("&&") > -1){
                codeRepeat = codeRepeat.replace("%%ADDOTHER%%", "true")
            }
            else if (codeRepeatTemplate.indexOf("||") > -1){
                codeRepeat = codeRepeat.replace("%%ADDOTHER%%", "false")
            }

            code = code.replace("%%REPEAT%%", codeRepeat)

            this.props.KPIActions.DatosKPIActions.codeChange(code)
            this.props.KPIActions.DatosKPIActions.continueSteper()
        }

        this.props.KPIActions.DatosKPIActions.CodeWizardActions.modifyErrors(errors)
    }


    @autobind changeTimeWindow(evt){
        this.props.KPIActions.DatosKPIActions.CodeWizardActions.changeTimeWindow(parseFloat(evt.target.value))
    }

    @autobind changeTaskTemplateWorkflowTaskSugestions(value, index){
        let workflow = undefined
        let errors = this.props.kpi.datoskpi.codewizard.errors
        let suggestionList = []

        this.props.kpi.datoskpi.codewizard.workflows.map( item => {
            if(item.name === value){
                workflow = {
                    ...item,
                }
            }
        })

        if(workflow !== undefined){
            this.taskTemplateWorkflowInput.refs.searchTextField.input.disabled = true

            workflow.tasks.map( task => {
                suggestionList.push(task.name)
            })

            this.props.KPIActions.DatosKPIActions.CodeWizardActions.changeSuggestionList(suggestionList)

            this.taskTemplateInputsElement.style.visibility = "visible"

            errors = {
                ...errors,
                taskTemplateWorkflowInput: false,
            }


        }
        else {
            errors = {
                ...errors,
                taskTemplateWorkflowInput: true,
            }
        }

        this.props.KPIActions.DatosKPIActions.CodeWizardActions.modifyErrors(errors)
    }

    @autobind addTaskToTaskTemplate(){
        let workflow = undefined
        let task = undefined
        let errors = this.props.kpi.datoskpi.codewizard.errors

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
            
            this.taskTemplateTaskInput.state.searchText = ""

            errors = {
                ...errors,
                taskTemplateTaskInput: false,
            }
        }
        else {
            errors = {
                ...errors,
                taskTemplateTaskInput: true,
            }
        }

        this.props.KPIActions.DatosKPIActions.CodeWizardActions.modifyErrors(errors)
    }

    @autobind deleteTaskToTaskTemplate(index){
        this.props.KPIActions.DatosKPIActions.CodeWizardActions.deleteTaskToTaskTemplate(this.props.kpi.datoskpi.codewizard.taskTemplate, index)
    }

    @autobind cleanTaskTemplate(){
        this.props.KPIActions.DatosKPIActions.CodeWizardActions.cleanTaskTemplate()

        let suggestionList = [];

        this.props.kpi.datoskpi.codewizard.workflows.map( workflow => {
            suggestionList.push(workflow.name)
        })

        this.props.KPIActions.DatosKPIActions.CodeWizardActions.changeSuggestionList(suggestionList)

        this.taskTemplateInputsElement.style.visibility = "hidden"
        this.taskTemplateWorkflowInput.refs.searchTextField.input.disabled = false
        this.taskTemplateWorkflowInput.setValue("")
        this.taskTemplateTaskInput.setValue("")
    }

    @autobind taskTemplateCodeGenerate() {
        let errors = {
            ...this.props.kpi.datoskpi.codewizard.errors,
            taskTemplateTaskInput: false,
            taskTemplateWorkflowInput: false,
            timeWindowInput: false,
        }

        let timeWindow = this.props.kpi.datoskpi.codewizard.timeWindow

        if(this.taskTemplateWorkflowInput.refs.searchTextField.input.disabled === false) { errors.taskTemplateWorkflowInput = true }
        if(this.props.kpi.datoskpi.codewizard.taskTemplate === undefined || this.props.kpi.datoskpi.codewizard.taskTemplate.tasks === undefined){ errors.taskTemplateTaskInput = true }
        if(timeWindow === undefined || isNaN(parseInt(timeWindow))) { errors.timeWindowInput = true}
            
        if(!errors.taskTemplateTaskInput && !errors.taskTemplateWorkflowInput && !errors.timeWindowInput){
            let code = this.props.kpi.datoskpi.codewizard.code
            let codeBaseTemplate = this.props.kpi.datoskpi.codewizard.codeTemplate.codeBase
            let codeRepeatTemplate = this.props.kpi.datoskpi.codewizard.codeTemplate.codeRepeat

            code = code.replace("%%TIMEWINDOW%%", timeWindow * 3600000)
            code = code.replace("%%TYPEFILE%%", "\"tscev\"")
            code = code.replace("%%CODEBASE%%", codeBaseTemplate)
            code = code.replace(/%%IDKPI%%/g, this.props.kpi.datoskpi.kpi.id)

            let codeRepeat = codeRepeatTemplate

            this.props.kpi.datoskpi.codewizard.taskTemplate.tasks.map( (task, index) => {
                if(index > 0){
                    codeRepeat = codeRepeat.replace("%%ADDOTHER%%", codeRepeatTemplate)
                }

                codeRepeat = codeRepeat.replace("%%TASKID%%", "\"" + task.URI + "\"")
                codeRepeat = codeRepeat.replace("%%STATE%%", "\"" + task.state + "\"")
            })

            if(codeRepeatTemplate.indexOf("||") > -1){
                codeRepeat = codeRepeat.replace("%%ADDOTHER%%", "false")
            }
            else if (codeRepeatTemplate.indexOf("&&") > -1){
                codeRepeat = codeRepeat.replace("%%ADDOTHER%%", "true")
            }

            code = code.replace("%%REPEAT%%", codeRepeat)

            this.props.KPIActions.DatosKPIActions.codeChange(code)
            this.props.KPIActions.DatosKPIActions.continueSteper()
        }

        this.props.KPIActions.DatosKPIActions.CodeWizardActions.modifyErrors(errors)
    }

    @autobind changeReduxOperatorPropertyTemplate(evt, index, value){
        this.props.KPIActions.DatosKPIActions.CodeWizardActions.changeReduxOperatorPropertyTemplate(value)
    }

    @autobind changeReduxPropertyPropertyTemplate(value, index){
        let exist = false
        let propertyTemplate = this.props.kpi.datoskpi.codewizard.propertyTemplate
        let errors = {
            ...this.props.kpi.datoskpi.codewizard.errors,
            reduxProperty: false,
        }

        this.props.kpi.datoskpi.codewizard.properties.map(prop => {
            if(value == prop.name){
                exist = true
            }
        })

        if(exist){
            propertyTemplate = {
                ...propertyTemplate,
                reduxProperty: value,
            }
        }
        else {
            propertyTemplate = {
                ...propertyTemplate,
                reduxProperty: undefined,
            }

            errors.reduxProperty = true
        }

        this.props.KPIActions.DatosKPIActions.CodeWizardActions.setPropertyTemplate(propertyTemplate)
        this.props.KPIActions.DatosKPIActions.CodeWizardActions.modifyErrors(errors)
    }

    @autobind propertySelected(value,index){
        let propertySelected = undefined
        let propertyTemplate = this.props.kpi.datoskpi.codewizard.propertyTemplate

        this.props.kpi.datoskpi.codewizard.properties.map(prop => {
            if(value == prop.name){
                propertySelected = prop
            }
        })

        if(propertySelected !== undefined) {
            propertyTemplate = {
                ...propertyTemplate,
                tempProperty: {
                    ...propertySelected,
                },
                renderProperty: true,
            }
        }
        else{
            propertyTemplate = {
                ...propertyTemplate,
                tempProperty: undefined,
                renderProperty: false,
            }
        }

        this.props.KPIActions.DatosKPIActions.CodeWizardActions.setPropertyTemplate(propertyTemplate)
    }

    @autobind setTempPropertyComparisonOperator(evt, index, value){
        let propertyTemplate = this.props.kpi.datoskpi.codewizard.propertyTemplate

        propertyTemplate = {
            ...propertyTemplate,
            tempProperty : {
                ...propertyTemplate.tempProperty,
                comparisonOperator: value,
            }
        }

        this.props.KPIActions.DatosKPIActions.CodeWizardActions.setPropertyTemplate(propertyTemplate)
    }

    @autobind setPropertyValue(evt, index, val){
        let propertyTemplate = this.props.kpi.datoskpi.codewizard.propertyTemplate

        if(val === undefined){
            val = evt.target.value
        }

        propertyTemplate = {
            ...propertyTemplate,
            tempProperty : {
                ...propertyTemplate.tempProperty,
                value: val,
            }
        }

        this.props.KPIActions.DatosKPIActions.CodeWizardActions.setPropertyTemplate(propertyTemplate)
    }

    @autobind addPropertyToListPropertyTemplate(op){
        let errors = {
            ...this.props.kpi.datoskpi.codewizard.errors,
            propConditionInput: false,
            comparisonOperator: false,
            valueMessage: undefined,
        }

        let propertyTemplate = this.props.kpi.datoskpi.codewizard.propertyTemplate
        let list = propertyTemplate.properties

        if(list === undefined) {
            list = []
        }

        propertyTemplate = {
            ...propertyTemplate,
            tempProperty: {
                ...propertyTemplate.tempProperty,
                logicalOperator: op,
            }
        }

        let existProp = false
        this.props.kpi.datoskpi.codewizard.properties.map( prop => {
            if(prop.name === propertyTemplate.tempProperty.name){
                existProp = true
            }
        })

        if(!existProp) { errors.propConditionInput = true }
        if(!errors.propConditionInput && propertyTemplate.tempProperty.comparisonOperator === undefined) { errors.comparisonOperator = true }
        if(!errors.propConditionInput && propertyTemplate.tempProperty.value !== undefined) {
            switch(propertyTemplate.tempProperty.type){
                case "IntegerType":
                    if(propertyTemplate.tempProperty.value === undefined || isNaN(parseInt(propertyTemplate.tempProperty.value))) { errors.valueMessage = "O valor ten que ser un numero enteiro"}
                    break;

                case "StringType":
                    if(propertyTemplate.tempProperty.value === undefined) { errors.valueMessage = "O valor ten que ser unha cadea de texto"} 
                    break;

                case "BooleanType":
                    if(propertyTemplate.tempProperty.value === undefined) { errors.valueMessage = "Ten que escoller un valor" }
                        break;
            }
        }
        else if(!errors.propConditionInput && propertyTemplate.tempProperty.value === undefined){ errors.valueMessage = "Ten que introducir algun valor" }

        if(!errors.propConditionInput && !errors.comparisonOperator && !errors.valueMessage){
            list.push(propertyTemplate.tempProperty)

            propertyTemplate = {
                ...propertyTemplate,
                tempProperty: undefined,
                properties: list,
                renderProperty: false,
            }

            this.props.KPIActions.DatosKPIActions.CodeWizardActions.setPropertyTemplate(propertyTemplate)
            this.propertyTemplateInput.setValue("")
        }

        this.props.KPIActions.DatosKPIActions.CodeWizardActions.modifyErrors(errors)
    }

    @autobind deletePropToPropertyTemplate(indexProp){
        let propertyTemplate = this.props.kpi.datoskpi.codewizard.propertyTemplate
        let listProps = []

        propertyTemplate.properties.map( (prop, index) => {
            if(index !== indexProp){
                listProps.push(prop)
            }
        })

        propertyTemplate = {
            ...propertyTemplate,
            properties: listProps,
        }

        this.props.KPIActions.DatosKPIActions.CodeWizardActions.setPropertyTemplate(propertyTemplate)
    }

    @autobind propertyTemplateCodeGenerate(){
        let errors = {
            ...this.props.kpi.datoskpi.codewizard.errors,
            timeWindowInput: false,
            reduxOperator: false,
            reduxProperty: false,
        }

        let propertyTemplate = this.props.kpi.datoskpi.codewizard.propertyTemplate
        let timeWindow = this.props.kpi.datoskpi.codewizard.timeWindow

        if(timeWindow === undefined || isNaN(parseInt(timeWindow))) { errors.timeWindowInput = true }
        if(propertyTemplate.reduxOperator === undefined) { errors.reduxOperator = true }
        if(propertyTemplate.reduxProperty === undefined) { errors.reduxProperty = true }

        if(!errors.timeWindowInput && !errors.reduxOperator && propertyTemplate.properties !== undefined && propertyTemplate.properties.length > 0){
            let code = this.props.kpi.datoskpi.codewizard.code
            let codeBaseTemplate = this.props.kpi.datoskpi.codewizard.codeTemplate.codeBase
            let codePipePropFilterTemplate = this.props.kpi.datoskpi.codewizard.codeTemplate.codePipePropFilter
            let codePipeReduxPropTemplate = this.props.kpi.datoskpi.codewizard.codeTemplate.codePipeReduxProp
            let codeAndPropTemplate = this.props.kpi.datoskpi.codewizard.codeTemplate.codeAndProp
            let codeOrPropTemplate = this.props.kpi.datoskpi.codewizard.codeTemplate.codeOrProp
            let propertyTemplate = this.props.kpi.datoskpi.codewizard.propertyTemplate

            code = code.replace(/%%IDKPI%%/g, this.props.kpi.datoskpi.kpi.id)
            code = code.replace("%%TIMEWINDOW%%", timeWindow * 3600000)
            code = code.replace("%%TYPEFILE%%", "\"pvcev\"")
            code = code.replace("%%CODEBASE%%", codeBaseTemplate)

            if(propertyTemplate.reduxOperator == "count"){
                code = code.replace("%%OPREDUX%%","")
                code = code.replace("%%NAMEOPREDUX%%", "Count")
            }
            else {
                code = code.replace("%%OPREDUX%%", "." + propertyTemplate.reduxOperator)
                code = code.replace("%%NAMEOPREDUX%%", propertyTemplate.reduxOperator)
            }

            code = code.replace("%%PROPFILTER%%", codePipePropFilterTemplate)

            propertyTemplate.properties.map( (prop, index) => {
                code = code.replace(/%%PROPITERNAME%%/g, prop.name)
                code = code.replace("%%VALUETYPE%%", prop.type.replace("Type", ""))
                code = code.replace("%%OP%%", prop.comparisonOperator)

                if(prop.type === "StringType"){
                    code = code.replace("%%VALUE%%", "\"" + prop.value + "\"")
                }
                else {
                    code = code.replace("%%VALUE%%", prop.value)
                }

                if(index + 1 < propertyTemplate.properties.length){
                    code = code.replace("%%OTHERPROPFILTER%%", codePipePropFilterTemplate)
                }              
            })
            code = code.replace("%%OTHERPROPFILTER%%", codePipeReduxPropTemplate)
            code = code.replace("%%PROPREDUXNAME%%", propertyTemplate.reduxProperty)


            propertyTemplate.properties.map( (prop, index) => {
                if(index === 0){
                    code = code.replace("%%PROPNAME%%", prop.name)

                    if(prop.logicalOperator == "&&"){
                        code = code.replace("%%OTHERREPEAT%%", codeAndPropTemplate)
                    }
                    else if (prop.logicalOperator == "||") {
                        code = code.replace("%%OTHERREPEAT%%", codeOrPropTemplate)
                    }
                }
                else {
                    code = code.replace("%%PROPITERNAME%%", prop.name);

                    if(index + 1 < propertyTemplate.properties.length){
                        if(prop.logicalOperator == "&&"){
                            code = code.replace("%%OTHERREPEAT%%", codeAndPropTemplate)
                        }
                        else if (prop.logicalOperator == "||") {
                            code = code.replace("%%OTHERREPEAT%%", codeOrPropTemplate)
                        }
                    }
                }
            })

            code = code.replace("%%OTHERREPEAT%%", "")

            this.props.KPIActions.DatosKPIActions.codeChange(code)
            this.props.KPIActions.DatosKPIActions.continueSteper()
        }

        this.props.KPIActions.DatosKPIActions.CodeWizardActions.modifyErrors(errors)
    }

    @autobind setWorkflowSuggestionList(){
        let suggestionList = []

        this.props.kpi.datoskpi.codewizard.workflows.map( wf => {
            suggestionList.push(wf.name)
        })

        this.props.KPIActions.DatosKPIActions.CodeWizardActions.changeSuggestionList(suggestionList)
    }

    @autobind setPropertiesSuggestionList(){
        let suggestionList = []

        this.props.kpi.datoskpi.codewizard.properties.map(prop => {
            suggestionList.push(prop.name)
        })

        this.props.KPIActions.DatosKPIActions.CodeWizardActions.changeSuggestionList(suggestionList)
    }

    componentWillMount(){
        if(this.props.kpi.datoskpi.codewizard.token === undefined){
            this.props.KPIActions.DatosKPIActions.CodeWizardActions.authenticationCITIUS();
        }

        this.templateType(0)
    }

    getStateGalego(state){
        switch(state){
            case "active":
                return "Activo"

            case "stalled":
                return "Parado"

            case "running":
                return "Correndo"

            case "executing":
                return "Executando"

            case "finished":
                return "Acabado"
        }
    }

    getTypeTemplateGalego(typeTemplate){
        switch(typeTemplate){
            case "workflowTemplate":
                return "Plantilla de Workflow"
                
            case "taskTemplate":
                return "Plantilla de tarefas"

            case "propertyTemplate":
                return "Plantilla de propiedes"
        }

    }

    getRenderPropertyTemplate(prop){
        let errors = this.props.kpi.datoskpi.codewizard.errors
        if(prop.primitiveAtributes === undefined){
            return (
                <div className={styles.atributes}>
                    <div className={styles.primitiveType}>
                        <div className={styles.operator}>
                            <SelectField hintText="Operador" value={this.props.kpi.datoskpi.codewizard.propertyTemplate.tempProperty.comparisonOperator} onChange={this.setTempPropertyComparisonOperator} style={{width: "100%"}} errorText={errors.comparisonOperator && "Debe escoller un operador"}>
                                <MenuItem value="==" primaryText="==" />
                                <MenuItem value=">" primaryText=">" />
                                <MenuItem value="<" primaryText="<" />
                                <MenuItem value=">=" primaryText=">=" />
                                <MenuItem value="<=" primaryText="<=" />
                            </SelectField>
                        </div>

                        <div className={styles.value}>
                            {prop.type === "BooleanType" ? (
                                <SelectField hintText="Valor" value={this.props.kpi.datoskpi.codewizard.propertyTemplate.tempProperty.value} onChange={this.setPropertyValue} style={{width: "100%"}} errorText={errors.valueMessage}>
                                    <MenuItem value="true" primaryText="True" />
                                    <MenuItem value="false" primaryText="False" />
                                </SelectField>
                            ):(
                                <TextField hintText="Valor" onBlur={this.setPropertyValue} className={styles.textFieldwidthAll} errorText={errors.valueMessage}/>
                            )}
                        </div>
                    </div>
                </div>
            )
        }
        else if(prop.primitiveAtributes.length > 0){
            return(
                <div>
                </div>
            )
            
        }

        return (
            <div>
            </div>
        )
    }

    render() {
        const {codewizard} = this.props.kpi.datoskpi

        switch(codewizard.typeTemplate){
            case 0:
                return (
                    <div className={styles.selectTemplate}>
                        <h1>Seleccionar plantilla</h1>
                        { codewizard.isLoading ? (
                            <div className={styles.refreshIndicator}>
                                <RefreshIndicator
                                    size={70}
                                    left={0}
                                    top={0}
                                    loadingColor={"#FF0000"}
                                    status="loading"
                                    style={{diplay:'block', position:'relative', margin: 'auto'}}/>
                            </div>
                        ) : (
                            <div className={styles.scroll}>
                                <div className={styles.templates}>
                                    {codewizard.codeTemplates.map((codeTemplate, index) => {
                                        return (
                                            <div key={index} className={styles.template} onTouchTap={() => { this.templateType(codeTemplate) }}>
                                                <div className={styles.name}>{codeTemplate.name}</div>
                                                <Paper style={{width: '100%', height: '100%'}} zDepth={2}>
                                                    <div className={styles.text}>
                                                        <h4>Tipo:</h4>
                                                        <p>{this.getTypeTemplateGalego(codeTemplate.type)}</p>
                                                        <h4>Descripción:</h4>
                                                        <p>{codeTemplate.description}</p>
                                                    </div>
                                                </Paper>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

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
                            <AutoComplete openOnFocus={true} hintText="Workflow" ref={element => this.workflowTemplateInput = element } fullWidth={true} dataSource={codewizard.suggestionList} filter={AutoComplete.caseInsensitiveFilter} style={{flex: 2, marginRight: '10px'}} errorText={codewizard.errors.workflowTemplateInput && "O workflow non existe"} />

                            <SelectField style={{flex: 1}} hintText="Estado" value={codewizard.taskWorkflowState} onChange={this.changeTaskWorkflowState}>
                                <MenuItem value="active" primaryText="Activo" />
                                <MenuItem value="finished" primaryText="Acabado" />
                            </SelectField>

                            <IconButton className={styles.actions} onTouchTap={this.addWorkflowToWorkflowTemplate}>
                                <ContentAdd />
                            </IconButton>
                        </div>                        

                        <div>
                            <TextField hintText="Ventá Temporal (horas)" className={styles.textFieldwidthAll} onBlur={this.changeTimeWindow} errorText={codewizard.errors.timeWindowInput && "Valor Incorrecto, debe ser enteiro en horas"}/>
                        </div>

                        <div>
                            <FlatButton label="Xerar Código" onTouchTap={() => { this.workflowTemplateCodeGenerate() }}/>
                        </div>
                    </div>
                )

            case 2:
                return (
                    <div className={styles.taskTemplate}>
                        <div>
                            <AutoComplete openOnFocus={true} hintText="Workflow" ref={element => this.taskTemplateWorkflowInput = element } onNewRequest={this.changeTaskTemplateWorkflowTaskSugestions} fullWidth={true} dataSource={codewizard.suggestionList} filter={AutoComplete.caseInsensitiveFilter} style={{flex: 2, marginRight: '10px'}} errorText={codewizard.errors.taskTemplateWorkflowInput && "O workflow non existe"} />
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
                            <AutoComplete openOnFocus={true} hintText="Tarefa do Workflow" ref={element => this.taskTemplateTaskInput = element } fullWidth={true} dataSource={codewizard.suggestionList} filter={AutoComplete.caseInsensitiveFilter} style={{flex: 2, marginRight: '10px'}} errorText={codewizard.errors.taskTemplateTaskInput && "A tarefa non existe"} />

                            <SelectField style={{flex: 1}} hintText="Estado"  value={codewizard.taskWorkflowState} onChange={this.changeTaskWorkflowState}>
                                <MenuItem value="active" primaryText="Activo" />
                                <MenuItem value="stalled" primaryText="Parado" />
                                <MenuItem value="running" primaryText="Correndo" />
                                <MenuItem value="executing" primaryText="Executando" />
                                <MenuItem value="finished" primaryText="Acabado" />
                            </SelectField>

                            <IconButton className={styles.actions} onTouchTap={() => this.addTaskToTaskTemplate()}>
                                <ContentAdd />
                            </IconButton>
                        </div>

                        <div>
                            <TextField hintText="Ventá Temporal (horas)" className={styles.textFieldwidthAll} onBlur={this.changeTimeWindow} errorText={codewizard.errors.timeWindowInput && "Valor Incorrecto, debe ser enteiro en horas"}/>
                        </div>

                        <div>
                            <FlatButton label="Limpar" onTouchTap={this.cleanTaskTemplate}/>
                            <FlatButton label="Xerar Código" onTouchTap={() => { this.taskTemplateCodeGenerate() }}/>
                        </div>
                    </div>
                )

            case 3:
                return (
                    <div className={styles.propertyTemplate}>
                        <div className={styles.reduxOperatorProperty}>
                            <div className={styles.property}>
                                <AutoComplete openOnFocus={true} hintText="Propiedade" onNewRequest={this.changeReduxPropertyPropertyTemplate} fullWidth={true} dataSource={codewizard.suggestionList} filter={AutoComplete.caseInsensitiveFilter} errorText={codewizard.errors.reduxProperty && "Non existe a propiedade"}/>
                            </div>
                            
                            <div className={styles.reduxOperatorSelect}>
                                <SelectField hintText="Operador Reducción" value={codewizard.propertyTemplate.reduxOperator} onChange={this.changeReduxOperatorPropertyTemplate} style={{width:"100%"}} errorText={codewizard.errors.reduxOperator && "Escolla unha operacion"}>
                                    <MenuItem value="max" primaryText="Maximo" />
                                    <MenuItem value="min" primaryText="Minimo" />
                                    <MenuItem value="count" primaryText="Contar" />
                                    <MenuItem value="average" primaryText="Media" />
                                </SelectField>
                            </div>
                        </div>                        

                        <Divider className={styles.divider}/> 

                        <div>
                            {codewizard.propertyTemplate !== undefined && codewizard.propertyTemplate.properties !== undefined && codewizard.propertyTemplate.properties.length > 0 ? (
                                <div className={styles.table}>
                                    {codewizard.propertyTemplate.properties.map((prop, index) => {
                                        return (
                                            <div key={index} className={styles.propLine}>
                                                <div className={styles.prop}>{prop.name}</div>
                                                <div className={styles.state}>
                                                    <div className={styles.comparisonOperator}>{prop.comparisonOperator}</div>
                                                    <div className={styles.value}>{prop.value}</div>
                                                    <div className={styles.logicalOperator}>{prop.logicalOperator}</div>
                                                </div>
                                                <div className={styles.actions}>
                                                    <IconButton onTouchTap={() => this.deletePropToPropertyTemplate(index)}> 
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </div>
                                            </div>
                                        )
                                    })}

                                    <Divider className={styles.divider}/> 
                                </div>
                            ): (
                                null
                            )}

                            <div className={styles.otherProperties}>
                                <div className={styles.propertyName}>
                                    <AutoComplete openOnFocus={true} ref={element => this.propertyTemplateInput = element } hintText="Propiedade" dataSource={codewizard.suggestionList} filter={AutoComplete.caseInsensitiveFilter} onNewRequest={this.propertySelected} fullWidth={true} errorText={codewizard.errors.propConditionInput && "A propiedade non existe"}/>
                                </div>

                                {codewizard.propertyTemplate.renderProperty ? (
                                    this.getRenderPropertyTemplate(codewizard.propertyTemplate.tempProperty)
                                ):(
                                    <div className={styles.atributes}>
                                    </div>
                                )}
                            </div>

                            <div className={styles.propertyActions}>
                                <FloatingActionButton mini={true} className={styles.button} onTouchTap={() => this.addPropertyToListPropertyTemplate("&&")}>
                                  <div>&&</div>
                                </FloatingActionButton>

                                <FloatingActionButton mini={true} className={styles.button} onTouchTap={() => this.addPropertyToListPropertyTemplate("||")}>
                                  <div>||</div>
                                </FloatingActionButton>
                            </div>
                        </div>

                        <div>
                            <TextField hintText="Ventá Temporal (horas)" className={styles.textFieldwidthAll} onBlur={this.changeTimeWindow} errorText={codewizard.errors.timeWindowInput && "Valor Incorrecto, debe ser enteiro en horas"}/>
                        </div>

                        <div>
                            <FlatButton label="Xerar Código" onTouchTap={() => this.propertyTemplateCodeGenerate()}/>
                        </div>
                    </div>
                )
        }
    }
}

export default CodeWizard