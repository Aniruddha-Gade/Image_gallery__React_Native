import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import useTask from '../hooks/useTask';
import TaskItem from '../components/TaskItem';
import AddTaskForm from './AddTaskForm';
import OverlayModal from '../../../components/common/OverlayModal';
import IconButton from '../../../components/common/IconButton';
import ScreenLoader from '../../../components/common/ScreenLoader';
import NoDataComponent from '../../../components/common/NoDataComponent';
import { LABEL } from '../constant/constant';
import Color from '../../../assets/Color';
import Typo from '../../../components/common/Typo';
import CustomButton from '../../../components/common/CustomButton';
import Searchbar from '../../../components/common/Searchbar';
import { Task } from '../types/type';

export default function TaskListing() {
  const {
    tasks,
    fullCount,
    loading,
    syncing,
    refreshing,
    onRefresh,
    editTask,
    deleteTask,
    syncNow,
    searchQuery,
    setSearchQuery,
    loadMore,
    openAddModal,
    closeAddModal,
    isAddModalVisible,
    page,
    PAGE_SIZE,
    openEditModal,
    selectedTask,
  } = useTask();

  const renderItem = ({ item }: any) => (
    <TaskItem
      task={item}
      onToggle={t => editTask(t.id, { completed: !t.completed })}
      onEdit={openEditModal}
      onDelete={id => deleteTask(id)}
    />
  );

  return (
    <View style={styles.container}>
      <ScreenLoader loader={loading} />

      <View style={styles.searchRow}>
        <Typo style={styles.header}>Tasks</Typo>

        {/* Sync Button */}
        <CustomButton
          text={syncing ? 'Syncing...' : 'Sync Now'}
          onPress={syncNow}
          buttonColor={Color.primary}
          style={styles.syncBtn}
        />
      </View>

      {/* Search */}
      <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Listing */}
      <FlatList
        data={tasks ?? []}
        keyExtractor={(item: Task) => item?.id?.toString()}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={
          <NoDataComponent loading={loading} text={LABEL.NO_DATA} />
        }
        contentContainerStyle={{ marginTop: 16 }}
      />

      <View style={styles.countRow}>
        <Typo style={{ color: '#666' }}>
          Showing {tasks?.length} of {fullCount} (page {page}, page size{' '}
          {PAGE_SIZE})
        </Typo>
      </View>

      {/* Add Task Button */}
      <IconButton
        onPress={openAddModal}
        name="plus"
        icon="AntDesign"
        customStyles={styles.addBtn}
      />

      <OverlayModal
        title={selectedTask ? LABEL.EDIT_TASK : LABEL.ADD_TASK}
        visibility={isAddModalVisible}
        onClose={closeAddModal}
        InnerContent={
          <AddTaskForm closeModal={closeAddModal} existingTask={selectedTask} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.black,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    paddingVertical: 16,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'space-between',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  syncBtn: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
    marginLeft: 8,
    maxWidth: '30%',
  },
  addBtn: {
    position: 'absolute',
    right: 20,
    bottom: 30,
  },
  countRow: {
    padding: 12,
    alignItems: 'center',
  },
  syncRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
