import React, {Component} from 'react'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import Table from 'material-ui/Table/Table';
import TableHeaderColumn from 'material-ui/Table/TableHeaderColumn';
import TableRow from 'material-ui/Table/TableRow';
import TableHeader from 'material-ui/Table/TableHeader';
import TableRowColumn from 'material-ui/Table/TableRowColumn';
import TableBody from 'material-ui/Table/TableBody';

import IconButton from 'material-ui/IconButton';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import Equalizer from 'material-ui/svg-icons/av/equalizer'

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import DatosKPI from '../DatosKPI/'

import { autobind } from 'core-decorators';
import CSSModules from 'react-css-modules';

import styles from './styles.scss';

@CSSModules(styles)
class KPI extends Component {
    constructor() {
        super();
    }

    componentDidMount(){
        this.props.KPIActions.requestKpis();
    }

    @autobind filterTypeChange(evt, index, value){
        this.props.KPIActions.filterTypeChange(value)
    }

    @autobind filter(kpis) {
        this.props.KPIActions.filter(kpis, this.filterInput.getValue(), this.props.kpi.filterType)
    }

    @autobind toggleDialog(force = false){
        if(this.props.kpi.isDialogOpened || force){
            this.props.KPIActions.toggleDialog()
            this.props.KPIActions.DatosKPIActions.selectStepSteper(0)
        }
    }

    @autobind toggleDialogKPIEspecified(force = false, payload, step) {
        if(this.props.kpi.isDialogOpened || force){
            this.props.KPIActions.DatosKPIActions.addData(payload)
            
            this.props.KPIActions.toggleDialog()
            this.props.KPIActions.DatosKPIActions.selectStepSteper(step)      
        }
    }

    @autobind newKPI(isNew = true){
        this.props.KPIActions.newKPI(isNew)
    }

    @autobind deleteKPI(id){
        this.props.KPIActions.deleteKPI(id)
    }

    render() {
        const { kpi } = this.props;  

    	return (
    		<div>
    			<div>
    				<TextField ref={element => this.filterInput = element } onChange={() => this.filter(kpi.kpis)} floatingLabelText="Filtro" className={styles.textField}/>
    			</div>

                { kpi.isLoading ?
                    ( 
                        <div className={styles.refreshIndicator}>
                            <RefreshIndicator
                                size={100}
                                left={0}
                                top={0}
                                loadingColor={"#FF0000"}
                                status="loading"
                                style={{diplay:'block', position:'relative'}}/>
                        </div>
                    )
                    :
                    (
                        <div>                            
                            <Table
                                height={ '500px' }
                                fixedHeader= { true }
                                >

                                <TableHeader
                                    displaySelectAll = {false}
                                >
                                  <TableRow>
                                    <TableHeaderColumn>Nombre</TableHeaderColumn>
                                    <TableHeaderColumn>Descripción</TableHeaderColumn>
                                    <TableHeaderColumn>Palabras Clave</TableHeaderColumn>
                                    <TableHeaderColumn>Accións</TableHeaderColumn>
                                  </TableRow>
                                </TableHeader>
                                <TableBody
                                    displayRowCheckbox = {false}
                                >

                                    {this.props.kpi.kpis.map(kpi => {
                                        return(
                                            kpi.visibility ? (
                                                <TableRow key={kpi.id}>
                                                    <TableRowColumn>{kpi.name}</TableRowColumn>
                                                    <TableRowColumn>{kpi.description}</TableRowColumn>
                                                    <TableRowColumn>{kpi.keywords}</TableRowColumn>
                                                    <TableRowColumn>
                                                        <IconButton onTouchTap={ () => {this.newKPI(false); this.toggleDialogKPIEspecified(true, JSON.parse(JSON.stringify(kpi)), 0)} }>
                                                            <EditorModeEdit />
                                                        </IconButton>

                                                        <IconButton onTouchTap={ () => this.deleteKPI(kpi.id)}>
                                                            <DeleteIcon />
                                                        </IconButton>

                                                        <IconButton onTouchTap={ () => {this.newKPI(false); this.toggleDialogKPIEspecified(true, JSON.parse(JSON.stringify(kpi)), 2)} }>
                                                            <Equalizer />
                                                        </IconButton>
                                                    </TableRowColumn>
                                                </TableRow>
                                            ):
                                            (
                                                null
                                            )
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    )
                }
                

                <FloatingActionButton onTouchTap={ () => { this.newKPI(); this.toggleDialog(true) }} className={styles.floatingButton}>
                    <ContentAdd />
                </FloatingActionButton>

                <DatosKPI kpi={kpi} KPIActions={this.props.KPIActions} />

    		</div>
    	)
    }
}

export default KPI