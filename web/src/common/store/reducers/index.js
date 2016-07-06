import UIReducer from './UIReducer'
//Import reducers here:
//      import XXReducer from '../../../components/XX/Reducer'

import KPIReducer from '../../../components/KPI/Reducer'
import DatosKPIReducer from '../../../components/DatosKPI/Reducer'
import CodeWizardReducer from '../../../components/CodeWizard/Reducer'
import DashboardReducer from '../../../components/Dashboard/Reducer'

const reducers = {
    UIState: UIReducer,
    //Include reducers here:
    //      XXState : XXReducer
    KPIState: KPIReducer,
    DatosKPIState: DatosKPIReducer,
    CodeWizardState: CodeWizardReducer,
    DashboardState: DashboardReducer,
};

export default reducers;
