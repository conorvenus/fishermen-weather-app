# 🐟 FishCast

FishCast is a weather app for fishermen, designed to help them plan their fishing journeys safely and offline out at sea.

**Note:** Offline mode will only work if you build the application for production, please follow the second guide.

## Usage

1. **Clone the Repository**: 
   After cloning the repository, navigate to the root directory in your terminal.

2. **Install Dependencies**: 
   Run `npm i` or `npm install` in the directory.

3. **Start the Application**: 
   Execute `npm run dev` from the directory.

## Usage with Offline Mode

1. **Build the Application**:
    Run `npm run build` from the directory, this will build the files for production and include the offline features (as they are designed only for production).

2. **Run the Build**:
    Run `npm run preview` from the directory after building to serve the built application in production preview mode, you will be able to test offline mode.