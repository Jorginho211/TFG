// The content should be consistent with the content defined in palette.scss

import * as Colors from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import Spacing from 'material-ui/styles/spacing';
import zIndex from 'material-ui/styles/zIndex';

export default {
    spacing: Spacing,
    zIndex: zIndex,
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: Colors.blueGrey500,
        primary2Color: Colors.blueGrey700,
        primary3Color: Colors.blueGrey100,
        accent1Color: Colors.amberA400,
        accent2Color: Colors.amberA200,
        accent3Color: Colors.grey700,
        textColor: Colors.darkBlack,
        alternateTextColor: Colors.white,
        canvasColor: Colors.white,
        borderColor: Colors.grey300,
        disabledColor: fade(Colors.darkBlack, 0.3),
        pickerHeaderColor: Colors.cyan500,
    }
};