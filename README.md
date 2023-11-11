# Embreo-Test

![Home-CompanyHR](https://github.com/vtjhyn/embreo/assets/112056232/a6356439-843e-48d9-9f79-646a8e1b1c1e)


This is a web application for an event management system. Below are the features of this program:

1. **Multi-role**
   - In this program, there are two roles: Company HR and Vendor.

2. **Create Event**
   - If you log in as a Company HR, you can submit an event through the Add Event form. You can propose three dates for the event, and only one date will be approved by the vendor.

3. **View Event**
   - Each role can view events created (Company HR) or approved/rejected (Vendor). Each account can only see their own events and cannot view events from other users.

4. **View Event Detail**
   - There is a 'View' button on each event data, allowing you to see detailed information about the event.

5. **Event Status**
   - Every event proposed by a Company HR will, by default, have a 'PENDING' status. The status will change when it is approved/rejected by the registered vendor.

6. **Event Approval**
   - If you log in as a Vendor, you can approve or reject each event proposed to your vendor account. If you choose to approve, you must select a date from the three proposed by Company HR. If you reject, a field will appear to write the reason for rejecting the event.

## Technologies Used

### Frontend
- [React](https://reactjs.org/)
- [Ant Design](https://ant.design/)
- [React Router DOM](https://reactrouter.com/)
- [Dayjs](https://day.js.org/)
- [React Redux](https://react-redux.js.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Places Autocomplete](https://www.npmjs.com/package/react-places-autocomplete)
- [Axios](https://axios-http.com/)
- [Tailwind CSS](https://tailwindcss.com/)

The frontend is built using TypeScript for scalability and ease of development.

### Backend
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [JWT](https://jwt.io/)
- [MongoDB](https://www.mongodb.com/)
- [Prisma](https://www.prisma.io/)
- [Moment Timezone](https://momentjs.com/timezone/)

The backend uses Prisma ORM for easy database modeling and migration.

The user data is organized in the following tables:

#### Company HR Users

| Company           | Username | Password |
|-------------------|----------|----------|
| PT UJI COBA 1     | uji1     | 123123   |
| PT UJI COBA 2     | uji2     | 123123   |

#### Vendor Users

| Name      | Username | Password |
|-----------|----------|----------|
| Vendor A  | venA     | 123123   |
| Vendor B  | venB     | 123123   |

The entire program is deployed on Vercel. You can try it out by visiting the following link:

**DEMO: [https://embreo.vercel.app/](https://embreo.vercel.app/)**

You can find the complete documents and images in the "documentation" folder in this repository; enjoy!
