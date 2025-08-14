import { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { Edit2, X, Save, Delete } from 'react-feather';
import IconButton from 'components/buttons/icon';
import { getTranslation } from 'api/translate';
import { WordInput, IList } from 'interfaces/list.interface';
import useSettingsStore, { State as SettingsState } from "store/settings";
import useStore, { State } from 'store/lists';
import { UseFormSetFocus, UseFormRegister, UseFormGetValues, FieldPath, FieldValues } from "react-hook-form";
import type { FormValues, RevertFieldValueFn } from './listForm';
import styles from 'styles/components/EditableInput.module.css';

export enum FieldTypes {
  WORD = 'word',
  ADDITIONAL = 'additional'
}

const minCharsInField = 8;
const iconColor = 'grey';

type Props = {
  register: UseFormRegister<FormValues>,
  fieldName: FieldPath<FormValues>,
  placeholder?: string,
  setFocus:UseFormSetFocus<FormValues>,
  submitForm: (data: FormValues) => void,
  getValues: UseFormGetValues<FormValues>,
  onRemove?: () => void,
  revertFieldValue: RevertFieldValueFn<FormValues>,
  index?: number,
  type?: FieldTypes,
}

export default function EditableInput({
  register,
  fieldName,
  setFocus,
  submitForm,
  getValues,
  onRemove,
  revertFieldValue,
  index,
  type,
  placeholder=''
}:Props) {
  const [initValue, setInitValue] = useState(getInitialValue());
  const [isEditMode, setIsEditMode] = useState(false);
  const [fieldWidth, setFieldWidth] = useState(calculateFieldWidth(initValue || placeholder));

  const isAutoTranslate = useSettingsStore((state: SettingsState) => state.isAutoTranslate);
  const languageToTranslate = useSettingsStore((state: SettingsState) => state.languageToTranslate);
  const changeIsSaving = useStore((state: State) => state.changeIsSaving);

  const toggleEditMode = () => {
    setIsEditMode((prevState) => !prevState);
  };

  function getInitialValue() {
    if (fieldName.includes('.')){
      let fieldValue = getValues();
      const crumbs = fieldName.split('.');
      for (let crumb of crumbs) {
        // @ts-ignore
        fieldValue = fieldValue[crumb];
      }

      return fieldValue;
    }
    // @ts-ignore
    return getValues()[fieldName];
  }

  async function pushTranslationToValues(values: FormValues){
    const value = getInitialValue();
    const translation = await getTranslation(value, languageToTranslate);
    const list = values.list.map((item:WordInput) => {
      if(item.word === value && item.translations.length === 0){
        item.translations = [translation]
      }
      return item
    })
    values = {...values, list: list};
    return values;
  }

  const handleSave = async () => {
    let values = getValues();

    changeIsSaving(true);
    if(fieldName.includes('word') && isAutoTranslate){
      values = await pushTranslationToValues(values)
    }

    submitForm(values);
    toggleEditMode();
    setInitValue(getInitialValue());
  }

  const handlePressEnter = (event:KeyboardEvent) => {
    if(event.key !== 'Enter'){
      return
    }
    (event.target as HTMLInputElement).blur();

    handleSave();
  }

  function calculateFieldWidth(input:string) {
    const fieldLength = input.length > 8 ? input.length : minCharsInField;
    return `${fieldLength+1}ch`
  }

  const handleRemove = () => {
    if(!onRemove){
      return
    }

    const value = getInitialValue();
    if(!value){
      onRemove();
      return
    }

    onRemove();
    const values = getValues();
    submitForm(values);
  }

  const handleCancel = () => {
    toggleEditMode();
    revertFieldValue(fieldName, initValue);
    setNewFieldWidth(initValue || placeholder);
  }

  const setNewFieldWidth = (input: string) => {
    const newFieldWidth = calculateFieldWidth(input);
    setFieldWidth(newFieldWidth);
  }

  const handleChange = (event:ChangeEvent) => {
    if(!event.target){
      return
    }
    setNewFieldWidth((event.target as HTMLInputElement).value);
  };

  const handleInputClick = () => {
    setIsEditMode(true);
  }

  const calculateFieldType = () => {
    switch(type){
      case FieldTypes.WORD:
        return styles.word_input
      case FieldTypes.ADDITIONAL:
        return styles.additional_input
      default:
        return styles.word_input
    }
  }

  useEffect(() => {
    const value = getInitialValue();

    if(!value){
      setIsEditMode(true);
    }
  }, [])

  useEffect(()=>{
    if(isEditMode){
      setFocus(fieldName);
    }
  }, [isEditMode, fieldName, setFocus])

  return (
    <div className={styles.input_container}>
        <input
          className={calculateFieldType()}
          {...register(fieldName)}
          readOnly={!isEditMode}
          onChange={handleChange}
          style={{width: fieldWidth}}
          placeholder={placeholder}
          onKeyDown={handlePressEnter}
          onClick={handleInputClick}
        />
      {!isEditMode &&
        <div className={styles.edit_icons_container}>
          <IconButton size={20} onClick={toggleEditMode}><Edit2 size={20} color={iconColor}/></IconButton>
          {onRemove && <IconButton size={20} onClick={handleRemove}><Delete size={20} color={iconColor}/></IconButton>}
        </div>
      }
      {isEditMode &&
        <div className={styles.save_icons_container}>
          <IconButton size={20} onClick={handleSave}><Save size={20} color={iconColor}/></IconButton>
          <IconButton size={20} onClick={handleCancel}><X size={20} color={iconColor}/></IconButton>
        </div>
      }
    </div>
  )
}
