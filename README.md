#### Blink-Message App ####

### Overview ###
    In an increasingly digital world, maintaining privacy is more important than ever. The Blink Message app empowers users to share sensitive information through self-destructing notes that automatically vanish after being read. Whether for personal secrets, business communications, or confidential data, Blink Message ensures secure and private exchanges while being user-friendly and easy to navigate.

### Purpose and Objectives ###

    The primary goal of the Blink Message app is to create a secure platform dedicated to the private sharing of sensitive information. The specific objectives include:

## Ensure Message Security:
    Implement robust encryption and password protection for each note to prevent unauthorized access.
## Enhance User Experience:
    Develop an intuitive interface that allows users to compose, send, and receive notes effortlessly, without any technical hurdles.
## Provide Feedback Mechanisms:
    Integrate features such as read receipts that notify senders when their notes have been opened, adding transparency to communication.
## Support Group Communication:
    Enable users to send notes to multiple recipients at once, with each recipient receiving unique access credentials for added security.
## Incorporate Engaging Elements:
    Add engaging destruction animations and customizable options to enhance the overall user experience.

### Target Audience ###
    The Blink Message app is tailored for a diverse audience, including:

## Individuals with Privacy Concerns: 
    Users who are conscious about digital security and wish to protect their personal information from unauthorized access.

## Businesses and Organizations: 
    Companies that need to share confidential information securely, including sensitive internal communications and client data.

## Professionals: 
    Individuals in fields such as law, accounting, and healthcare who regularly handle sensitive information and require secure communication methods to uphold client confidentiality.

## Students and Educators: 
    Students sharing project details or sensitive academic information, as well as educators needing a secure platform for communication with students and parents.

### Setup Instructions ###

The main development branch is `develop`

## System Requirements ##

# Hardware Requirements
- Any machine capable of running a modern web browser (Chrome, Firefox, Safari, etc.).
- Minimum 4 GB RAM recommended for smooth performance.

# Software Requirements
- Node.js: Version 16.x or later
- Git: Version 2.x or later
- Library Versions
- React: V-18.3.1
- Bootstrap: V-5.3.3
- Firebase: V-10.12.2
- Cypress: V-13.14.2
- EmailJS: V-3.2.0

## Setup Instructions ##

# Clone the Repository 
-Open your terminal and run:

    git clone https://github.com/Ramshha/Blink-Message-App

# Navigate to the Project Directory

    cd Blink-Message-App

# Install Dependencies 
- Run the following command to install all necessary dependencies:

    npm install

# Start the Development Server 
- Launch the app by running:

    npm start
# Run Testing
- To run end-to-end tests with Cypress:

    npx cypress open

### Getting Started ###

## Sending Notes ##

# Sign Up:
- Open the Blink Message app and navigate to the "Register" form to create an account.
- Enter your email address and create a strong password.
- Click "Register" to create your account.

# Log In:
- Once verified, return "Login" form and log in using your email and password.

## Navigating the Navbar ##
 
 Upon logging in, you will see a navigation bar at the top of the dashboard. The navbar provides quick access to the following options:.

# Create Note:
- Type your note title and message.
- Set a self-destruct timer for how long the note can be viewed.
- Select an animation for destruvtion
- Enter the recipient’s email address and 
- Click on the "Send" button to deliver your note securely.

# View Note:
- Access the "View Note" section to review notes you’ve received.
- Enter the Note Access Id and Password.
- Click the "View Note" to View your note.

# Contact List:
- Click on the "Contact List" option to manage your contacts
- Add new contect by entering the "Conatct Name" and "contact Email"
- Click the Edit button to edit existing contact
- Click the Delete button to delete contacts you no longer need
- click on the Send button to send note directly to that contact.

# About Page:
- The "About Page" provides information about the app, its features, and the team behind Blink Message

# Notifications:
- Click on the "Notifications" button to view alerts regarding read receipts.

## Viewing Notes ##
    If you want to view a note without registering or if you're not an existing user, you can do so easily

# Navigate to the View Note Option:
- From the main page, click on the "View Note" option.
- You will be prompted to enter the Access ID and password associated with the note you wish to view.
- After entering the required information, click on "View Note." The note will open, allowing you to read it before it self-destructs.

### Project Structure ###


Blink-Message/
├── cypress/                     # End-to-end testing files and configurations
│   ├── downloads/               # Manages files downloaded during tests
│   ├── e2e/                     # E2E test files simulating user interactions
│   ├── fixtures/                # Test data used during testing (e.g., JSON files)
│   └── support/                 # Support files and custom commands for Cypress
├── node_modules/                # Installed dependencies (managed by npm/yarn)
├── public/                      # Static files served by the application
│   ├── index.html               # Main HTML entry point for the application
│   ├── manifest.json            # Metadata for PWA features
│   └── robots.txt               # Instructions for web crawlers about indexing
├── src/                         # Source code for the application
│   ├── components/              # React components organized into subdirectories
│   │   ├── entryPage/           # Components for the entry/landing page
│   │   ├── viewNotePage/        # Components for viewing note without login
│   │   ├── homePage/            # Components for the home page content after login
│   │   ├── navigation/          # Navigation components
│   │   └── images/              # Image assets used in components
│   ├── App.css                  # Styles for the main app component
│   ├── App.js                   # Main application component integrating others
│   ├── FirebaseConfig.js        # Configuration for connecting to Firebase services
│   ├── index.js                 # Entry point that renders the App component
│   └── reportWebVitals.js       # Utility for measuring app performance metrics
├── .gitignore                   # Lists files and directories to be ignored by Git
├── cypress.config.js            # Configuration settings for Cypress testing
├── package.json                 # Project metadata, scripts, and dependencies
└── README.md                    # Documentation and setup instructions for the project

## Directory Overview ##
The organization within this directory follows a modular approach, categorizing components by their functionality. Below are the key subdirectories and their purposes:

# Entry Page Components
- Purpose: Contains components related to the initial entry point of the application.
- Key Files:
1. EntryPage.jsx: The main component that displays the entry interface for users.
2. EntryPage.css: Styles specific to the entry page layout.4

# Authentication Components
- Purpose: Manages user authentication processes such as login, registration, and signout.
- Key Files:
Authentication.jsx: The primary component for handling user authentication logic.
1. LoginPage.jsx: Component for user login.
2. RegisterPage.jsx: Component for user registration.
3. Signout.jsx: Handles user sign-out functionality.
4. Authentication.css: Styles for authentication-related components.

# Note Management Components
- Purpose: Facilitates the composition, viewing, and sharing of notes.
- Key Files:
1. ComposeNote.jsx: Component for creating new notes with options for timers and passwords.
2. ViewNote.jsx: Displays individual notes and manages their destruction.
3. ShareNote.jsx: Manages sharing options and details for notes.

# Home Page Components
- Purpose: Represents the main interface users interact with after logging in.
- Key Files:
1. Home.jsx: Main component for the home page, displaying the dashboard and navigation.
2. Home.css: Styles for the home page layout.

# Contact Management Components
- Purpose: Manages the user’s contacts for sharing notes securely.
- Key Files:
1. Contact.css: Styles for the Contact page layout.
2. Contact.jsx: Main component that displays the contact list.

# Notification Components
- Purpose: Displays notifications related to note activities, such as read receipts or reminders.
- Key Files:
1. Notification.jsx: Component responsible for showing notifications to users.
2. Notification.css: Styles for notifications.

# Other Utility Components
- Purpose: Contains miscellaneous components that enhance user experience.
- Key Files:
1. NavBar.jsx: Navigation bar component providing links to various sections of the app.
2. Footer.jsx: Displays footer information on the main pages.
3. EntryNav.jsx: Navigation component specific to the entry page.

## Organizational Standards ##

# Directory Structure

- Modular Organization: The project is organized into folders based on functionality. This modular approach allows developers to find related files easily.
  cypress/: Contains all testing-related files.
  src/: The main source directory, further divided into components/, navigation/, and images/ for clarity.
   
- Components Organization
  Feature-based Subdirectories: Inside the components/ folder, components are organized into feature-specific subfolders (e.g., entryPage/, homePage/). This helps maintain a clear structure, making it easier to understand the purpose of each component group.

- Consistent Use of State Management
  Context and Props: Components are designed to rely on context and props for shared state management. This practice encourages modularity and reusability, allowing for easier updates and maintenance.

- Documentation
  Inline Comments and Documentation: Code includes inline comments and documentation where necessary, explaining complex logic or component functionality. This practice aids developers in understanding code intent quickly.
  
- Testing Practices
  Tests are included in the cypress/ directory and are structured to cover all major components and functionalities. This ensures that any updates or changes to the codebase can be verified against expected behavior, improving reliability.

- Folder and Subfolder Naming
  All folder and subfolder names use camelCase (e.g., entryPage, homePage, manageContact). This approach enhances readability and distinguishes them from file names.

- JSX Files
  All JSX files within the components/ folder use PascalCase (e.g., LoginPage.jsx, ViewNote.jsx). This convention signifies that these files are React components, making it clear which files contain UI elements.

### Known Bugs and Issues ###

## Bug 1: Attached Files Remain Accessible After Note Destruction

- Description: When a user views a note and clicks the "View File" button, the attached file opens in a new tab. If the note is then destroyed, the file remains accessible.
- Expected Behavior: The attached file should be inaccessible once the note is destroyed.
- Workaround: Users can manually close the attachment tab before or after the note is destroyed. Implementing a notification reminding users to close the attachment tab could be a temporary solution.

### Troubleshooting ###

# Unable to Send Notes (Error Code: 403 Forbidden): 
    Check your internet connection and ensure proper authentication with Firebase. Verify API keys and permissions in the Firebase console.

# Read Receipts Not Updating: 
    Clear your cache and refresh the app to ensure all data is current.

# App Stops or Crashes: 
    Ensure all dependencies are installed correctly. Check the console for errors and resolve them. Restart the app after making fixes.

# Unable to Access Attached Files (Error Code: 404 Not Found): 
    Ensure the file was uploaded correctly before sending the note. Verify recipient permissions.

# Self-Destruct Timer Not Working: 
    Confirm the timer is set correctly before sending the note. Restart the app if issues persist.

# Difficulty Logging In (Error Code: 401 Unauthorized): 
    Verify your login credentials and check your internet connection.

# Poor App Performance: 
    Check device storage and memory usage. Close other applications to free up resources.

# Animation Glitches During Destruction: 
    Ensure compatibility with your browser and update graphics drivers. Try switching browsers if issues persist.

# Contact Management Errors: 
    Verify permissions for managing contacts. Refresh the contact list and restart the app to resolve sync issues.

### Future Development Ideas ###

# Improved UX/UI Design: 
    Enhance the user interface for better navigation and usability.

# Screenshot Prevention: 
    Implement measures to prevent recipients from taking screenshots of sensitive notes.

# Group Notes Feature: 
    Allow users to easily send notes to multiple contacts at once, enhancing efficiency.

# Voice and Video Messaging: 
    Introduce the ability to send voice and video messages that self-destruct after being viewed.

# Integrating a Camera Feature: 
    Enable users to take and send photos directly within the app.

# Enhanced Disappearing Animations: 
    Create a library of fun animations for self-destructing notes to enhance user engagement.