import React, {Component} from 'react'

import { autobind } from 'core-decorators';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';

import RaisedButton from 'material-ui/RaisedButton';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import IconButton from 'material-ui/IconButton';
import SaveIcon from 'material-ui/svg-icons/content/save';

import RefreshIndicator from 'material-ui/RefreshIndicator';
import Dialog from 'material-ui/Dialog';
import AutoComplete from 'material-ui/AutoComplete';

import LineGraphImg from '../DatosKPI/Images/line.svg'
import PieGraphImg from '../DatosKPI/Images/pie.svg'
import BarGraphImg from '../DatosKPI/Images/bar.svg'

import RepresentationHandler from '../RepresentationHandler/'

@CSSModules(styles)
class Dashboard extends Component {
    constructor() {
        super();
    }

    @autobind changeLayout(layout){
        this.props.DashboardActions.saveLayout(layout)
        this.forceUpdate()
    }

    @autobind addLayout(idKpiAux, chartTypeAux){
        let dashboard = [
            ...this.props.dashboard.dashboard
        ]

        dashboard.push({
            idkpi: idKpiAux,
            chartType: chartTypeAux,
            layout: {h: 8, w: 4, x: 0, y: 0, i: idKpiAux + "||" + chartTypeAux},
        })

        this.props.DashboardActions.addRemoveElement(dashboard)
        this.props.DashboardActions.requestDataKPI(idKpiAux, dashboard)
        

        this.toggleDialog()
    }

    @autobind deleteLayout(layout){
        let dashboard = []

        this.props.dashboard.dashboard.map( d => {
            if(d.layout.i !== layout.i){
                dashboard.push({
                    ...d,
                })
            }
        })

        this.props.DashboardActions.addRemoveElement(dashboard)
    }

    @autobind toggleDialog(){
        this.props.DashboardActions.toggleDialog()
    }

    @autobind saveDashboard(){
        let chartType
        let idkpi
        let dashboard = []
        let layoutAux

        this.props.dashboard.layoutSave.map(l => {
            layoutAux = {
                ...l
            }
            layoutAux.i = layoutAux.i.replace(".$", "")

            idkpi = layoutAux.i.split("||")[0]
            chartType = layoutAux.i.split("||")[1]

            this.props.dashboard.dashboard.map(d => {
                if(d.idkpi === idkpi && d.chartType === chartType){
                    dashboard.push({
                        ...d,
                        data: undefined,
                        layout: layoutAux
                    })
                }
            })
        })


        dashboard.sort((a, b) => {
            if( a.layout.y < b.layout.y)
                return -1
            else if (a.layout.y > b.layout.y)
                return 1

            return 0
        })
        
        this.props.DashboardActions.addRemoveElement(dashboard)
        this.props.DashboardActions.putDashboard("aKxOyCoyl7ENwD8ipdRhOUo82WO50UZYdKdyelZi", dashboard)
    }

    @autobind suggestionListKPIName(){
        let suggestionList = []

        this.props.kpi.kpis.map( kpi => {
            suggestionList.push(kpi.name)
        })

        this.props.DashboardActions.updateSuggestionList(suggestionList)
    }

    @autobind searchKPI(kpiName){
        let kpiAux
        this.props.kpi.kpis.map( kpi => {
            if(kpi.name === kpiName ){
                kpiAux = kpi
            }
        })

        if(kpiAux !== undefined){
            this.props.DashboardActions.setKPI(kpiAux)
        }
        else {
            this.props.DashboardActions.setKPI(undefined)
        }
    }

    componentWillMount(){
        window.addEventListener('beforeunload', () => {
            this.saveDashboard()
        })

        this.props.DashboardActions.requestDashboard("aKxOyCoyl7ENwD8ipdRhOUo82WO50UZYdKdyelZi")
        this.props.KPIActions.requestKpis();
    }

    componentDidMount(){
        window.addEventListener('beforeunload', () => {
            this.saveDashboard()
        })
    }

    componentWillUnmount() {
        this.saveDashboard()
    }

    getGrapthicImg(type, idKPI){
      switch(type){
        case "line":
          return (
            <div>
              <img src={LineGraphImg} onTouchTap={() => {this.addLayout(idKPI, type)}}/>
            </div>
          )

        case "bar":
          return (
            <div>
              <img src={BarGraphImg} onTouchTap={() => {this.addLayout(idKPI, type)}}/>
            </div>
          )

        case "pie":
          return (
            <div>
              <img src={PieGraphImg} onTouchTap={() => {this.addLayout(idKPI, type)}}/>
            </div>
          )
      }
    }

    dialogContent(){
        const {dashboard} = this.props;

        return (
            <div>
                <div>
                    <AutoComplete openOnFocus={true} floatingLabelText="Introduce unha KPI" dataSource={ dashboard.suggestionList } filter={AutoComplete.caseInsensitiveFilter} fullWidth={true} onNewRequest={(kpiName) => this.searchKPI(kpiName)}/>
                </div>

                {dashboard.kpi ? (
                    <div>
                        <p>Seleccionar representatión</p>
                        <div className={styles.graphicsGroupKPI}>
                          {dashboard.kpi.representation.map((representation, index) => {
                            return (
                              <div key={index}>
                                {this.getGrapthicImg(representation.type, dashboard.kpi.id)}
                              </div>
                            )
                          })}                          
                        </div>
                    </div>
                ) : (
                    null
                )}
            </div>
        )
    }

    render() {
		const {dashboard} = this.props;
        const {kpi} = this.props;

    	return (
            <div>
                {kpi.isLoading ? (
                    <div className={styles.refreshIndicator}>
                        <RefreshIndicator
                            size={100}
                            left={0}
                            top={0}
                            loadingColor={"#FF0000"}
                            status="loading"
                            style={{diplay:'block', position:'relative'}}/>
                    </div>

                ) : (
                    <div>
                        <RepresentationHandler kpi={this.props.kpi} dashboard={this.props.dashboard} DashboardActions={this.props.DashboardActions} /> 

                        <RaisedButton label="Gardar" labelPosition="before" primary={true} onTouchTap={() => this.saveDashboard()} icon={<SaveIcon />} className={styles.btnGardar} />

                        <FloatingActionButton onTouchTap={() =>  { this.suggestionListKPIName(); this.toggleDialog() }} className={styles.floatingButton} mini={true}>
                            <ContentAdd />
                        </FloatingActionButton>

                        <Dialog
                            title="Engadir KPI para mostrar"
                            modal={false}
                            open={dashboard.isDialogOpened}
                            onRequestClose={() => this.toggleDialog()}
                        >
                            {this.dialogContent()}
                        </Dialog>
                    </div>
                )}
            </div>
    	)
    }
}

export default Dashboard