import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Switch } from 'react-native-paper';
import useAddTask from '../hooks/useAddTask';
import { Controller } from 'react-hook-form';
import TextField from '../../../components/common/TextField';
import { LABEL } from '../constant/constant';
import Color from '../../../assets/Color';
import Typo from '../../../components/common/Typo';
import { commonStyles } from '../../../styles/style';
import CustomButton from '../../../components/common/CustomButton';
import { Task } from '../types/type';
import ScreenLoader from '../../../components/common/ScreenLoader';

type Props = {
  closeModal: () => void;
  existingTask?: Task | null;
};

const AddTaskForm = ({ closeModal, existingTask }: Readonly<Props>) => {
  const { control, handleSubmit, errors, onSubmit, loading } = useAddTask({
    closeModal,
    existingTask,
  });

  return (
    <View>
      <ScreenLoader loader={loading} />

      {/* Task Title */}
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value } }) => (
          <TextField
            mandatory
            value={value ?? ''}
            onChangeText={onChange}
            label={LABEL.TASK_TITLE}
            placeholder={LABEL.ENTER_TASK_TITLE}
            error={!!errors?.title}
            errorMessage={errors?.title?.message}
            maxLength={50}
          />
        )}
      />

      {/* Task Title */}
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <TextField
            mandatory
            value={value ?? ''}
            onChangeText={onChange}
            label={LABEL.TASK_DESCRIPTION}
            placeholder={LABEL.ENTER_TASK_DESCRIPTION}
            error={!!errors?.description}
            errorMessage={errors?.description?.message}
            maxLength={200}
          />
        )}
      />

      {/* Task Status */}
      <View style={styles.rowCenter}>
        <Typo>
          {LABEL.TASK_STATUS} <Typo style={commonStyles.mandatory}>*</Typo>
        </Typo>

        <Controller
          name="completed"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Switch
              value={value}
              onValueChange={onChange}
              trackColor={{ true: Color.primary, false: Color.white }}
              thumbColor={Color.primary}
            />
          )}
        />

        <Typo style={commonStyles.error}>{errors?.completed?.message}</Typo>
      </View>

      {/* Submit Button */}
      <CustomButton
        text={existingTask ? LABEL.UPDATE_TASK : LABEL.SUBMIT}
        onPress={handleSubmit(onSubmit)}
        buttonColor={Color.primary}
      />
    </View>
  );
};

export default AddTaskForm;

const styles = StyleSheet.create({
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 35,
  },
});
