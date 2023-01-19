
# GHL 
GHL is a responsive React app interface for manangerment medical reports built on [Material-UI](https://mui.com/zh/) .

![](https://github.com/johnny990628/GHL_Frontend/blob/master/public/ghl.gif)
<img src="./public/logo.png" width="20%" />

## Requirements
- [Node.js](https://nodejs.org/zh-tw/download/) > 16
- [GHL_Backend](https://github.com/johnny990628/GHL_backend)

## Installation

### Step1-Set up the backend server
[GHL Backend](https://github.com/johnny990628/GHL_backend)

### Step2-Clone the repo
```bash
git clone https://github.com/johnny990628/GHL_Frontend.git
cd GHL_Frontend
```

### Step3-Install dependencies
```bash
npm install
```

### Step4-Configuration

#### Modify your `.env` file in root folder

#### dotenv template
```bash
REACT_APP_API_URL="http://localhost:3090/ghl/api"
REACT_APP_AUTH_URL="http://localhost:3090/ghl/auth"
REACT_APP_ROUTE_BASENAME="/GHL_Frontend"
REACT_APP_BLUELIGHT_URL="dicom viewer url"
```

#### You may also config for deploying at any route
```bash
REACT_APP_ROUTE_BASENAME="."
```

### Step5-Run the app
```bash
npm run start
```

#### Or Build as static files
```bash
npm run build
```

## Author 🎉
[johnny990628](https://github.com/johnny990628)
