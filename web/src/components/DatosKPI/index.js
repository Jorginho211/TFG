import React, {Component} from 'react'

import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import {
  Step,
  Stepper,
  StepLabel,
  StepButton,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';

import LineGraphImg from './Images/line.svg'
import PieGraphImg from './Images/pie.svg'
import BarGraphImg from './Images/bar.svg'

import IconButton from 'material-ui/IconButton';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import SelectField from 'material-ui/SelectField';

import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';

import { autobind } from 'core-decorators';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';

import CodeWizard from '../CodeWizard/'

@CSSModules(styles)
class DatosKPI extends Component {
    constructor() {
        super();
    }

    @autobind continueSteper(){
        switch(this.props.kpi.datoskpi.stepIndex){
          case 0:
            let errors = {
              ...this.props.kpi.datoskpi.errors,
              nameInput: true,
              descriptionInput: true,
              keywordsInput: true,
              timeInput: true,
            }

            let {kpi} = this.props.kpi.datoskpi

            if(kpi.name !== undefined && kpi.name.length > 0) { errors.nameInput = false }
            if(kpi.description !== undefined && kpi.description.length > 0) { errors.descriptionInput = false }
            if(kpi.keywords !== undefined && kpi.keywords.length > 0) { errors.keywordsInput = false }
            if(kpi.time !== undefined && !isNaN(parseInt(kpi.time))) { errors.timeInput = false }

            this.props.KPIActions.DatosKPIActions.modifyErrors(errors)

            if(!errors.nameInput && !errors.descriptionInput && !errors.keywordsInput && !errors.timeInput){
              window.addEventListener("message", this.iframeManage)
              if(kpi.code === undefined)
                this.props.KPIActions.DatosKPIActions.continueSteper()
              else
                this.selectStepSteper(2)
            }
            break;

          case 2:
            this.refs.iframe.contentWindow.postMessage("requestData", "http://localhost:7331")
            break;

          default:
            this.props.KPIActions.DatosKPIActions.continueSteper()
        }
    }

    @autobind selectStepSteper(step){
        this.props.KPIActions.DatosKPIActions.selectStepSteper(step)
    }

    @autobind toggleDialog(force = false){
        if(this.props.kpi.isDialogOpened || force){
            if( this.refs.iframe !== undefined){
              this.refs.iframe.contentWindow.postMessage("removeData", "http://localhost:7331");
            }
            window.removeEventListener("message", this.iframeManage)
            this.props.KPIActions.DatosKPIActions.deleteData()
            this.props.KPIActions.toggleDialog()
            this.props.KPIActions.DatosKPIActions.CodeWizardActions.deleteData()
        }
    }

    @autobind nameChange(){
      this.props.KPIActions.DatosKPIActions.nameChange(this.nameInput.getInputNode().value)
    }

    @autobind keywordsChange(){
      this.props.KPIActions.DatosKPIActions.keywordsChange(this.keywordsInput.getInputNode().value)
    }

    @autobind descriptionChange(){
      this.props.KPIActions.DatosKPIActions.descriptionChange(this.descriptionInput.getInputNode().value)
    }

    @autobind timeChange(){
      this.props.KPIActions.DatosKPIActions.timeChange(this.timeInput.getInputNode().value)
    }

    @autobind iframeManage(evt){
      if(evt.origin === "http://localhost:7331"){
        if(!(evt.data === "removeOK" || evt.data === "saveOK")){
          if(evt.data !== null){
            this.props.KPIActions.DatosKPIActions.codeChange(evt.data)
          }
          else {
            this.props.KPIActions.DatosKPIActions.codeChange(undefined)
          }

          this.refs.iframe.contentWindow.postMessage("removeData", "http://localhost:7331");
          setTimeout(() => { this.props.KPIActions.DatosKPIActions.iframeOnceLoad(false); this.props.KPIActions.DatosKPIActions.continueSteper() }, 5)             
        }
      }
    }

    @autobind representationTypeChange(evt, index, value){
      this.props.KPIActions.DatosKPIActions.representationTypeChange(value)
    }

    @autobind mapXAxisChange(evt, index, value){
      this.props.KPIActions.DatosKPIActions.mapXAxisChange(value)
    }

    @autobind mapYAxisChange(evt, index, value){
      this.props.KPIActions.DatosKPIActions.mapYAxisChange(value)
    }

    @autobind labelXAxisChange(){
      this.props.KPIActions.DatosKPIActions.labelXAxisChange(this.labelXAxisInput.getInputNode().value)
    }

    @autobind labelYAxisChange(){
      this.props.KPIActions.DatosKPIActions.labelYAxisChange(this.labelYAxisInput.getInputNode().value)
    }

    @autobind toggleRepresentationNewOrEdit(){
      this.props.KPIActions.DatosKPIActions.toggleRepresentationNewOrEdit()
    }

    @autobind addRepresentationToEdit(representation, index){
      this.props.KPIActions.DatosKPIActions.addRepresentationToEdit(representation, index)
      this.toggleRepresentationNewOrEdit()
    }

    @autobind addRepresentationToNew(){
      this.props.KPIActions.DatosKPIActions.addRepresentationToNew()
      this.toggleRepresentationNewOrEdit();
    }

    @autobind addRepresentationToKPI(){
      this.props.KPIActions.DatosKPIActions.addRepresentationToKPI(this.props.kpi.datoskpi.kpi, this.props.kpi.datoskpi.representation)
      this.toggleRepresentationNewOrEdit()
    }

    @autobind deleteRepresentation(index){
      this.props.KPIActions.DatosKPIActions.deleteRepresentation(this.props.kpi.datoskpi.kpi, index)

      if(this.props.kpi.datoskpi.kpi.representation === undefined){
        this.toggleRepresentationNewOrEdit()
      } 
    }

    @autobind storeKPIBD(){
      //this.props.KPIActions.toggleLoading()
      this.props.KPIActions.DatosKPIActions.storeKPIBD(this.props.kpi.datoskpi.kpi)
      this.props.KPIActions.DatosKPIActions.deleteData()
      this.props.KPIActions.DatosKPIActions.CodeWizardActions.deleteData()
    }

    @autobind loadDataIframe() {
      if(!this.props.kpi.datoskpi.iframeOnceLoad){
        this.props.KPIActions.DatosKPIActions.iframeOnceLoad(true)
        if(this.props.kpi.datoskpi.kpi.code !== undefined && this.props.kpi.datoskpi.kpi.code !== null){
          setTimeout(() => { this.refs.iframe.contentWindow.postMessage("code/;/" + this.props.kpi.datoskpi.kpi.code, "http://localhost:7331"); }, 300)
        }
      }
    }

    @autobind addPropertyCode(evt, menuItem, index){
      this.refs.iframe.contentWindow.postMessage("property/;/" + menuItem.props.value, "http://localhost:7331")
    }

    componentDidMount(){
        this.props.KPIActions.DatosKPIActions.getPropertiesBD();
        this.props.KPIActions.DatosKPIActions.CodeWizardActions.requestCodeTemplates();
    }

    getGrapthicImg(type){
      switch(type){
        case "line":
          return (
            <div>
              <img src={LineGraphImg} />
            </div>
          )

        case "bar":
          return (
            <div>
              <img src={BarGraphImg} />
            </div>
          )

        case "pie":
          return (
            <div>
              <img src={PieGraphImg} />
            </div>
          )
      }
    }

    getGraphicData(type){
      switch(type){
        case "line":
        case "bar":
          return(
            <div className={styles.representationData}>
              {this.props.kpi.datoskpi.kpi.variables ? (
                <div className={styles.mappingVariables}>
                  <div className={styles.variables}>
                    <SelectField style={{width: '100%'}} value={this.props.kpi.datoskpi.representation.mapXAxis} floatingLabelText="Mapeo Eixo X" onChange={this.mapXAxisChange}>    
                      {this.props.kpi.datoskpi.kpi.variables.map((variable,index) => {
                        return (
                          <MenuItem key={index} value={variable} primaryText={variable} />
                        )
                      })}
                    </SelectField>
                  </div>
                  <div className={styles.variables}>
                    <SelectField style={{width: '100%'}} value={this.props.kpi.datoskpi.representation.mapYAxis} floatingLabelText="Mapeo Eixo Y" onChange={this.mapYAxisChange}>
                      {this.props.kpi.datoskpi.kpi.variables.map((variable,index) => {
                        return (
                          <MenuItem key={index} value={variable} primaryText={variable} />
                        )
                      })}
                    </SelectField>
                  </div>
                </div>
                ): (
                  null
                )}
              <div className={styles.textFieldsFlex}>
                <div>
                  <TextField floatingLabelText="Etiqueta Eixo X" onBlur={this.labelXAxisChange} defaultValue={this.props.kpi.datoskpi.representation.labelXAxis} ref={element => this.labelXAxisInput = element } className={styles.textField}/>
                </div>
                <div>
                  <TextField floatingLabelText="Etiqueta Eixo Y" onBlur={this.labelYAxisChange} defaultValue={this.props.kpi.datoskpi.representation.labelYAxis} ref={element => this.labelYAxisInput = element } className={styles.textField}/>
                </div>
              </div>
            </div>
          )

        case "pie":
          return (
            <div className={styles.representationData}>
              {this.props.kpi.datoskpi.kpi.variables ? (
                <div className={styles.mappingVariables}>
                  <div className={styles.variables}>
                    <SelectField style={{width: '100%'}} value={this.props.kpi.datoskpi.representation.mapXAxis} onChange={this.mapXAxisChange} floatingLabelText="Mapeo Nome do Sectores">    
                      {this.props.kpi.datoskpi.kpi.variables.map((variable,index) => {
                        return (
                          <MenuItem key={index} value={variable} primaryText={variable} />
                        )
                      })}
                    </SelectField>
                  </div>
                  <div className={styles.variables}>
                    <SelectField style={{width: '100%'}} value={this.props.kpi.datoskpi.representation.mapYAxis} onChange={this.mapYAxisChange} floatingLabelText="Mapeo Porcentaxe">
                      {this.props.kpi.datoskpi.kpi.variables.map((variable,index) => {
                        return (
                          <MenuItem key={index} value={variable} primaryText={variable} />
                        )
                      })}
                    </SelectField>
                  </div>
                </div>
                ): (
                  null
                )}
            </div>
          )
      }
    }

    getStepContent(step){
        switch(step){
            case 0:
                return (
                    <div className={styles.datos}>
                      <div>
                        <div>
                            <TextField floatingLabelText="Nome" ref={element => this.nameInput = element } defaultValue={this.props.kpi.datoskpi.kpi.name} onBlur={this.nameChange} errorText={this.props.kpi.datoskpi.errors.nameInput && "Campo Vacio"} className={styles.textField} />
                        </div>
                        <div>    
                            <TextField floatingLabelText="Palabras Clave" ref={element => this.keywordsInput = element } defaultValue={this.props.kpi.datoskpi.kpi.keywords} onBlur={this.keywordsChange} errorText={this.props.kpi.datoskpi.errors.keywordsInput && "Campo Vacio"} className={styles.textField}/>
                        </div>
                        <div>
                            <TextField floatingLabelText="Descrición" ref={element => this.descriptionInput = element } defaultValue={this.props.kpi.datoskpi.kpi.description} onBlur={this.descriptionChange} className={styles.textField} errorText={this.props.kpi.datoskpi.errors.descriptionInput && "Campo Vacio"} multiLine={true}/>
                        </div>
                        <div>
                          <TextField floatingLabelText="Tempo Refresco" ref={element => this.timeInput = element } defaultValue={this.props.kpi.datoskpi.kpi.time} onBlur={this.timeChange} errorText={this.props.kpi.datoskpi.errors.timeInput && "Valor Incorrecto, debe ser enteiro en segundos"} className={styles.textField} />
                        </div>
                      </div>
                    </div>
                );
            
            case 1:
                return (
                  <CodeWizard kpi={this.props.kpi} KPIActions={this.props.KPIActions} />
                )
            case 2:
                return (
                    <div className={styles.scalakata}>
                      <iframe ref="iframe" src="http://localhost:7331" className={styles.iframe} onLoad={this.loadDataIframe}></iframe>
                      <div className={styles.list}>
                        <Menu onItemTouchTap={this.addPropertyCode}>
                          {this.props.kpi.datoskpi.properties.map( (property, index) => {
                            return (
                              <MenuItem key={index} value={property} primaryText={property} />
                            )
                          })}
                        </Menu>
                      </div>
                    </div>
                );

            case 3:
                return (
                  <div>
                    {this.props.kpi.datoskpi.isNewOrEditRepresentation ? (
                      <div className={styles.representationAdd}>
                          {this.props.kpi.datoskpi.representation.index === undefined ? (
                              <div>
                                <div className={styles.center}>
                                  <div className={styles.selectFieldImg}>
                                    <SelectField value={this.props.kpi.datoskpi.representation.type} onChange={this.representationTypeChange}>
                                      <MenuItem value="line" primaryText="Lineas" />
                                      <MenuItem value="pie" primaryText="Sectores" />
                                      <MenuItem value="bar" primaryText="Barras" />
                                    </SelectField>

                                    {this.getGrapthicImg(this.props.kpi.datoskpi.representation.type)}
                                  </div>
                                </div>

                                <div className={styles.inputs}>
                                  {this.getGraphicData(this.props.kpi.datoskpi.representation.type)}
                                </div>
                              </div>
                            ) : (
                              <div>
                                {this.getGraphicData(this.props.kpi.datoskpi.representation.type)}
                              </div>
                            )}
                      </div>
                    ):(
                      <div>
                        {this.props.kpi.datoskpi.kpi.representation !== undefined ? (
                            <div className={styles.graphicsGroupKPI}>
                              {this.props.kpi.datoskpi.kpi.representation.map((representation, index) => {
                                return (
                                  <div key={index}>
                                    {this.getGrapthicImg(representation.type)}
                                    <div className={styles.controls}>
                                      <IconButton onTouchTap={() => this.addRepresentationToEdit(representation, index)}>
                                        <EditorModeEdit />
                                      </IconButton>
                                      <IconButton onTouchTap={() => this.deleteRepresentation(index)}>
                                        <DeleteIcon />
                                      </IconButton>
                                    </div>
                                  </div>
                                )
                              })}                          
                            </div>
                          ) : (
                            null
                          )
                        }

                        <div className={styles.graphicAddFloatingButton}>
                          <FloatingActionButton onTouchTap={() =>{ this.addRepresentationToNew()}}>
                            <ContentAdd />
                          </FloatingActionButton>
                        </div>
                      </div>
                    )}
                  </div>
                );
        }
    }

    getStepControls(isNewKPI){
      let {datoskpi} = this.props.kpi;

      if(datoskpi.stepIndex > 0){
        if(isNewKPI && datoskpi.stepIndex === 1){
          return
        }
        if(datoskpi.stepIndex === 2){
          if(datoskpi.kpi.representation === undefined && !datoskpi.isNewOrEditRepresentation){
            return ( <RaisedButton label="Seguinte" primary={true} onTouchTap={() => {this.toggleRepresentationNewOrEdit(); this.continueSteper()}} /> )
          }
          return ( <RaisedButton label="Seguinte" primary={true} onTouchTap={() => {this.continueSteper();}} /> )
        }
        else {
          if(datoskpi.isNewOrEditRepresentation){
            return (
              <div>
                <RaisedButton label="Aceptar" primary={true} className={styles.raisedButton} onTouchTap={() => {this.addRepresentationToKPI()} }/>
                {datoskpi.kpi.representation !== undefined ? (
                  <RaisedButton label="Cancelar" primary={true} className={styles.raisedButton} onTouchTap={() => this.toggleRepresentationNewOrEdit()} />
                ):(
                  null
                )}
              </div>
            )
          }

          return ( <RaisedButton label="Confirmar" primary={true} onTouchTap={this.storeKPIBD}/> )
        }
      }

      return ( <RaisedButton label="Seguinte" primary={true} onTouchTap={() => {this.continueSteper();}} /> )
    }

    getStepper(linear){
      if(linear){
        return (
          <Stepper linear={linear} activeStep={ this.props.kpi.datoskpi.stepIndex }>
            <Step active={ this.props.kpi.datoskpi.stepIndex === 0 }>
              <StepButton onTouchTap={ () => this.selectStepSteper(0) }>Datos</StepButton>
            </Step>
            <Step active={ this.props.kpi.datoskpi.stepIndex === 1 } >
              <StepButton>Wizard Código</StepButton>
            </Step>
            <Step active={ this.props.kpi.datoskpi.stepIndex === 2 }>
              <StepButton onTouchTap={ () => { this.selectStepSteper(2); } }>Formulación</StepButton>
            </Step>
            <Step active={ this.props.kpi.datoskpi.stepIndex === 3 } >
              <StepButton onTouchTap={ () => this.selectStepSteper(3) }>Representación</StepButton>
            </Step>
          </Stepper>
        )
      }
      else {
        return (
          <Stepper linear={linear} activeStep={ this.props.kpi.datoskpi.stepIndex }>
            <Step active={ this.props.kpi.datoskpi.stepIndex === 0 }>
              <StepButton onTouchTap={ () => this.selectStepSteper(0) }>Datos</StepButton>
            </Step>
            <Step active={ this.props.kpi.datoskpi.stepIndex === 2 }>
              <StepButton onTouchTap={ () => { this.selectStepSteper(2); } }>Formulación</StepButton>
            </Step>
            <Step active={ this.props.kpi.datoskpi.stepIndex === 3 } >
              <StepButton onTouchTap={ () => this.selectStepSteper(3) }>Representación</StepButton>
            </Step>
          </Stepper>
        )
      }
      
    }

    render() {
      const {kpi} = this.props;
      const {datoskpi} = kpi;

      return (
        <div>
          <Dialog
          title="Crear KPI"
          modal={false}
          open={kpi.isDialogOpened}
          onRequestClose={this.toggleDialog}
          autoScrollBodyContent={true}
          contentStyle={{width:'68%', maxWidth: 'none'}}
          >
          
            {this.getStepper(kpi.isNew)}
        
            <div>
              {this.getStepContent(datoskpi.stepIndex)}

              <div className={styles.stepperControls}>
                <div className={styles.raisedButton}>
                  {this.getStepControls(kpi.isNew)}
                </div>
              </div>
            </div>
          </Dialog>
        </div>
    	)
    }
}

export default DatosKPI