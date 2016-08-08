export class Class {
    constructor(name, canonicalName, uri) {
        this.name = name;
        this.canonicalName = canonicalName;
        this.uri = uri;
    }
    getName() {
        return this.name;
    }
    getCanonicalName() {
        return this.canonicalName;
    }
    getURI() {
	    return this.uri;
    }
}

function guid() {
    var g = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
	return v.toString(16);
    });
    return g;
}

export class Thing {
    constructor(obj,  reimport = true) {
        this['@class'] = "es.usc.citius.hmb.model.Thing";
        this.uri = null;
        if (reimport) {
            this.importFromObject(obj)
        }
    }
    genURI() {
        if (this.uri == null || this.uri.length <= 0) {
            this.uri = guid();
        }
    }
    getClassName() {
        return this.constructor.name;
    }
    getCanonicalClassName() {
        return this['@class'];
    }
    getClass() {
	    return new Class(this.constructor.name, this['@class'], this.constructor['URI'])
    }
    importFromObject(obj) {
        if (obj) {
            Object.keys(obj).map(key => {
                if (this[key] !== undefined) {
                    this[key] = obj[key];
                }
            });
            if (this.uri) {
                this._id = this.uri;
            }
        }
    }
}
/*    OperatorResourceAdapter class    */
export class OperatorResourceAdapter extends Thing {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.OperatorResourceAdapter";
		this.operator = null; // Operator
		this.resource = null; // Resource
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
OperatorResourceAdapter.URI = "http://citius.usc.es/hmb/wfontology.owl#Operator_Resource_Adapter";


/*    ParameterValue class    */
export class ParameterValue extends Thing {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.ParameterValue";
		this.namedParameter = null; // Parameter
		this.namedParameterValue = null; // Sort
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
ParameterValue.URI = "http://citius.usc.es/hmb/wfontology.owl#ParameterValue";


/*    Service class    */
export class Service extends Thing {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.Service";
		this.serviceGrounding = null; // ServiceGrounding
		this.serviceOperation = []; // ServiceOperation
		this.serviceonto_Name = null; // String
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
Service.URI = "http://citius.usc.es/hmb/serviceonto.owl#Service";


/*    WorkflowTrigger class    */
export class WorkflowTrigger extends Thing {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.WorkflowTrigger";
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
WorkflowTrigger.URI = "http://citius.usc.es/hmb/wfontology.owl#WorkflowTrigger";


/*    WorkflowRuleTrigger class    */
export class WorkflowRuleTrigger extends WorkflowTrigger {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.WorkflowRuleTrigger";
		this.ruleReference = null; // RuleReference
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
WorkflowRuleTrigger.URI = "http://citius.usc.es/hmb/wfontology.owl#WorkflowRuleTrigger";


/*    Knowledge class    */
export class Knowledge extends Thing {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.Knowledge";
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
Knowledge.URI = "http://citius.usc.es/hmb/wfontology.owl#Knowledge";


/*    Property class    */
export class Property extends Knowledge {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.Property";
		this.displayDescription = null; // String
		this.displayName = null; // String
		this.metadata = []; // Metadata
		this.propertyContext = null; // PropertyContext
		this.propertySource = null; // PropertySource
		this.provider = null; // String
		this.tagReference = []; // String
		this.wfontology_Name = null; // String
		this.wfontology_Type = null; // String
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
Property.URI = "http://citius.usc.es/hmb/wfontology.owl#Property";


/*    MultiValueProperty class    */
export class MultiValueProperty extends Property {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.MultiValueProperty";
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
MultiValueProperty.URI = "http://citius.usc.es/hmb/wfontology.owl#MultiValueProperty";


/*    ListValueProperty class    */
export class ListValueProperty extends Property {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.ListValueProperty";
		this.permittedValue = []; // String
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
ListValueProperty.URI = "http://citius.usc.es/hmb/wfontology.owl#ListValueProperty";


/*    SingleValueProperty class    */
export class SingleValueProperty extends Property {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.SingleValueProperty";
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
SingleValueProperty.URI = "http://citius.usc.es/hmb/wfontology.owl#SingleValueProperty";


/*    PropertyContext class    */
export class PropertyContext extends Knowledge {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.PropertyContext";
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
PropertyContext.URI = "http://citius.usc.es/hmb/wfontology.owl#PropertyContext";


/*    PropertySource class    */
export class PropertySource extends Knowledge {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.PropertySource";
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
PropertySource.URI = "http://citius.usc.es/hmb/wfontology.owl#PropertySource";


/*    RuleReference class    */
export class RuleReference extends Knowledge {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.RuleReference";
		this.provider = null; // String
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
RuleReference.URI = "http://citius.usc.es/hmb/wfontology.owl#RuleReference";


/*    FileRuleBase class    */
export class FileRuleBase extends RuleReference {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.FileRuleBase";
		this.filename = null; // String
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
FileRuleBase.URI = "http://citius.usc.es/hmb/wfontology.owl#FileRuleBase";


/*    SingleRule class    */
export class SingleRule extends RuleReference {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.SingleRule";
		this.ruleId = null; // String
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
SingleRule.URI = "http://citius.usc.es/hmb/wfontology.owl#SingleRule";


/*    RuleBase class    */
export class RuleBase extends RuleReference {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.RuleBase";
		this.ruleBaseId = null; // String
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
RuleBase.URI = "http://citius.usc.es/hmb/wfontology.owl#RuleBase";


/*    SequenceFlow class    */
export class SequenceFlow extends Thing {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.SequenceFlow";
		this.isDisabled = null; // Boolean
		this.lastVersionNumber = null; // Integer
		this.sourceIndex = null; // Integer
		this.sourceTask = null; // String
		this.targetIndex = null; // Integer
		this.targetTask = null; // String
		this.versionNumber = null; // Integer
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
SequenceFlow.URI = "http://citius.usc.es/hmb/wfontology.owl#SequenceFlow";


/*    ConditionDate class    */
export class ConditionDate extends Thing {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.ConditionDate";
		this.isRelative = null; // Boolean
		this.time = null; // Long
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
ConditionDate.URI = "http://citius.usc.es/hmb/wfontology.owl#ConditionDate";


/*    ActionDescriptorParameter class    */
export class ActionDescriptorParameter extends Thing {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.ActionDescriptorParameter";
		this.displayName = null; // String
		this.wfontology_Name = null; // String
		this.wfontology_Type = null; // String
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
ActionDescriptorParameter.URI = "http://citius.usc.es/hmb/wfontology.owl#ActionDescriptorParameter";


/*    Metadata class    */
export class Metadata extends Thing {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.Metadata";
		this.metadataValue = null; // String
		this.wfontology_Name = null; // String
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
Metadata.URI = "http://citius.usc.es/hmb/wfontology.owl#Metadata";


/*    Tag class    */
export class Tag extends Thing {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.Tag";
		this.displayName = null; // String
		this.isSubTagOf = []; // Tag
		this.provider = null; // String
		this.user = []; // User
		this.wfontology_Name = null; // String
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
Tag.URI = "http://citius.usc.es/hmb/wfontology.owl#Tag";


/*    ChoicePathCondition class    */
export class ChoicePathCondition extends Thing {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.ChoicePathCondition";
		this.condition = null; // String
		this.pathIndex = null; // Integer
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
ChoicePathCondition.URI = "http://citius.usc.es/hmb/wfontology.owl#ChoicePathCondition";


/*    WorkflowTemplate class    */
export class WorkflowTemplate extends Thing {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.WorkflowTemplate";
		this.description = null; // String
		this.designer = null; // User
		this.element = []; // Task
		this.expiryDate = null; // ConditionDate
		this.isDesignFinished = null; // Boolean
		this.isValidated = null; // Boolean
		this.metadata = []; // Metadata
		this.modificationDate = null; // Long
		this.provider = null; // String
		this.sequenceFlow = []; // SequenceFlow
		this.startDate = null; // ConditionDate
		this.trigger = null; // WorkflowTrigger
		this.versionNumber = null; // Integer
		this.wfontology_Name = null; // String
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
WorkflowTemplate.URI = "http://citius.usc.es/hmb/wfontology.owl#WorkflowTemplate";


/*    Workflow class    */
export class Workflow extends WorkflowTemplate {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.Workflow";
		this.executionId = null; // String
		this.executionStatus = null; // String
		this.isSubWorkflow = null; // Boolean
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
Workflow.URI = "http://citius.usc.es/hmb/wfontology.owl#Workflow";


/*    User class    */
export class User extends Thing {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.User";
		this.completeName = null; // String
		this.email = null; // String
		this.globalTagReference = []; // String
		this.passwordSHA = null; // String
		this.systemontology_Name = null; // String
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
User.URI = "http://citius.usc.es/hmb/systemontology.owl#User";


/*    Resource class    */
export class Resource extends Thing {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.Resource";
		this.implements = null; // Operator
		this.wfontology_Name = null; // String
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
Resource.URI = "http://citius.usc.es/hmb/wfontology.owl#Resource";


/*    ServiceOperation class    */
export class ServiceOperation extends Resource {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.ServiceOperation";
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
ServiceOperation.URI = "http://citius.usc.es/hmb/serviceonto.owl#ServiceOperation";


/*    Task class    */
export class Task extends Thing {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.Task";
		this.description = null; // String
		this.expiryDate = null; // ConditionDate
		this.isDisabled = null; // Boolean
		this.isFinal = null; // Boolean
		this.isInitial = null; // Boolean
		this.isRequired = null; // Boolean
		this.lastVersionNumber = null; // Integer
		this.operator = null; // Operator
		this.pairedTask = null; // String
		this.parameterValue = []; // ParameterValue
		this.startDate = null; // ConditionDate
		this.tagReference = []; // String
		this.user = []; // User
		this.versionNumber = null; // Integer
		this.wfontology_Name = null; // String
		this.workflow = null; // Workflow
		this.xposition = null; // Integer
		this.yposition = null; // Integer
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
Task.URI = "http://citius.usc.es/hmb/wfontology.owl#Task";


/*    HumanTask class    */
export class HumanTask extends Task {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.HumanTask";
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
HumanTask.URI = "http://citius.usc.es/hmb/wfontology.owl#HumanTask";


/*    UserChoice class    */
export class UserChoice extends HumanTask {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.UserChoice";
		this.numberOfPaths = null; // Integer
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
UserChoice.URI = "http://citius.usc.es/hmb/wfontology.owl#UserChoice";


/*    AutomaticTask class    */
export class AutomaticTask extends Task {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.AutomaticTask";
		this.numberOfPaths = null; // Integer
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
AutomaticTask.URI = "http://citius.usc.es/hmb/wfontology.owl#AutomaticTask";


/*    OrJoin class    */
export class OrJoin extends AutomaticTask {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.OrJoin";
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
OrJoin.URI = "http://citius.usc.es/hmb/wfontology.owl#OrJoin";


/*    AutomaticChoice class    */
export class AutomaticChoice extends AutomaticTask {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.AutomaticChoice";
		this.pathCondition = []; // ChoicePathCondition
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
AutomaticChoice.URI = "http://citius.usc.es/hmb/wfontology.owl#AutomaticChoice";


/*    Split class    */
export class Split extends AutomaticTask {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.Split";
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
Split.URI = "http://citius.usc.es/hmb/wfontology.owl#Split";


/*    AndJoin class    */
export class AndJoin extends AutomaticTask {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.AndJoin";
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
AndJoin.URI = "http://citius.usc.es/hmb/wfontology.owl#AndJoin";


/*    Sort class    */
export class Sort extends Thing {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.Sort";
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
Sort.URI = "http://citius.usc.es/hmb/wfontology.owl#Sort";


/*    ActionParameterValue class    */
export class ActionParameterValue extends Sort {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.ActionParameterValue";
		this.namedActionParameter = null; // ActionDescriptorParameter
		this.namedActionParameterValue = null; // Sort
		this.parameterName = null; // String
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
ActionParameterValue.URI = "http://citius.usc.es/hmb/wfontology.owl#ActionParameterValue";


/*    Action class    */
export class Action extends Sort {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.Action";
		this.actionDescriptor = null; // ActionDescriptor
		this.actionParameterValue = []; // ActionParameterValue
		this.actionReference = null; // String
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
Action.URI = "http://citius.usc.es/hmb/wfontology.owl#Action";


/*    UserAction class    */
export class UserAction extends Action {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.UserAction";
		this.userReference = null; // String
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
UserAction.URI = "http://citius.usc.es/hmb/wfontology.owl#UserAction";


/*    NativeDataObject class    */
export class NativeDataObject extends Sort {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.NativeDataObject";
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
NativeDataObject.URI = "http://citius.usc.es/hmb/wfontology.owl#NativeDataObject";


/*    DateType class    */
export class DateType extends NativeDataObject {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.DateType";
		this.dateValue = null; // GregorianCalendar
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
DateType.URI = "http://citius.usc.es/hmb/wfontology.owl#DateType";


/*    BooleanType class    */
export class BooleanType extends NativeDataObject {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.BooleanType";
		this.booleanValue = null; // Boolean
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
BooleanType.URI = "http://citius.usc.es/hmb/wfontology.owl#BooleanType";


/*    FloatType class    */
export class FloatType extends NativeDataObject {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.FloatType";
		this.floatValue = null; // Float
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
FloatType.URI = "http://citius.usc.es/hmb/wfontology.owl#FloatType";


/*    IntegerType class    */
export class IntegerType extends NativeDataObject {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.IntegerType";
		this.integerValue = null; // Integer
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
IntegerType.URI = "http://citius.usc.es/hmb/wfontology.owl#IntegerType";


/*    StringType class    */
export class StringType extends NativeDataObject {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.StringType";
		this.stringValue = null; // String
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
StringType.URI = "http://citius.usc.es/hmb/wfontology.owl#StringType";


/*    DomainModel class    */
export class DomainModel extends Sort {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.questionnaires.model.DomainModel";
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
DomainModel.URI = "http://citius.usc.es/hmb/questionnaires.owl#DomainModel";


/*    AbstractQuestion class    */
export class AbstractQuestion extends DomainModel {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.questionnaires.model.AbstractQuestion";
		this.description = null; // String
		this.title = null; // String
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
AbstractQuestion.URI = "http://citius.usc.es/hmb/questionnaires.owl#AbstractQuestion";


/*    FullQuestion class    */
export class FullQuestion extends AbstractQuestion {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.questionnaires.model.FullQuestion";
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
FullQuestion.URI = "http://citius.usc.es/hmb/questionnaires.owl#FullQuestion";


/*    ChooseOneOptionFullQuestion class    */
export class ChooseOneOptionFullQuestion extends FullQuestion {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.questionnaires.model.ChooseOneOptionFullQuestion";
		this.fullOptions = []; // FullOption
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
ChooseOneOptionFullQuestion.URI = "http://citius.usc.es/hmb/questionnaires.owl#ChooseOneOptionFullQuestion";


/*    InsertVariousTextsFullQuestion class    */
export class InsertVariousTextsFullQuestion extends FullQuestion {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.questionnaires.model.InsertVariousTextsFullQuestion";
		this.fullOptions = []; // FullOption
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
InsertVariousTextsFullQuestion.URI = "http://citius.usc.es/hmb/questionnaires.owl#InsertVariousTextsFullQuestion";


/*    TrueFalseFullQuestion class    */
export class TrueFalseFullQuestion extends FullQuestion {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.questionnaires.model.TrueFalseFullQuestion";
		this.fullOptions = []; // FullOption
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
TrueFalseFullQuestion.URI = "http://citius.usc.es/hmb/questionnaires.owl#TrueFalseFullQuestion";


/*    ChooseVariousOptionsFullQuestion class    */
export class ChooseVariousOptionsFullQuestion extends FullQuestion {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.questionnaires.model.ChooseVariousOptionsFullQuestion";
		this.fullOptions = []; // FullOption
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
ChooseVariousOptionsFullQuestion.URI = "http://citius.usc.es/hmb/questionnaires.owl#ChooseVariousOptionsFullQuestion";


/*    InsertOneTextFullQuestion class    */
export class InsertOneTextFullQuestion extends FullQuestion {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.questionnaires.model.InsertOneTextFullQuestion";
		this.fullOption = null; // FullOption
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
InsertOneTextFullQuestion.URI = "http://citius.usc.es/hmb/questionnaires.owl#InsertOneTextFullQuestion";


/*    Question class    */
export class Question extends AbstractQuestion {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.questionnaires.model.Question";
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
Question.URI = "http://citius.usc.es/hmb/questionnaires.owl#Question";


/*    TrueFalseQuestion class    */
export class TrueFalseQuestion extends Question {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.questionnaires.model.TrueFalseQuestion";
		this.options = []; // Option
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
TrueFalseQuestion.URI = "http://citius.usc.es/hmb/questionnaires.owl#TrueFalseQuestion";


/*    ChooseOneOptionQuestion class    */
export class ChooseOneOptionQuestion extends Question {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.questionnaires.model.ChooseOneOptionQuestion";
		this.options = []; // Option
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
ChooseOneOptionQuestion.URI = "http://citius.usc.es/hmb/questionnaires.owl#ChooseOneOptionQuestion";


/*    InsertVariousTextsQuestion class    */
export class InsertVariousTextsQuestion extends Question {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.questionnaires.model.InsertVariousTextsQuestion";
		this.options = []; // Option
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
InsertVariousTextsQuestion.URI = "http://citius.usc.es/hmb/questionnaires.owl#InsertVariousTextsQuestion";


/*    InsertOneTextQuestion class    */
export class InsertOneTextQuestion extends Question {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.questionnaires.model.InsertOneTextQuestion";
		this.option = null; // Option
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
InsertOneTextQuestion.URI = "http://citius.usc.es/hmb/questionnaires.owl#InsertOneTextQuestion";


/*    ChooseVariousOptionsQuestion class    */
export class ChooseVariousOptionsQuestion extends Question {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.questionnaires.model.ChooseVariousOptionsQuestion";
		this.options = []; // Option
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
ChooseVariousOptionsQuestion.URI = "http://citius.usc.es/hmb/questionnaires.owl#ChooseVariousOptionsQuestion";


/*    AbstractOption class    */
export class AbstractOption extends DomainModel {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.questionnaires.model.AbstractOption";
		this.questionnaires_Value = null; // NativeDataObject
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
AbstractOption.URI = "http://citius.usc.es/hmb/questionnaires.owl#AbstractOption";


/*    FullOption class    */
export class FullOption extends AbstractOption {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.questionnaires.model.FullOption";
		this.isCorrect = null; // Boolean
		this.maxPenalization = null; // Float
		this.maxRating = null; // Float
		this.penalizeIfWrong = null; // Boolean
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
FullOption.URI = "http://citius.usc.es/hmb/questionnaires.owl#FullOption";


/*    Option class    */
export class Option extends AbstractOption {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.questionnaires.model.Option";
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
Option.URI = "http://citius.usc.es/hmb/questionnaires.owl#Option";


/*    AbstractQuestionnaire class    */
export class AbstractQuestionnaire extends DomainModel {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.questionnaires.model.AbstractQuestionnaire";
		this.maxRating = null; // Float
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
AbstractQuestionnaire.URI = "http://citius.usc.es/hmb/questionnaires.owl#AbstractQuestionnaire";


/*    FullQuestionnaire class    */
export class FullQuestionnaire extends AbstractQuestionnaire {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.questionnaires.model.FullQuestionnaire";
		this.fullQuestions = []; // FullQuestionWithRating
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
FullQuestionnaire.URI = "http://citius.usc.es/hmb/questionnaires.owl#FullQuestionnaire";


/*    Questionnaire class    */
export class Questionnaire extends AbstractQuestionnaire {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.questionnaires.model.Questionnaire";
		this.questions = []; // QuestionWithRating
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
Questionnaire.URI = "http://citius.usc.es/hmb/questionnaires.owl#Questionnaire";


/*    HistoryEntry class    */
export class HistoryEntry extends DomainModel {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.questionnaires.model.HistoryEntry";
		this.entry = null; // Sort
		this.timestamp = null; // Long
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
HistoryEntry.URI = "http://citius.usc.es/hmb/questionnaires.owl#HistoryEntry";


/*    AbstractQuestionWithRating class    */
export class AbstractQuestionWithRating extends DomainModel {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.questionnaires.model.AbstractQuestionWithRating";
		this.maxPenalization = null; // Float
		this.maxRating = null; // Float
		this.penalizationIfNotAnswered = null; // Float
		this.penalizeIfNotAnswered = null; // Boolean
		this.penalizeIfWrong = null; // Boolean
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
AbstractQuestionWithRating.URI = "http://citius.usc.es/hmb/questionnaires.owl#AbstractQuestionWithRating";


/*    FullQuestionWithRating class    */
export class FullQuestionWithRating extends AbstractQuestionWithRating {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.questionnaires.model.FullQuestionWithRating";
		this.fullQuestion = null; // FullQuestion
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
FullQuestionWithRating.URI = "http://citius.usc.es/hmb/questionnaires.owl#FullQuestionWithRating";


/*    QuestionWithRating class    */
export class QuestionWithRating extends AbstractQuestionWithRating {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.questionnaires.model.QuestionWithRating";
		this.question = null; // Question
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
QuestionWithRating.URI = "http://citius.usc.es/hmb/questionnaires.owl#QuestionWithRating";


/*    Evaluation class    */
export class Evaluation extends DomainModel {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.questionnaires.model.Evaluation";
		this.rating = null; // Float
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
Evaluation.URI = "http://citius.usc.es/hmb/questionnaires.owl#Evaluation";


/*    QuestionEvaluation class    */
export class QuestionEvaluation extends Evaluation {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.questionnaires.model.QuestionEvaluation";
		this.answer = null; // QuestionAnswer
		this.fullQuestionWithRating = null; // FullQuestionWithRating
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
QuestionEvaluation.URI = "http://citius.usc.es/hmb/questionnaires.owl#QuestionEvaluation";


/*    QuestionnaireEvaluation class    */
export class QuestionnaireEvaluation extends Evaluation {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.questionnaires.model.QuestionnaireEvaluation";
		this.fullQuestionnaire = null; // FullQuestionnaire
		this.questionsEvaluation = []; // QuestionEvaluation
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
QuestionnaireEvaluation.URI = "http://citius.usc.es/hmb/questionnaires.owl#QuestionnaireEvaluation";


/*    Answer class    */
export class Answer extends DomainModel {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.questionnaires.model.Answer";
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
Answer.URI = "http://citius.usc.es/hmb/questionnaires.owl#Answer";


/*    QuestionAnswer class    */
export class QuestionAnswer extends Answer {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.questionnaires.model.QuestionAnswer";
		this.questionId = null; // String
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
QuestionAnswer.URI = "http://citius.usc.es/hmb/questionnaires.owl#QuestionAnswer";


/*    ChooseVariousOptionsQuestionAnswer class    */
export class ChooseVariousOptionsQuestionAnswer extends QuestionAnswer {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.questionnaires.model.ChooseVariousOptionsQuestionAnswer";
		this.optionsSelected = []; // AbstractOption
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
ChooseVariousOptionsQuestionAnswer.URI = "http://citius.usc.es/hmb/questionnaires.owl#ChooseVariousOptionsQuestionAnswer";


/*    TrueFalseQuestionAnswer class    */
export class TrueFalseQuestionAnswer extends QuestionAnswer {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.questionnaires.model.TrueFalseQuestionAnswer";
		this.optionSelected = null; // AbstractOption
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
TrueFalseQuestionAnswer.URI = "http://citius.usc.es/hmb/questionnaires.owl#TrueFalseQuestionAnswer";


/*    ChooseOneOptionQuestionAnswer class    */
export class ChooseOneOptionQuestionAnswer extends QuestionAnswer {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.questionnaires.model.ChooseOneOptionQuestionAnswer";
		this.optionSelected = null; // AbstractOption
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
ChooseOneOptionQuestionAnswer.URI = "http://citius.usc.es/hmb/questionnaires.owl#ChooseOneOptionQuestionAnswer";


/*    InsertOneTextQuestionAnswer class    */
export class InsertOneTextQuestionAnswer extends QuestionAnswer {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.questionnaires.model.InsertOneTextQuestionAnswer";
		this.optionSelected = null; // AbstractOption
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
InsertOneTextQuestionAnswer.URI = "http://citius.usc.es/hmb/questionnaires.owl#InsertOneTextQuestionAnswer";


/*    InsertVaroiusTextsQuestionAnswer class    */
export class InsertVaroiusTextsQuestionAnswer extends QuestionAnswer {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.questionnaires.model.InsertVaroiusTextsQuestionAnswer";
		this.optionsSelected = []; // AbstractOption
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
InsertVaroiusTextsQuestionAnswer.URI = "http://citius.usc.es/hmb/questionnaires.owl#InsertVaroiusTextsQuestionAnswer";


/*    QuestionnaireAnswer class    */
export class QuestionnaireAnswer extends Answer {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.questionnaires.model.QuestionnaireAnswer";
		this.answers = []; // QuestionAnswer
		this.questionnaireId = null; // String
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
QuestionnaireAnswer.URI = "http://citius.usc.es/hmb/questionnaires.owl#QuestionnaireAnswer";


/*    ServiceGrounding class    */
export class ServiceGrounding extends Thing {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.ServiceGrounding";
		this.endPoint = null; // String
		this.isSystemService = null; // Boolean
		this.namespace = null; // String
		this.servicePackageFile = null; // String
		this.serviceVersion = null; // Integer
		this.typeNamespace = null; // String
		this.wsdlurl = null; // String
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
ServiceGrounding.URI = "http://citius.usc.es/hmb/serviceonto.owl#ServiceGrounding";


/*    Operator class    */
export class Operator extends Thing {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.Operator";
		this.description = null; // String
		this.evaluatesProperty = []; // Property
		this.parameter = []; // Parameter
		this.provider = null; // String
		this.readsProperty = []; // Property
		this.ruleReference = null; // RuleReference
		this.wfontology_Name = null; // String
		this.writesProperty = []; // Property
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
Operator.URI = "http://citius.usc.es/hmb/wfontology.owl#Operator";


/*    Parameter class    */
export class Parameter extends Thing {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.Parameter";
		this.isMandatory = null; // Boolean
		this.wfontology_Name = null; // String
		this.wfontology_Type = null; // String
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
Parameter.URI = "http://citius.usc.es/hmb/wfontology.owl#Parameter";


/*    ActionDescriptor class    */
export class ActionDescriptor extends Thing {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.ActionDescriptor";
		this.actionDescriptorParameter = []; // ActionDescriptorParameter
		this.category = null; // String
		this.description = null; // String
		this.displayName = null; // String
		this.wfontology_Name = null; // String
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
ActionDescriptor.URI = "http://citius.usc.es/hmb/wfontology.owl#ActionDescriptor";


/*    ActionGroup class    */
export class ActionGroup extends Thing {
	constructor(obj, reimport = true) {
		super(obj, false);
		this['@class'] = "es.usc.citius.hmb.model.ActionGroup";
		this.actionDescriptors = []; // ActionDescriptor
		this.description = null; // String
		this.displayName = null; // String
		this.wfontology_Name = null; // String
		if (reimport) {
			super.importFromObject(obj)
		}
	}
}
ActionGroup.URI = "http://citius.usc.es/hmb/wfontology.owl#ActionGroup";

