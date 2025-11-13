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
