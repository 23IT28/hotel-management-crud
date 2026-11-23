# StayComfo – Hotel Management Application

A responsive hotel management web application built using React.js and Redux Toolkit. StayComfo allows users to manage hotel information through a clean interface with CRUD operations, search, filtering, pagination and interactive map integration.

## Project Overview

StayComfo is a Single Page Application (SPA) designed to simplify hotel information management. Users can add new hotels, view hotel details, update existing records and delete hotels through an intuitive interface.

The application uses dummy hotel data with Redux Toolkit for state management and localStorage for browser-based persistence.

## Features

- **Hotel Listing:** Display hotels using responsive card layouts.
- **Add Hotel:** Add new hotel details with image upload and preview.
- **Edit Hotel:** Update existing hotel information using a reusable form.
- **Delete Hotel:** Delete hotel records with a confirmation popup and success message.
- **Search:** Search hotels by title.
- **Price Filter:** Filter hotels based on minimum and maximum price.
- **Pagination:** Display hotel records across multiple pages.
- **Hotel Details:** View complete hotel information.
- **Interactive Map:** Display hotel locations using latitude and longitude.
- **Form Validation:** Validate hotel details before submission.
- **Local Storage:** Preserve hotel data after browser refresh.
- **Responsive UI:** Support desktop, tablet and mobile screens.
- **SEO Optimization:** Dynamic meta tags and image alt attributes.

## Technology Stack

Frontend = React.js, HTML5, CSS3, JavaScript 
Build Tool = Vite 
State Management = Redux Toolkit, React Redux 
Routing = React Router DOM 
SEO = React Helmet Async 
Maps = Leaflet, React Leaflet, OpenStreetMap 
Data Persistence = Browser localStorage 

## Project Structure

StayComfo/
│
├── public/
│   └── images/
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── HotelCard.jsx
│   │   └── HotelForm.jsx
│   │
│   ├── data/
│   │   └── hotels.js
│   │
│   ├── pages/
│   │   ├── HotelList.jsx
│   │   ├── AddHotel.jsx
│   │   ├── EditHotel.jsx
│   │   └── HotelDetails.jsx
│   │
│   ├── redux/
│   │   ├── hotelSlice.js
│   │   └── store.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── package.json
└── README.md
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/23IT28/hotel-management-crud.git
```

### 2. Navigate to the Project Folder

```bash
cd hotel-management-crud
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in the terminal to access the application.

## Data Persistence

The application uses browser localStorage to store hotel records.

- Initial hotel records are loaded from the local dummy data file.
- New hotel records are stored in Redux state.
- Changes are persisted in localStorage.
- Data remains available after refreshing the browser in the same browser environment.

**Note:** This project currently uses dummy data and browser-based persistence. It does not use a live backend API or PostgreSQL database.

## Future Enhancements

- Backend integration using Node.js and Express.
- PostgreSQL database integration.
- User authentication and authorization.
- Hotel room management and booking functionality.

## Author

**Megavarthini V N**

B.Tech – Information Technology

GitHub: [23IT28](https://github.com/23IT28)

---

*StayComfo – Find comfort. Feel at home.*