import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
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
import { isArrayLength } from '../../../utils/Validations';
import useKeyboard from '../../../hooks/useKeyboard';

export default function TaskListing() {
  const {
    tasks,
    fullCount,
    loading,
    syncing,
    refreshing,
    onRefresh,
    // editTask,
    deleteTask,
    syncNow,
    searchQuery,
    setSearchQuery,
    loadMore,
    openAddModal,
    closeAddModal,
    isAddModalVisible,
    openEditModal,
    selectedTask,
    handleClearAll,
  } = useTask();

  const isKeyboard = useKeyboard();

  const renderItem = ({ item }: any) => {
    const data = {
      id: item?.id,
      title: item?.title,
      description: item?.description,
      completed: item?.completed,
      syncStatus: item?.syncStatus,
    };
    return (
      <TaskItem
        task={data}
        // onToggle={t => editTask(t.id, { completed: !t.completed })}
        onEdit={openEditModal}
        onDelete={id => deleteTask(id)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <ScreenLoader loader={loading} />

      <View style={styles.searchRow}>
        <Typo style={styles.header}>
          {LABEL.TASK} {fullCount > 0 ? `(${fullCount})` : ''}
        </Typo>

        {/* Sync Button */}
        <CustomButton
          text={syncing ? 'Syncing...' : 'Sync Now'}
          onPress={syncNow}
          buttonColor={Color.primary}
          style={styles.syncBtn}
          disabled={syncing}
        />
      </View>

      {/* Search */}
      <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Listing */}
      <FlatList
        data={tasks ?? []}
        numColumns={1}
        keyExtractor={(item: Task) => item?.id?.toString()}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={
          <NoDataComponent loading={loading} text={LABEL.NO_DATA} />
        }
        style={{ padingBottom: 200 }}
      />

      {/* <View style={styles.countRow}>
        <Typo style={{ color: '#666' }}>
          Showing {tasks?.length} of {fullCount} (page {page}, page size{' '}
          {PAGE_SIZE})
        </Typo>
      </View> */}

      {/* Clear All Button */}
      {isArrayLength(tasks) && (
        <IconButton
          onPress={handleClearAll}
          name="clear"
          icon="MaterialIcons"
          customStyles={[styles.clearBtn, isKeyboard && styles.hide]}
        />
      )}

      {/* Add Task Button */}
      <IconButton
        onPress={openAddModal}
        name="plus"
        icon="AntDesign"
        customStyles={[styles.addBtn, isKeyboard && styles.hide]}
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
    right: '5%',
    bottom: '1%',
  },
  countRow: {
    padding: 12,
    alignItems: 'center',
  },
  syncRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearBtn: {
    position: 'absolute',
    right: '5%',
    bottom: '10%',
    backgroundColor: Color.red,
  },
  hide: {
    display: 'none',
  },
});
