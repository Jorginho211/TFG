import React, {Component} from 'react'

import FlatButton from 'material-ui/FlatButton';

import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

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
                        <div className={styles.inputs}>
                            <TextField hintText="Workflow" className={styles.textField} />

                            <SelectField value={1}>
                                <MenuItem value={1} primaryText="Comezado" />
                                <MenuItem value={2} primaryText="Acabado" />
                                <MenuItem value={3} primaryText="Parado" />
                            </SelectField>

                            <IconButton>
                                <ContentAdd />
                            </IconButton>
                        </div>

                        <FlatButton label="Seguinte" onTouchTap={() => { this.templateType(2) }}/>
                    </div>
                )

            case 2:
                return (
                    <div>
                        Que tal
                        {codewizard.typeTemplate}
                        <FlatButton label="Seguinte" onTouchTap={() => { this.templateType(3) }}/>
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