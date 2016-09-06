import UIReducer from './UIReducer'
//Import reducers here:
//      import XXReducer from '../../../components/XX/Reducer'

import KPIReducer from '../../../components/KPI/Reducer'
import DatosKPIReducer from '../../../components/DatosKPI/Reducer'
import CodeWizardReducer from '../../../components/CodeWizard/Reducer'
import DashboardReducer from '../../../components/Dashboard/Reducer'
import RepresentationHandlerReducer from '../../../components/RepresentationHandler/Reducer'
import LoginReducer from '../../../components/Login/Reducer'

const reducers = {
    UIState: UIReducer,
    //Include reducers here:
    //      XXState : XXReducer
    LoginState: LoginReducer,
    KPIState: KPIReducer,
    DatosKPIState: DatosKPIReducer,
    CodeWizardState: CodeWizardReducer,
    DashboardState: DashboardReducer,
    RepresentationHandlerState: RepresentationHandlerReducer,
};

export default reducers;
