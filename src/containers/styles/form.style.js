import t from 'tcomb-form-native';

const $labelColor = '#323332';
const $textboxColor = '#32526E';
const $textboxError = 'white';
const $fontWeight = '100';
const $fontSize = 13;
const $formMargin = 25;
const $borderColor = '#ECEDED';

//changing the global default tcomb stylesheet
t.form.Form.stylesheet.formGroup.normal.marginLeft = $formMargin;
t.form.Form.stylesheet.formGroup.normal.marginRight = $formMargin;
t.form.Form.stylesheet.formGroup.error.marginLeft = $formMargin;
t.form.Form.stylesheet.formGroup.error.marginRight = $formMargin;

t.form.Form.stylesheet.controlLabel.normal.color = $labelColor;
t.form.Form.stylesheet.controlLabel.normal.color;
t.form.Form.stylesheet.controlLabel.normal.fontSize = $fontSize;
t.form.Form.stylesheet.controlLabel.normal.fontWeight = $fontWeight;
t.form.Form.stylesheet.controlLabel.normal.marginBottom = 15;
t.form.Form.stylesheet.controlLabel.error.color = $labelColor;
t.form.Form.stylesheet.controlLabel.error.fontSize = $fontSize;
t.form.Form.stylesheet.controlLabel.error.fontWeight = $fontWeight;

t.form.Form.stylesheet.textbox.normal.color = $textboxColor;
t.form.Form.stylesheet.textbox.normal.backgroundColor = $textboxError;
t.form.Form.stylesheet.textbox.normal.borderWidth = 0;
t.form.Form.stylesheet.textbox.normal.marginBottom = 5;
t.form.Form.stylesheet.textbox.error.borderWidth = 0;
t.form.Form.stylesheet.textbox.error.marginBottom = 5;
t.form.Form.stylesheet.textbox.error.backgroundColor = $textboxError;

t.form.Form.stylesheet.textboxView.normal.borderWidth = 0;
t.form.Form.stylesheet.textboxView.normal.borderRadius = 0;
t.form.Form.stylesheet.textboxView.normal.borderColor = $borderColor;
t.form.Form.stylesheet.textboxView.normal.borderBottomWidth = 1;
t.form.Form.stylesheet.textboxView.normal.marginBottom = 25;
t.form.Form.stylesheet.textboxView.error.borderColor = $borderColor;
t.form.Form.stylesheet.textboxView.error.borderWidth = 0;
t.form.Form.stylesheet.textboxView.error.borderRadius = 0;
t.form.Form.stylesheet.textboxView.error.borderBottomWidth = 1;

export default t.form.Form.stylesheet;
