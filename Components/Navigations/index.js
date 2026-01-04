import { useEffect, useState } from "react";
import {
  NavigationContainer,
  useNavigationContainerRef
} from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets
} from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import { get_user_details } from "../Fetch_Apis/get_user_details";
import { login_action, user_data_action } from "../Store/Actions/Auth_action";
import { Loader } from "../UserInterface/loader";

// Screens
import LandingPage from "../Screens/LandingPage";
import Onboarding from "../Screens/onBoarding";
import Login from "../Screens/Auth/Login";
import Login_email from "../Screens/Auth/Login/Login_email";
import Register from "../Screens/Auth/Registration";
import RegisterOwner from "../Screens/Auth/Registration/Registration_Owner";
import RegisterTenant from "../Screens/Auth/Registration/Registration_Tanent";
import Dashboard from "../Screens/Dashboard";
import Notices from "../Screens/Notices";
import Directory from "../Screens/Directory";
import Transaction from "../Screens/Transaction";
import Dues from "../Screens/Dues";
import Profiles from "../Screens/Profiles";
import ProfileInfo from "../Screens/Profiles/ProfileInfo";
import History from "../Screens/Bill_Payments/History";
import History_Details from "../Screens/Bill_Payments/History/History_Details";
import Open_PDF from "../Screens/Custom/Open_PDF";
import Bill_Payments from "../Screens/Bill_Payments";
import HelpDesk from "../Screens/HelpDesk";
import New_Ticket from "../Screens/HelpDesk/New_Ticket";
import Forums from "../Screens/Forums";
import Comments from "../Screens/Forums/Comments";
import Create_Forums from "../Screens/Forums/Create_forums";
import Forums_details from "../Screens/Forums/Forums_details";
import Bill_Details from "../Screens/Bill_Payments/Bill_details";
import Bills from "../Screens/Bill_Payments/Bills";
import Bill_List from "../Screens/Bill_Payments/Bills/Bill_Details";
import Meetings from "../Screens/Meetings";
import Meeting_Details from "../Screens/Meetings/Details";
import Agenda from "../Screens/Meetings/Agenda";
import View_Polls from "../Screens/Meetings/Agenda/View_polls";
import Create_Directory from "../Screens/Directory/Create_Directory";
import Create_Notices from "../Screens/Notices/Create_notices";

const Stack = createStackNavigator();

const Navigations = () => {
  const dispatch = useDispatch();
  const navigationRef = useNavigationContainerRef();
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState("LandingPage"); // default
  const [navReady, setNavReady] = useState(false);

  const AuthCheck = async () => {
    try {
      const rs = await get_user_details();
      console.log("auth status", rs.status);

      if (rs?.status === 200) {
        dispatch(login_action(true));
        dispatch(user_data_action(rs?.data));
      } else {
        dispatch(login_action(false));

        const currentRoute = navigationRef.getCurrentRoute()?.name;

        const publicScreens = [
          "LandingPage",
          "Onboarding",
          "Login",
          "Login_email",
          "Register",
          "RegisterOwner",
          "RegisterTenant"
        ];

        if (navReady && !publicScreens.includes(currentRoute)) {
          navigationRef.reset({
            index: 0,
            routes: [{ name: "LandingPage" }]
          });
        }
      }
    } catch (error) {
      console.log("Auth error", error);
      dispatch(login_action(false));

      const currentRoute = navigationRef.getCurrentRoute()?.name;

      const publicScreens = [
        "LandingPage",
        "Onboarding",
        "Login",
        "Login_email",
        "Register",
        "RegisterOwner",
        "RegisterTenant"
      ];

      if (navReady && !publicScreens.includes(currentRoute)) {
        navigationRef.reset({
          index: 0,
          routes: [{ name: "LandingPage" }]
        });
      }
    }
  };

  useEffect(() => {
    AuthCheck();
  }, []);

  const handleStateChange = async () => {
    console.log("Navigation state changed! Checking auth...");
    await AuthCheck();
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => setNavReady(true)}
      onStateChange={handleStateChange}
    >
      <Loader />
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }}
      >
        {/* Authentication Screens */}
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            animationEnabled: true,
            gestureEnabled: true,
            presentation: "modal",
            ...TransitionPresets.ModalPresentationIOS
          }}
        />
        <Stack.Screen
          name="Login_email"
          component={Login_email}
          options={{
            animationEnabled: true,
            gestureEnabled: true,
            presentation: "modal",
            ...TransitionPresets.ModalPresentationIOS
          }}
        />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="RegisterOwner" component={RegisterOwner} />
        <Stack.Screen name="RegisterTenant" component={RegisterTenant} />

        {/* Main App Screens */}
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Notices" component={Notices} />
        <Stack.Screen name="Create_notice" component={Create_Notices} />
        <Stack.Screen name="Directory" component={Directory} />
        <Stack.Screen name="Create_Directory" component={Create_Directory} />
        <Stack.Screen name="Meetings" component={Meetings} />
        <Stack.Screen name="Meeting_Details" component={Meeting_Details} />
        <Stack.Screen name="Agenda" component={Agenda} />
        <Stack.Screen name="View_Polls" component={View_Polls} />
        <Stack.Screen name="Transaction" component={Transaction} />
        <Stack.Screen name="Dues" component={Dues} />
        <Stack.Screen name="Profiles" component={Profiles} />
        <Stack.Screen name="ProfileInfo" component={ProfileInfo} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen
          name="History_Details"
          component={History_Details}
          options={{
            animationEnabled: true,
            gestureEnabled: true,
            presentation: "modal",
            ...TransitionPresets.ModalPresentationIOS
          }}
        />
        <Stack.Screen
          name="Open_PDF"
          component={Open_PDF}
          options={{
            animationEnabled: true,
            gestureEnabled: true,
            presentation: "modal",
            ...TransitionPresets.ModalPresentationIOS
          }}
        />
        <Stack.Screen name="Bill_Payments" component={Bill_Payments} />
        <Stack.Screen name="Bills" component={Bills} />
        <Stack.Screen name="Bill_List" component={Bill_List} />
        <Stack.Screen name="Bill_Details" component={Bill_Details} />
        <Stack.Screen name="HelpDesk" component={HelpDesk} />
        <Stack.Screen name="New_Ticket" component={New_Ticket} />
        <Stack.Screen name="Forums" component={Forums} />
        <Stack.Screen
          name="Comments"
          component={Comments}
          options={{
            animationEnabled: true,
            gestureEnabled: true,
            presentation: "modal",
            ...TransitionPresets.ModalPresentationIOS
          }}
        />
        <Stack.Screen
          name="Create_Forums"
          component={Create_Forums}
          options={{
            animationEnabled: true,
            gestureEnabled: true,
            presentation: "modal",
            ...TransitionPresets.ModalPresentationIOS
          }}
        />
        <Stack.Screen name="Forums_details" component={Forums_details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigations;
