import { useEffect, useState } from 'react';
import { Howl } from 'howler';
import EditableInput, { FieldTypes } from './editableInput';
import IconButton from 'components/buttons/icon';
import { useForm, useFieldArray } from "react-hook-form";
import { PlusCircle, X, ArrowRightCircle, Volume2, Circle, Loader } from 'react-feather';
import useStore, { State } from 'store/lists';
import { WordInput, IList } from 'interfaces/list.interface';
import { useAuthState } from 'context/auth';
import { format } from "date-fns";
import { DateFormats } from 'enums/dateFormats';
import useSettingsStore, { State as SettingsState } from 'store/settings';
import { options as languagesArray } from '../constants/languageOptions';
import { calculateLanguageOptions } from 'helpers/language';
import { getAudioUrl } from 'api/audio';
import { pollyOptions } from 'constants/pollyOptions';
import { getTranslation } from 'api/translate';
import Image from 'next/image';

import styles from 'styles/components/ListForm.module.css';

type Props = {
  item: IList | null;
  isTabletOrMobile: boolean;
}

export default function ListForm({ item, isTabletOrMobile }:Props) {
  const languages = useSettingsStore((state: SettingsState) => state.languages);
  const languageToTranslate = useSettingsStore((state: SettingsState) => state.languageToTranslate);
  const changeIsSaving = useStore((state: State) => state.changeIsSaving);
  const [audioLoadingIndex, setAudioLoadingIndex] = useState<number | null>(null);
  const { control, register, handleSubmit, setFocus, getValues, setValue } = useForm({
    defaultValues:{
      header: item ? item.header : '',
      language: item ? item.language : 'en',
      list: item ? item.list : []
    }
  });

  const calculateShowAudio = (lang:string) => {
    return Boolean((pollyOptions as any)[lang])
  }

  const showAudioDefault = calculateShowAudio(getValues().language);
  const [showAudio, setShowAudio] = useState(showAudioDefault);

  useEffect(() => {
    if(!item){
      return
    }
    setValue('list', item.list);
  }, [item])

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "list",
  });

  const revertFieldValue = (fieldName:any, value:string) => {
    setValue(fieldName, value)
  }

  const { user } = useAuthState()

  const updateList = useStore((state: State) => state.update);
  const createList = useStore((state: State) => state.create);

  const submitForm = (data: any) => {

    const body = {
      ...data,
      userId: user.username,
      header: data.header ? data.header : format(new Date(), DateFormats.YYYY_MM_DD),
      createdAt: item?.createdAt || Date.now(),
      isLearned: false
    }

    item ? updateList(body) : createList(body);

  }

  const handleAddField = () => {
    append({ word: '', translations: [], associations: [] });
  }

  const handleRemoveField = (index:number) => {
    remove(index)
  }

  const handleAddTranslation = (index: number) => {
    const field = getValues().list[index];
    update(index, { ...field, translations: [... field.translations, ''] });
  }

  const handleRemoveTranslations = (translationIndex: number, index: number) => {
    const field = getValues().list[index];
    const head = field.translations.slice(0, translationIndex);
    const tail = field.translations.slice(translationIndex+1);
    const updatedTranslations = head.concat(tail);
    update(index, { ...field, translations: updatedTranslations });
  }

  const handleRemoveAssociations = (associationIndex: number, index: number) => {
    const field = getValues().list[index];
    const head = field.associations.slice(0, associationIndex);
    const tail = field.associations.slice(associationIndex+1);
    const updatedAssociations = head.concat(tail);
    update(index, { ...field, associations: updatedAssociations });
  }

  const handleAddAssociation = (index: number) => {
    const field = getValues().list[index];
    update(index, { ...field, associations: [... field.associations, ''] })
  }

  const handleChangeLanguage = (event:any) => {
    const values = getValues();
    const data = {
      ...values,
      language: event.target.value
    }

    setShowAudio(calculateShowAudio(event.target.value));
    submitForm(data);
  }

  const createHowlInstance = (audioSrc:string) => {
    const sound = new Howl({
      src: audioSrc,
      html5: true
    });

    return sound
  }

  const handleAudio = async (index:number) => {
    setAudioLoadingIndex(index);
    const values = getValues();
    const word = values.list[index].word;

    const pollyOption = (pollyOptions as any)[values.language];
    const code = pollyOption?.code || '';
    const voiceId = pollyOption?.voiceId || '';

    const result = await getAudioUrl(word, code, voiceId);
    setAudioLoadingIndex(null);
    if(!result){
      return
    }
    const sound = createHowlInstance(result);
    sound.play();
  }

  const handleTranslate = async (index:number) => {
    const values = getValues();
    const word = values.list[index].word;
    changeIsSaving(true);
    const translation = await getTranslation(word, languageToTranslate);
    values.list[index].translations = [
      ...values.list[index].translations,
      translation
    ]
    submitForm(values);
  }

  return (
      <main className={styles.main}>
        <form onSubmit={handleSubmit((data) => submitForm(data))}>
          <div style={{marginBottom: 30}}>
            <EditableInput
              register={register}
              fieldName='header'
              setFocus={setFocus}
              submitForm={submitForm}
              getValues={getValues}
              revertFieldValue={revertFieldValue}
              placeholder='list name'
            />
          </div>
          <select
            {...register(`language`)}
            className={styles.select_input}
            onChange={handleChangeLanguage}
          >
            {calculateLanguageOptions(languages, languagesArray).map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
          {(fields as Array<WordInput>).map((field, index) => (
              <div key={field.id} className={styles.word_field_container}>
                <div className={styles.vertical_container}>
                  <div className={styles.input_container} style={{width:isTabletOrMobile ? 330 : 500}}>
                    <div style={{marginRight:30}}>
                      <EditableInput
                        register={register}
                        fieldName={`list.${index}.word`}
                        setFocus={setFocus}
                        submitForm={submitForm}
                        getValues={getValues}
                        onRemove={()=>handleRemoveField(index)}
                        index={index}
                        type={FieldTypes.WORD}
                        revertFieldValue={revertFieldValue}
                        placeholder='new word'
                      />
                    </div>
                    {showAudio &&
                      <div>
                        {audioLoadingIndex === index ?
                          <div style={{paddingLeft:7, paddingRight:7}}>
                            <Loader size={30}/>
                          </div>
                          :
                          <IconButton size={30} onClick={() => handleAudio(index)}>
                            <Volume2 size={30}/>
                          </IconButton>
                        }
                      </div>
                    }
                    <IconButton size={30} onClick={() => handleTranslate(index)}>
                      <Image
                        src='/images/translation.png' alt='translation'
                        width={30}
                        height={30}
                      />
                    </IconButton>
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
                          onRemove={() => handleRemoveTranslations(translationIndex, index)}
                          index={index}
                          type={FieldTypes.ADDITIONAL}
                          revertFieldValue={revertFieldValue}
                          placeholder='translation'
                        />
                      </div>
                    ))}
                    <IconButton size={30} onClick={() => handleAddTranslation(index)}>
                      <ArrowRightCircle size={30}/>
                    </IconButton>
                  </div>
                  <div className={styles.horizontal_container}>
                    <span className={styles.additional_label}>Associations:</span>
                    {field.associations.map((association, associationIndex) => (
                      <div key={association} className={styles.additional_input_container}>
                        <EditableInput
                          register={register}
                          fieldName={`list.${index}.associations.${associationIndex}`}
                          setFocus={setFocus}
                          submitForm={submitForm}
                          getValues={getValues}
                          onRemove={() => handleRemoveAssociations(associationIndex, index)}
                          index={index}
                          type={FieldTypes.ADDITIONAL}
                          revertFieldValue={revertFieldValue}
                          placeholder='association'
                        />
                      </div>
                    ))}
                    <IconButton size={30} onClick={() => handleAddAssociation(index)}><ArrowRightCircle size={30}/></IconButton>
                  </div>
                </div>
              </div>
            ))}
          <div className={styles.icon_button_container}>
            <IconButton size={50} onClick={handleAddField}><PlusCircle size={50}/></IconButton>
          </div>
        </form>
      </main>
  )
}
