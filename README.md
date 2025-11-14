# 📱 Productivity Suite – Task Manager & My Gallery App  

## 🧾 Project Description  

Welcome to **Productivity Suite**, a dual React Native project that includes two powerful mobile applications:  

1. ✅ **Task Management App** - A simple yet efficient offline-first task tracker with local storage and sync support.  
2. 🖼️ **My Gallery App** – A lightweight, fast, and beautiful local photo gallery to store and manage your images.  

Both apps are built using **React Native CLI**, following **modular architecture**, **Redux Toolkit** for state management, and **AsyncStorage** for local persistence.  

These projects are designed with a focus on **clean code**, **performance**, and **real-world usability**, making them great examples of scalable mobile app development.

App Link - [ https://drive.google.com/drive/folders/1vC-u6pyNKNOYvXw3wQDspXABKPsBj_6U?usp=sharing ]
---

## 🗂️ Table of Contents  

| Section | Description |
| -------- | ------------ |
| [Description](#description-) | 📚 Overview of both apps |
| [Technologies](#tech-stack-) | 💻 Tech stack used |
| [Features](#features-) | 🏰 App features |
| [Problem Solving Origin](#problem-solving-origin-) | 💡 Real-world inspiration |
| [Screenshots](#screen-preview-) | 🖼️ App preview |
| [Demo Video](#demo-video-) | 🎬 App demonstration |
| [Known Issues](#known-issues--improvements-) | ⚠️ Current bugs & enhancements |


---

## 📚 Description  

### 📝 Task Management App  

The **Task Manager** helps users efficiently create, update, and organize daily tasks, even offline.  
It was built to demonstrate **offline-first design**, **Redux-based state synchronization**, and **persistent local data** handling.

**Key Highlights:**
- Full CRUD operations (Create, Read, Update, Delete)
- Offline support via AsyncStorage
- Redux Toolkit with createAsyncThunk for background sync
- Status-based task syncing (Pending / Synced)
- Simple search and filter functionality
- Clean, responsive UI

---

### 🖼️ My Gallery App  

The **My Gallery** app is a modern local image management tool that allows users to import, view, and organize multiple images directly from their device, completely offline.

**Key Highlights:**
- Select and store multiple images from device gallery
- Smooth swipe-down gesture to close full-screen view
- Fast and memory-optimized image rendering
- Local storage using AsyncStorage
- Minimal and elegant UI  

---

## 💻 Tech Stack  

| Logo | Technology |
| ---- | ----------- |
| <img height="40" src="https://reactnative.dev/img/header_logo.svg"> | React Native CLI |
| <img height="40" src="https://redux-toolkit.js.org/img/redux.svg"> | Redux Toolkit |
| <img height="40" src="https://react-hook-form.com/images/logo/react-hook-form-logo-only.png"> | React Hook Form |
| <img height="40" src="https://cdn.hashnode.com/res/hashnode/image/upload/v1679386490806/a8f88586-10de-41cc-9f32-d4004a7719ec.png"> | Yup Validation |
| <img height="40" src="https://miro.medium.com/1*c69dJw9ThZSwG_AgzLBTMQ.png"> | AsyncStorage |
| <img height="40" src="https://www.vectorlogo.zone/logos/github/github-icon.svg"> | GitHub & Version Control |

---

## 🎨 Features  

### ✅ **Task Management App**
- 🗂️ Create, Edit, and Delete Tasks
- 🔄 Background Task Sync (Pending → Synced)
- 💾 Offline Storage with AsyncStorage
- 🔍 Search Tasks
- 🗑️ Clear All Tasks Feature
- 🕓 Sync Status Indicator (Pending / Synced)
- ⚙️ Redux Toolkit with Async Thunks for data operations
- ꩜ Auto Sync once back to internet
- 🗝 Manual sync button

---

### 🖼️ **My Gallery App**
- 📸 Pick and Add Multiple Images from Gallery
- 🧠 Efficient local caching (URIs stored in AsyncStorage)
- 📱 Fullscreen Image Viewer with Zoom and Swipe-Down-to-Close
- 🚀 Lightweight and performance-optimized image handling
- 💾 Offline-first with complete local persistence
- 🧹 Option to clear all stored images
- ✨ Smooth and modern UI built with clean reusable components

---

## ⚠️ Known Issues & Improvements  

### 📝 **Task Management App**
1. **Edit Sync Issue** –  
   Editing a task updates it locally, but on remote API, it currently **creates a new task instead of updating** the existing one.  
   *(Fix: Implement `PUT /updateTask/:id` endpoint and map local → remote IDs properly.)*

2. **Delete Sync Issue** –  
   On delete, the task is removed from **Redux state** and **AsyncStorage**, but not from **remote API**.  
   *(Fix: Implement remote delete API call in `syncPendingTasks` or separate sync delete handler.)*

---

### 🖼️ **My Gallery App**
1. **Loader Behind Modal** –  
   When pressing the **Add Image** button, the loader state turns true behind the image picker modal.  
   *(Fix: Delay loader activation until after modal closes or show loader inside the picker context.)*

---


## 🧠 Future Enhancements  
- 🔔 Notifications for task reminders
- ☁️ Cloud sync for gallery and task data
- 🧭 Improved filtering and sorting
- 👥 Multi-user collaboration


## 💡 Problem Solving Origin  

---

## 🖼️ Screen Preview  


| Task Manager | My Gallery |
| ------------- | ----------- |
| 📝 Task List UI | 🖼️ Gallery Grid View |
| 🔄 Sync Flow | 📷 Image Picker |
| 🔍 Search Bar | 🔍 Zoom Viewer |

---


# Getting Started

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start --reset-cache

```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

```




---

# 🛠️ Task Management App – Architecture, Flow & Sync Approach

This section explains **how tasks are created, updated, deleted, stored locally, and synced with a remote API** using an offline-first architecture with Redux Toolkit + AsyncStorage.

---

## 🔄 Overview of the Approach

The Task Management App follows a **Local-First Architecture**, meaning:

> **All task operations happen locally first and sync to the remote API whenever possible.**

This ensures:

* App works offline
* No data loss
* Smooth performance
* Predictable state management

---

# 🔰 1. **Creating a Task (Add Flow)**

### **Flow**

```
UI Form → Redux Slice → Add Task → Save to AsyncStorage → Mark as PENDING → Auto Sync (Remote API)
```

### **Detailed Steps**

1. User enters **title**, **description**, etc.
2. On submit:

   * A **new task object** is created with:

     * `id` (UUID)
     * `syncStatus = 'pending'`
     * `createdAt`, `updatedAt`
3. The task is **added to Redux state**.
4. Updated task list is **saved to AsyncStorage**.
5. Sync worker (or manual Sync button) tries to push it to the server.
6. On successful remote API response:

   * The task is updated with:

     * `remoteId`
     * `syncStatus = 'synced'`

---

# ✏️ 2. **Editing a Task (Edit Flow)**

### **Flow**

```
UI Form (Edit Mode) → Update Task in Redux → Save to AsyncStorage → syncStatus = PENDING → Auto Sync (Remote PUT API)
```

### **Detailed Steps**

1. User opens form with prefilled values.
2. On submitting update:

   * Task is updated **locally** with:

     * new values
     * `syncStatus = 'pending'`
     * updated timestamp
3. Updated Redux state is stored in **AsyncStorage**.
4. Sync worker attempts to:

   * **UPDATE existing task remotely** (currently missing in your case)
5. On successful update:

   * `syncStatus = 'synced'`

⚠️ **Known Improvement Needed**
Currently the remote API creates a *new* task instead of updating, you need a proper PUT/UPDATE endpoint.

---

# 🗑️ 3. **Deleting a Task (Delete Flow)**

### **Flow**

```
Delete in Redux → Remove from AsyncStorage → (intended) Remove from Remote API → Sync
```

### **Detailed Steps**

1. User clicks delete.
2. Task is **removed from Redux state** immediately.
3. Updated list is saved to AsyncStorage.
4. During sync:

   * Expected behavior → call DELETE API for remote task
   * Current issue → DELETE not implemented yet
   * So remote tasks remain

---

# 💾 4. **Local Storage Persistence (AsyncStorage)**

Every major change triggers:

```
Redux update → saveTasksToStorage(updatedList)
```

This ensures:

* App remembers tasks after restart
* Offline use is possible
* Sync happens based on local state, not UI

---

# 🔄 5. **Auto Sync Mechanism (Background Sync)**

### **How Sync Works**

The app runs `syncPendingTasks` using Redux Thunk:

```
Pending Tasks → Loop through each → Try pushing to API → Update syncStatus → Save back to storage
```

### **Sync Logic**

* Loop over all tasks
* If `syncStatus === 'pending'`

  * Try to push to server
  * If success → update task (remoteId + syncStatus)
  * If failure → keep pending, retry later
* Save updated list to AsyncStorage
* Return synced list to Redux

### **Why This Works**

* Fully offline-first
* No user waits for network
* Sync can run anytime:

  * App start
  * Pull-to-refresh
  * Manual sync button

---

# 🔁 6. **Manual Sync Button (User Triggered Sync)**

You provide a **Manual Sync Button** that calls:

```ts
dispatch(syncPendingTasks());
```

The button allows:

* Re-sync after offline period
* Try again after network failures
* Force sync even if auto sync didn’t run

### **Manual Sync Flow**

```
User presses SYNC → Run syncPendingTasks → Push PENDING tasks → Update Redux → Save AsyncStorage
```

---

# 📊 Summary Flow Diagram

```
                ┌──────────────────────┐
                │       User UI        │
                └──────────┬───────────┘
                           │
                Add / Edit / Delete
                           │
            ┌──────────────▼──────────────┐
            │        Redux Toolkit         │
            └──────────────┬──────────────┘
                           │
                 Local-First Update
                           │
            ┌──────────────▼──────────────┐
            │       AsyncStorage           │
            └──────────────┬──────────────┘
                           │
                Mark Item syncStatus=PENDING
                           │
            ┌──────────────▼──────────────┐
            │    Auto/Manual Sync Task    │
            └──────────────┬──────────────┘
                           │
                   Remote API Sync
```

---

# 🚀 Final Notes

This architecture ensures:

✔ 100% offline usability
✔ No blocking UI during network calls
✔ Stable and predictable state management
✔ Easy syncing with backend when online
✔ Perfect approach for mobile apps with flaky network environments

---

