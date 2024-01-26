import { useState } from 'react';
import Header from 'components/header';
import EditableInput, { FieldTypes } from './editableInput';
import IconButton from 'components/buttons/icon';
import { useForm, useFieldArray } from "react-hook-form";
import { PlusCircle, X, ArrowRightCircle } from 'react-feather';
import useStore from 'store/lists';
import { WordInput, IList } from 'interfaces/list.interface';
import { useAuthState } from 'context/auth';

import styles from 'styles/components/ListForm.module.css';

type Props = {
  item: IList,
}

export default function ListForm({ item,  }:Props) {
  const { control, register, handleSubmit, setFocus, getValues } = useForm({
    defaultValues:{
      header: item.header,
      language: item.language,
      list: item.list
    }
  });
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "list",
  });

  const { user } = useAuthState()

  const createList = useStore((state: any) => state.create);

  const [currentFocus, setCurrentFocus] = useState('');

  const submitForm = (data: any) => {
    if(!data.list.length){
      return
    }

    const body = {
      ...data,
      userId: user.username,
      header: data.header ? data.header : Date.now()
    }

    console.log(body)

    //createList(body);
  }

  const handleAddField = () => {
    append({ word: '', translations: [''], associations: [''] });
  }

  const handleRemoveField = (index:number) => {
    remove(index)
  }

  const handleAddTranslation = (index: number, field: WordInput) => {
      update(index, { ...field, translations: [... field.translations, ''] });
  }

  const handleRemoveTranslations = (translationIndex: number, index: number, field: WordInput) => {
    const head = field.translations.slice(0, translationIndex);
    const tail = field.translations.slice(translationIndex+1);
    const updatedTranslations = head.concat(tail);
    update(index, { ...field, translations: updatedTranslations });
  }

  const handleRemoveAssociations = (associationIndex: number, index: number, field: WordInput) => {
    const head = field.associations.slice(0, associationIndex);
    const tail = field.associations.slice(associationIndex+1);
    const updatedAssociations = head.concat(tail);
    update(index, { ...field, associations: updatedAssociations });
  }

  const handleAddAssociation = (index: number, field: WordInput) => {
    update(index, { ...field, associations: [... field.associations, ''] })
  }

  const handleFieldFocus = (field: string) => {
    setCurrentFocus(field);
  }

  const handleWordChange = (fieldValue: string, field: WordInput, index: number) => {
    update(index, { ...field, word: fieldValue});
  }

  return (
    <div className={styles.container}>
      <Header/>
      <main className={styles.main}>
        <form onSubmit={handleSubmit((data) => submitForm(data))}>
          <div style={{marginBottom: 30}}>
            <EditableInput
              register={register}
              fieldName='header'
              setFocus={setFocus}
              submitForm={submitForm}
              getValues={getValues}
            />
          </div>
          <select
            {...register(`language`)}
            className={styles.select_input}
          >
            <option value='en'>English</option>
            <option value='es'>Spanish</option>
          </select>
          {(fields as Array<WordInput>).map((field, index) => (
              <div key={field.id} className={styles.word_field_container}>
                <div className={styles.vertical_container}>
                  <div className={styles.input_container}>
                     <EditableInput
                      register={register}
                      fieldName={`list.${index}.word`}
                      setFocus={setFocus}
                      submitForm={submitForm}
                      getValues={getValues}
                      onRemove={()=>handleRemoveField(index)}
                      index={index}
                      type={FieldTypes.WORD}
                    />
                  </div>
                  <div className={styles.horizontal_container}>
                    <span className={styles.additional_label}>Translations:</span>
                    {field.translations.map((translation, translationIndex) => (
                      <div key={translation} className={styles.additional_input_container}>
                        <EditableInput
                          register={register}
                          fieldName={`list.${index}.translations.${translationIndex}`}
                          setFocus={setFocus}
                          submitForm={submitForm}
                          getValues={getValues}
                          onRemove={() => handleRemoveTranslations(translationIndex, index, field)}
                          index={index}
                          type={FieldTypes.ADDITIONAL}
                        />
                      </div>
                    ))}
                    <IconButton onClick={() => handleAddTranslation(index, field)}>
                      <ArrowRightCircle size={30}/>
                    </IconButton>
                  </div>
                  <div className={styles.horizontal_container}>
                    <span className={styles.additional_label}>Associations:</span>
                    {field.associations.map((association, associationIndex) => (
                      <div key={association} className={styles.additional_input_container}>
                        <input
                          className={styles.additional_input}
                          {...register(`list.${index}.associations.${associationIndex}`)}
                          onFocus={() => handleFieldFocus(`list.${index}.associations.${associationIndex}`)}
                          autoFocus={currentFocus === `list.${index}.associations.${associationIndex}`}
                        />
                        <IconButton onClick={() => handleRemoveAssociations(associationIndex, index, field)}><X size={20}/></IconButton>
                      </div>
                    ))}
                    <IconButton onClick={() => handleAddAssociation(index, field)}><ArrowRightCircle size={30}/></IconButton>
                  </div>
                </div>
              </div>
            ))}
          <div className={styles.icon_button_container}>
            <IconButton onClick={handleAddField}><PlusCircle size={50}/></IconButton>
          </div>
        </form>
      </main>
    </div>
  )
}
