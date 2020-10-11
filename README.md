# Community collaboration in the context of COVID-19

## Contents

1. [Overview](#overview)
2. [How it works](#how-it-works)
3. [Diagrams](#diagrams)
4. [Documents](#documents)
5. [Technology](#technology)
6. [Getting started](#getting-started)
7. [Resources](#resources)

## Overview

### What's the problem?

In the ongoing COVID-19 crisis, we have seen shortages of food, medical supplies, and other essential commodities. Lack of proper communication channel between people requiring support from authorities in case of shortage of commodities/medical emergency/disaster leads to delay in taking prompt action. Caregivers, NGOs, Community service providers, Shop owners lack knowledge of exact persons in need of any specific help. People willing to extend help also do not know proper forums to engage in any voluntary service.

### How can technology help?

A mobile based solution that empowers communities to easily connect and communicate this information to each other. The mobile, web and cloud services used ensures rapid development/deployment of a scalable solution. Application will act as an one stop solution for not only COVID-19 scenarios but in any disaster/crisis management scenarios identifying persons needing any help and connecting them to persons who can provide that help. Application engages persons in multiple roles to identify people requiring and providing support-

·         Medical Service providers

·         Voluntary Engagement Workers

·         Food or Convenience Shop Owners/Suppliers

·         Senior Citizens

·         Citizens needing Medical help

·         Doctors

·         Authorities (Police, Ambulance Providers, Hospital Service Providers )

## How it works

1. The User/Consumer can launch the mobile app and access the information across various services.

2. They can ask questions to Watson Assistant through chat and get answers on specific services availability.

3. The Provider/Supplier can post availability of resources or volunteer specific tasks.

4. A S.O.S service is available for any medical emergencies. Immediate assistance to be provided by Ambulance Services listed there. Also they can obtain geolocation data to plot routes to nearest medical facility.

## Diagrams

![Cooperation architecture diagram](/images/architecture-diagram.png)

This solution starter idea combines a chat interface (Watson Assistant), data storage to hold the status of supplies available, and location services with real-time information to get users the information they need.

1. The Recipient launches the mobile app and can access information across multiple services.
1. The Recipient can ask questions to Watson Assistant and get answers on food/service availability questions.
1. The Supplier can post the availability of stock or services they can provide, as well as locate the items they need.
1. The Recipient can obtain geolocation data to plot routes to collect (or drop off) supplies using HERE Location Services.

## Documents

Trusted sources for COVID-19 Information:

- [CDC COVID-19 FAQ](https://www.cdc.gov/coronavirus/2019-ncov/faq.html)
- [WHO COVID-19 page](https://www.who.int/health-topics/coronavirus)
- [Johns Hopkins University Coronavirus (includes tracking map)](https://coronavirus.jhu.edu)
- [National Foundation for Infectious Diseases](https://www.nfid.org/infectious-diseases/frequently-asked-questions-about-novel-coronavirus-2019-ncov/)

## Technology

### IBM Cloud Services

- [IBM Watson Assistant](https://www.ibm.com/cloud/watson-assistant/)
- [IBM Watson Discovery](https://www.ibm.com/cloud/watson-discovery)
- [IBM Cloudant](https://www.ibm.com/cloud/cloudant)
- [Build a Chatbot For Your Mobile App](https://developer.ibm.com/technologies/mobile/patterns/building-a-chatbot-with-kubernetes-watson-assistant-and-elastic-search)
- [Build a cross-platform mobile app using React Native](https://developer.ibm.com/technologies/mobile/patterns/build-a-cross-platform-mobile-app-to-search-company-news-and-gain-insights)
- [IBM Cloud Foundry](https://www.ibm.com/cloud/cloud-foundry)

### HERE Technologies

- [HERE.com API Key](https://developer.here.com/ref/IBM_starterkit_Covid?create=Freemium-Basic)
- [HERE Maps](https://developer.here.com/products/maps)
- [HERE Routing](https://developer.here.com/products/routing)
- [Integrate interactive maps and location features into your application](https://developer.here.com/documentation/)

## Getting started

### Prerequisites

- Register for an [IBM Cloud](https://www.ibm.com/account/reg/us-en/signup?formid=urx-42793&eventid=cfc-2020?cm_mmc=OSocial_Blog-_-Audience+Developer_Developer+Conversation-_-WW_WW-_-cfc-2020-ghub-starterkit-cooperation_ov75914&cm_mmca1=000039JL&cm_mmca2=10008917) account.
- Install and configure [IBM Cloud CLI](https://cloud.ibm.com/docs/cli?topic=cloud-cli-getting-started#overview).
- Register for a [HERE](https://developer.here.com/ref/IBM_starterkit_Covid?create=Freemium-Basic) account.
- Install [React Native CLI dependencies](https://reactnative.dev/docs/getting-started.html). See the [React Native documentation](https://reactnative.dev/docs/environment-setup) for the exact steps and requirements based on your Operating System and Target OS. For example:
  - **iOS on macOS**
    - [Node.js](https://nodejs.org/en/)
    - [Watchman](https://facebook.github.io/watchman/docs/install)
    - [Xcode](https://itunes.apple.com/us/app/xcode/id497799835?mt=12)
    - [CocoaPods](https://guides.cocoapods.org/using/getting-started.html)
  - **Android on Windows**
    - [Node.js](https://nodejs.org/en/)
    - [Python 2](https://www.python.org/downloads/)
    - [Java Development Kit](https://www.oracle.com/java/technologies/javase-jdk8-downloads.html)
    - [Android Studio](https://developer.android.com/studio/index.html) - add Android 9 (Pie) SDK & configure `ANDROID_HOME`
    - [Create an Android Virtual Device (AVD)](https://developer.android.com/studio/run/managing-avds.html) - with Pie image (API Level 28)
- Clone the [repository](https://github.com/Call-for-Code/Solution-Starter-Kit-Cooperation-2020).

### Steps

1. [Set up an instance of Watson Assistant](#1-set-up-an-instance-of-watson-assistant).
1. [Provision a CouchDB instance using Cloudant](#2-Provision-a-CouchDB-instance-using-Cloudant).
1. [Generate an API Key from the HERE Developer Portal](#3-generate-an-api-key-from-the-here-developer-portal).
1. [Run the server](#4-run-the-server).
1. [Run the mobile application](#5-run-the-mobile-application).

### 1. Set up an instance of Watson Assistant

Log in to IBM Cloud and provision a Watson Assistant instance.

1. Provision an instance of **Watson Assistant** from the [IBM Cloud catalog](https://cloud.ibm.com/catalog/services/watson-assistant).
1. Launch the Watson Assistant service.
1. [Create an **Assistant**](https://cloud.ibm.com/docs/assistant?topic=assistant-assistant-add).
1. [Add a dialog skill](https://cloud.ibm.com/docs/assistant?topic=assistant-skill-dialog-add) to the **Assistant** by importing the [`starter-kit-cooperation-dialog-skill.json`](./starter-kit/assistant/starter-kit-cooperation-dialog-skill.json) file.
1. Go back to All Assistants page, open **Settings** from the action menu ( **`⋮`** ) and click on **API Details**.
1. Note the **Assistant ID**, **API Key**, and **Assistant URL**. For **Assistant URL**, make note of the base URL/domain (e.g., `https://api.us-south.assistant.watson.cloud.ibm.com` or `https://api.eu-gb.assistant.watson.cloud.ibm.com`) and not the full directory/path. You will need all three of these values in Step 4 below.

1. Go to **Preview Link** to get a link to test and verify the dialog skill.

### 2: Provision a CouchDB instance using Cloudant

Log into the IBM Cloud and provision a [CouchDB instance using Cloudant](https://www.ibm.com/cloud/cloudant).

1. From the catalog, select Databases and then the Cloudant panel.
1. Once selected, you can choose your Cloudant plan -- there is a free tier for simple testing that is sufficient to run this CIR example. You should choose an appropriate region, give the service a name, and it is recommended you choose **Use only IAM** under **Available authentication methods**. You can leave the other settings with their defaults. Click the blue **Create** button when ready.
1. Once your Cloudant instance has been created, you need to create a service credential that the CIR API Server can use to communicate with it. By selecting your running Cloudant instance, you can choose **Service credentials** from the left-hand menu. Create a new service credential and give it a name (it doesn't matter what you call it).
1. Once created, you can display the credentials by selecting **view service credentials**, and then copy the credential, so you are ready to paste it into the code of the API server in Step 4.

### 3. Generate an API Key from the HERE Developer Portal

The application uses HERE Location Services for maps, searching, and routing.

To access these services, you'll need an API key. Follow the instructions outlined in the [HERE Developer Portal](https://developer.here.com/ref/IBM_starterkit_Covid?create=Freemium-Basic) to [generate a JavaScript API key](https://developer.here.com/documentation/authentication/dev_guide/topics/api-key-credentials.html).

### 4. Run the server

To set up and launch the server application:

1. Go to the `starter-kit/server-app` directory of the cloned repo.
1. Copy the `.env.example` file in the `starter-kit/server-app` directory, and create a new file named `.env`.
1. Edit the newly created `.env` file and update the `ASSISTANT_URL`, `ASSISTANT_ID`, and `ASSISTANT_IAM_APIKEY` with the values from the dialog skill's API Detail page in Watson Assistant, from Step 1. Also, update the `CLOUDANT_ID` and `CLOUDANT_IAM_APIKEY` with the values from the service credential you created in Step 2. (Note that the `username` from the credential is what should be used for the `CLOUDANT_ID`.)
1. Edit the **name** value in the `manifest.yml` file to your application name (for example, _my-app-name_).
1. From a terminal:
   1. Go to the `starter-kit/server-app` directory of the cloned repo.
   1. Install the dependencies: `npm install`.
   1. Launch the server application locally or deploy to IBM Cloud:
      - To run locally:
        1. Start the application: `npm start`.
        1. The server can be accessed at <http://localhost:3000>.
      - To deploy to IBM Cloud:
        1. Log in to your IBM Cloud account using the IBM Cloud CLI: `ibmcloud login`.
        1. Target a Cloud Foundry org and space: `ibmcloud target --cf`.
        1. Push the app to IBM Cloud: `ibmcloud app push`.
        1. The server can be accessed at a URL using the **name** given in the `manifest.yml` file (for example, <https://my-app-name.bluemix.net>).

### 5. Run the mobile application

To run the mobile application (using the Xcode iOS Simulator or Android Studio Emulator):

1. Go to the `starter-kit/mobile-app` directory of the cloned repo.
1. Copy the `.env.example` file in the `starter-kit/mobile-app` directory, and create a file named `.env`.
1. Edit the newly created `.env` file:
   - Update the `STARTER_KIT_SERVER_URL` with the URL to the server app launched in the previous step.
     > **Note**: If you are running the server locally and testing with the Android Emulator set the `STARTER_KIT_SERVER_URL` using the local machine's URL (e.g., `http://10.0.2.2:3000`) instead of `localhost`
   - Update the `HERE_APIKEY` with the API key generated in the HERE Developer Portal.
1. From a terminal:
   1. Go to the `starter-kit/mobile-app` directory.
   1. Install the dependencies: `npm install`.
   1. **iOS only**: Go to the `ios` directory: `cd ios`.
   1. **iOS only**: Install pod dependencies: `pod install`.
   1. **iOS only**: Return to the `mobile-app` directory: `cd ../`.
   1. Launch the app in the simulator/emulator:
      - **iOS only**: `npm run ios`
        > **Note**: You should be running at least iOS 13.0. The first time you launch the simulator, you should ensure that you set a Location in the Features menu.
      - **Android only**: `npm run android`
        > **Note**: Your Android Studio needs to have the `Android 9 (Pie)` SDK and a `Pie API Level 28` virtual device

With the application running in the simulator/emulator, you should be able to navigate through the various screens:

![Onboarding Screen](/images/1-onboarding.png)
![Sign Up Screen](/images/2-signup.png)
![Login Screen](/images/3-login.png)
![News Screen](/images/4-news-tab.png)
![My Donation Screen](/images/5-my-donations.png)
![Add Donation Screen](/images/6-add-donation.png)
![Edit Donation Screen](/images/7-edit-donation.png)
![Search Screen](/images/13-search-tab.png)
![Chat Screen](/images/14-chat.png)
![Side Panel Screen](/images/15-side-panel.png)

## Resources

- [IBM Cloud](https://www.ibm.com/cloud)
- [Watson Assistant](https://cloud.ibm.com/docs/assistant?topic=assistant-getting-started)
- [IBM Cloudant](https://cloud.ibm.com/docs/Cloudant?topic=cloudant-overview)
- [HERE Location Services](https://developer.here.com/documentation)
- [Node.js](https://nodejs.org)
- [React Native](https://reactnative.dev/)
- [IBM Blockchain for Developers](https://developer.ibm.com/technologies/blockchain/)
