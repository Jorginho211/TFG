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

    @autobind changeWorkflowState(evt, index, value){
        this.props.KPIActions.DatosKPIActions.CodeWizardActions.changeWorkflowState(value)
    }

    @autobind addWorkflowToWorkflowTemplate(){
        let exist = false
        
        let workflow = {
            name: this.workflowTemplateInput.getValue(),
            state: this.props.kpi.datoskpi.codewizard.workflowState,
        }

        this.props.KPIActions.DatosKPIActions.CodeWizardActions.addWorkflowToWorkflowTemplate(workflow, this.props.kpi.datoskpi.codewizard.workflowTemplate)

        this.workflowTemplateInput.input.value=""
    }

    @autobind deleteWorkflowToWorkflowTemplate(index){
        this.props.KPIActions.DatosKPIActions.CodeWizardActions.deleteWorkflowToWorkflowTemplate(this.props.kpi.datoskpi.codewizard.workflowTemplate, index)
    }

    @autobind changeTimeWindow(evt){
        this.props.KPIActions.DatosKPIActions.CodeWizardActions.changeTimeWindow(parseFloat(evt.target.value))
    }

    getWorkflowStateGalego(state){
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
                    <div className={styles.workflows}>
                        {codewizard.workflowTemplate !== undefined && codewizard.workflowTemplate.length > 0 ? (
                            <div className={styles.table}>
                                {codewizard.workflowTemplate.map((workflow, index) => {
                                    return (
                                        <div key={index} className={styles.workflowLine}>
                                            <div className={styles.workflow}>{workflow.name}</div>
                                            <div className={styles.state}>{this.getWorkflowStateGalego(workflow.state)}</div>
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
                            {/*<TextField hintText="Workflow" ref={element => this.workflowTemplateInput = element } className={styles.textField}/>*/}
                            <AutoComplete hintText="Workflow" className={styles.textField} /> 

                            <SelectField style={{flex: 1}} value={codewizard.workflowState} onChange={this.changeWorkflowState}>
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
                    <div>
                        Que tal
                        {codewizard.typeTemplate}
                        <FlatButton label="Xerar Código" onTouchTap={() => { this.templateType(3) }}/>
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