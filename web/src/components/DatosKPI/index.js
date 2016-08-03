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

    generateUUID(){
      function s4(){
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      }

      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();  
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

            if(kpi.id === undefined) { kpi.id = this.generateUUID() }
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
      let errors = {
        ...this.props.kpi.datoskpi.errors,
        selectFieldGraphicType: false,
        mapXAxis: false,
        mapYAxis: false,
      }

      if(this.props.kpi.datoskpi.kpi.representation !== undefined){
        this.props.kpi.datoskpi.kpi.representation.map( repr => {
          if(repr.type === this.props.kpi.datoskpi.representation.type){
            errors.selectFieldGraphicType =true
          }
        })
      }

      switch(this.props.kpi.datoskpi.representation.type){
        case "line":
        case "pie":
        case "bar":

          if(this.props.kpi.datoskpi.representation.mapXAxis === undefined || this.props.kpi.datoskpi.representation.mapXAxis.length === 0) { errors.mapXAxis = true}
          if(this.props.kpi.datoskpi.representation.mapYAxis === undefined || this.props.kpi.datoskpi.representation.mapYAxis.length === 0) { errors.mapYAxis = true}
          console.log(errors)
          break
        case "number":
          if(this.props.kpi.datoskpi.representation.mapXAxis === undefined || this.props.kpi.datoskpi.representation.mapXAxis.length === 0) { errors.mapXAxis = true}
          break   
      }

      if(!errors.selectFieldGraphicType && !errors.mapXAxis && !errors.mapYAxis){
        this.props.KPIActions.DatosKPIActions.addRepresentationToKPI(this.props.kpi.datoskpi.kpi, this.props.kpi.datoskpi.representation)
        this.toggleRepresentationNewOrEdit()
      }

      this.props.KPIActions.DatosKPIActions.modifyErrors(errors)
    }

    @autobind deleteRepresentation(index){
      this.props.KPIActions.DatosKPIActions.deleteRepresentation(this.props.kpi.datoskpi.kpi, index)

      if(this.props.kpi.datoskpi.kpi.representation === undefined){
        this.toggleRepresentationNewOrEdit()
      } 
    }

    @autobind storeKPIBD(){
      let methodType = "POST"

      this.props.kpi.kpis.map( kpi => {
        if(this.props.kpi.datoskpi.kpi.id === kpi.id){
          methodType = "PUT"
        }
      })

      this.props.KPIActions.DatosKPIActions.storeKPIBD(this.props.kpi.datoskpi.kpi, methodType)
      this.props.KPIActions.DatosKPIActions.sendJobHadoop(this.props.kpi.datoskpi.kpi.code)
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

        case "number":
          return (
            <div>
              <div className={styles.miniature}>
                <h2>Title</h2>
                <h4>Label</h4>
                <p>Result</p>
              </div>
            </div>
          )

        default:
          return null
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
                    <SelectField style={{width: '100%'}} value={this.props.kpi.datoskpi.representation.mapXAxis} floatingLabelText="Mapeo Eixo X" onChange={this.mapXAxisChange} errorText={ this.props.kpi.datoskpi.errors.mapXAxis && "Ten que haber unha variable de Mapeo para o eixo X" }>    
                      {this.props.kpi.datoskpi.kpi.variables.map((variable,index) => {
                        return (
                          <MenuItem key={index} value={variable} primaryText={variable} />
                        )
                      })}
                    </SelectField>
                  </div>
                  <div className={styles.variables}>
                    <SelectField style={{width: '100%'}} value={this.props.kpi.datoskpi.representation.mapYAxis} floatingLabelText="Mapeo Eixo Y" onChange={this.mapYAxisChange} errorText={this.props.kpi.datoskpi.errors.mapYAxis && "Ten que haber unha variable de Mapeo para o eixo Y" }>
                      {this.props.kpi.datoskpi.kpi.variables.map((variable,index) => {
                        return (
                          <MenuItem key={index} value={variable} primaryText={variable} />
                        )
                      })}
                    </SelectField>
                  </div>
                </div>
                ): (
                  <div className={styles.mappingVariables}>
                    <div className={styles.variables}>
                      <TextField floatingLabelText="Variable Mapeo Eixo X" defaultValue={this.props.kpi.datoskpi.representation.mapXAxis} className={styles.textField} onBlur={(evt) => this.mapXAxisChange(null, null, evt.target.value)} errorText={ this.props.kpi.datoskpi.errors.mapXAxis && "Ten que haber unha variable de Mapeo para o eixo X" }/>
                    </div>
                    <div className={styles.variables}>
                      <TextField floatingLabelText="Variable Mapeo Eixo Y" defaultValue={this.props.kpi.datoskpi.representation.mapYAxis} className={styles.textField} onBlur={(evt) => this.mapYAxisChange(null, null, evt.target.value)} errorText={this.props.kpi.datoskpi.errors.mapYAxis && "Ten que haber unha variable de Mapeo para o eixo Y" }/>
                    </div>
                  </div>                  
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
                    <SelectField style={{width: '100%'}} value={this.props.kpi.datoskpi.representation.mapXAxis} onChange={this.mapXAxisChange} floatingLabelText="Mapeo Nome do Sectores" errorText={this.props.kpi.datoskpi.errors.mapXAxis && "Ten que haber unha variable de Mapeo para o eixo X" }>    
                      {this.props.kpi.datoskpi.kpi.variables.map((variable,index) => {
                        return (
                          <MenuItem key={index} value={variable} primaryText={variable} />
                        )
                      })}
                    </SelectField>
                  </div>
                  <div className={styles.variables}>
                    <SelectField style={{width: '100%'}} value={this.props.kpi.datoskpi.representation.mapYAxis} onChange={this.mapYAxisChange} floatingLabelText="Mapeo Porcentaxe" errorText={this.props.kpi.datoskpi.errors.mapYAxis && "Ten que haber unha variable de Mapeo para o eixo Y" }>
                      {this.props.kpi.datoskpi.kpi.variables.map((variable,index) => {
                        return (
                          <MenuItem key={index} value={variable} primaryText={variable} />
                        )
                      })}
                    </SelectField>
                  </div>
                </div>
                ): (
                  <div className={styles.mappingVariables}>
                    <div className={styles.variables}>
                      <TextField floatingLabelText="Variable Mapeo Nome Sectores" defaultValue={this.props.kpi.datoskpi.representation.mapXAxis} className={styles.textField} onBlur={(evt) => this.mapXAxisChange(null, null, evt.target.value)} errorText={this.props.kpi.datoskpi.errors.mapXAxis && "Ten que haber unha variable de Mapeo para o eixo X" } />
                    </div>
                    <div className={styles.variables}>
                      <TextField floatingLabelText="Variable Mapeo Porcentaxes" defaultValue={this.props.kpi.datoskpi.representation.mapYAxis} className={styles.textField} onBlur={(evt) => this.mapYAxisChange(null, null, evt.target.value)} errorText={this.props.kpi.datoskpi.errors.mapYAxis && "Ten que haber unha variable de Mapeo para o eixo Y" }/>
                    </div>
                  </div>   
                )}
            </div>
          )

        case "number":
          return (
            <div className={styles.representationData}>
              {this.props.kpi.datoskpi.kpi.variables ? (
                <div className={styles.mappingVariables}>
                  <div className={styles.variables}>
                    <SelectField style={{width: '100%'}} value={this.props.kpi.datoskpi.representation.mapXAxis} onChange={this.mapXAxisChange} floatingLabelText="Variable de Mapeo" errorText={this.props.kpi.datoskpi.errors.mapXAxis && "Ten que haber unha variable de mapeo" }>    
                      {this.props.kpi.datoskpi.kpi.variables.map((variable,index) => {
                        return (
                          <MenuItem key={index} value={variable} primaryText={variable} />
                        )
                      })}
                    </SelectField>
                  </div>
                  <div className={styles.variables}>
                    <TextField floatingLabelText="Etiqueta" onBlur={this.labelXAxisChange} defaultValue={this.props.kpi.datoskpi.representation.labelXAxis} ref={element => this.labelXAxisInput = element } className={styles.textField}/>
                  </div>
                </div>
                ): (
                  <div className={styles.mappingVariables}>
                    <div className={styles.variables}>
                      <TextField floatingLabelText="Variable de Mapeo" className={styles.textField} onBlur={(evt) => this.mapXAxisChange(null, null, evt.target.value)} defaultValue={this.props.kpi.datoskpi.representation.mapXAxis} errorText={this.props.kpi.datoskpi.errors.mapXAxis && "Ten que haber unha variable de Mapeo" }/>
                    </div>
                    <div className={styles.variables}>
                      <TextField floatingLabelText="Etiqueta" onBlur={this.labelXAxisChange} defaultValue={this.props.kpi.datoskpi.representation.labelXAxis} ref={element => this.labelXAxisInput = element } className={styles.textField}/>
                    </div>
                  </div>   
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
                          <TextField floatingLabelText="Tempo Refresco (horas)" ref={element => this.timeInput = element } defaultValue={this.props.kpi.datoskpi.kpi.time} onBlur={this.timeChange} errorText={this.props.kpi.datoskpi.errors.timeInput && "Valor Incorrecto, debe ser enteiro en horas"} className={styles.textField} />
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
                                    <SelectField value={this.props.kpi.datoskpi.representation.type} onChange={this.representationTypeChange} errorText={ this.props.kpi.datoskpi.errors.selectFieldGraphicType && "A grafica xa estaba engadida"}>
                                      <MenuItem value="line" primaryText="Lineas" />
                                      <MenuItem value="pie" primaryText="Sectores" />
                                      <MenuItem value="bar" primaryText="Barras" />
                                      <MenuItem value="number" primaryText="Numero" />
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
                              <div className={styles.group}>
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